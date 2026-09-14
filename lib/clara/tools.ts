/**
 * Clara's tools — what Gemini can call mid-conversation: open, scroll and read
 * site pages, check Discovery Call availability, book the call, and request a
 * callback. Ported from Niki (Star Aesthetic, 11 Sept 2026).
 *
 * Booking goes through the SAME endpoint as the /book-discovery-call page
 * (/api/discovery-bookings), so Clara and the page share one diary, one
 * double-booking guard, the same slot, lead-time and public-holiday rules, the
 * same confirmation emails and the same Google Calendar event. There is no
 * second booking path.
 *
 * Client-safe: no React, no server imports. Every network call goes through
 * ctx.fetchImpl when given, so the logic can be exercised without a browser.
 */
import { Type, type FunctionDeclaration } from "@google/genai";

export const CLARA_ROUTES = {
  home: "/",
  platform: "/revenue-platform",
  audit: "/revenue-leak-audit",
  work: "/#work",
  lava: "/work/lava-sa",
  star: "/work/star-aesthetic",
  storvac: "/work/storvac",
  discovery: "/book-discovery-call",
  accountants: "/for-accounting-practices",
  returningCustomer: "/value-of-returning-customer",
  returningGuest: "/value-of-a-returning-guest",
  about: "/ignatius-ackermann",
  contact: "/contact",
  payments: "/payment-options",
  commitment: "/delivery-commitment",
  terms: "/terms-and-conditions",
  privacy: "/privacy-policy",
  cookies: "/cookie-policy",
} as const;

const ALLOWED_PATHS = new Set<string>(Object.values(CLARA_ROUTES).map((route) => route.split("#")[0] ?? route));

export function routeIsAllowed(route: string): boolean {
  if (!route.startsWith("/") || route.startsWith("//")) return false;
  return ALLOWED_PATHS.has(route.split("#")[0] ?? route);
}

export type Availability = { dates: string[]; slots: string[]; booked: string[] };

export type ClaraBooking = {
  date: string; // YYYY-MM-DD, South African booking day
  time: string; // HH:00, South African time
  saTime: string;
  visitorTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
};

export type ClaraCallback = { name: string; phone: string; email: string };

const SA_OFFSET = "+02:00";
const DAY_MS = 24 * 60 * 60 * 1000;
const CONTACT_NUMBER = "076 180 9799";
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "Tuesday 15 September" — how Clara should say a booking day. */
export function spokenDate(date: string): string {
  const day = new Date(`${date}T12:00:00Z`);
  return `${WEEKDAYS[day.getUTCDay()] ?? ""} ${day.getUTCDate()} ${MONTHS[day.getUTCMonth()] ?? ""}`;
}

/** "09:00" → "9 AM", "14:00" → "2 PM". */
export function sayTime(time: string): string {
  const hour = Number(time.slice(0, 2));
  const twelveHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelveHour} ${hour >= 12 ? "PM" : "AM"}`;
}

/** "10:00", "10 AM", "2pm", "14:00" → "10:00" / "14:00". Null if unreadable. */
export function normaliseTime(raw: string): string | null {
  const match = raw.trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)?$/);
  if (!match) return null;
  let hour = parseInt(match[1] ?? "", 10);
  if (match[3]?.startsWith("p") && hour < 12) hour += 12;
  if (match[3]?.startsWith("a") && hour === 12) hour = 0;
  if (!Number.isFinite(hour) || hour < 0 || hour > 23) return null;
  return `${String(hour).padStart(2, "0")}:00`;
}

function slotStartMs(date: string, time: string): number {
  return Date.parse(`${date}T${time}:00${SA_OFFSET}`);
}

/** Open start times on one day: not booked, and at least 24 hours away. */
export function openTimes(availability: Availability, date: string, now = Date.now()): string[] {
  const booked = new Set(
    availability.booked
      .filter((value) => !Number.isNaN(Date.parse(value)))
      .map((value) => new Date(value).toISOString()),
  );
  return availability.slots.filter((time) => {
    const start = slotStartMs(date, time);
    return Number.isFinite(start) && start - now >= DAY_MS && !booked.has(new Date(start).toISOString());
  });
}

/**
 * The bookable days as a lookup table for the system prompt. Models get
 * weekday arithmetic wrong; a table means "next Tuesday" is resolved by
 * reading, not by counting (a Niki lesson).
 */
export function calendarText(availability: Availability | null, now = Date.now()): string {
  const todaySa = new Date(now + 2 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const today = `Today in South Africa is ${spokenDate(todaySa)} ${todaySa.slice(0, 4)}.`;
  if (!availability?.dates?.length) {
    return `${today}\nThe live calendar could not be loaded. Always call check_availability before offering any time.`;
  }
  const lines = availability.dates.map((date) => `- ${spokenDate(date)} ${date.slice(0, 4)} = ${date}`);
  return `${today}
Bookable Discovery Call days (weekdays only; South African public holidays excluded):
${lines.join("\n")}
Start times, South African time (SAST, UTC+2): ${availability.slots.map(sayTime).join(", ")}.`;
}

export const CLARA_TOOLS: FunctionDeclaration[] = [
  {
    name: "navigate_to",
    description: "Open an approved CRM Solutions page for the visitor. The voice call carries on while the page changes.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        route: {
          type: Type.STRING,
          description: `One exact route from: ${Object.values(CLARA_ROUTES).join(", ")}`,
        },
      },
      required: ["route"],
    },
  },
  {
    name: "scroll_to_section",
    description: "Bring a relevant section of the current page into view.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        subject: { type: Type.STRING, description: "The visible heading or subject to bring into view." },
      },
      required: ["subject"],
    },
  },
  {
    name: "read_site_page",
    description: "Read the published text of an approved page before explaining it.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        route: { type: Type.STRING, description: "An exact approved CRM Solutions route." },
      },
      required: ["route"],
    },
  },
  {
    name: "check_availability",
    description:
      "Look up live Discovery Call availability. With a date, returns that day's open start times; if that day " +
      "cannot be booked or is full, returns the next days with openings. Without a date, returns the next " +
      "available days. Always call this before offering times.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        date: { type: Type.STRING, description: "Optional. The day as YYYY-MM-DD, taken from the booking calendar." },
      },
    },
  },
  {
    name: "book_discovery_call",
    description:
      "Book the 60-minute Discovery Call with Ignatius. Call ONLY after reading the day, time, full name, email " +
      "and company back to the visitor and hearing a clear yes. Call it once.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        date: { type: Type.STRING, description: "YYYY-MM-DD, a day check_availability returned." },
        time: {
          type: Type.STRING,
          description: "Start time in 24-hour HH:00 South African time, e.g. 09:00 or 14:00. Must be a time check_availability returned.",
        },
        first_name: { type: Type.STRING, description: "The visitor's first name." },
        last_name: { type: Type.STRING, description: "The visitor's surname." },
        email: { type: Type.STRING, description: "Email address exactly as confirmed with the visitor." },
        company: { type: Type.STRING, description: "The visitor's business or company name." },
        topic: {
          type: Type.STRING,
          description: "What would make the call valuable, in the visitor's own words, in one or two sentences.",
        },
        phone: { type: Type.STRING, description: "Optional. Phone number as confirmed with the visitor." },
        website: { type: Type.STRING, description: "Optional. Their website address, if they gave one." },
        role: { type: Type.STRING, description: "Optional. Their role in the business, if they said." },
      },
      required: ["date", "time", "first_name", "last_name", "email", "company", "topic"],
    },
  },
  {
    name: "request_callback",
    description:
      "Ask Ignatius to phone the visitor back. Emails him immediately. Call it ONCE, only after the visitor " +
      "agreed to a callback and you have confirmed their name and phone number with them.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "The visitor's name." },
        phone: { type: Type.STRING, description: "Phone number as confirmed with the visitor." },
        email: { type: Type.STRING, description: "Optional. Email, only if they gave one." },
        company: { type: Type.STRING, description: "Optional. Their business name." },
        preferred_time: {
          type: Type.STRING,
          description: "When they would like the call, in their words, e.g. 'weekday mornings'.",
        },
        topic: { type: Type.STRING, description: "What they want to discuss." },
      },
      required: ["name", "phone", "topic"],
    },
  },
];

export type ClaraToolContext = {
  /** Signed conversation pass from /api/gemini-voice-token. */
  pass?: string;
  /** The visitor's IANA timezone, sent with the booking. */
  timezone: string;
  alreadyBooked: ClaraBooking[];
  callbackSent: { current: boolean };
  navigate: (route: string) => void;
  scroll: (subject: string) => boolean;
  readPage: (route: string) => Promise<Record<string, unknown>>;
  transcript: () => string[];
  page: () => string;
  fetchImpl?: typeof fetch;
  now?: () => number;
};

export type ClaraToolResult = {
  response: Record<string, unknown>;
  booking?: ClaraBooking;
  callback?: ClaraCallback;
};

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function loadAvailability(ctx: ClaraToolContext): Promise<Availability> {
  const response = await (ctx.fetchImpl ?? fetch)("/api/discovery-bookings", { cache: "no-store" });
  const data = (await response.json().catch(() => ({}))) as Partial<Availability> & { error?: string };
  if (!response.ok || !Array.isArray(data.dates) || !Array.isArray(data.slots)) {
    throw new Error(data.error || `Availability returned ${response.status}`);
  }
  return { dates: data.dates, slots: data.slots, booked: Array.isArray(data.booked) ? data.booked : [] };
}

function visitorLocal(date: string, time: string, timezone: string): string | null {
  if (!timezone || timezone === "Africa/Johannesburg") return null;
  try {
    const local = new Intl.DateTimeFormat("en-ZA", {
      timeZone: timezone,
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(slotStartMs(date, time)));
    return `${local} (${timezone})`;
  } catch {
    return null;
  }
}

function describeDay(date: string, times: string[], ctx: ClaraToolContext) {
  return {
    date,
    day: spokenDate(date),
    open_times: times.map((time) => {
      const local = visitorLocal(date, time, ctx.timezone);
      return { time, say_as: `${sayTime(time)} South African time`, ...(local ? { visitor_local: local } : {}) };
    }),
  };
}

async function checkAvailability(args: Record<string, unknown>, ctx: ClaraToolContext): Promise<ClaraToolResult> {
  const availability = await loadAvailability(ctx);
  const now = (ctx.now ?? Date.now)();
  const days = availability.dates
    .map((date) => ({ date, times: openTimes(availability, date, now) }))
    .filter((day) => day.times.length > 0);

  if (!days.length) {
    return {
      response: {
        ok: false,
        error: "no_openings",
        message: "There are no Discovery Call openings in the coming weeks. Offer request_callback instead.",
      },
    };
  }

  const requested = text(args.date, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(requested)) {
    const match = days.find((day) => day.date === requested);
    if (match) return { response: { ok: true, ...describeDay(match.date, match.times, ctx) } };

    const reason = availability.dates.includes(requested)
      ? "that day is fully booked, or its remaining times are less than 24 hours away"
      : "that day cannot be booked: calls are on weekdays only, not on South African public holidays, at least 24 hours ahead and within the next three weeks";
    const later = days.filter((day) => day.date > requested).slice(0, 3);
    return {
      response: {
        ok: true,
        requested_date_available: false,
        reason,
        next_available: (later.length ? later : days.slice(0, 3)).map((day) => describeDay(day.date, day.times, ctx)),
      },
    };
  }

  return { response: { ok: true, next_available: days.slice(0, 3).map((day) => describeDay(day.date, day.times, ctx)) } };
}

async function bookDiscoveryCall(args: Record<string, unknown>, ctx: ClaraToolContext): Promise<ClaraToolResult> {
  const date = text(args.date, 10);
  const time = normaliseTime(text(args.time, 12));
  const firstName = text(args.first_name, 80);
  const lastName = text(args.last_name, 80);
  const email = text(args.email, 160).replace(/\s+/g, "").toLowerCase();
  const company = text(args.company, 140);
  const topic = text(args.topic, 1800);
  const phone = text(args.phone, 60);
  const website = text(args.website, 240);
  const role = text(args.role, 120);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !time) {
    return {
      response: {
        ok: false,
        error: "invalid_time",
        message: "The date must be YYYY-MM-DD and the time a start time such as 09:00 or 14:00 that check_availability returned.",
      },
    };
  }
  if (!firstName || !lastName || !company || !topic || !validEmail(email)) {
    return {
      response: {
        ok: false,
        error: "missing_details",
        message:
          "A first name, surname, valid email, company name and what would make the call valuable are all needed. " +
          "Ask for whichever is missing and confirm it.",
      },
    };
  }

  // The model occasionally repeats a tool call. Never place the same booking twice.
  const same = ctx.alreadyBooked.find((booking) => booking.date === date && booking.time === time);
  if (same) {
    return {
      response: {
        ok: true,
        already_booked: true,
        day: spokenDate(date),
        time: `${sayTime(time)} South African time`,
        message: "This exact booking already went through. Do not book again; confirm it with the visitor.",
      },
    };
  }
  // One Discovery Call per conversation. A second is almost always the model
  // misreading a repeated call as a failure.
  const existing = ctx.alreadyBooked[0];
  if (existing) {
    return {
      response: {
        ok: false,
        error: "already_booked_this_conversation",
        existing_day: spokenDate(existing.date),
        existing_time: `${sayTime(existing.time)} South African time`,
        message:
          "A Discovery Call is already booked in this conversation. Do NOT book another. Remind them of it; " +
          "if they need a different time they can reply to the confirmation email.",
      },
    };
  }

  const response = await (ctx.fetchImpl ?? fetch)("/api/discovery-bookings", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      date,
      time,
      timezone: ctx.timezone || "Africa/Johannesburg",
      firstName,
      lastName,
      email,
      phone,
      company,
      website,
      role,
      message: topic,
      source: "clara-voice",
      websiteTrap: "",
    }),
  });
  const data = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    booking?: { saTime?: string; visitorTime?: string };
  };

  if (response.status === 409) {
    return {
      response: {
        ok: false,
        error: "slot_taken",
        message: "Someone has just taken that time. Apologise briefly, call check_availability again and offer other times.",
      },
    };
  }
  if (response.status === 400) {
    return {
      response: {
        ok: false,
        error: data.error || "The booking details were not accepted.",
        message: "Explain the problem in plain words and fix it with the visitor. If it was about the time, check availability again.",
      },
    };
  }
  if (!response.ok || !data.ok || !data.booking) {
    return {
      response: {
        ok: false,
        error: data.error || "The booking system did not respond.",
        message:
          "Do not retry. Apologise briefly and offer to open the booking page (/book-discovery-call) so they can " +
          "finish in a few taps, or offer a callback.",
      },
    };
  }

  const booking: ClaraBooking = {
    date,
    time,
    saTime: data.booking.saTime || `${spokenDate(date)}, ${sayTime(time)} South African time`,
    visitorTime: data.booking.visitorTime || "",
    firstName,
    lastName,
    email,
    phone,
    company,
  };
  const local = visitorLocal(date, time, ctx.timezone);
  return {
    booking,
    response: {
      ok: true,
      booked: true,
      day: spokenDate(date),
      time: `${sayTime(time)} South African time`,
      ...(local ? { visitor_local: local } : {}),
      confirmation_email_sent_to: email,
      next_step:
        "A confirmation email with the calendar details is on its way and Ignatius has been notified. " +
        "A reminder follows 24 hours before the call.",
    },
  };
}

async function requestCallback(args: Record<string, unknown>, ctx: ClaraToolContext): Promise<ClaraToolResult> {
  if (ctx.callbackSent.current) {
    return {
      response: { ok: true, already_requested: true, message: "The callback request already went through. Do not send it again." },
    };
  }
  const name = text(args.name, 120);
  const phone = text(args.phone, 40);
  if (!name || phone.replace(/\D/g, "").length < 9) {
    return {
      response: {
        ok: false,
        error: "missing_details",
        message: "A name and a full phone number are needed. Confirm them with the visitor.",
      },
    };
  }
  const unavailable = {
    response: {
      ok: false,
      message: `The request did not go through. Give the number ${CONTACT_NUMBER}, or offer to open the contact page (/contact).`,
    },
  };
  if (!ctx.pass) return unavailable;

  const email = text(args.email, 160).replace(/\s+/g, "").toLowerCase();
  const response = await (ctx.fetchImpl ?? fetch)("/api/clara-callback", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      pass: ctx.pass,
      name,
      phone,
      email,
      company: text(args.company, 140),
      preferredTime: text(args.preferred_time, 200),
      topic: text(args.topic, 600),
      page: ctx.page(),
      transcript: ctx.transcript().join("\n").slice(-8000),
    }),
  });
  if (!response.ok) return unavailable;

  ctx.callbackSent.current = true;
  return {
    callback: { name, phone, email },
    response: { ok: true, message: "Ignatius has been emailed and will phone them. Tell the visitor he will be in touch." },
  };
}

export async function runClaraTool(
  name: string | undefined,
  args: Record<string, unknown> | undefined,
  ctx: ClaraToolContext,
): Promise<ClaraToolResult> {
  const input = args ?? {};
  try {
    if (name === "navigate_to") {
      const route = text(input.route, 200);
      if (!routeIsAllowed(route)) return { response: { success: false, error: "That route is not approved." } };
      ctx.navigate(route);
      return { response: { success: true, route, message: "The approved page is opening." } };
    }
    if (name === "scroll_to_section") {
      const subject = text(input.subject, 200);
      const found = ctx.scroll(subject);
      return {
        response: {
          success: found,
          subject,
          message: found ? "The relevant section is in view." : "No matching section was found.",
        },
      };
    }
    if (name === "read_site_page") {
      const route = text(input.route, 200) || ctx.page();
      if (!routeIsAllowed(route)) return { response: { success: false, error: "That route is not approved." } };
      return { response: await ctx.readPage(route) };
    }
    if (name === "check_availability") return await checkAvailability(input, ctx);
    if (name === "book_discovery_call") return await bookDiscoveryCall(input, ctx);
    if (name === "request_callback") return await requestCallback(input, ctx);
    return { response: { success: false, error: "Unknown tool." } };
  } catch (error) {
    console.error("Clara tool error", error);
    return {
      response: {
        ok: false,
        error: "The booking calendar could not be reached.",
        message:
          "Apologise briefly. Offer to open the booking page (/book-discovery-call), or confirm their name and " +
          "number and call request_callback.",
      },
    };
  }
}
