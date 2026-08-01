import { isAdminRequest } from "@/lib/admin-auth";
import type { AppEnv } from "@/lib/runtime-env";

type VoiceRow = {
  id: string;
  occurred_at: string;
  channel: string;
  direction: string;
  outcome: string;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  company: string | null;
  summary: string;
  notes: string | null;
  source: string;
  created_at: string;
  updated_at: string | null;
};

const CHANNELS = new Set(["phone", "whatsapp", "meet", "gemini", "other"]);
const DIRECTIONS = new Set(["inbound", "outbound"]);
const OUTCOMES = new Set([
  "answered",
  "missed",
  "voicemail",
  "callback",
  "booked",
  "other",
]);

const clean = (v: unknown, n: number) =>
  typeof v === "string" ? v.trim().slice(0, n) : "";

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function mapVoice(row: VoiceRow) {
  return {
    id: row.id,
    occurredAt: row.occurred_at,
    channel: row.channel,
    direction: row.direction,
    outcome: row.outcome,
    contactName: row.contact_name,
    phone: row.phone,
    email: row.email,
    company: row.company,
    summary: row.summary,
    notes: row.notes,
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function handleAdminVoiceCalls(request: Request, env: AppEnv) {
  if (!(await isAdminRequest(request))) {
    return json({ error: "Unauthorized." }, 401);
  }
  if (!env.DB) {
    return json({ error: "Database is not configured." }, 503);
  }

  if (request.method === "GET") {
    try {
      const result = await env.DB.prepare(
        `SELECT id, occurred_at, channel, direction, outcome, contact_name, phone, email,
                company, summary, notes, source, created_at, updated_at
         FROM voice_call_log
         ORDER BY occurred_at DESC
         LIMIT 300`,
      ).all<VoiceRow>();

      const calls = (result.results || []).map(mapVoice);
      return json({
        calls,
        counts: {
          all: calls.length,
          missed: calls.filter((c) => c.outcome === "missed").length,
          answered: calls.filter((c) => c.outcome === "answered").length,
          callback: calls.filter((c) => c.outcome === "callback").length,
          voicemail: calls.filter((c) => c.outcome === "voicemail").length,
        },
      });
    } catch (error) {
      console.error("voice_call_log select failed", error);
      return json(
        {
          error:
            "Voice log table is missing. Run supabase/migration-admin-ops.sql in Supabase SQL Editor.",
        },
        503,
      );
    }
  }

  if (request.method === "POST") {
    const body = (await request.json().catch(() => ({}))) as {
      action?: string;
      callId?: string;
      occurredAt?: string;
      channel?: string;
      direction?: string;
      outcome?: string;
      contactName?: string;
      phone?: string;
      email?: string;
      company?: string;
      summary?: string;
      notes?: string;
    };

    if (body.action === "create") {
      const occurredAt = clean(body.occurredAt, 40) || new Date().toISOString();
      const channel = clean(body.channel, 40) || "phone";
      const direction = clean(body.direction, 40) || "inbound";
      const outcome = clean(body.outcome, 40) || "answered";
      const summary = clean(body.summary, 2000);
      const contactName = clean(body.contactName, 140);
      const phone = clean(body.phone, 60);
      const email = clean(body.email, 160).toLowerCase();
      const company = clean(body.company, 140);
      const notes = clean(body.notes, 4000);

      if (!CHANNELS.has(channel) || !DIRECTIONS.has(direction) || !OUTCOMES.has(outcome)) {
        return json({ error: "Invalid channel, direction, or outcome." }, 400);
      }
      if (!summary) {
        return json({ error: "Add a short summary for this call." }, 400);
      }
      if (Number.isNaN(Date.parse(occurredAt))) {
        return json({ error: "Invalid call date/time." }, 400);
      }

      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      await env.DB.prepare(
        `INSERT INTO voice_call_log
          (id, occurred_at, channel, direction, outcome, contact_name, phone, email,
           company, summary, notes, source, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'admin', ?, NULL)`,
      )
        .bind(
          id,
          new Date(occurredAt).toISOString(),
          channel,
          direction,
          outcome,
          contactName || null,
          phone || null,
          email || null,
          company || null,
          summary,
          notes || null,
          now,
        )
        .run();

      const created = await env.DB.prepare(
        `SELECT id, occurred_at, channel, direction, outcome, contact_name, phone, email,
                company, summary, notes, source, created_at, updated_at
         FROM voice_call_log WHERE id = ?`,
      )
        .bind(id)
        .first<VoiceRow>();

      return json({ ok: true, call: created ? mapVoice(created) : null }, 201);
    }

    if (body.action === "update" && body.callId) {
      const existing = await env.DB.prepare(
        `SELECT id, occurred_at, channel, direction, outcome, contact_name, phone, email,
                company, summary, notes, source, created_at, updated_at
         FROM voice_call_log WHERE id = ?`,
      )
        .bind(body.callId)
        .first<VoiceRow>();
      if (!existing) return json({ error: "Call not found." }, 404);

      const channel = clean(body.channel, 40) || existing.channel;
      const direction = clean(body.direction, 40) || existing.direction;
      const outcome = clean(body.outcome, 40) || existing.outcome;
      const summary = clean(body.summary, 2000) || existing.summary;
      const occurredAt =
        clean(body.occurredAt, 40) || existing.occurred_at;

      if (!CHANNELS.has(channel) || !DIRECTIONS.has(direction) || !OUTCOMES.has(outcome)) {
        return json({ error: "Invalid channel, direction, or outcome." }, 400);
      }
      if (Number.isNaN(Date.parse(occurredAt))) {
        return json({ error: "Invalid call date/time." }, 400);
      }

      const now = new Date().toISOString();
      await env.DB.prepare(
        `UPDATE voice_call_log
         SET occurred_at = ?, channel = ?, direction = ?, outcome = ?,
             contact_name = ?, phone = ?, email = ?, company = ?,
             summary = ?, notes = ?, updated_at = ?
         WHERE id = ?`,
      )
        .bind(
          new Date(occurredAt).toISOString(),
          channel,
          direction,
          outcome,
          clean(body.contactName, 140) || null,
          clean(body.phone, 60) || null,
          clean(body.email, 160).toLowerCase() || null,
          clean(body.company, 140) || null,
          summary,
          clean(body.notes, 4000) || null,
          now,
          existing.id,
        )
        .run();

      const updated = await env.DB.prepare(
        `SELECT id, occurred_at, channel, direction, outcome, contact_name, phone, email,
                company, summary, notes, source, created_at, updated_at
         FROM voice_call_log WHERE id = ?`,
      )
        .bind(existing.id)
        .first<VoiceRow>();

      return json({ ok: true, call: updated ? mapVoice(updated) : null });
    }

    if (body.action === "delete" && body.callId) {
      await env.DB.prepare(`DELETE FROM voice_call_log WHERE id = ?`)
        .bind(body.callId)
        .run();
      return json({ ok: true });
    }

    return json({ error: "Unsupported action." }, 400);
  }

  return json({ error: "Method not allowed." }, 405);
}
