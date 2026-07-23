const SLOT_HOURS = [14, 15, 16] as const;
const SA_OFFSET = "+02:00";
const ADMIN_EMAIL_FALLBACK = "ignatius@crmsolutions.app";
const FROM_EMAIL_FALLBACK = "CRM Solutions <bookings@crmsolutions.app>";

type BookingRequest = {
  date?: string;
  time?: string;
  timezone?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  role?: string;
  message?: string;
  source?: string;
  websiteTrap?: string;
};

type MailResult = { id?: string; error?: string };

export type DiscoveryEnv = {
  DB: D1Database;
  RESEND_API_KEY?: string;
  DISCOVERY_ADMIN_EMAIL?: string;
  DISCOVERY_FROM_EMAIL?: string;
  DISCOVERY_MEETING_URL?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_REFRESH_TOKEN?: string;
  GOOGLE_CALENDAR_ID?: string;
};

type GoogleEventResult = { eventId?: string; meetingUrl?: string; error?: string };

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function slotStart(date: string, time: string) {
  return new Date(`${date}T${time}:00${SA_OFFSET}`);
}

function isAllowedSlot(date: string, time: string) {
  if (!validDate(date) || !/^\d{2}:00$/.test(time)) return false;
  const hour = Number(time.slice(0, 2));
  if (!SLOT_HOURS.includes(hour as (typeof SLOT_HOURS)[number])) return false;
  const start = slotStart(date, time);
  const day = start.getUTCDay();
  return !Number.isNaN(start.getTime()) && day >= 1 && day <= 5;
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

function nextBusinessDates(count = 15) {
  const now = new Date();
  const saNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const cursor = new Date(
    Date.UTC(saNow.getUTCFullYear(), saNow.getUTCMonth(), saNow.getUTCDate(), 12),
  );
  const dates: string[] = [];

  while (dates.length < count) {
    const date = cursor.toISOString().slice(0, 10);
    const day = cursor.getUTCDay();
    const hasFutureSlot = SLOT_HOURS.some((hour) => {
      const start = slotStart(date, `${String(hour).padStart(2, "0")}:00`);
      return start.getTime() - now.getTime() >= 24 * 60 * 60 * 1000;
    });
    if (day >= 1 && day <= 5 && hasFutureSlot) dates.push(date);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return dates;
}

function calendarLinks(startIso: string, endIso: string, meetingUrl: string) {
  const stamp = (iso: string) => iso.replaceAll("-", "").replaceAll(":", "").replace(".000", "");
  const dates = `${stamp(startIso)}/${stamp(endIso)}`;
  const details = "Discovery Call with Ignatius Ackermann, CRM Solutions.";
  const google = new URL("https://calendar.google.com/calendar/render");
  google.searchParams.set("action", "TEMPLATE");
  google.searchParams.set("text", "CRM Solutions Discovery Call");
  google.searchParams.set("dates", dates);
  google.searchParams.set("details", details);
  if (meetingUrl) google.searchParams.set("location", meetingUrl);
  return { google: google.toString() };
}

async function sendEmail(
  apiKey: string,
  payload: Record<string, unknown>,
  idempotencyKey: string,
): Promise<MailResult> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(payload),
  });
  const result = (await response.json().catch(() => ({}))) as { id?: string; message?: string };
  if (!response.ok) return { error: result.message || `Email service returned ${response.status}` };
  return { id: result.id };
}

function googleReady(env: DiscoveryEnv) {
  return Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.GOOGLE_REFRESH_TOKEN && env.GOOGLE_CALENDAR_ID);
}

async function createGoogleEvent(env: DiscoveryEnv, booking: {
  id:string; startIso:string; endIso:string; firstName:string; lastName:string;
  email:string; company:string; phone:string; website:string; message:string;
}): Promise<GoogleEventResult> {
  if (!googleReady(env)) return {};
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body:new URLSearchParams({client_id:env.GOOGLE_CLIENT_ID||"",client_secret:env.GOOGLE_CLIENT_SECRET||"",refresh_token:env.GOOGLE_REFRESH_TOKEN||"",grant_type:"refresh_token"}),
  });
  const token = await tokenResponse.json() as {access_token?:string;error_description?:string};
  if(!tokenResponse.ok||!token.access_token)return {error:token.error_description||"Google authentication failed."};
  const url=new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(env.GOOGLE_CALENDAR_ID||"primary")}/events`);
  url.searchParams.set("conferenceDataVersion","1");url.searchParams.set("sendUpdates","all");
  const response=await fetch(url.toString(),{method:"POST",headers:{Authorization:`Bearer ${token.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({
    summary:`CRM Solutions Discovery Call — ${booking.company}`,
    description:[`Discovery Call with ${booking.firstName} ${booking.lastName}`,`Company: ${booking.company}`,booking.phone?`Phone: ${booking.phone}`:"",booking.website?`Website: ${booking.website}`:"","Discussion:",booking.message].filter(Boolean).join("\n"),
    start:{dateTime:booking.startIso,timeZone:"Africa/Johannesburg"},end:{dateTime:booking.endIso,timeZone:"Africa/Johannesburg"},
    attendees:[{email:booking.email,displayName:`${booking.firstName} ${booking.lastName}`}],
    conferenceData:{createRequest:{requestId:`crm-discovery-${booking.id}`,conferenceSolutionKey:{type:"hangoutsMeet"}}},
    guestsCanInviteOthers:false,guestsCanModify:false,guestsCanSeeOtherGuests:false,
  })});
  const event=await response.json() as {id?:string;hangoutLink?:string;error?:{message?:string};conferenceData?:{entryPoints?:Array<{entryPointType?:string;uri?:string}>}};
  if(!response.ok||!event.id)return {error:event.error?.message||"Google Calendar event creation failed."};
  return {eventId:event.id,meetingUrl:event.hangoutLink||event.conferenceData?.entryPoints?.find(x=>x.entryPointType==="video")?.uri};
}

function emailShell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f5f2ea;color:#081521;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:32px 16px"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:auto;background:#fff;border-top:5px solid #c75c36"><tr><td style="padding:38px"><p style="margin:0 0 22px;color:#c75c36;font-size:11px;letter-spacing:2px;text-transform:uppercase">CRM Solutions · Discovery Call</p><h1 style="margin:0 0 24px;color:#0b2a55;font-size:30px;line-height:1.2">${title}</h1>${body}<p style="margin:32px 0 0;padding-top:24px;border-top:1px solid #dce3e8;color:#526172;font-size:13px;line-height:1.6">Ignatius Ackermann<br>Founder, CRM Solutions<br><a href="mailto:ignatius@crmsolutions.app" style="color:#123b74">ignatius@crmsolutions.app</a></p></td></tr></table></td></tr></table></body></html>`;
}

async function getAvailability(env: DiscoveryEnv) {
  if (!env.DB) return json({ error: "Booking storage is not available." }, 503);
  const dates = nextBusinessDates();
  const first = `${dates[0]}T00:00:00.000Z`;
  const last = `${dates[dates.length - 1]}T23:59:59.999Z`;
  const result = await env.DB.prepare(
    "SELECT start_utc FROM discovery_bookings WHERE status = 'confirmed' AND start_utc BETWEEN ? AND ?",
  )
    .bind(first, last)
    .all<{ start_utc: string }>();

  return json({
    dates,
    slots: SLOT_HOURS.map((hour) => `${String(hour).padStart(2, "0")}:00`),
    booked: result.results.map((row) => row.start_utc),
    baseTimezone: "Africa/Johannesburg",
    durationMinutes: 60,
    emailReady: Boolean(env.RESEND_API_KEY),
  });
}

async function createBooking(request: Request, env: DiscoveryEnv) {
  if (!env.DB) return json({ error: "Booking storage is not available." }, 503);

  let input: BookingRequest;
  try {
    input = (await request.json()) as BookingRequest;
  } catch {
    return json({ error: "Please check the form and try again." }, 400);
  }

  if (clean(input.websiteTrap, 100)) return json({ ok: true });

  const date = clean(input.date, 10);
  const time = clean(input.time, 5);
  const timezone = clean(input.timezone, 80) || "America/New_York";
  const firstName = clean(input.firstName, 80);
  const lastName = clean(input.lastName, 80);
  const email = clean(input.email, 160).toLowerCase();
  const phone = clean(input.phone, 60);
  const company = clean(input.company, 140);
  const website = clean(input.website, 240);
  const role = clean(input.role, 120);
  const message = clean(input.message, 1800);
  const source = clean(input.source, 80) || "website";

  if (
    !isAllowedSlot(date, time) ||
    !firstName ||
    !lastName ||
    !company ||
    !message ||
    !validEmail(email)
  ) {
    return json({ error: "Please complete all required details and choose an available time." }, 400);
  }

  const start = slotStart(date, time);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const minimum = Date.now() + 24 * 60 * 60 * 1000;
  const maximum = Date.now() + 70 * 24 * 60 * 60 * 1000;
  if (start.getTime() < minimum || start.getTime() > maximum) {
    return json({ error: "Please choose a slot at least 24 hours ahead." }, 400);
  }

  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone }).format(start);
  } catch {
    return json({ error: "Please choose a valid timezone." }, 400);
  }

  const id = crypto.randomUUID();
  const startIso = start.toISOString();
  const endIso = end.toISOString();
  const createdAt = new Date().toISOString();

  try {
    await env.DB.prepare(
      `INSERT INTO discovery_bookings
      (id, start_utc, end_utc, booking_date_sa, booking_time_sa, visitor_timezone,
       first_name, last_name, email, phone, company, website, role, message, source,
       status, email_status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', 'pending', ?)`,
    )
      .bind(
        id,
        startIso,
        endIso,
        date,
        time,
        timezone,
        firstName,
        lastName,
        email,
        phone || null,
        company,
        website || null,
        role || null,
        message,
        source,
        createdAt,
      )
      .run();
  } catch (error) {
    const text = error instanceof Error ? error.message : "";
    if (/unique|constraint/i.test(text)) {
      return json({ error: "That time has just been booked. Please choose another slot." }, 409);
    }
    return json({ error: "We could not reserve that time. Please try again." }, 500);
  }

  const googleEvent: GoogleEventResult = await createGoogleEvent(env,{id,startIso,endIso,firstName,lastName,email,company,phone,website,message}).catch((error:Error)=>({error:error.message}));
  const apiKey = env.RESEND_API_KEY || "";
  const adminEmail = env.DISCOVERY_ADMIN_EMAIL || ADMIN_EMAIL_FALLBACK;
  const from = env.DISCOVERY_FROM_EMAIL || FROM_EMAIL_FALLBACK;
  const meetingUrl = googleEvent.meetingUrl || env.DISCOVERY_MEETING_URL || "";
  const visitorTime = formatTime(startIso, timezone);
  const saTime = formatTime(startIso, "Africa/Johannesburg");
  const links = calendarLinks(startIso, endIso, meetingUrl);
  let emailStatus = "configuration_required";
  let clientEmailId: string | null = null;
  let adminEmailId: string | null = null;
  let reminderEmailId: string | null = null;

  if (apiKey) {
    const timeBlock = `<div style="margin:24px 0;padding:22px;background:#f5f2ea;border-left:3px solid #c75c36"><strong style="display:block;color:#0b2a55;font-size:18px">${escapeHtml(visitorTime)}</strong><span style="display:block;margin-top:8px;color:#526172;font-size:13px">South Africa: ${escapeHtml(saTime)}</span></div>`;
    const meetingBlock = meetingUrl
      ? `<p style="margin:18px 0"><a href="${escapeHtml(meetingUrl)}" style="display:inline-block;padding:14px 20px;background:#0b2a55;color:#fff;text-decoration:none">Join the Discovery Call</a></p>`
      : `<p style="color:#526172;line-height:1.65">Joining details will be sent by Ignatius before the meeting.</p>`;
    const client = await sendEmail(
      apiKey,
      {
        from,
        to: [email],
        reply_to: adminEmail,
        subject: "Your CRM Solutions Discovery Call is confirmed",
        html: emailShell(
          `Your call is booked, ${escapeHtml(firstName)}.`,
          `<p style="color:#526172;line-height:1.7">Thank you. Your 60-minute Discovery Call with Ignatius Ackermann is reserved.</p>${timeBlock}${meetingBlock}<p><a href="${escapeHtml(links.google)}" style="color:#123b74">Add to Google Calendar</a></p><p style="color:#526172;line-height:1.7">You will receive a reminder 24 hours before the call.</p>`,
        ),
      },
      `discovery-client-${id}`,
    );

    const admin = await sendEmail(
      apiKey,
      {
        from,
        to: [adminEmail],
        reply_to: email,
        subject: `New Discovery Call — ${company} — ${date} ${time} SAST`,
        html: emailShell(
          "A new Discovery Call has been booked.",
          `${timeBlock}<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px"><tr><td style="border-bottom:1px solid #dce3e8;color:#526172">Contact</td><td style="border-bottom:1px solid #dce3e8">${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr><tr><td style="border-bottom:1px solid #dce3e8;color:#526172">Company</td><td style="border-bottom:1px solid #dce3e8">${escapeHtml(company)}</td></tr><tr><td style="border-bottom:1px solid #dce3e8;color:#526172">Email</td><td style="border-bottom:1px solid #dce3e8">${escapeHtml(email)}</td></tr><tr><td style="border-bottom:1px solid #dce3e8;color:#526172">Phone</td><td style="border-bottom:1px solid #dce3e8">${escapeHtml(phone || "Not provided")}</td></tr><tr><td style="border-bottom:1px solid #dce3e8;color:#526172">Website</td><td style="border-bottom:1px solid #dce3e8">${escapeHtml(website || "Not provided")}</td></tr><tr><td style="vertical-align:top;color:#526172">Discussion</td><td>${escapeHtml(message).replaceAll("\n", "<br>")}</td></tr></table>`,
        ),
      },
      `discovery-admin-${id}`,
    );

    const reminderAt = new Date(start.getTime() - 24 * 60 * 60 * 1000);
    const reminder = await sendEmail(
      apiKey,
      {
        from,
        to: [email],
        reply_to: adminEmail,
        subject: "Reminder: your CRM Solutions Discovery Call is tomorrow",
        scheduled_at: reminderAt.toISOString(),
        html: emailShell(
          `Your Discovery Call is tomorrow, ${escapeHtml(firstName)}.`,
          `<p style="color:#526172;line-height:1.7">A quick reminder that your 60-minute call with Ignatius Ackermann begins in 24 hours.</p>${timeBlock}${meetingBlock}`,
        ),
      },
      `discovery-reminder-${id}`,
    );

    clientEmailId = client.id || null;
    adminEmailId = admin.id || null;
    reminderEmailId = reminder.id || null;
    emailStatus = [client, admin, reminder].every((result) => result.id) ? "scheduled" : "partial";
  }

  await env.DB.prepare(
    `UPDATE discovery_bookings
     SET email_status = ?, client_email_id = ?, admin_email_id = ?, reminder_email_id = ?,
         calendar_status = ?, google_event_id = ?, meeting_url = ?
     WHERE id = ?`,
  )
    .bind(emailStatus,clientEmailId,adminEmailId,reminderEmailId,googleEvent.eventId?"created":googleReady(env)?"failed":"configuration_required",googleEvent.eventId||null,meetingUrl||null,id)
    .run();

  return json({
    ok: true,
    booking: {
      id,
      startUtc: startIso,
      endUtc: endIso,
      visitorTimezone: timezone,
      visitorTime,
      saTime,
      company,
      firstName,
      email,
      googleCalendarUrl: links.google,
      emailStatus,
      calendarStatus: googleEvent.eventId ? "created" : googleReady(env) ? "failed" : "configuration_required",
      meetingUrl: meetingUrl || null,
    },
  });
}

export async function handleDiscoveryBookings(request: Request, env: DiscoveryEnv) {
  if (request.method === "GET") return getAvailability(env);
  if (request.method === "POST") return createBooking(request, env);
  return json({ error: "Method not allowed." }, 405);
}
