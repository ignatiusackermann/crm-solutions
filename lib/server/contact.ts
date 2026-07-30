import type { SqlDatabase } from "../sql";

type Env = {
  DB: SqlDatabase | null;
  RESEND_API_KEY?: string;
  ADMIN_EMAIL?: string;
  DISCOVERY_FROM_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

const ADMIN_EMAIL = "ignatius@crmsolutions.app";
const clean = (v: unknown, n: number) =>
  typeof v === "string" ? v.trim().slice(0, n) : "";
const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const esc = (v: string) =>
  v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function fromAddress(env: Env) {
  return (
    env.CONTACT_FROM_EMAIL ||
    env.DISCOVERY_FROM_EMAIL ||
    "CRM Solutions <bookings@crmsolutions.app>"
  );
}

function emailShell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f5f2ea;color:#081521;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:32px 16px"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:auto;background:#fff;border-top:5px solid #c75c36"><tr><td style="padding:38px"><p style="margin:0 0 22px;color:#c75c36;font-size:11px;letter-spacing:2px;text-transform:uppercase">CRM Solutions · Contact</p><h1 style="margin:0 0 24px;color:#0b2a55;font-size:30px;line-height:1.2">${title}</h1>${body}<p style="margin:32px 0 0;padding-top:24px;border-top:1px solid #dce3e8;color:#526172;font-size:13px;line-height:1.6">Ignatius Ackermann<br>Founder, CRM Solutions<br><a href="mailto:ignatius@crmsolutions.app" style="color:#123b74">ignatius@crmsolutions.app</a></p></td></tr></table></td></tr></table></body></html>`;
}

async function verifyTurnstile(token: string | undefined, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip) body.set("remoteip", ip);
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );
  const data = (await response.json()) as { success?: boolean };
  return Boolean(data.success);
}

async function sendEmail(
  env: Env,
  payload: {
    to: string[];
    replyTo?: string;
    subject: string;
    html: string;
  },
  key: string,
) {
  if (!env.RESEND_API_KEY) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": key,
    },
    body: JSON.stringify({
      from: fromAddress(env),
      to: payload.to,
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    }),
  });
  return response.ok;
}

export async function handleContactSubmission(request: Request, env: Env) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed." }, { status: 405 });
  }
  if (!env.DB) {
    return Response.json(
      { error: "Contact storage is not available right now." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Check the contact form and try again." }, { status: 400 });
  }

  const firstName = clean(body.firstName, 80);
  const lastName = clean(body.lastName, 80);
  const email = clean(body.email, 160).toLowerCase();
  const phone = clean(body.phone, 60);
  const company = clean(body.company, 140);
  const message = clean(body.message, 4000);
  const turnstileToken = clean(body.turnstileToken, 2048);
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for");

  if (!firstName || !lastName || !validEmail(email) || message.length < 10) {
    return Response.json(
      {
        error:
          "Please include your name, a valid email and a short message (at least 10 characters).",
      },
      { status: 400 },
    );
  }

  const turnstileOk = await verifyTurnstile(turnstileToken || undefined, ip);
  if (!turnstileOk) {
    return Response.json(
      { error: "Cloudflare verification failed. Refresh and try again." },
      { status: 400 },
    );
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const adminEmail = env.ADMIN_EMAIL || ADMIN_EMAIL;

  try {
    await env.DB.prepare(
      `INSERT INTO contact_submissions
        (id, first_name, last_name, email, phone, company, message, source, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'website', 'new', ?)`,
    )
      .bind(
        id,
        firstName,
        lastName,
        email,
        phone || null,
        company || null,
        message,
        now,
      )
      .run();
  } catch (error) {
    console.error("contact_submissions insert failed", error);
    return Response.json(
      { error: "Your message could not be saved. Please email ignatius@crmsolutions.app." },
      { status: 500 },
    );
  }

  const adminSent = await sendEmail(
    env,
    {
      to: [adminEmail],
      replyTo: email,
      subject: `Website contact — ${firstName} ${lastName}`,
      html: `<p><strong>${esc(firstName)} ${esc(lastName)}</strong> sent a message from the website.</p>
     <p>Email: <a href="mailto:${esc(email)}">${esc(email)}</a><br>
     Phone: ${esc(phone || "—")}<br>
     Company: ${esc(company || "—")}</p>
     <p style="white-space:pre-wrap;line-height:1.6">${esc(message)}</p>`,
    },
    `contact-admin-${id}`,
  );

  const clientSent = await sendEmail(
    env,
    {
      to: [email],
      replyTo: adminEmail,
      subject: "Thank you for contacting CRM Solutions",
      html: emailShell(
        `Thank you, ${esc(firstName)}.`,
        `<p style="color:#526172;line-height:1.7">Your message has been received. I read every enquiry personally and will reply with a clear, respectful response — usually within one business day.</p>
         <p style="color:#526172;line-height:1.7">If the constraint is larger than email can cover, you are welcome to <a href="https://www.crmsolutions.app/book-discovery-call" style="color:#123b74">book a Discovery Call</a> meanwhile.</p>
         <p style="color:#526172;line-height:1.7">No pressure. No hard sell — just a serious conversation about what is costing attention, enquiries or revenue.</p>`,
      ),
    },
    `contact-client-${id}`,
  );

  return Response.json(
    {
      ok: true,
      emailStatus: adminSent && clientSent ? "sent" : adminSent || clientSent ? "partial" : "saved",
    },
    { status: 201 },
  );
}
