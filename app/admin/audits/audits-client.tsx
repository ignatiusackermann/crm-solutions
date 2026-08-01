"use client";

import { useEffect, useMemo, useState } from "react";

type Priority = {
  title?: string;
  score?: number;
  consequence?: string;
  action?: string;
};

type Audit = {
  id: string;
  email: string;
  overall: number;
  bandTitle: string | null;
  bandCopy: string | null;
  summary: string;
  priorities: Priority[];
  source: string;
  createdAt: string;
};

type Counts = { all: number; critical: number; watch: number; strong: number };
type Filter = "all" | "critical" | "watch" | "strong";

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export default function AuditsClient() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [counts, setCounts] = useState<Counts>({
    all: 0,
    critical: 0,
    watch: 0,
    strong: 0,
  });
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/audit-results", { cache: "no-store" })
      .then(async (r) => {
        const d = (await r.json()) as {
          audits?: Audit[];
          counts?: Counts;
          error?: string;
        };
        if (!r.ok) throw new Error(d.error || "Audit results could not be loaded.");
        setAudits(d.audits || []);
        if (d.counts) setCounts(d.counts);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return audits;
    if (filter === "critical") return audits.filter((a) => a.overall < 50);
    if (filter === "watch") {
      return audits.filter((a) => a.overall >= 50 && a.overall < 75);
    }
    return audits.filter((a) => a.overall >= 75);
  }, [audits, filter]);

  const selected = audits.find((a) => a.id === selectedId) || null;

  return (
    <>
      <section className="admin-intro">
        <div>
          <p className="eyebrow">Revenue Leak Audit</p>
          <h1>
            Who took the diagnostic
            <span>.</span>
          </h1>
        </div>
        <p>
          Stored when someone emails themselves the audit results. Open scores, priorities and
          the summary before you follow up.
        </p>
      </section>

      <div className="admin-filter-row">
        {(
          [
            ["all", "All", counts.all],
            ["critical", "Under 50", counts.critical],
            ["watch", "50–74", counts.watch],
            ["strong", "75+", counts.strong],
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

      {loading ? (
        <p className="admin-empty">Loading audit results…</p>
      ) : filtered.length === 0 ? (
        <p className="admin-empty">No audit results stored yet.</p>
      ) : (
        <div className="admin-booking-layout">
          <div className="admin-booking-list">
            {filtered.map((a) => (
              <article
                key={a.id}
                className={selectedId === a.id ? "selected" : ""}
                onClick={() => setSelectedId(a.id)}
              >
                <div>
                  <span>{a.overall}/100</span>
                  <strong>{a.email}</strong>
                  <small>{a.bandTitle || "Diagnostic"}</small>
                </div>
                <div>
                  <span>Completed</span>
                  <strong>{formatWhen(a.createdAt)}</strong>
                  <small>{a.source}</small>
                </div>
                <div>
                  <span>Band</span>
                  <strong>{a.bandTitle || "—"}</strong>
                  <small>
                    {(a.priorities?.length || 0)} priorities
                  </small>
                </div>
              </article>
            ))}
          </div>

          <aside className="admin-booking-detail">
            {selected ? (
              <>
                <p className="eyebrow">Audit result</p>
                <h2>{selected.overall}/100</h2>
                <p className="admin-booking-company">
                  {selected.bandTitle || "Revenue Leak Audit"}
                </p>
                <dl className="admin-booking-meta">
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${selected.email}`}>{selected.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Completed</dt>
                    <dd>{formatWhen(selected.createdAt)}</dd>
                  </div>
                  <div>
                    <dt>Band</dt>
                    <dd>{selected.bandCopy || selected.bandTitle || "—"}</dd>
                  </div>
                </dl>
                {selected.priorities?.length ? (
                  <div className="admin-booking-message">
                    <span>Priorities</span>
                    {selected.priorities.map((p, i) => (
                      <p key={`${selected.id}-p-${i}`}>
                        <strong>
                          {p.title || `Priority ${i + 1}`}
                          {typeof p.score === "number" ? ` (${p.score}/100)` : ""}
                        </strong>
                        {p.consequence ? `\n${p.consequence}` : ""}
                        {p.action ? `\nFirst action: ${p.action}` : ""}
                      </p>
                    ))}
                  </div>
                ) : null}
                <div className="admin-booking-message">
                  <span>Summary</span>
                  <p>{selected.summary}</p>
                </div>
                <div className="admin-booking-actions">
                  <a
                    className="button button-primary"
                    href={`mailto:${selected.email}?subject=${encodeURIComponent(
                      "Your Revenue Leak Audit — next step",
                    )}`}
                  >
                    Follow up by email
                  </a>
                </div>
              </>
            ) : (
              <p className="admin-empty" style={{ margin: 0 }}>
                Select a result to open scores and priorities.
              </p>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
