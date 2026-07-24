import {
  createClientSessionToken,
  readClientSessionFromCookieHeader,
  verifyClientSessionToken,
} from "../client-auth";
import type { SqlDatabase } from "../sql";

type Env = {
  DB: SqlDatabase | null;
  TURNSTILE_SECRET_KEY?: string;
};

const clean = (v: unknown, n: number) =>
  typeof v === "string" ? v.trim().slice(0, n) : "";
const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const hex = (b: Uint8Array) =>
  [...b].map((x) => x.toString(16).padStart(2, "0")).join("");

async function hash(value: string) {
  return hex(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
    ),
  );
}

async function verifyTurnstile(token: string | undefined, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );
  const data = (await response.json()) as { success?: boolean };
  return Boolean(data.success);
}

function normalizeAccessCode(value: string) {
  return value.replaceAll(/\s+/g, "").replaceAll("-", "").toUpperCase();
}

export async function handleClientLogin(request: Request, env: Env) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed." }, { status: 405 });
  }
  if (!env.DB) {
    return Response.json(
      { error: "Client access is temporarily unavailable." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Check your login details and try again." }, { status: 400 });
  }

  const email = clean(body.email, 160).toLowerCase();
  const accessCode = normalizeAccessCode(clean(body.accessCode, 40));
  const turnstileToken = clean(body.turnstileToken, 2048);
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for");

  if (!validEmail(email) || accessCode.length < 6) {
    return Response.json(
      { error: "Enter the email and access code from your payment email." },
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

  const codeHash = await hash(accessCode);
  const plan = await env.DB.prepare(
    `SELECT p.id
     FROM payment_plans p
     JOIN payment_clients c ON c.id = p.client_id
     WHERE lower(c.email) = ?
       AND p.access_code_hash = ?
       AND p.status != 'revoked'
     ORDER BY p.created_at DESC
     LIMIT 1`,
  )
    .bind(email, codeHash)
    .first<{ id: string }>();

  if (!plan) {
    return Response.json(
      { error: "Those details do not match an active client plan." },
      { status: 401 },
    );
  }

  const session = await createClientSessionToken(plan.id);
  return Response.json(
    { ok: true, redirectTo: "/client/payment" },
    {
      status: 200,
      headers: {
        "Set-Cookie": [
          `crm_client_session=${encodeURIComponent(session)}`,
          "Path=/",
          "HttpOnly",
          "SameSite=Lax",
          process.env.NODE_ENV === "production" ? "Secure" : "",
          "Max-Age=2592000",
        ]
          .filter(Boolean)
          .join("; "),
      },
    },
  );
}

export async function resolveClientPlanId(request: Request, env: { DB: SqlDatabase | null }) {
  const url = new URL(request.url);
  const token = clean(url.searchParams.get("token"), 120);
  if (token && env.DB) {
    const hashed = await hash(token);
    const byToken = await env.DB.prepare(
      `SELECT id FROM payment_plans WHERE access_token_hash = ? AND status != 'revoked' LIMIT 1`,
    )
      .bind(hashed)
      .first<{ id: string }>();
    if (byToken) return { planId: byToken.id, accessToken: token };
  }

  const sessionToken = readClientSessionFromCookieHeader(
    request.headers.get("cookie"),
  );
  const session = await verifyClientSessionToken(sessionToken);
  if (session) return { planId: session.planId, accessToken: null as string | null };
  return null;
}
