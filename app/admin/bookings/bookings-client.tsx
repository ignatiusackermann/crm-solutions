"use client";

import { useEffect, useMemo, useState } from "react";

type Booking = {
  id: string;
  startUtc: string;
  visitorTime: string;
  saTime: string;
  bookingDateSa: string;
  bookingTimeSa: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  company: string;
  website: string | null;
  role: string | null;
  message: string;
  source: string;
  status: string;
  emailStatus: string;
  calendarStatus: string;
  meetingUrl: string | null;
  createdAt: string;
  isUpcoming: boolean;
};

type Counts = {
  all: number;
  upcoming: number;
  past: number;
  cancelled: number;
};

type Filter = "upcoming" | "past" | "cancelled" | "all";
type ViewMode = "list" | "calendar";

function monthLabel(year: number, month: number) {
  return new Intl.DateTimeFormat("en-ZA", {
    month: "long",
    year: "numeric",
    timeZone: "Africa/Johannesburg",
  }).format(new Date(Date.UTC(year, month, 1, 12)));
}

function saYmd(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export default function BookingsClient() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [counts, setCounts] = useState<Counts>({
    all: 0,
    upcoming: 0,
    past: 0,
    cancelled: 0,
  });
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [view, setView] = useState<ViewMode>("list");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState("");
  const [notice, setNotice] = useState("");
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  async function load() {
    const r = await fetch("/api/admin/discovery-bookings", { cache: "no-store" });
    const d = (await r.json()) as {
      bookings?: Booking[];
      counts?: Counts;
      error?: string;
    };
    if (!r.ok) throw new Error(d.error || "Bookings could not be loaded.");
    setBookings(d.bookings || []);
    if (d.counts) setCounts(d.counts);
  }

  useEffect(() => {
    load()
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const now = Date.now();
    return bookings.filter((b) => {
      if (filter === "all") return true;
      if (filter === "cancelled") return b.status === "cancelled";
      if (filter === "upcoming") {
        return b.status === "confirmed" && new Date(b.startUtc).getTime() >= now;
      }
      return b.status === "confirmed" && new Date(b.startUtc).getTime() < now;
    });
  }, [bookings, filter]);

  const selected = bookings.find((b) => b.id === selectedId) || null;

  const calendarCells = useMemo(() => {
    const first = new Date(cursor.year, cursor.month, 1);
    const startPad = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
    const cells: Array<{
      key: string;
      day: number | null;
      ymd: string | null;
      items: Booking[];
    }> = [];

    for (let i = 0; i < startPad; i += 1) {
      cells.push({ key: `pad-${i}`, day: null, ymd: null, items: [] });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const ymd = `${cursor.year}-${String(cursor.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const items = bookings.filter(
        (b) => b.status === "confirmed" && saYmd(b.startUtc) === ymd,
      );
      cells.push({ key: ymd, day, ymd, items });
    }
    return cells;
  }, [bookings, cursor]);

  async function cancelBooking(booking: Booking) {
    const ok = window.confirm(
      `Cancel Discovery Call with ${booking.firstName} ${booking.lastName} (${booking.company})?\n\nThis frees the slot and emails the client.`,
    );
    if (!ok) return;
    setCancellingId(booking.id);
    setError("");
    setNotice("");
    try {
      const r = await fetch("/api/admin/discovery-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel", bookingId: booking.id }),
      });
      const d = (await r.json()) as {
        ok?: boolean;
        error?: string;
        cancelEmailStatus?: string;
        calendarNote?: string;
      };
      if (!r.ok || !d.ok) throw new Error(d.error || "Could not cancel booking.");
      setNotice(
        `Cancelled. Email: ${d.cancelEmailStatus || "n/a"} · Calendar: ${d.calendarNote || "n/a"}`,
      );
      await load();
      setSelectedId(booking.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not cancel booking.");
    } finally {
      setCancellingId("");
    }
  }

  return (
    <>
      <section className="admin-intro">
        <div>
          <p className="eyebrow">Discovery Call log</p>
          <h1>
            Bookings Ignatius must honour
            <span>.</span>
          </h1>
        </div>
        <p>
          Public Discovery Calls are confirmed the moment they book (slot blocked + Google
          Calendar + emails). Use this list or calendar to open the brief and cancel when needed —
          cancel frees the hour and emails the prospect.
        </p>
      </section>

      <div className="admin-filter-row">
        {(
          [
            ["upcoming", "Upcoming", counts.upcoming],
            ["past", "Past", counts.past],
            ["cancelled", "Cancelled", counts.cancelled],
            ["all", "All", counts.all],
          ] as const
        ).map(([id, label, count]) => (
          <button
            key={id}
            type="button"
            className={filter === id ? "active" : ""}
            onClick={() => {
              setFilter(id);
              setView("list");
            }}
          >
            {label} <span>{count}</span>
          </button>
        ))}
        <button
          type="button"
          className={view === "calendar" ? "active" : ""}
          onClick={() => setView("calendar")}
        >
          Calendar
        </button>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}
      {notice ? <p className="admin-notice">{notice}</p> : null}

      {loading ? (
        <p className="admin-empty">Loading Discovery Call bookings…</p>
      ) : view === "calendar" ? (
        <div className="admin-calendar">
          <div className="admin-calendar-nav">
            <button
              type="button"
              onClick={() =>
                setCursor((c) => {
                  const d = new Date(c.year, c.month - 1, 1);
                  return { year: d.getFullYear(), month: d.getMonth() };
                })
              }
            >
              Previous
            </button>
            <strong>{monthLabel(cursor.year, cursor.month)}</strong>
            <button
              type="button"
              onClick={() =>
                setCursor((c) => {
                  const d = new Date(c.year, c.month + 1, 1);
                  return { year: d.getFullYear(), month: d.getMonth() };
                })
              }
            >
              Next
            </button>
          </div>
          <div className="admin-calendar-weekdays">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="admin-calendar-grid">
            {calendarCells.map((cell) => (
              <div
                key={cell.key}
                className={`admin-calendar-day${cell.day ? "" : " empty"}${
                  cell.items.length ? " has-bookings" : ""
                }`}
              >
                {cell.day ? <span>{cell.day}</span> : null}
                {cell.items.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={selectedId === b.id ? "selected" : ""}
                    onClick={() => {
                      setSelectedId(b.id);
                      setView("list");
                      setFilter("all");
                    }}
                  >
                    {b.bookingTimeSa} {b.firstName}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <p className="admin-calendar-hint">
            Confirmed calls only (SAST). Click a booking to open the brief and cancel if needed.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="admin-empty">No bookings in this filter.</p>
      ) : (
        <div className="admin-booking-layout">
          <div className="admin-booking-list">
            {filtered.map((b) => (
              <article
                key={b.id}
                className={selectedId === b.id ? "selected" : ""}
                onClick={() => setSelectedId(b.id)}
              >
                <div>
                  <span>{b.status}</span>
                  <strong>
                    {b.firstName} {b.lastName}
                  </strong>
                  <small>{b.company}</small>
                </div>
                <div>
                  <span>Your time (visitor)</span>
                  <strong>{b.visitorTime}</strong>
                  <small>
                    SA {b.bookingDateSa} · {b.bookingTimeSa}
                  </small>
                </div>
                <div>
                  <span>Source</span>
                  <strong>{b.source || "website"}</strong>
                  <small>{b.emailStatus}</small>
                </div>
              </article>
            ))}
          </div>

          <aside className="admin-booking-detail">
            {selected ? (
              <>
                <p className="eyebrow">Call brief</p>
                <h2>
                  {selected.firstName} {selected.lastName}
                </h2>
                <p className="admin-booking-company">{selected.company}</p>
                <dl className="admin-booking-meta">
                  <div>
                    <dt>Visitor time</dt>
                    <dd>{selected.visitorTime}</dd>
                  </div>
                  <div>
                    <dt>South Africa</dt>
                    <dd>{selected.saTime}</dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${selected.email}`}>{selected.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      {selected.phone ? (
                        <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                      ) : (
                        "Not provided"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>{selected.role || "—"}</dd>
                  </div>
                  <div>
                    <dt>Website</dt>
                    <dd>
                      {selected.website ? (
                        <a href={selected.website} target="_blank" rel="noreferrer">
                          {selected.website}
                        </a>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>
                      {selected.status} · email {selected.emailStatus} · calendar{" "}
                      {selected.calendarStatus}
                    </dd>
                  </div>
                  <div>
                    <dt>Meet link</dt>
                    <dd>
                      {selected.meetingUrl ? (
                        <a href={selected.meetingUrl} target="_blank" rel="noreferrer">
                          Open meeting
                        </a>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                </dl>
                <div className="admin-booking-message">
                  <span>What would make this call valuable?</span>
                  <p>{selected.message}</p>
                </div>
                <div className="admin-booking-actions">
                  <a className="button button-primary" href={`mailto:${selected.email}`}>
                    Email prospect
                  </a>
                  {selected.meetingUrl ? (
                    <a
                      className="button"
                      href={selected.meetingUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Join Meet
                    </a>
                  ) : null}
                  {selected.status === "confirmed" ? (
                    <button
                      type="button"
                      className="button button-copper"
                      disabled={cancellingId === selected.id}
                      onClick={() => cancelBooking(selected)}
                    >
                      {cancellingId === selected.id
                        ? "Cancelling…"
                        : "Cancel call + email client"}
                    </button>
                  ) : (
                    <p className="admin-booking-cancelled-note">This booking is cancelled.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="admin-empty" style={{ margin: 0 }}>
                Select a booking to read the brief and cancel if needed.
              </p>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
