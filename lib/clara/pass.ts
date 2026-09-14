/**
 * Clara's conversation pass — server only.
 *
 * /api/gemini-voice-token issues this signed pass alongside the Gemini session
 * token. The callback and transcript endpoints accept only requests carrying a
 * valid pass, so they cannot be used to spam the inbox or the voice log by
 * anyone who has not started a real Clara conversation from this site.
 *
 * Stateless: "<expiry ms>.<nonce>.<HMAC>". Valid a little longer than the
 * 30-minute Gemini session so the end-of-call save still lands. The nonce also
 * keys the voice-log row, so one conversation is one row however many saves.
 *
 * Web Crypto rather than node:crypto, so it runs on any runtime.
 */

const TTL_MS = 35 * 60 * 1000;
const encoder = new TextEncoder();

function secret(): string {
  // Reuses an existing secret so no new environment variable is needed.
  return (
    process.env.CLIENT_SESSION_SECRET?.trim() ||
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.GEMINI_API_KEY?.trim() ||
    ""
  );
}

function base64url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string, key: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(`clara-pass:${payload}`));
  return base64url(new Uint8Array(signature));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) {
    difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return difference === 0;
}

/** A fresh pass, or null when no signing secret is configured. */
export async function issueClaraPass(): Promise<string | null> {
  const key = secret();
  if (!key) return null;
  const nonceBytes = new Uint8Array(9);
  crypto.getRandomValues(nonceBytes);
  const payload = `${Date.now() + TTL_MS}.${base64url(nonceBytes)}`;
  return `${payload}.${await sign(payload, key)}`;
}

/** The pass's nonce if it is genuine and unexpired, otherwise null. */
export async function readClaraPass(pass: unknown): Promise<{ nonce: string } | null> {
  const key = secret();
  if (typeof pass !== "string" || !key || pass.length > 200) return null;
  const parts = pass.split(".");
  if (parts.length !== 3) return null;
  const [expiry, nonce, signature] = parts as [string, string, string];
  if (!constantTimeEqual(signature, await sign(`${expiry}.${nonce}`, key))) return null;
  if (!(Number(expiry) > Date.now())) return null;
  return { nonce };
}
