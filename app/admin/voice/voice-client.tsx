"use client";

import { useEffect, useMemo, useState } from "react";

type VoiceCall = {
  id: string;
  occurredAt: string;
  channel: string;
  direction: string;
  outcome: string;
  contactName: string | null;
  phone: string | null;
  email: string | null;
  company: string | null;
  summary: string;
  notes: string | null;
  source: string;
  createdAt: string;
};

type Counts = {
  all: number;
  missed: number;
  answered: number;
  callback: number;
  voicemail: number;
};

type Filter = "all" | "missed" | "answered" | "callback" | "voicemail";

type FormState = {
  occurredAt: string;
  channel: string;
  direction: string;
  outcome: string;
  contactName: string;
  phone: string;
  email: string;
  company: string;
  summary: string;
  notes: string;
};

const emptyForm = (): FormState => ({
  occurredAt: new Date().toISOString().slice(0, 16),
  channel: "phone",
  direction: "inbound",
  outcome: "missed",
  contactName: "",
  phone: "",
  email: "",
  company: "",
  summary: "",
  notes: "",
});

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export default function VoiceClient() {
  const [calls, setCalls] = useState<VoiceCall[]>([]);
  const [counts, setCounts] = useState<Counts>({
    all: 0,
    missed: 0,
    answered: 0,
    callback: 0,
    voicemail: 0,
  });
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [showForm, setShowForm] = useState(true);

  async function load() {
    const r = await fetch("/api/admin/voice-calls", { cache: "no-store" });
    const d = (await r.json()) as {
      calls?: VoiceCall[];
      counts?: Counts;
      error?: string;
    };
    if (!r.ok) throw new Error(d.error || "Voice log could not be loaded.");
    setCalls(d.calls || []);
    if (d.counts) setCounts(d.counts);
  }

  useEffect(() => {
    load()
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return calls;
    return calls.filter((c) => c.outcome === filter);
  }, [calls, filter]);

  const selected = calls.find((c) => c.id === selectedId) || null;

  function field<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function createCall(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const r = await fetch("/api/admin/voice-calls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          occurredAt: new Date(form.occurredAt).toISOString(),
          channel: form.channel,
          direction: form.direction,
          outcome: form.outcome,
          contactName: form.contactName,
          phone: form.phone,
          email: form.email,
          company: form.company,
          summary: form.summary,
          notes: form.notes,
        }),
      });
      const d = (await r.json()) as {
        ok?: boolean;
        call?: VoiceCall;
        error?: string;
      };
      if (!r.ok || !d.ok) throw new Error(d.error || "Could not save call.");
      setNotice(
        d.call?.outcome === "missed"
          ? "Missed call logged. Follow up when you can."
          : "Call logged.",
      );
      setForm(emptyForm());
      await load();
      if (d.call) setSelectedId(d.call.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save call.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteCall(call: VoiceCall) {
    const ok = window.confirm(`Delete voice log for ${call.contactName || call.phone || "this call"}?`);
    if (!ok) return;
    setSaving(true);
    setError("");
    try {
      const r = await fetch("/api/admin/voice-calls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", callId: call.id }),
      });
      const d = (await r.json()) as { ok?: boolean; error?: string };
      if (!r.ok || !d.ok) throw new Error(d.error || "Could not delete call.");
      setSelectedId(null);
      setNotice("Call removed from the log.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete call.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <section className="admin-intro">
        <div>
          <p className="eyebrow">Voice register</p>
          <h1>
            Calls and missed calls
            <span>.</span>
          </h1>
        </div>
        <p>
          Log every phone, WhatsApp, Meet or Gemini conversation — especially missed inbound
          calls — until telephony webhooks can write them automatically.
        </p>
      </section>

      <div className="admin-filter-row">
        {(
          [
            ["all", "All", counts.all],
            ["missed", "Missed", counts.missed],
            ["answered", "Answered", counts.answered],
            ["callback", "Callback", counts.callback],
            ["voicemail", "Voicemail", counts.voicemail],
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
        <button type="button" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Hide form" : "Log a call"}
        </button>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}
      {notice ? <p className="admin-notice">{notice}</p> : null}

      {showForm ? (
        <form className="generator-form admin-voice-form" onSubmit={createCall}>
          <fieldset>
            <legend>
              <span>01</span> Log call or missed call
            </legend>
            <div className="generator-grid">
              <label>
                <span>When</span>
                <input
                  type="datetime-local"
                  value={form.occurredAt}
                  onChange={(e) => field("occurredAt", e.target.value)}
                  required
                />
              </label>
              <label>
                <span>Outcome</span>
                <select
                  value={form.outcome}
                  onChange={(e) => field("outcome", e.target.value)}
                >
                  <option value="missed">Missed</option>
                  <option value="answered">Answered</option>
                  <option value="voicemail">Voicemail</option>
                  <option value="callback">Needs callback</option>
                  <option value="booked">Led to booking</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                <span>Channel</span>
                <select
                  value={form.channel}
                  onChange={(e) => field("channel", e.target.value)}
                >
                  <option value="phone">Phone</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="meet">Google Meet</option>
                  <option value="gemini">Gemini advisor</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                <span>Direction</span>
                <select
                  value={form.direction}
                  onChange={(e) => field("direction", e.target.value)}
                >
                  <option value="inbound">Inbound</option>
                  <option value="outbound">Outbound</option>
                </select>
              </label>
              <label>
                <span>Contact name</span>
                <input
                  value={form.contactName}
                  onChange={(e) => field("contactName", e.target.value)}
                  placeholder="Optional"
                />
              </label>
              <label>
                <span>Phone</span>
                <input
                  value={form.phone}
                  onChange={(e) => field("phone", e.target.value)}
                  placeholder="+27…"
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => field("email", e.target.value)}
                />
              </label>
              <label>
                <span>Company</span>
                <input
                  value={form.company}
                  onChange={(e) => field("company", e.target.value)}
                />
              </label>
              <label style={{ gridColumn: "1 / -1" }}>
                <span>Summary</span>
                <input
                  value={form.summary}
                  onChange={(e) => field("summary", e.target.value)}
                  placeholder="What happened / what they needed"
                  required
                />
              </label>
              <label style={{ gridColumn: "1 / -1" }}>
                <span>Notes</span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => field("notes", e.target.value)}
                  placeholder="Follow-up actions, context, tone"
                />
              </label>
            </div>
          </fieldset>
          <div className="generator-submit">
            <p>
              Tip: log missed calls the moment you notice them. Later, Twilio (or similar) can
              write the same rows via webhook.
            </p>
            <button className="button button-primary" type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save to voice log"}
            </button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <p className="admin-empty">Loading voice log…</p>
      ) : filtered.length === 0 ? (
        <p className="admin-empty">No calls in this filter yet.</p>
      ) : (
        <div className="admin-booking-layout" style={{ marginTop: 28 }}>
          <div className="admin-booking-list">
            {filtered.map((c) => (
              <article
                key={c.id}
                className={selectedId === c.id ? "selected" : ""}
                onClick={() => setSelectedId(c.id)}
              >
                <div>
                  <span>{c.outcome}</span>
                  <strong>{c.contactName || c.phone || "Unknown caller"}</strong>
                  <small>{c.company || c.channel}</small>
                </div>
                <div>
                  <span>When</span>
                  <strong>{formatWhen(c.occurredAt)}</strong>
                  <small>
                    {c.direction} · {c.channel}
                  </small>
                </div>
                <div>
                  <span>Summary</span>
                  <strong>{c.summary.slice(0, 48)}{c.summary.length > 48 ? "…" : ""}</strong>
                  <small>{c.source}</small>
                </div>
              </article>
            ))}
          </div>

          <aside className="admin-booking-detail">
            {selected ? (
              <>
                <p className="eyebrow">Call detail</p>
                <h2>{selected.contactName || "Unknown caller"}</h2>
                <p className="admin-booking-company">
                  {selected.outcome} · {selected.direction} {selected.channel}
                </p>
                <dl className="admin-booking-meta">
                  <div>
                    <dt>When</dt>
                    <dd>{formatWhen(selected.occurredAt)}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      {selected.phone ? (
                        <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>
                      {selected.email ? (
                        <a href={`mailto:${selected.email}`}>{selected.email}</a>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Company</dt>
                    <dd>{selected.company || "—"}</dd>
                  </div>
                </dl>
                <div className="admin-booking-message">
                  <span>Summary</span>
                  <p>{selected.summary}</p>
                </div>
                {selected.notes ? (
                  <div className="admin-booking-message">
                    <span>Notes</span>
                    <p>{selected.notes}</p>
                  </div>
                ) : null}
                <div className="admin-booking-actions">
                  {selected.phone ? (
                    <a className="button button-primary" href={`tel:${selected.phone}`}>
                      Call back
                    </a>
                  ) : null}
                  <button
                    type="button"
                    className="button button-copper"
                    disabled={saving}
                    onClick={() => deleteCall(selected)}
                  >
                    Delete log entry
                  </button>
                </div>
              </>
            ) : (
              <p className="admin-empty" style={{ margin: 0 }}>
                Select a call to review notes and callbacks.
              </p>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
