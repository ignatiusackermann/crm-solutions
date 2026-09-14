import { readClaraPass } from "@/lib/clara/pass";
import type { AppEnv } from "@/lib/runtime-env";

/**
 * Clara's two server endpoints.
 *
 * - Callback: emails Ignatius the moment Clara promises a callback — not at the
 *   end of the call, because a visitor who closes the tab never sends the
 *   end-of-call transcript (a Niki lesson).
 * - Session: saves the conversation to the admin Voice log.
 *
 * Both require Clara's signed conversation pass. One conversation is one
 * voice_call_log row, keyed by the pass nonce, so a callback followed by the
 * end-of-call save updates the same entry rather than adding a second.
 */

const FROM_FALLBACK = "CRM Solutions <bookings@crmsolutions.app>";
const ADMIN_FALLBACK = "ignatius@crmsolutions.app";
const CALLBACKS_PER_PASS = 3;
const callbackCounts = new Map<string, number>();

type Outcome = "answered" | "callback" | "booked";
const OUTCOME_RANK: Record<Outcome, number> = { answered: 0, callback: 1, booked: 2 };

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function crossOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin !== new URL(request.url).origin);
}

function rankOf(outcome: string) {
  return OUTCOME_RANK[outcome as Outcome] ?? 0;
}

type LogEntry = {
  nonce: string;
  occurredAt: string;
  outcome: Outcome;
  contactName: string;
  phone: string;
  email: string;
  company: string;
  summary: string;
  notes: string;
};

async function upsertVoiceLog(env: AppEnv, entry: LogEntry) {
  if (!env.DB) return;
  const id = `clara-${entry.nonce}`;
  const now = new Date().toISOString();
  const existing = await env.DB.prepare("SELECT outcome FROM voice_call_log WHERE id = ?")
    .bind(id)
    .first<{ outcome: string }>();

  if (!existing) {
    await env.DB.prepare(
      `INSERT INTO voice_call_log
        (id, occurred_at, channel, direction, outcome, contact_name, phone, email,
         company, summary, notes, source, created_at, updated_at)
       VALUES (?, ?, 'gemini', 'inbound', ?, ?, ?, ?, ?, ?, ?, 'clara', ?, NULL)`,
    )
      .bind(
        id,
        entry.occurredAt,
        entry.outcome,
        entry.contactName || null,
        entry.phone || null,
        entry.email || null,
        entry.company || null,
        entry.summary,
        entry.notes || null,
        now,
      )
      .run();
    return;
  }

  // Keep the strongest outcome: a booked call stays booked even if a later
  // save only knows about the conversation.
  const keepExisting = rankOf(existing.outcome) > rankOf(entry.outcome);
  await env.DB.prepare(
    `UPDATE voice_call_log
     SET outcome = ?, summary = CASE WHEN ? THEN summary ELSE ? END,
         contact_name = COALESCE(?, contact_name), phone = COALESCE(?, phone),
         email = COALESCE(?, email), company = COALESCE(?, company),
         notes = COALESCE(?, notes), updated_at = ?
     WHERE id = ?`,
  )
    .bind(
      keepExisting ? existing.outcome : entry.outcome,
      keepExisting,
      entry.summary,
      entry.contactName || null,
      entry.phone || null,
      entry.email || null,
      entry.company || null,
      entry.notes || null,
      now,
      id,
    )
    .run();
}

export async function handleClaraCallback(request: Request, env: AppEnv) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  if (crossOrigin(request)) return json({ error: "Origin not allowed." }, 403);

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const pass = await readClaraPass(body.pass);
  if (!pass) return json({ error: "Not allowed." }, 403);

  const used = callbackCounts.get(pass.nonce) ?? 0;
  if (used >= CALLBACKS_PER_PASS) return json({ error: "Too many requests." }, 429);

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  if (!name || phone.replace(/\D/g, "").length < 9) {
    return json({ error: "Name and a phone number are required." }, 400);
  }
  callbackCounts.set(pass.nonce, used + 1);

  const email = clean(body.email, 160).toLowerCase();
  const company = clean(body.company, 140);
  const preferredTime = clean(body.preferredTime, 200) || "Any time";
  const topic = clean(body.topic, 600) || "Not specified";
  const page = clean(body.page, 200) || "Website";
  const transcript = clean(body.transcript, 20000).slice(-8000);

  let emailed = false;
  if (env.RESEND_API_KEY) {
    const row = (label: string, value: string) =>
      `<tr><td style="padding:6px 0;color:#526172;font-size:14px;width:140px;vertical-align:top">${label}</td><td style="padding:6px 0;color:#081521;font-size:14px">${value}</td></tr>`;
    const html = `<!doctype html><html><body style="margin:0;background:#f5f2ea;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:28px 16px"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:#fff;border-top:5px solid #c75c36"><tr><td style="padding:32px">
<p style="margin:0 0 10px;color:#c75c36;font-size:11px;letter-spacing:2px;text-transform:uppercase">Clara · Voice Business Advisor</p>
<h1 style="margin:0 0 22px;color:#081521;font-size:24px;font-weight:normal">Please call this visitor back</h1>
<table width="100%" cellpadding="0" cellspacing="0">
${row("Name", escapeHtml(name))}
${row("Phone", `<a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}" style="color:#123b74">${escapeHtml(phone)}</a>`)}
${email ? row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#123b74">${escapeHtml(email)}</a>`) : ""}
${company ? row("Company", escapeHtml(company)) : ""}
${row("When to call", escapeHtml(preferredTime))}
${row("Wants to discuss", escapeHtml(topic))}
${row("Page", escapeHtml(page))}
</table>
${transcript ? `<p style="margin:26px 0 8px;color:#081521;font-size:13px;font-weight:bold">Conversation so far</p><pre style="white-space:pre-wrap;font-family:Arial,sans-serif;font-size:13px;color:#3b3f47;background:#f5f2ea;padding:14px;border-left:3px solid #c75c36;margin:0">${escapeHtml(transcript)}</pre>` : ""}
</td></tr></table></td></tr></table></body></html>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `clara-callback-${pass.nonce}-${used + 1}`,
      },
      body: JSON.stringify({
        from: env.DISCOVERY_FROM_EMAIL || FROM_FALLBACK,
        to: [env.DISCOVERY_ADMIN_EMAIL || ADMIN_FALLBACK],
        ...(email.includes("@") ? { reply_to: email } : {}),
        subject: `Callback requested via Clara — ${name}, ${phone}`,
        html,
      }),
    }).catch((error: unknown) => {
      console.error("clara callback email failed", error);
      return null;
    });
    emailed = Boolean(response?.ok);
    if (response && !response.ok) console.error("clara callback email rejected", response.status);
  }

  let logged = false;
  try {
    await upsertVoiceLog(env, {
      nonce: pass.nonce,
      occurredAt: new Date().toISOString(),
      outcome: "callback",
      contactName: name,
      phone,
      email,
      company,
      summary: `Callback requested via Clara — ${name}${company ? `, ${company}` : ""}: ${topic}`.slice(0, 2000),
      notes: `When to call: ${preferredTime}\nPage: ${page}${transcript ? `\n\n${transcript}` : ""}`,
    });
    logged = Boolean(env.DB);
  } catch (error) {
    console.error("clara callback log failed", error);
  }

  if (!emailed && !logged) return json({ error: "The callback request could not be sent." }, 502);
  return json({ ok: true });
}

export async function handleClaraSession(request: Request, env: AppEnv) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  if (crossOrigin(request)) return json({ error: "Origin not allowed." }, 403);

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const pass = await readClaraPass(body.pass);
  if (!pass) return json({ error: "Not allowed." }, 403);
  if (!env.DB) return json({ error: "Voice log storage is not available." }, 503);

  const transcript = clean(body.transcript, 40000).slice(-12000);
  const booking = (body.booking && typeof body.booking === "object" ? body.booking : null) as Record<string, unknown> | null;
  const callback = (body.callback && typeof body.callback === "object" ? body.callback : null) as Record<string, unknown> | null;
  if (!transcript && !booking && !callback) return json({ ok: true, skipped: true });

  const startedAt = clean(body.startedAt, 40);
  const endedAt = clean(body.endedAt, 40);
  const occurredAt = Number.isNaN(Date.parse(startedAt)) ? new Date().toISOString() : new Date(startedAt).toISOString();
  const page = clean(body.page, 200) || "Website";

  const bookingName = booking ? `${clean(booking.firstName, 80)} ${clean(booking.lastName, 80)}`.trim() : "";
  const company = booking ? clean(booking.company, 140) : "";
  const outcome: Outcome = booking ? "booked" : callback ? "callback" : "answered";
  const firstVisitorLine =
    transcript
      .split("\n")
      .find((line) => line.startsWith("Visitor:"))
      ?.replace(/^Visitor:\s*/, "")
      .slice(0, 160) || "";

  const summary =
    outcome === "booked"
      ? `Clara booked a Discovery Call — ${company || bookingName}, ${clean(booking?.saTime, 120)}`
      : outcome === "callback"
        ? `Callback requested via Clara — ${clean(callback?.name, 120)}`
        : `Clara conversation${firstVisitorLine ? ` — "${firstVisitorLine}"` : ""}`;

  try {
    await upsertVoiceLog(env, {
      nonce: pass.nonce,
      occurredAt,
      outcome,
      contactName: bookingName || clean(callback?.name, 120),
      phone: clean(booking?.phone, 60) || clean(callback?.phone, 40),
      email: (clean(booking?.email, 160) || clean(callback?.email, 160)).toLowerCase(),
      company,
      summary: summary.slice(0, 2000),
      notes: `Page: ${page}\nStarted: ${startedAt || "unknown"}\nEnded: ${endedAt || "unknown"}${transcript ? `\n\n${transcript}` : ""}`,
    });
  } catch (error) {
    console.error("clara session log failed", error);
    return json({ error: "The conversation could not be saved." }, 500);
  }

  return json({ ok: true });
}
