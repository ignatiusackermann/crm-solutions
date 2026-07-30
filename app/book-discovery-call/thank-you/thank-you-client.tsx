"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DISCOVERY_BOOKING_STORAGE_KEY } from "../booking-storage";

export type ConfirmedBooking = {
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

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function makeIcs(booking: ConfirmedBooking) {
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
    booking.meetingUrl
      ? `LOCATION:${safe(booking.meetingUrl)}`
      : "LOCATION:Online — joining details to follow",
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

export default function ThankYouClient() {
  const [booking, setBooking] = useState<ConfirmedBooking | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DISCOVERY_BOOKING_STORAGE_KEY);
      if (raw) {
        setBooking(JSON.parse(raw) as ConfirmedBooking);
      }
    } catch {
      setBooking(null);
    }
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <section className="thank-you-hero section-shell" aria-busy="true">
        <p className="eyebrow">Discovery Call</p>
        <h1>
          Confirming your call
          <span>.</span>
        </h1>
      </section>
    );
  }

  if (!booking) {
    return (
      <section className="thank-you-hero section-shell">
        <div>
          <p className="eyebrow">Discovery Call</p>
          <h1>
            Looking for your confirmation
            <span>?</span>
          </h1>
        </div>
        <div className="thank-you-panel">
          <p>
            Open this page after completing a booking, or check your email for the confirmation
            from CRM Solutions.
          </p>
          <div className="thank-you-actions">
            <Link className="button button-copper" href="/book-discovery-call">
              Book a Discovery Call <Arrow />
            </Link>
            <Link className="thank-you-secondary" href="/contact">
              Contact Ignatius
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const emailCopy =
    booking.emailStatus === "scheduled"
      ? `A confirmation has been sent to ${booking.email}, and Ignatius has been notified.`
      : booking.calendarStatus === "created"
        ? `A Google Calendar invitation with the Meet link has been sent to ${booking.email}.`
        : `Your appointment is reserved. Please add it to your calendar below so the time is secured.`;

  return (
    <section className="thank-you-hero section-shell" aria-live="polite">
      <div>
        <p className="eyebrow">Discovery Call reserved</p>
        <h1>
          Thank you, {booking.firstName}
          <span>.</span>
        </h1>
        <p className="thank-you-lede">Your 60-minute call with Ignatius is confirmed.</p>
      </div>
      <div className="thank-you-panel">
        <div className="thank-you-time">
          <span>Your time</span>
          <strong>{booking.visitorTime}</strong>
          <small>South Africa: {booking.saTime}</small>
        </div>
        <p className="thank-you-copy">{emailCopy}</p>
        <div className="thank-you-actions">
          <a
            className="button button-copper"
            href={booking.googleCalendarUrl}
            target="_blank"
            rel="noreferrer"
          >
            Add to Google Calendar <Arrow />
          </a>
          <button className="thank-you-secondary" type="button" onClick={() => makeIcs(booking)}>
            Download calendar file
          </button>
        </div>
        <p className="thank-you-note">
          {booking.emailStatus === "scheduled"
            ? "You will receive a reminder 24 hours before the meeting."
            : "A reminder will follow once email delivery is confirmed."}
          {booking.meetingUrl
            ? " Your joining link is included in the confirmation."
            : " Joining details will follow from Ignatius."}
        </p>
      </div>
    </section>
  );
}
