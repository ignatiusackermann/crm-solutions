import { isAdminRequest } from "@/lib/admin-auth";
import type { AppEnv } from "@/lib/runtime-env";

type BookingRow = {
  id: string;
  start_utc: string;
  end_utc: string;
  booking_date_sa: string;
  booking_time_sa: string;
  visitor_timezone: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string;
  website: string | null;
  role: string | null;
  message: string;
  source: string;
  status: string;
  email_status: string;
  calendar_status: string;
  google_event_id: string | null;
  meeting_url: string | null;
  created_at: string;
};

const ADMIN_EMAIL_FALLBACK = "ignatius@crmsolutions.app";
const FROM_EMAIL_FALLBACK = "CRM Solutions <bookings@crmsolutions.app>";

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function formatTime(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(iso));
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailShell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f5f2ea;color:#081521;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:32px 16px"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:auto;background:#fff;border-top:5px solid #c75c36"><tr><td style="padding:38px"><p style="margin:0 0 22px;color:#c75c36;font-size:11px;letter-spacing:2px;text-transform:uppercase">CRM Solutions · Discovery Call</p><h1 style="margin:0 0 24px;color:#0b2a55;font-size:30px;line-height:1.2">${title}</h1>${body}<p style="margin:32px 0 0;padding-top:24px;border-top:1px solid #dce3e8;color:#526172;font-size:13px;line-height:1.6">Ignatius Ackermann<br>Founder, CRM Solutions<br><a href="mailto:ignatius@crmsolutions.app" style="color:#123b74">ignatius@crmsolutions.app</a></p></td></tr></table></td></tr></table></body></html>`;
}

async function sendEmail(
  apiKey: string,
  payload: Record<string, unknown>,
  idempotencyKey: string,
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(payload),
  });
  const result = (await response.json().catch(() => ({}))) as {
    id?: string;
    message?: string;
  };
  if (!response.ok) {
    return { error: result.message || `Email service returned ${response.status}` };
  }
  return { id: result.id };
}

async function googleAccessToken(env: AppEnv) {
  if (
    !env.GOOGLE_CLIENT_ID ||
    !env.GOOGLE_CLIENT_SECRET ||
    !env.GOOGLE_REFRESH_TOKEN
  ) {
    return null;
  }
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const token = (await tokenResponse.json()) as {
    access_token?: string;
    error_description?: string;
  };
  if (!tokenResponse.ok || !token.access_token) return null;
  return token.access_token;
}

async function deleteGoogleEvent(env: AppEnv, eventId: string) {
  const accessToken = await googleAccessToken(env);
  if (!accessToken || !env.GOOGLE_CALENDAR_ID) {
    return { ok: false as const, error: "Google Calendar not configured." };
  }
  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(env.GOOGLE_CALENDAR_ID)}/events/${encodeURIComponent(eventId)}`,
  );
  url.searchParams.set("sendUpdates", "all");
  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (response.status === 404 || response.status === 410) {
    return { ok: true as const, alreadyGone: true };
  }
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as {
      error?: { message?: string };
    };
    return {
      ok: false as const,
      error: body.error?.message || `Google delete failed (${response.status})`,
    };
  }
  return { ok: true as const };
}

function mapBooking(row: BookingRow) {
  return {
    id: row.id,
    startUtc: row.start_utc,
    endUtc: row.end_utc,
    bookingDateSa: row.booking_date_sa,
    bookingTimeSa: row.booking_time_sa,
    visitorTimezone: row.visitor_timezone,
    visitorTime: formatTime(row.start_utc, row.visitor_timezone),
    saTime: formatTime(row.start_utc, "Africa/Johannesburg"),
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    website: row.website,
    role: row.role,
    message: row.message,
    source: row.source,
    status: row.status,
    emailStatus: row.email_status,
    calendarStatus: row.calendar_status,
    googleEventId: row.google_event_id,
    meetingUrl: row.meeting_url,
    createdAt: row.created_at,
    isUpcoming: new Date(row.start_utc).getTime() >= Date.now() - 60 * 60 * 1000,
  };
}

export async function handleAdminDiscoveryBookings(request: Request, env: AppEnv) {
  if (!(await isAdminRequest(request))) {
    return json({ error: "Unauthorized." }, 401);
  }
  if (!env.DB) {
    return json({ error: "Database is not configured." }, 503);
  }

  if (request.method === "GET") {
    const result = await env.DB.prepare(
      `SELECT id, start_utc, end_utc, booking_date_sa, booking_time_sa, visitor_timezone,
              first_name, last_name, email, phone, company, website, role, message, source,
              status, email_status, calendar_status, google_event_id, meeting_url, created_at
       FROM discovery_bookings
       ORDER BY start_utc DESC
       LIMIT 200`,
    ).all<BookingRow>();

    const bookings = (result.results || []).map(mapBooking);
    const now = Date.now();
    return json({
      bookings,
      counts: {
        all: bookings.length,
        upcoming: bookings.filter(
          (b) => b.status === "confirmed" && new Date(b.startUtc).getTime() >= now,
        ).length,
        past: bookings.filter(
          (b) => b.status === "confirmed" && new Date(b.startUtc).getTime() < now,
        ).length,
        cancelled: bookings.filter((b) => b.status === "cancelled").length,
      },
    });
  }

  if (request.method === "POST") {
    const body = (await request.json().catch(() => ({}))) as {
      action?: string;
      bookingId?: string;
    };
    if (body.action !== "cancel" || !body.bookingId) {
      return json({ error: "Unsupported action." }, 400);
    }

    const existing = await env.DB.prepare(
      `SELECT id, start_utc, end_utc, booking_date_sa, booking_time_sa, visitor_timezone,
              first_name, last_name, email, phone, company, website, role, message, source,
              status, email_status, calendar_status, google_event_id, meeting_url, created_at
       FROM discovery_bookings WHERE id = ?`,
    )
      .bind(body.bookingId)
      .first<BookingRow>();

    if (!existing) return json({ error: "Booking not found." }, 404);
    if (existing.status === "cancelled") {
      return json({ ok: true, booking: mapBooking(existing), alreadyCancelled: true });
    }

    let calendarNote = "skipped";
    if (existing.google_event_id) {
      const deleted = await deleteGoogleEvent(env, existing.google_event_id);
      calendarNote = deleted.ok ? "deleted" : `failed:${deleted.error}`;
    }

    await env.DB.prepare(
      `UPDATE discovery_bookings
       SET status = 'cancelled', calendar_status = ?
       WHERE id = ?`,
    )
      .bind(calendarNote.startsWith("failed") ? "cancel_failed" : "cancelled", existing.id)
      .run();

    const apiKey = env.RESEND_API_KEY || "";
    const adminEmail = env.DISCOVERY_ADMIN_EMAIL || ADMIN_EMAIL_FALLBACK;
    const from = env.DISCOVERY_FROM_EMAIL || FROM_EMAIL_FALLBACK;
    let cancelEmailStatus = "configuration_required";

    if (apiKey) {
      const visitorTime = formatTime(existing.start_utc, existing.visitor_timezone);
      const saTime = formatTime(existing.start_utc, "Africa/Johannesburg");
      const timeBlock = `<div style="margin:24px 0;padding:22px;background:#f5f2ea;border-left:3px solid #c75c36"><strong style="display:block;color:#0b2a55;font-size:18px">${escapeHtml(visitorTime)}</strong><span style="display:block;margin-top:8px;color:#526172;font-size:13px">South Africa: ${escapeHtml(saTime)}</span></div>`;

      const client = await sendEmail(
        apiKey,
        {
          from,
          to: [existing.email],
          reply_to: adminEmail,
          subject: "Your CRM Solutions Discovery Call has been cancelled",
          html: emailShell(
            `Your Discovery Call was cancelled, ${escapeHtml(existing.first_name)}.`,
            `<p style="color:#526172;line-height:1.7">The appointment below is no longer on Ignatius&apos;s calendar. If you still want to talk, reply to this email or book a new slot.</p>${timeBlock}<p><a href="https://www.crmsolutions.app/book-discovery-call" style="display:inline-block;padding:14px 20px;background:#0b2a55;color:#fff;text-decoration:none">Book a new Discovery Call</a></p>`,
          ),
        },
        `discovery-cancel-client-${existing.id}`,
      );

      const admin = await sendEmail(
        apiKey,
        {
          from,
          to: [adminEmail],
          subject: `Cancelled Discovery Call — ${existing.company}`,
          html: emailShell(
            "A Discovery Call was cancelled from Admin.",
            `${timeBlock}<p style="color:#526172;line-height:1.7">${escapeHtml(existing.first_name)} ${escapeHtml(existing.last_name)} · ${escapeHtml(existing.email)} · ${escapeHtml(existing.company)}</p><p style="color:#526172;font-size:13px">Calendar: ${escapeHtml(calendarNote)}</p>`,
          ),
        },
        `discovery-cancel-admin-${existing.id}`,
      );

      cancelEmailStatus =
        client.id && admin.id ? "sent" : client.error || admin.error || "partial";
    }

    const updated = await env.DB.prepare(
      `SELECT id, start_utc, end_utc, booking_date_sa, booking_time_sa, visitor_timezone,
              first_name, last_name, email, phone, company, website, role, message, source,
              status, email_status, calendar_status, google_event_id, meeting_url, created_at
       FROM discovery_bookings WHERE id = ?`,
    )
      .bind(existing.id)
      .first<BookingRow>();

    return json({
      ok: true,
      booking: updated ? mapBooking(updated) : null,
      cancelEmailStatus,
      calendarNote,
    });
  }

  return json({ error: "Method not allowed." }, 405);
}
