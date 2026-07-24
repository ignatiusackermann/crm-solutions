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

async function sendAdminEmail(env: Env, subject: string, html: string, key: string) {
  if (!env.RESEND_API_KEY) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": key,
    },
    body: JSON.stringify({
      from:
        env.CONTACT_FROM_EMAIL ||
        env.DISCOVERY_FROM_EMAIL ||
        "CRM Solutions <bookings@crmsolutions.app>",
      to: [env.ADMIN_EMAIL || ADMIN_EMAIL],
      subject,
      html,
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

  const emailed = await sendAdminEmail(
    env,
    `Website contact — ${firstName} ${lastName}`,
    `<p><strong>${esc(firstName)} ${esc(lastName)}</strong> sent a message from the website.</p>
     <p>Email: <a href="mailto:${esc(email)}">${esc(email)}</a><br>
     Phone: ${esc(phone || "—")}<br>
     Company: ${esc(company || "—")}</p>
     <p style="white-space:pre-wrap;line-height:1.6">${esc(message)}</p>`,
    `contact-${id}`,
  );

  return Response.json(
    {
      ok: true,
      emailStatus: emailed ? "sent" : "saved",
    },
    { status: 201 },
  );
}
