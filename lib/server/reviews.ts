import type { SqlDatabase } from "../sql";

/**
 * Site review capture for the WhatsApp launch campaign.
 *
 * Follows the same shape as lib/server/contact.ts: validate, store in Supabase,
 * notify the admin by email. Deliberately low friction — no field is required
 * except the three ratings, because the point of the exercise is to get people
 * reading the site, not to collect a complete record.
 */

type Env = {
  DB: SqlDatabase | null;
  RESEND_API_KEY?: string;
  ADMIN_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

const ADMIN_EMAIL = "ignatius@crmsolutions.app";

const clean = (v: unknown, n: number) =>
  typeof v === "string" ? v.trim().slice(0, n) : "";

const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const rating = (v: unknown) => {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : 0;
};

const esc = (v: string) =>
  v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function fromAddress(env: Env) {
  return env.CONTACT_FROM_EMAIL || "CRM Solutions <contact@crmsolutions.app>";
}

function stars(score: number) {
  return `${"★".repeat(score)}${"☆".repeat(5 - score)} ${score}/5`;
}

function block(label: string, value: string) {
  if (!value) return "";
  return `<p style="margin:0 0 6px;color:#c75c36;font-size:11px;letter-spacing:2px;text-transform:uppercase">${esc(label)}</p>
          <p style="margin:0 0 22px;color:#081521;font-size:15px;line-height:1.7;white-space:pre-wrap">${esc(value)}</p>`;
}

export async function handleReviewSubmission(request: Request, env: Env) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed." }, { status: 405 });
  }
  if (!env.DB) {
    return Response.json(
      { error: "Review storage is not available right now." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Check the form and try again." }, { status: 400 });
  }

  // Honeypot: a real person never fills this in, bots fill everything.
  if (clean(body.website, 200)) {
    return Response.json({ ok: true }, { status: 201 });
  }

  const first = rating(body.ratingFirstImpression);
  const content = rating(body.ratingContent);
  const usability = rating(body.ratingUsability);

  if (!first || !content || !usability) {
    return Response.json(
      { error: "Please give all three star ratings." },
      { status: 400 },
    );
  }

  const name = clean(body.name, 120);
  const relationship = clean(body.relationship, 160);
  const email = clean(body.email, 160).toLowerCase();
  const unclear = clean(body.unclear, 2000);
  const broken = clean(body.broken, 2000);
  const calculator = clean(body.calculator, 2000);
  const wouldContact = clean(body.wouldContact, 2000);

  if (email && !validEmail(email)) {
    return Response.json(
      { error: "That email address does not look right. Leave it blank if you prefer." },
      { status: 400 },
    );
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const adminEmail = env.ADMIN_EMAIL || ADMIN_EMAIL;

  try {
    await env.DB.prepare(
      `INSERT INTO site_reviews
        (id, reviewer_name, relationship, email, rating_first_impression, rating_content,
         rating_usability, unclear, broken, calculator, would_contact, source, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'whatsapp-launch', 'new', ?)`,
    )
      .bind(
        id,
        name || null,
        relationship || null,
        email || null,
        first,
        content,
        usability,
        unclear || null,
        broken || null,
        calculator || null,
        wouldContact || null,
        now,
      )
      .run();
  } catch (error) {
    console.error("review insert failed", error);
    return Response.json(
      { error: "The review could not be saved. Please try again." },
      { status: 500 },
    );
  }

  if (env.RESEND_API_KEY) {
    const average = ((first + content + usability) / 3).toFixed(1);
    const who = name || "Someone";
    const html = `<!doctype html><html><body style="margin:0;background:#f5f2ea;color:#081521;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:32px 16px"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:auto;background:#fff;border-top:5px solid #c75c36"><tr><td style="padding:38px">
      <p style="margin:0 0 22px;color:#c75c36;font-size:11px;letter-spacing:2px;text-transform:uppercase">CRM Solutions · Site review</p>
      <h1 style="margin:0 0 8px;color:#0b2a55;font-size:30px;line-height:1.2">${esc(who)} reviewed the site</h1>
      <p style="margin:0 0 28px;color:#526172;font-size:15px">Average ${esc(average)} / 5${relationship ? ` · ${esc(relationship)}` : ""}${email ? ` · ${esc(email)}` : ""}</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;border:1px solid #dce3e8">
        <tr><td style="padding:14px 18px;border-bottom:1px solid #dce3e8;color:#526172;font-size:14px">First impression</td><td style="padding:14px 18px;border-bottom:1px solid #dce3e8;font-size:15px">${stars(first)}</td></tr>
        <tr><td style="padding:14px 18px;border-bottom:1px solid #dce3e8;color:#526172;font-size:14px">Content</td><td style="padding:14px 18px;border-bottom:1px solid #dce3e8;font-size:15px">${stars(content)}</td></tr>
        <tr><td style="padding:14px 18px;color:#526172;font-size:14px">Usability</td><td style="padding:14px 18px;font-size:15px">${stars(usability)}</td></tr>
      </table>
      ${block("Unclear or confusing", unclear)}
      ${block("Broken or not working", broken)}
      ${block("The returning-customer calculator", calculator)}
      ${block("What would make them get in touch", wouldContact)}
      <p style="margin:32px 0 0;padding-top:24px;border-top:1px solid #dce3e8;color:#526172;font-size:13px;line-height:1.6">Received ${esc(now)}</p>
    </td></tr></table></td></tr></table></body></html>`;

    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `site-review-${id}`,
        },
        body: JSON.stringify({
          from: fromAddress(env),
          to: [adminEmail],
          reply_to: email || undefined,
          subject: `Site review — ${who} · ${average}/5`,
          html,
        }),
      });
    } catch (error) {
      // The review is already stored; a failed notification must not fail the request.
      console.error("review email failed", error);
    }
  }

  return Response.json({ ok: true }, { status: 201 });
}
