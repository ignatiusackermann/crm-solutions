import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  adminEmail,
  createAdminSessionToken,
  validateAdminPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { password?: string; returnTo?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password = String(body.password || "");
  const returnTo =
    typeof body.returnTo === "string" && body.returnTo.startsWith("/")
      ? body.returnTo
      : "/admin/payments";

  if (!(await validateAdminPassword(password))) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Administrator password is not configured." },
      { status: 503 },
    );
  }

  const token = await createAdminSessionToken(adminEmail());
  const response = NextResponse.json({ ok: true, redirectTo: returnTo });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
