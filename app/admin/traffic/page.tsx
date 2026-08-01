import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminUser } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website Traffic | CRM Solutions Admin",
  robots: { index: false, follow: false },
};

export default async function AdminTrafficPage() {
  const user = await requireAdminUser("/admin/traffic");
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
  const propertyId = process.env.GA4_PROPERTY_ID?.trim() || "";
  const gaUrl = propertyId
    ? `https://analytics.google.com/analytics/web/#/p${propertyId}/reports/intelligenthome`
    : "https://analytics.google.com/";

  return (
    <AdminShell
      user={user}
      active="traffic"
      sidebarExtra={
        <div>
          <strong>Google Analytics</strong>
          <p>
            Traffic is measured in GA4 after cookie consent — not stored in this database. Open
            Google Analytics for live reports.
          </p>
        </div>
      }
    >
      <section className="admin-intro">
        <div>
          <p className="eyebrow">Website traffic</p>
          <h1>
            Pull reports from Google Analytics
            <span>.</span>
          </h1>
        </div>
        <p>
          Yes — traffic comes from Google Analytics 4. This admin does not duplicate charts; it
          confirms the site tag and links you straight into GA4 where sessions, sources and
          conversions live.
        </p>
      </section>

      <div className="admin-traffic-panel">
        <article>
          <span>Measurement ID</span>
          <strong>{measurementId || "Not configured"}</strong>
          <p>
            {measurementId
              ? "Public pages load gtag.js only after the visitor accepts Analytics cookies."
              : "Set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXX) in Vercel / .env.local, then redeploy."}
          </p>
        </article>
        <article>
          <span>Consent gate</span>
          <strong>Cookie banner → Analytics toggle</strong>
          <p>
            Essential storage always runs. Analytics fires only when the visitor opts in
            (crm-cookie-consent-v1).
          </p>
        </article>
        <article>
          <span>Open reports</span>
          <strong>Google Analytics 4</strong>
          <p>
            Optional: set GA4_PROPERTY_ID (numeric property id) for a deep link into this
            property&apos;s home report.
          </p>
          <a className="button button-primary" href={gaUrl} target="_blank" rel="noreferrer">
            Open Google Analytics
          </a>
        </article>
      </div>

      <div className="admin-traffic-steps">
        <h2>Setup checklist</h2>
        <ol>
          <li>Create a GA4 property for crmsolutions.app (or use an existing one).</li>
          <li>
            Copy the Measurement ID into <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code>.
          </li>
          <li>
            Optionally add <code>GA4_PROPERTY_ID</code> for a one-click admin deep link.
          </li>
          <li>Redeploy. Accept Analytics on the public site and confirm Realtime in GA4.</li>
          <li>
            Mark Discovery and Contact conversions in GA4 if you want funnel reporting (events
            can be added later).
          </li>
        </ol>
      </div>
    </AdminShell>
  );
}
