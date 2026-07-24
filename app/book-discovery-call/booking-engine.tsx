"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Availability = {
  dates: string[];
  slots: string[];
  booked: string[];
  baseTimezone: string;
  durationMinutes: number;
  emailReady: boolean;
};

type Booking = {
  id: string;
  startUtc: string;
  endUtc: string;
  visitorTimezone: string;
  visitorTime: string;
  saTime: string;
  company: string;
  firstName: string;
  email: string;
  googleCalendarUrl: string;
  emailStatus: string;
  calendarStatus: string;
  meetingUrl: string | null;
};

const commonTimezones = [
  ["America/New_York", "Eastern Time"],
  ["America/Chicago", "Central Time"],
  ["America/Denver", "Mountain Time"],
  ["America/Los_Angeles", "Pacific Time"],
  ["Africa/Johannesburg", "South Africa"],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function localDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00+02:00`);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(localDateTime(date, "12:00"));
}

function formatSlot(date: string, time: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(localDateTime(date, time));
}

function longSelection(date: string, time: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(localDateTime(date, time));
}

function makeIcs(booking: Booking) {
  const stamp = (iso: string) => iso.replaceAll("-", "").replaceAll(":", "").replace(".000", "");
  const safe = (value: string) =>
    value.replaceAll("\\", "\\\\").replaceAll(",", "\\,").replaceAll(";", "\\;").replaceAll("\n", "\\n");
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CRM Solutions//Discovery Call//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${booking.id}@crmsolutions.app`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(booking.startUtc)}`,
    `DTEND:${stamp(booking.endUtc)}`,
    "SUMMARY:CRM Solutions Discovery Call",
    `DESCRIPTION:${safe("Discovery Call with Ignatius Ackermann, CRM Solutions.")}`,
    booking.meetingUrl ? `LOCATION:${safe(booking.meetingUrl)}` : "LOCATION:Online — joining details to follow",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = "crm-solutions-discovery-call.ics";
  link.click();
  URL.revokeObjectURL(href);
}

export default function BookingEngine() {
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York",
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetch("/api/discovery-bookings", { cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as Availability & { error?: string };
        if (!response.ok) throw new Error(data.error || "Availability could not be loaded.");
        setAvailability(data);
      })
      .catch((error: Error) => setLoadError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const booked = useMemo(() => new Set(availability?.booked || []), [availability]);
  const selectedLocal = date && time ? longSelection(date, time, timezone) : "";
  const selectedSa = date && time ? longSelection(date, time, "Africa/Johannesburg") : "";

  function chooseDate(value: string) {
    setDate(value);
    setTime("");
    setStep(2);
    setSubmitError("");
  }

  function chooseTime(value: string) {
    setTime(value);
    setStep(3);
    setSubmitError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date || !time) return;
    setSubmitting(true);
    setSubmitError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/discovery-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          date,
          time,
          timezone,
          source: new URLSearchParams(window.location.search).get("source") || "website",
        }),
      });
      const data = (await response.json()) as { booking?: Booking; error?: string };
      if (!response.ok || !data.booking) throw new Error(data.error || "The booking could not be completed.");
      setBooking(data.booking);
      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "The booking could not be completed.");
      if (/already|choose another/i.test(error instanceof Error ? error.message : "")) {
        setStep(2);
        fetch("/api/discovery-bookings", { cache: "no-store" })
          .then((response) => response.json())
          .then((data: Availability) => setAvailability(data))
          .catch(() => undefined);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <section className="booking-workspace">
        <div className="booking-loading" aria-live="polite">
          <i />
          <p>Checking the next available Discovery Call times…</p>
        </div>
      </section>
    );
  }

  if (loadError || !availability) {
    return (
      <section className="booking-workspace">
        <div className="booking-unavailable">
          <p className="eyebrow eyebrow-light">Availability temporarily unavailable</p>
          <h2>Please contact Ignatius directly.</h2>
          <p>{loadError}</p>
          <a className="text-link text-link-light" href="/contact">
            Contact Ignatius <Arrow />
          </a>
        </div>
      </section>
    );
  }

  if (booking) {
    return (
      <section className="booking-workspace booking-confirmed" aria-live="polite">
        <div className="booking-confirmation">
          <div className="confirmation-mark" aria-hidden="true">✓</div>
          <p className="eyebrow eyebrow-light">Discovery Call reserved</p>
          <h2>Thank you, {booking.firstName}.<br />Your call is confirmed.</h2>
          <div className="confirmation-time">
            <span>Your time</span>
            <strong>{booking.visitorTime}</strong>
            <small>South Africa: {booking.saTime}</small>
          </div>
          {booking.emailStatus === "scheduled" ? (
            <p className="confirmation-copy">
              A confirmation has been sent to <strong>{booking.email}</strong>, and Ignatius has been notified.
            </p>
          ) : booking.calendarStatus === "created" ? (
            <p className="confirmation-copy">
              A Google Calendar invitation with the Meet link has been sent to <strong>{booking.email}</strong>.
            </p>
          ) : (
            <p className="confirmation-copy">
              The appointment is securely reserved. Email delivery is awaiting final activation, so please
              download the calendar file below for this test booking.
            </p>
          )}
          <div className="confirmation-actions">
            <a className="button button-copper" href={booking.googleCalendarUrl} target="_blank" rel="noreferrer">
              Add to Google Calendar <Arrow />
            </a>
            <button className="result-secondary" type="button" onClick={() => makeIcs(booking)}>
              Download calendar file
            </button>
          </div>
          <p className="confirmation-note">
            {booking.emailStatus === "scheduled"
              ? "You will receive a reminder 24 hours before the meeting."
              : "The 24-hour reminder will activate with the email-delivery connection."}
            {booking.meetingUrl ? " Your joining link is included in the confirmation." : " Joining details will follow from Ignatius."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="booking-workspace" id="booking">
      <div className="booking-shell section-shell">
        <aside className="booking-progress" aria-label="Booking progress">
          <p>Book your call</p>
          <ol>
            {[
              ["01", "Select date"],
              ["02", "Select time"],
              ["03", "Your details"],
              ["04", "Confirmation"],
            ].map(([number, label], index) => {
              const itemStep = index + 1;
              return (
                <li className={step === itemStep ? "current" : step > itemStep ? "complete" : ""} key={number}>
                  <button
                    type="button"
                    disabled={itemStep >= step || itemStep === 4}
                    onClick={() => setStep(itemStep)}
                  >
                    <span>{step > itemStep ? "✓" : number}</span>
                    <b>{label}</b>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="booking-promise">
            <span>60 minutes · Online</span>
            <p>No sales theatre. A focused conversation about the commercial problem, the numbers and the right next step.</p>
          </div>
        </aside>

        <div className="booking-panel">
          <div className="timezone-row">
            <div>
              <span>Times shown in</span>
              <strong>{commonTimezones.find(([value]) => value === timezone)?.[1] || timezone.replaceAll("_", " ")}</strong>
            </div>
            <label>
              <span className="sr-only">Change timezone</span>
              <select value={timezone} onChange={(event) => setTimezone(event.target.value)}>
                {!commonTimezones.some(([value]) => value === timezone) && (
                  <option value={timezone}>{timezone.replaceAll("_", " ")}</option>
                )}
                {commonTimezones.map(([value, label]) => (
                  <option value={value} key={value}>{label}</option>
                ))}
              </select>
            </label>
          </div>

          {step === 1 && (
            <div className="booking-step">
              <div className="booking-step-heading">
                <span>01 / Date</span>
                <h2>Choose a workday.</h2>
                <p>Available Monday to Friday. Dates are shown for the South African booking day; your exact local time appears next.</p>
              </div>
              <div className="date-grid">
                {availability.dates.map((item) => {
                  const [weekday, rest] = formatDate(item).split(", ");
                  return (
                    <button className={date === item ? "selected" : ""} type="button" key={item} onClick={() => chooseDate(item)}>
                      <span>{weekday}</span>
                      <strong>{rest}</strong>
                      <i aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && date && (
            <div className="booking-step">
              <div className="booking-step-heading">
                <span>02 / Time</span>
                <h2>Choose your local time.</h2>
                <p>{formatDate(date)} · Three one-hour appointments</p>
              </div>
              <div className="time-grid">
                {availability.slots.map((slot) => {
                  const startIso = localDateTime(date, slot).toISOString();
                  const unavailable = booked.has(startIso);
                  return (
                    <button
                      className={time === slot ? "selected" : ""}
                      type="button"
                      key={slot}
                      disabled={unavailable}
                      onClick={() => chooseTime(slot)}
                    >
                      <span>Your time</span>
                      <strong>{formatSlot(date, slot, timezone)}</strong>
                      <small>South Africa {formatSlot(date, slot, "Africa/Johannesburg")}</small>
                      <i>{unavailable ? "Booked" : "Available"}</i>
                    </button>
                  );
                })}
              </div>
              <button className="booking-back" type="button" onClick={() => setStep(1)}>← Choose another date</button>
            </div>
          )}

          {step === 3 && date && time && (
            <form className="booking-step booking-form" onSubmit={submit}>
              <div className="booking-step-heading">
                <span>03 / Contact details</span>
                <h2>Tell me who I am meeting.</h2>
                <p>Your selected time: <strong>{selectedLocal}</strong></p>
              </div>
              <div className="selected-time-card">
                <span>Your time</span><b>{selectedLocal}</b>
                <small>South Africa: {selectedSa}</small>
                <button type="button" onClick={() => setStep(2)}>Change</button>
              </div>
              <div className="form-grid">
                <label>
                  <span>First name *</span>
                  <input name="firstName" autoComplete="given-name" required />
                </label>
                <label>
                  <span>Last name *</span>
                  <input name="lastName" autoComplete="family-name" required />
                </label>
                <label>
                  <span>Business email *</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  <span>Phone / WhatsApp</span>
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  <span>Company *</span>
                  <input name="company" autoComplete="organization" required />
                </label>
                <label>
                  <span>Your role</span>
                  <input name="role" autoComplete="organization-title" />
                </label>
                <label className="form-wide">
                  <span>Website</span>
                  <input name="website" type="url" placeholder="https://" inputMode="url" />
                </label>
                <label className="form-wide">
                  <span>What would make this call valuable? *</span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Briefly describe the commercial problem, current constraint or decision you want to make."
                  />
                </label>
                <label className="website-trap" aria-hidden="true">
                  <span>Leave blank</span>
                  <input name="websiteTrap" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              {submitError && <p className="booking-error" role="alert">{submitError}</p>}
              {!availability.emailReady && (
                <p className="booking-setup-note">
                  Booking email activation is being completed. Your appointment will still be securely reserved.
                </p>
              )}
              <div className="booking-submit-row">
                <button className="booking-back" type="button" onClick={() => setStep(2)}>← Back to times</button>
                <button className="button button-copper" type="submit" disabled={submitting}>
                  {submitting ? "Reserving your call…" : "Confirm Discovery Call"} <Arrow />
                </button>
              </div>
              <p className="booking-consent">By booking, you agree that CRM Solutions may contact you about this Discovery Call. Your details are not sold or shared.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
