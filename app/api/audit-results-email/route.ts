import { getAppEnv } from "@/lib/runtime-env";

export const runtime = "nodejs";

const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown, n: number) =>
  typeof v === "string" ? v.trim().slice(0, n) : "";
const esc = (v: string) =>
  v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

type Priority = {
  title?: string;
  score?: number;
  consequence?: string;
  action?: string;
};

export async function POST(request: Request) {
  const env = getAppEnv();
  if (!env.RESEND_API_KEY) {
    return Response.json(
      { error: "Email delivery is not available right now." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Check the email address and try again." }, { status: 400 });
  }

  const email = clean(body.email, 160).toLowerCase();
  const overall = Number(body.overall);
  const bandTitle = clean(body.bandTitle, 120);
  const bandCopy = clean(body.bandCopy, 600);
  const summary = clean(body.summary, 4000);
  const priorities = Array.isArray(body.priorities)
    ? (body.priorities as Priority[]).slice(0, 3)
    : [];

  if (!validEmail(email) || !Number.isFinite(overall) || !summary) {
    return Response.json(
      { error: "Enter a valid email address to receive your results." },
      { status: 400 },
    );
  }

  const priorityHtml = priorities
    .map((item, index) => {
      const title = esc(clean(item.title, 120) || `Priority ${index + 1}`);
      const score = Number(item.score);
      const consequence = esc(clean(item.consequence, 400));
      const action = esc(clean(item.action, 400));
      return `<tr><td style="padding:14px 0;border-bottom:1px solid #dce3e8"><strong style="color:#0b2a55">Priority 0${index + 1} — ${title}${Number.isFinite(score) ? ` (${score}/100)` : ""}</strong><br><span style="color:#526172;line-height:1.6">${consequence}</span><br><span style="color:#526172;line-height:1.6"><strong>First action:</strong> ${action}</span></td></tr>`;
    })
    .join("");

  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "CRM Solutions <contact@crmsolutions.app>";
  const admin = env.ADMIN_EMAIL || "ignatius@crmsolutions.app";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `audit-results-${email}-${overall}-${Date.now()}`,
    },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: admin,
      subject: `Your Revenue Leak Audit results — ${overall}/100`,
      html: `<!doctype html><html><body style="margin:0;background:#f5f2ea;color:#081521;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:32px 16px"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:auto;background:#fff;border-top:5px solid #c75c36"><tr><td style="padding:38px"><p style="margin:0 0 22px;color:#c75c36;font-size:11px;letter-spacing:2px;text-transform:uppercase">CRM Solutions · Revenue Leak Audit</p><h1 style="margin:0 0 12px;color:#0b2a55;font-size:30px;line-height:1.2">${esc(bandTitle || "Your diagnostic")}</h1><p style="margin:0 0 22px;color:#526172;line-height:1.7">${esc(bandCopy)}</p><div style="margin:0 0 28px;padding:22px;background:#f5f2ea;border-left:3px solid #c75c36"><strong style="display:block;color:#0b2a55;font-size:28px">${overall}/100</strong><span style="color:#526172;font-size:13px">Overall Revenue Loop strength</span></div>${priorityHtml ? `<table width="100%" cellpadding="0" cellspacing="0">${priorityHtml}</table>` : ""}<pre style="margin:28px 0 0;padding:18px;background:#f5f2ea;color:#526172;font-size:12px;line-height:1.6;white-space:pre-wrap">${esc(summary)}</pre><p style="margin:28px 0 0"><a href="https://www.crmsolutions.app/book-discovery-call?source=audit-email" style="display:inline-block;padding:14px 20px;background:#0b2a55;color:#fff;text-decoration:none">Book a Discovery Call</a></p><p style="margin:32px 0 0;padding-top:24px;border-top:1px solid #dce3e8;color:#526172;font-size:13px;line-height:1.6">Ignatius Ackermann<br>Founder, CRM Solutions<br><a href="mailto:ignatius@crmsolutions.app" style="color:#123b74">ignatius@crmsolutions.app</a></p></td></tr></table></td></tr></table></body></html>`,
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as {
      message?: string;
    };
    return Response.json(
      {
        error:
          payload.message ||
          "The results email could not be sent. Please try again.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
