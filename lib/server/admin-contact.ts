import { isAdminRequest } from "@/lib/admin-auth";
import type { AppEnv } from "@/lib/runtime-env";

type ContactRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  source: string;
  status: string;
  created_at: string;
};

const STATUSES = new Set(["new", "replied", "archived"]);

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function mapContact(row: ContactRow) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    message: row.message,
    source: row.source,
    status: row.status,
    createdAt: row.created_at,
    preview:
      row.message.length > 120 ? `${row.message.slice(0, 117).trim()}…` : row.message,
  };
}

export async function handleAdminContact(request: Request, env: AppEnv) {
  if (!(await isAdminRequest(request))) {
    return json({ error: "Unauthorized." }, 401);
  }
  if (!env.DB) {
    return json({ error: "Database is not configured." }, 503);
  }

  if (request.method === "GET") {
    const result = await env.DB.prepare(
      `SELECT id, first_name, last_name, email, phone, company, message, source, status, created_at
       FROM contact_submissions
       ORDER BY created_at DESC
       LIMIT 300`,
    ).all<ContactRow>();

    const contacts = (result.results || []).map(mapContact);
    return json({
      contacts,
      counts: {
        all: contacts.length,
        new: contacts.filter((c) => c.status === "new").length,
        replied: contacts.filter((c) => c.status === "replied").length,
        archived: contacts.filter((c) => c.status === "archived").length,
      },
    });
  }

  if (request.method === "POST") {
    const body = (await request.json().catch(() => ({}))) as {
      action?: string;
      contactId?: string;
      status?: string;
    };

    if (body.action !== "set-status" || !body.contactId || !body.status) {
      return json({ error: "Unsupported action." }, 400);
    }
    if (!STATUSES.has(body.status)) {
      return json({ error: "Invalid status." }, 400);
    }

    const existing = await env.DB.prepare(
      `SELECT id, first_name, last_name, email, phone, company, message, source, status, created_at
       FROM contact_submissions WHERE id = ?`,
    )
      .bind(body.contactId)
      .first<ContactRow>();

    if (!existing) return json({ error: "Enquiry not found." }, 404);

    await env.DB.prepare(
      `UPDATE contact_submissions SET status = ? WHERE id = ?`,
    )
      .bind(body.status, existing.id)
      .run();

    const updated = await env.DB.prepare(
      `SELECT id, first_name, last_name, email, phone, company, message, source, status, created_at
       FROM contact_submissions WHERE id = ?`,
    )
      .bind(existing.id)
      .first<ContactRow>();

    return json({ ok: true, contact: updated ? mapContact(updated) : null });
  }

  return json({ error: "Method not allowed." }, 405);
}
