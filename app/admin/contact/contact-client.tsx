"use client";

import { useEffect, useMemo, useState } from "react";

type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  source: string;
  status: string;
  createdAt: string;
  preview: string;
};

type Counts = { all: number; new: number; replied: number; archived: number };
type Filter = "new" | "replied" | "archived" | "all";

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export default function ContactClient() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [counts, setCounts] = useState<Counts>({
    all: 0,
    new: 0,
    replied: 0,
    archived: 0,
  });
  const [filter, setFilter] = useState<Filter>("new");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState("");
  const [notice, setNotice] = useState("");

  async function load() {
    const r = await fetch("/api/admin/contact", { cache: "no-store" });
    const d = (await r.json()) as {
      contacts?: Contact[];
      counts?: Counts;
      error?: string;
    };
    if (!r.ok) throw new Error(d.error || "Enquiries could not be loaded.");
    setContacts(d.contacts || []);
    if (d.counts) setCounts(d.counts);
  }

  useEffect(() => {
    load()
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return contacts;
    return contacts.filter((c) => c.status === filter);
  }, [contacts, filter]);

  const selected = contacts.find((c) => c.id === selectedId) || null;

  async function setStatus(contact: Contact, status: string) {
    setSavingId(contact.id);
    setError("");
    setNotice("");
    try {
      const r = await fetch("/api/admin/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set-status",
          contactId: contact.id,
          status,
        }),
      });
      const d = (await r.json()) as { ok?: boolean; error?: string };
      if (!r.ok || !d.ok) throw new Error(d.error || "Could not update enquiry.");
      setNotice(`Marked as ${status}.`);
      await load();
      setSelectedId(contact.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update enquiry.");
    } finally {
      setSavingId("");
    }
  }

  return (
    <>
      <section className="admin-intro">
        <div>
          <p className="eyebrow">Contact inbox</p>
          <h1>
            Enquiries from the website
            <span>.</span>
          </h1>
        </div>
        <p>
          Every contact form submission lands here with the full message. Reply by email or
          WhatsApp, then mark handled so nothing sits only in Resend.
        </p>
      </section>

      <div className="admin-filter-row">
        {(
          [
            ["new", "New", counts.new],
            ["replied", "Replied", counts.replied],
            ["archived", "Archived", counts.archived],
            ["all", "All", counts.all],
          ] as const
        ).map(([id, label, count]) => (
          <button
            key={id}
            type="button"
            className={filter === id ? "active" : ""}
            onClick={() => setFilter(id)}
          >
            {label} <span>{count}</span>
          </button>
        ))}
      </div>

      {error ? <p className="admin-error">{error}</p> : null}
      {notice ? <p className="admin-notice">{notice}</p> : null}

      {loading ? (
        <p className="admin-empty">Loading enquiries…</p>
      ) : filtered.length === 0 ? (
        <p className="admin-empty">No enquiries in this filter.</p>
      ) : (
        <div className="admin-booking-layout">
          <div className="admin-booking-list">
            {filtered.map((c) => (
              <article
                key={c.id}
                className={selectedId === c.id ? "selected" : ""}
                onClick={() => setSelectedId(c.id)}
              >
                <div>
                  <span>{c.status}</span>
                  <strong>
                    {c.firstName} {c.lastName}
                  </strong>
                  <small>{c.company || "No company"}</small>
                </div>
                <div>
                  <span>Received</span>
                  <strong>{formatWhen(c.createdAt)}</strong>
                  <small>{c.preview}</small>
                </div>
                <div>
                  <span>Source</span>
                  <strong>{c.source || "website"}</strong>
                  <small>{c.email}</small>
                </div>
              </article>
            ))}
          </div>

          <aside className="admin-booking-detail">
            {selected ? (
              <>
                <p className="eyebrow">Enquiry</p>
                <h2>
                  {selected.firstName} {selected.lastName}
                </h2>
                <p className="admin-booking-company">
                  {selected.company || "No company given"}
                </p>
                <dl className="admin-booking-meta">
                  <div>
                    <dt>Received</dt>
                    <dd>{formatWhen(selected.createdAt)}</dd>
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
                    <dt>Status</dt>
                    <dd>{selected.status}</dd>
                  </div>
                </dl>
                <div className="admin-booking-message">
                  <span>Message</span>
                  <p>{selected.message}</p>
                </div>
                <div className="admin-booking-actions">
                  <a
                    className="button button-primary"
                    href={`mailto:${selected.email}?subject=${encodeURIComponent(
                      `Re: your message to CRM Solutions`,
                    )}`}
                  >
                    Email reply
                  </a>
                  {selected.phone ? (
                    <a
                      className="button"
                      href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>
                  ) : null}
                  {selected.status !== "replied" ? (
                    <button
                      type="button"
                      className="button button-copper"
                      disabled={savingId === selected.id}
                      onClick={() => setStatus(selected, "replied")}
                    >
                      {savingId === selected.id ? "Saving…" : "Mark replied"}
                    </button>
                  ) : null}
                  {selected.status !== "archived" ? (
                    <button
                      type="button"
                      className="button"
                      disabled={savingId === selected.id}
                      onClick={() => setStatus(selected, "archived")}
                    >
                      Archive
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="button"
                      disabled={savingId === selected.id}
                      onClick={() => setStatus(selected, "new")}
                    >
                      Restore to new
                    </button>
                  )}
                </div>
              </>
            ) : (
              <p className="admin-empty" style={{ margin: 0 }}>
                Select an enquiry to read the full message.
              </p>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
