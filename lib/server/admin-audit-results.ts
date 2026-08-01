import { isAdminRequest } from "@/lib/admin-auth";
import type { AppEnv } from "@/lib/runtime-env";

type AuditRow = {
  id: string;
  email: string;
  overall: number;
  band_title: string | null;
  band_copy: string | null;
  summary: string;
  priorities_json: string | null;
  source: string;
  created_at: string;
};

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function mapAudit(row: AuditRow) {
  let priorities: unknown[] = [];
  if (row.priorities_json) {
    try {
      const parsed = JSON.parse(row.priorities_json) as unknown;
      priorities = Array.isArray(parsed) ? parsed : [];
    } catch {
      priorities = [];
    }
  }
  return {
    id: row.id,
    email: row.email,
    overall: row.overall,
    bandTitle: row.band_title,
    bandCopy: row.band_copy,
    summary: row.summary,
    priorities,
    source: row.source,
    createdAt: row.created_at,
  };
}

export async function handleAdminAuditResults(request: Request, env: AppEnv) {
  if (!(await isAdminRequest(request))) {
    return json({ error: "Unauthorized." }, 401);
  }
  if (!env.DB) {
    return json({ error: "Database is not configured." }, 503);
  }

  if (request.method !== "GET") {
    return json({ error: "Method not allowed." }, 405);
  }

  try {
    const result = await env.DB.prepare(
      `SELECT id, email, overall, band_title, band_copy, summary, priorities_json, source, created_at
       FROM audit_results
       ORDER BY created_at DESC
       LIMIT 300`,
    ).all<AuditRow>();

    const audits = (result.results || []).map(mapAudit);
    return json({
      audits,
      counts: {
        all: audits.length,
        critical: audits.filter((a) => a.overall < 50).length,
        watch: audits.filter((a) => a.overall >= 50 && a.overall < 75).length,
        strong: audits.filter((a) => a.overall >= 75).length,
      },
    });
  } catch (error) {
    console.error("audit_results select failed", error);
    return json(
      {
        error:
          "Audit results table is missing. Run supabase/migration-admin-ops.sql in Supabase SQL Editor.",
      },
      503,
    );
  }
}
