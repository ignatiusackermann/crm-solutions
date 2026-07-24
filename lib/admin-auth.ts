import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AdminUser = {
  displayName: string;
  email: string;
};

const COOKIE_NAME = "crm_admin_session";
const DEFAULT_ADMIN_EMAIL = "ignatius@crmsolutions.app";

function adminEmail() {
  return (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
}

function sessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "dev-only-change-me"
  );
}

function toBase64Url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

async function hmac(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return toBase64Url(signature);
}

export async function createAdminSessionToken(email: string) {
  const payload = `${email.toLowerCase()}.${Date.now()}`;
  const signature = await hmac(payload);
  return `${payload}.${signature}`;
}

function parseAdminSessionToken(token: string) {
  const parts = token.split(".");
  // Email may contain dots (e.g. ignatius@crmsolutions.app), so parse from the end.
  if (parts.length < 3) return null;
  const signature = parts.pop();
  const issuedAt = parts.pop();
  const email = parts.join(".");
  if (!signature || !issuedAt || !email) return null;
  if (!/^\d+$/.test(issuedAt)) return null;
  return { email, issuedAt, signature };
}

export async function verifyAdminSessionToken(token: string | undefined | null) {
  if (!token) return null;
  const parsed = parseAdminSessionToken(token);
  if (!parsed) return null;
  const { email, issuedAt, signature } = parsed;
  const expected = await hmac(`${email}.${issuedAt}`);
  if (signature !== expected) return null;
  if (email.toLowerCase() !== adminEmail()) return null;
  return {
    email: email.toLowerCase(),
    displayName: email,
  } satisfies AdminUser;
}

export async function getAdminUser(): Promise<AdminUser | null> {
  const jar = await cookies();
  return verifyAdminSessionToken(jar.get(COOKIE_NAME)?.value);
}

export async function requireAdminUser(returnTo = "/admin/payments") {
  const user = await getAdminUser();
  if (user) return user;
  redirect(`/admin/login?return_to=${encodeURIComponent(returnTo)}`);
}

export async function isAdminRequest(request: Request) {
  const headerEmail = request.headers.get("x-admin-email");
  if (headerEmail && headerEmail.toLowerCase() === adminEmail()) {
    return true;
  }

  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!match) return false;
  const token = decodeURIComponent(match.slice(COOKIE_NAME.length + 1));
  return Boolean(await verifyAdminSessionToken(token));
}

export async function validateAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export { COOKIE_NAME, adminEmail };
