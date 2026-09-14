import { getSqlDatabase } from "@/lib/sql";

/**
 * Keeps the Supabase free-plan project from pausing, and doubles as a database
 * health check.
 *
 * Supabase pauses a free project after 7 days without activity. A paused
 * database is easy to miss: availability still loads (its query errors are
 * swallowed) while every booking fails. Vercel Cron calls this route twice a
 * week (see vercel.json), which keeps the project well inside that window.
 *
 * It reads one row from a real table rather than running `SELECT 1`, so the
 * request counts as genuine database activity and a missing table shows up as
 * 42P01. Only a status and the five-character Postgres SQLSTATE are returned —
 * never data, never the database message.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store" };

export async function GET() {
  const db = getSqlDatabase();
  if (!db) {
    return Response.json({ ok: false, database: "not configured" }, { status: 503, headers });
  }

  const started = Date.now();
  try {
    await db.prepare("SELECT 1 FROM discovery_bookings LIMIT 1").all();
    return Response.json(
      { ok: true, database: "up", ms: Date.now() - started, checkedAt: new Date().toISOString() },
      { headers },
    );
  } catch (error) {
    console.error("keep-alive database check failed", error);
    const code = (error as { code?: unknown })?.code;
    return Response.json(
      {
        ok: false,
        database: "down",
        ref: typeof code === "string" && /^[0-9A-Z_]{5,20}$/.test(code) ? code : null,
        checkedAt: new Date().toISOString(),
      },
      { status: 503, headers },
    );
  }
}
