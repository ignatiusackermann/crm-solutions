import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getAppEnv } from "@/lib/runtime-env";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json(
      { error: "Authorised administrator access is required." },
      { status: 403 },
    );
  }

  const env = getAppEnv();
  if (!env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured in Vercel." },
      { status: 503 },
    );
  }

  let body: { to?: string } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const to =
    (typeof body.to === "string" && body.to.trim()) ||
    env.ADMIN_EMAIL ||
    "ignatius@crmsolutions.app";
  const from =
    env.PAYMENT_FROM_EMAIL || "CRM Solutions <payments@crmsolutions.app>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "CRM Solutions email test",
      html: `<p>This is a test from the CRM Solutions admin workspace.</p><p>From: <code>${from}</code></p><p>If you received this, Resend sending is working.</p>`,
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    id?: string;
    message?: string;
    name?: string;
    error?: string;
  };

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        status: response.status,
        from,
        to,
        error:
          payload.message ||
          payload.error ||
          payload.name ||
          `Resend returned ${response.status}`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    id: payload.id,
    from,
    to,
  });
}
