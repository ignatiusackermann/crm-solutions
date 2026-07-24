import { isAdminRequest } from "../admin-auth";
import {
  readClientSessionFromCookieHeader,
  verifyClientSessionToken,
} from "../client-auth";
import type { SqlDatabase } from "../sql";

const ADMIN_EMAIL = "ignatius@crmsolutions.app";

type Env = {
  DB: SqlDatabase | null;
  ADMIN_EMAIL?: string;
  RESEND_API_KEY?: string;
  PAYMENT_FROM_EMAIL?: string;
  PAYPAL_CLIENT_ID?: string;
  PAYPAL_CLIENT_SECRET?: string;
  PAYPAL_ENV?: string;
};

const json = (data: unknown, status = 200) =>
  Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" },
  });

const clean = (v: unknown, n: number) =>
  typeof v === "string" ? v.trim().slice(0, n) : "";
const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const cents = (v: string) =>
  /^\d+(?:\.\d{1,2})?$/.test(v) ? Math.round(Number(v) * 100) : NaN;
const esc = (v: string) =>
  v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
const money = (c: number, x: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: x }).format(c / 100);
const admin = async (r: Request, _e: Env) => isAdminRequest(r);
const requireDb = (e: Env) => {
  if (!e.DB) throw new Error("DATABASE_UNAVAILABLE");
  return e.DB;
};

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f5f2ea;color:#081521;font-family:Arial,sans-serif"><table width="100%"><tr><td style="padding:32px 16px"><table width="100%" style="max-width:640px;margin:auto;background:#fff;border-top:5px solid #c75c36"><tr><td style="padding:38px"><p style="color:#c75c36;font-size:11px;letter-spacing:2px;text-transform:uppercase">CRM Solutions · Client Payment Panel</p><h1 style="color:#0b2a55">${title}</h1>${body}<p style="margin-top:32px;padding-top:24px;border-top:1px solid #dce3e8;color:#526172;font-size:13px;line-height:1.6">Ignatius Ackermann<br>Founder, CRM Solutions<br><a href="mailto:ignatius@crmsolutions.app">ignatius@crmsolutions.app</a></p></td></tr></table></td></tr></table></body></html>`;
}

async function send(e: Env, payload: unknown, key: string) {
  if (!e.RESEND_API_KEY) return false;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${e.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": key,
    },
    body: JSON.stringify(payload),
  });
  return r.ok;
}

const hex = (b: Uint8Array) =>
  [...b].map((x) => x.toString(16).padStart(2, "0")).join("");

async function hash(t: string) {
  return hex(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)),
    ),
  );
}

function token() {
  const b = crypto.getRandomValues(new Uint8Array(32));
  let s = "";
  b.forEach((x) => {
    s += String.fromCharCode(x);
  });
  return btoa(s).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function accessCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  let code = "";
  bytes.forEach((byte) => {
    code += alphabet[byte % alphabet.length];
  });
  return `${code.slice(0, 4)}-${code.slice(4)}`;
}

function reference() {
  return `CRM-${new Date().getUTCFullYear()}-${crypto
    .getRandomValues(new Uint32Array(1))[0]
    .toString(36)
    .toUpperCase()
    .padStart(6, "0")
    .slice(0, 6)}`;
}

async function resolvePlanAccess(r: Request, e: Env) {
  const url = new URL(r.url);
  const access = clean(url.searchParams.get("token") || url.searchParams.get("access"), 120);
  if (access && e.DB) {
    const row = await e.DB.prepare(
      `SELECT id FROM payment_plans WHERE access_token_hash = ? AND status != 'revoked' LIMIT 1`,
    )
      .bind(await hash(access))
      .first<{ id: string }>();
    if (row) return { planId: row.id, access };
  }

  const session = await verifyClientSessionToken(
    readClientSessionFromCookieHeader(r.headers.get("cookie")),
  );
  if (session?.planId) return { planId: session.planId, access: null as string | null };
  return null;
}

async function listPlans(r: Request, e: Env) {
  if (!(await admin(r, e))) {
    return json({ error: "Authorised administrator access is required." }, 403);
  }
  if (!e.DB) return json({ error: "Payment storage is not available." }, 503);
  const q = await e.DB.prepare(
    `SELECT p.id,p.reference,p.title,p.currency,p.total_amount_cents AS "totalAmountCents",c.first_name||' '||c.last_name AS "clientName",c.email,SUM(CASE WHEN i.status='paid' THEN 1 ELSE 0 END) AS "paidCount",COUNT(i.id) AS "installmentCount" FROM payment_plans p JOIN payment_clients c ON c.id=p.client_id LEFT JOIN payment_installments i ON i.plan_id=p.id GROUP BY p.id, p.reference, p.title, p.currency, p.total_amount_cents, p.created_at, c.first_name, c.last_name, c.email ORDER BY p.created_at DESC LIMIT 100`,
  ).all();
  return json({ plans: q.results });
}

async function createPlan(r: Request, e: Env) {
  if (!(await admin(r, e))) {
    return json({ error: "Authorised administrator access is required." }, 403);
  }
  if (!e.DB) return json({ error: "Payment storage is not available." }, 503);

  let x: Record<string, unknown>;
  try {
    x = await r.json();
  } catch {
    return json({ error: "Check the payment-plan form." }, 400);
  }

  const first = clean(x.firstName, 80);
  const last = clean(x.lastName, 80);
  const email = clean(x.email, 160).toLowerCase();
  const phone = clean(x.phone, 60);
  const company = clean(x.company, 140);
  const title = clean(x.title, 160);
  const description = clean(x.description, 1800);
  const currency = clean(x.currency, 3).toUpperCase();
  const total = cents(clean(x.totalAmount, 20));
  const deposit = cents(clean(x.depositAmount, 20));
  const final = cents(clean(x.finalAmount, 20));
  const depositDue = clean(x.depositDue, 180);
  const finalDue = clean(x.finalDue, 180);

  if (
    !first ||
    !last ||
    !validEmail(email) ||
    !title ||
    !description ||
    !["USD", "ZAR", "EUR", "GBP"].includes(currency) ||
    !Number.isSafeInteger(total) ||
    total <= 0 ||
    !Number.isSafeInteger(deposit) ||
    deposit <= 0 ||
    !Number.isSafeInteger(final) ||
    final <= 0 ||
    deposit + final !== total ||
    !depositDue ||
    !finalDue
  ) {
    return json(
      {
        error:
          "Complete the required fields and ensure the two payments equal the total.",
      },
      400,
    );
  }

  const clientId = crypto.randomUUID();
  const planId = crypto.randomUUID();
  const depositId = crypto.randomUUID();
  const finalId = crypto.randomUUID();
  const ref = reference();
  const access = token();
  const code = accessCode();
  const accessHash = await hash(access);
  const codeHash = await hash(code.replaceAll("-", ""));
  const now = new Date().toISOString();
  const dp = Math.round((deposit / total) * 1000) / 10;
  const fp = Math.round((final / total) * 1000) / 10;

  try {
    const db = requireDb(e);
    await db.batch([
      db
        .prepare(
          "INSERT INTO payment_clients(id,first_name,last_name,email,phone,company,created_at) VALUES(?,?,?,?,?,?,?)",
        )
        .bind(clientId, first, last, email, phone || null, company || null, now),
      db
        .prepare(
          "INSERT INTO payment_plans(id,client_id,reference,title,description,currency,total_amount_cents,access_token_hash,access_code_hash,status,created_at) VALUES(?,?,?,?,?,?,?,?,?, 'active',?)",
        )
        .bind(
          planId,
          clientId,
          ref,
          title,
          description,
          currency,
          total,
          accessHash,
          codeHash,
          now,
        ),
      db
        .prepare(
          "INSERT INTO payment_installments(id,plan_id,sequence,label,amount_cents,due_description,status,created_at) VALUES(?,?,1,?,?,?,'pending',?)",
        )
        .bind(depositId, planId, `Deposit · ${dp}%`, deposit, depositDue, now),
      db
        .prepare(
          "INSERT INTO payment_installments(id,plan_id,sequence,label,amount_cents,due_description,status,created_at) VALUES(?,?,2,?,?,?,'pending',?)",
        )
        .bind(finalId, planId, `Final payment · ${fp}%`, final, finalDue, now),
    ]);
  } catch (error) {
    console.error("payment plan create failed", error);
    return json({ error: "The client payment plan could not be stored." }, 500);
  }

  const origin = new URL(r.url).origin;
  const panelUrl = `${origin}/client/payment?token=${encodeURIComponent(access)}`;
  const loginUrl = `${origin}/client/login`;

  const sent = await send(
    e,
    {
      from: e.PAYMENT_FROM_EMAIL || "CRM Solutions <payments@crmsolutions.app>",
      to: [email],
      reply_to: e.ADMIN_EMAIL || ADMIN_EMAIL,
      subject: `Your CRM Solutions payment plan — ${ref}`,
      html: shell(
        `Your personalised plan is ready, ${esc(first)}.`,
        `<p style="color:#526172;line-height:1.7">The agreed payment arrangement for <strong>${esc(title)}</strong> is ready. Your deposit of <strong>${esc(money(deposit, currency))}</strong> can be completed from your private client panel.</p>
         <div style="padding:22px;background:#f5f2ea;border-left:3px solid #c75c36;margin:22px 0">
           <strong style="font-size:22px">${esc(money(total, currency))}</strong><br>
           <small>${esc(ref)} · Two agreed payments</small>
         </div>
         <div style="padding:18px 22px;background:#0b2a55;color:#fff;margin:22px 0">
           <p style="margin:0 0 8px;font-size:11px;letter-spacing:1px;text-transform:uppercase;opacity:.8">Client login</p>
           <p style="margin:0;line-height:1.7">Username (email): <strong>${esc(email)}</strong><br>Temporary access code: <strong>${esc(code)}</strong></p>
           <p style="margin:12px 0 0;opacity:.85;font-size:13px">Sign in at <a href="${esc(loginUrl)}" style="color:#fff">${esc(loginUrl)}</a></p>
         </div>
         <p><a href="${esc(panelUrl)}" style="display:inline-block;margin-top:8px;padding:14px 20px;background:#c75c36;color:#fff;text-decoration:none">Open payment panel / pay deposit</a></p>
         <p style="color:#526172">Keep this email confidential. You can use either the login details or the private link.</p>`,
      ),
    },
    `payment-plan-${planId}`,
  );

  return json(
    {
      plan: {
        reference: ref,
        clientName: `${first} ${last}`,
        email,
        panelUrl,
        loginUrl,
        accessCode: code,
        emailStatus: sent ? "sent" : "configuration_required",
      },
    },
    201,
  );
}

async function clientPlan(r: Request, e: Env) {
  if (!e.DB) return json({ error: "Payment storage is not available." }, 503);
  const resolved = await resolvePlanAccess(r, e);
  if (!resolved) {
    return json({ error: "Sign in or use the secure access link from your email." }, 401);
  }

  const p = await e.DB.prepare(
    `SELECT p.id,p.reference,p.title,p.description,p.currency,p.total_amount_cents AS "totalAmountCents",c.first_name AS "firstName",c.last_name AS "lastName",c.company,c.email FROM payment_plans p JOIN payment_clients c ON c.id=p.client_id WHERE p.id=? AND p.status!='revoked' LIMIT 1`,
  )
    .bind(resolved.planId)
    .first<Record<string, unknown>>();
  if (!p) return json({ error: "This access link is invalid or no longer active." }, 404);

  const i = await e.DB.prepare(
    `SELECT id,sequence,label,amount_cents AS "amountCents",due_description AS "dueDescription",status,paid_at AS "paidAt" FROM payment_installments WHERE plan_id=? ORDER BY sequence`,
  )
    .bind(p.id as string)
    .all();

  return json({
    plan: {
      reference: p.reference,
      title: p.title,
      description: p.description,
      currency: p.currency,
      totalAmountCents: p.totalAmountCents,
      client: {
        firstName: p.firstName,
        lastName: p.lastName,
        company: p.company,
        email: p.email,
      },
      installments: i.results,
      paypalReady: Boolean(e.PAYPAL_CLIENT_ID && e.PAYPAL_CLIENT_SECRET),
      accessToken: resolved.access,
    },
  });
}

const base = (e: Env) =>
  e.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function paypalToken(e: Env) {
  if (!e.PAYPAL_CLIENT_ID || !e.PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal is not configured.");
  }
  const r = await fetch(`${base(e)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${e.PAYPAL_CLIENT_ID}:${e.PAYPAL_CLIENT_SECRET}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const d = (await r.json()) as {
    access_token?: string;
    error_description?: string;
  };
  if (!r.ok || !d.access_token) {
    throw new Error(d.error_description || "PayPal authentication failed.");
  }
  return d.access_token;
}

async function createOrder(r: Request, e: Env) {
  if (!e.DB) return json({ error: "Payment storage is not available." }, 503);

  let x: { token?: string; installmentId?: string };
  try {
    x = await r.json();
  } catch {
    return json({ error: "Reopen the panel and try again." }, 400);
  }

  const access = clean(x.token, 100);
  const id = clean(x.installmentId, 80);
  if (!id) return json({ error: "Payment request is incomplete." }, 400);

  let installment: Record<string, unknown> | null = null;
  if (access) {
    installment = await e.DB.prepare(
      `SELECT i.id,i.plan_id AS "planId",i.label,i.amount_cents AS "amountCents",i.status,p.reference,p.title,p.currency,p.access_token_hash AS "accessTokenHash"
       FROM payment_installments i
       JOIN payment_plans p ON p.id=i.plan_id
       WHERE i.id=? AND p.access_token_hash=? AND p.status!='revoked' LIMIT 1`,
    )
      .bind(id, await hash(access))
      .first<Record<string, unknown>>();
  } else {
    const session = await verifyClientSessionToken(
      readClientSessionFromCookieHeader(r.headers.get("cookie")),
    );
    if (!session) return json({ error: "Sign in again to continue payment." }, 401);
    installment = await e.DB.prepare(
      `SELECT i.id,i.plan_id AS "planId",i.label,i.amount_cents AS "amountCents",i.status,p.reference,p.title,p.currency
       FROM payment_installments i
       JOIN payment_plans p ON p.id=i.plan_id
       WHERE i.id=? AND p.id=? AND p.status!='revoked' LIMIT 1`,
    )
      .bind(id, session.planId)
      .first<Record<string, unknown>>();
  }

  if (!installment || installment.status !== "pending") {
    return json({ error: "This payment is not available." }, 409);
  }

  let at: string;
  try {
    at = await paypalToken(e);
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "PayPal unavailable." },
      503,
    );
  }

  const origin = new URL(r.url).origin;
  const ret = new URL("/api/paypal/return", origin);
  const cancel = new URL("/client/payment", origin);
  if (access) {
    ret.searchParams.set("access", access);
    cancel.searchParams.set("token", access);
  }
  ret.searchParams.set("installment", id);
  cancel.searchParams.set("payment", "cancelled");

  const pr = await fetch(`${base(e)}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${at}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": `crm-${id}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: id,
          custom_id: installment.reference,
          description: `${installment.title} — ${installment.label}`.slice(0, 127),
          amount: {
            currency_code: installment.currency,
            value: (Number(installment.amountCents) / 100).toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: "CRM Solutions",
        user_action: "PAY_NOW",
        return_url: ret.toString(),
        cancel_url: cancel.toString(),
      },
    }),
  });

  const o = (await pr.json()) as {
    id?: string;
    links?: Array<{ rel: string; href: string }>;
    message?: string;
  };
  const approval = o.links?.find((l) => l.rel === "approve")?.href;
  if (!pr.ok || !o.id || !approval) {
    return json({ error: o.message || "PayPal could not create the payment." }, 502);
  }

  await e.DB.prepare(
    "UPDATE payment_installments SET paypal_order_id=?,updated_at=? WHERE id=?",
  )
    .bind(o.id, new Date().toISOString(), id)
    .run();
  return json({ approvalUrl: approval });
}

async function capture(r: Request, e: Env) {
  const u = new URL(r.url);
  const panel = new URL("/client/payment", u.origin);
  if (!e.DB) {
    panel.searchParams.set("payment", "error");
    return Response.redirect(panel.toString(), 303);
  }

  const access = clean(u.searchParams.get("access"), 100);
  const id = clean(u.searchParams.get("installment"), 80);
  const order = clean(u.searchParams.get("token"), 120);
  if (access) panel.searchParams.set("token", access);

  let installment: Record<string, unknown> | null = null;
  if (access) {
    installment = await e.DB.prepare(
      `SELECT i.plan_id AS "planId",i.amount_cents AS "amountCents",i.paypal_order_id AS "paypalOrderId",p.currency
       FROM payment_installments i
       JOIN payment_plans p ON p.id=i.plan_id
       WHERE i.id=? AND p.access_token_hash=? AND i.status='pending' LIMIT 1`,
    )
      .bind(id, await hash(access))
      .first<Record<string, unknown>>();
  } else {
    const session = await verifyClientSessionToken(
      readClientSessionFromCookieHeader(r.headers.get("cookie")),
    );
    if (session) {
      installment = await e.DB.prepare(
        `SELECT i.plan_id AS "planId",i.amount_cents AS "amountCents",i.paypal_order_id AS "paypalOrderId",p.currency
         FROM payment_installments i
         JOIN payment_plans p ON p.id=i.plan_id
         WHERE i.id=? AND p.id=? AND i.status='pending' LIMIT 1`,
      )
        .bind(id, session.planId)
        .first<Record<string, unknown>>();
    }
  }

  if (!installment || installment.paypalOrderId !== order) {
    panel.searchParams.set("payment", "error");
    return Response.redirect(panel.toString(), 303);
  }

  try {
    const at = await paypalToken(e);
    const cr = await fetch(
      `${base(e)}/v2/checkout/orders/${encodeURIComponent(order)}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${at}`,
          "Content-Type": "application/json",
          "PayPal-Request-Id": `capture-${id}`,
        },
        body: "{}",
      },
    );
    const d = (await cr.json()) as {
      status?: string;
      purchase_units?: Array<{
        payments?: {
          captures?: Array<{
            id?: string;
            status?: string;
            amount?: { currency_code?: string; value?: string };
          }>;
        };
      }>;
    };
    const c = d.purchase_units?.[0]?.payments?.captures?.find(
      (x) => x.status === "COMPLETED",
    );
    const amount = c?.amount?.value
      ? Math.round(Number(c.amount.value) * 100)
      : NaN;
    if (
      !cr.ok ||
      d.status !== "COMPLETED" ||
      !c?.id ||
      amount !== Number(installment.amountCents) ||
      c.amount?.currency_code !== installment.currency
    ) {
      throw new Error("capture_failed");
    }
    const now = new Date().toISOString();
    await e.DB.prepare(
      "UPDATE payment_installments SET status='paid',paypal_capture_id=?,paid_at=?,updated_at=? WHERE id=? AND status='pending'",
    )
      .bind(c.id, now, now, id)
      .run();
    await e.DB.prepare(
      "UPDATE payment_plans SET status='paid' WHERE id=? AND NOT EXISTS(SELECT 1 FROM payment_installments WHERE plan_id=? AND status!='paid')",
    )
      .bind(installment.planId as string, installment.planId as string)
      .run();
    panel.searchParams.set("payment", "success");
  } catch {
    panel.searchParams.set("payment", "error");
  }

  return Response.redirect(panel.toString(), 303);
}

export async function handleAdminPaymentPlans(r: Request, e: Env) {
  return r.method === "GET"
    ? listPlans(r, e)
    : r.method === "POST"
      ? createPlan(r, e)
      : json({ error: "Method not allowed." }, 405);
}

export async function handleClientPaymentPlan(r: Request, e: Env) {
  return r.method === "GET"
    ? clientPlan(r, e)
    : json({ error: "Method not allowed." }, 405);
}

export async function handleCreatePayPalOrder(r: Request, e: Env) {
  return r.method === "POST"
    ? createOrder(r, e)
    : json({ error: "Method not allowed." }, 405);
}

export async function handlePayPalReturn(r: Request, e: Env) {
  return r.method === "GET"
    ? capture(r, e)
    : json({ error: "Method not allowed." }, 405);
}
