import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, StandardHeader } from "../site-components";
import { allInsightSlugs } from "../insights/insights";

export const metadata: Metadata = {
  title: "Site Info — CRM Solutions Website Overview",
  description:
    "Internal website overview, SEO health score, feature inventory and launch checklist for CRM Solutions.",
  robots: { index: false, follow: false },
};

const updated = "25 July 2026";

const seoScores = [
  { label: "Overall SEO Health", score: 62 },
  { label: "Technical SEO", score: 58 },
  { label: "Schema / Structured Data", score: 72 },
  { label: "Content Quality (E-E-A-T)", score: 74 },
  { label: "On-Page SEO", score: 68 },
  { label: "AI Search Readiness (GEO)", score: 70 },
  { label: "Performance (CWV est.)", score: 72 },
  { label: "Trust / Proof signals", score: 55 },
];

const systems = [
  { name: "Public marketing site", status: "PASS", note: "Homepage, platform, audit, booking, contact, work, insights live on Vercel." },
  { name: "Supabase Postgres", status: "PASS", note: "Contact submissions, discovery bookings, payment plans." },
  { name: "Resend email", status: "WATCH", note: "Test email to info@ delivered. Domain verification required for client mailboxes (itools24 etc.)." },
  { name: "PayPal deposits", status: "WATCH", note: "Generator + client panel wired. Test bypass available in sandbox only." },
  { name: "Cloudflare Turnstile", status: "OPTIONAL", note: "Contact + client login when keys set; localhost skips when unset." },
  { name: "Clara voice advisor", status: "WATCH", note: "Depends on GEMINI_API_KEY; soft-fails with clear message if missing." },
  { name: "Google Calendar / Meet", status: "WATCH", note: "Discovery bookings reserve even if calendar env incomplete." },
  { name: "Schema markup", status: "PASS", note: "Organization, WebSite, Service, Article + BreadcrumbList added 25 July 2026." },
  { name: "robots.ts + sitemap.ts", status: "PASS", note: "Published with private routes disallowed; AI bots explicitly allowed." },
  { name: "Testimonials / reviews", status: "GAP", note: "None yet — proof via case studies, Delivery Commitment, founder tenure, economics." },
];

const pages = [
  ["/", "Homepage"],
  ["/revenue-platform", "Revenue Platform"],
  ["/revenue-leak-audit", "Revenue Leak Audit"],
  ["/book-discovery-call", "Book a Discovery Call"],
  ["/contact", "Contact"],
  ["/delivery-commitment", "Delivery Commitment"],
  ["/payment-options", "Payment Options"],
  ["/work/lava-sa", "Case study — Lava-SA"],
  ["/work/star-aesthetic", "Case study — Star Aesthetic"],
  ["/work/storvac", "Case study — Storvac"],
  ["/insights/*", "8 insight articles"],
  ["/privacy-policy", "Privacy Policy"],
  ["/cookie-policy", "Cookie Policy"],
  ["/terms-and-conditions", "Terms & Conditions"],
  ["/client/login", "Client login (noindex)"],
  ["/client/payment", "Client payment (noindex)"],
  ["/admin/login", "Admin login (noindex)"],
  ["/admin/payments", "Payment Generator (noindex)"],
  ["/site-info", "Site Info (this page, noindex)"],
];

const nextActions = [
  { priority: "Do now", item: "Verify Resend domain crmsolutions.app and set PAYMENT_FROM_EMAIL for client plan emails." },
  { priority: "Do now", item: "Submit sitemap in Google Search Console: https://www.crmsolutions.app/sitemap.xml" },
  { priority: "Do now", item: "Add a dedicated OG image (1200×630) — currently summary cards without custom art." },
  { priority: "Soon", item: "Create /insights index hub and add Insights to footer + mobile nav." },
  { priority: "Soon", item: "Wire analytics only after consent (cookie banner exists; no GA/Plausible listener yet)." },
  { priority: "Soon", item: "Add FAQPage schema on Revenue Platform or a dedicated FAQ once Q&A copy is final." },
  { priority: "Later", item: "Collect first real testimonials / logos — until then keep case-study proof front and centre." },
  { priority: "Later", item: "Publish llms.txt for AI crawlers with page index + key commercial facts." },
  { priority: "Later", item: "Legal review of Privacy / Cookie / Terms drafts before heavy outbound campaigns." },
];

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="site-info-score-bar" aria-hidden="true">
      <i style={{ width: `${score}%` }} />
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === "PASS"
      ? "pass"
      : status === "GAP"
        ? "gap"
        : status === "OPTIONAL"
          ? "optional"
          : "watch";
  return <b className={`site-info-status site-info-status-${tone}`}>{status}</b>;
}

export default function SiteInfoPage() {
  const insightCount = allInsightSlugs().length;

  return (
    <main className="site-info-page" id="top">
      <StandardHeader />

      <section className="site-info-hero section-shell">
        <p className="eyebrow">Website information — updated {updated}</p>
        <h1>
          CRM Solutions site overview
          <span>.</span>
        </h1>
        <p>
          Internal summary of what the website does, SEO health, systems status,
          content gaps and next actions. This page is <strong>noindex</strong> —
          for Ignatius and collaborators, not for Google.
        </p>
        <div className="site-info-meta">
          <span>crmsolutions.app</span>
          <span>Next.js 16 · Vercel · Supabase · Resend</span>
          <span>{insightCount} insight articles</span>
        </div>
      </section>

      <section className="site-info-section section-shell">
        <div className="site-info-section-head">
          <p className="eyebrow">Executive verdict</p>
          <h2>Strong commercial story. SEO plumbing was the main gap.</h2>
        </div>
        <div className="site-info-verdict">
          <p>
            The marketing narrative is mature: Revenue Platform, Leak Audit,
            Discovery Call, case studies, Delivery Commitment and insight pages
            form a coherent buyer journey. Proof currently rests on case studies
            and process clarity rather than testimonials — that is acceptable if
            those assets stay visible.
          </p>
          <p>
            Before this update, schema, sitemap, robots and Open Graph basics
            were missing. Those are now implemented. Remaining weight sits in
            domain email verification, Search Console, OG imagery, an insights
            hub, and consent-aware analytics.
          </p>
        </div>
      </section>

      <section className="site-info-section section-shell">
        <div className="site-info-section-head">
          <p className="eyebrow">SEO health score — audit {updated}</p>
          <h2>Directional scores from the codebase review.</h2>
        </div>
        <p className="site-info-note">
          Scores are directional for planning. Refresh after Search Console and
          live Core Web Vitals data are available. Schema score assumes the 25
          July structured-data deploy is live.
        </p>
        <div className="site-info-scores">
          {seoScores.map((row) => (
            <article key={row.label}>
              <div>
                <span>{row.label}</span>
                <strong>{row.score}</strong>
              </div>
              <ScoreBar score={row.score} />
            </article>
          ))}
        </div>
      </section>

      <section className="site-info-section section-shell">
        <div className="site-info-section-head">
          <p className="eyebrow">Systems status</p>
          <h2>What is live, watching, optional or still a gap.</h2>
        </div>
        <div className="site-info-systems">
          {systems.map((row) => (
            <article key={row.name}>
              <div>
                <h3>{row.name}</h3>
                <StatusPill status={row.status} />
              </div>
              <p>{row.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-info-section section-shell">
        <div className="site-info-section-head">
          <p className="eyebrow">Full review findings</p>
          <h2>What we checked across the public website.</h2>
        </div>
        <div className="site-info-findings">
          <article>
            <h3>Content & story</h3>
            <ul>
              <li>Homepage H2s sharpened; eight insight deep-pages linked from sections.</li>
              <li>Revenue Platform upgraded with definition, before/after handoff, proof strip, stewardship.</li>
              <li>Case studies carry commercial constraint → system response (strongest proof available without testimonials).</li>
              <li>No fabricated reviews — correct. Do not invent star ratings.</li>
              <li>Missing: insights index page; dedicated About URL (only `/#about`).</li>
            </ul>
          </article>
          <article>
            <h3>Technical SEO</h3>
            <ul>
              <li>metadataBase, title template, Open Graph + Twitter cards added.</li>
              <li>robots.ts disallows admin/client/api/site-info; allows major AI bots.</li>
              <li>sitemap.ts covers marketing pages + all insight slugs.</li>
              <li>Still missing: custom OG image asset; FAQPage schema; llms.txt.</li>
              <li>Root leftover `codex-preview: development` removed.</li>
            </ul>
          </article>
          <article>
            <h3>Schema markup</h3>
            <ul>
              <li>Organization + ProfessionalService + WebSite on every page.</li>
              <li>Service (+ Offer from US$10,000) on `/revenue-platform`.</li>
              <li>Article + BreadcrumbList on each insight page.</li>
              <li>Validate in Rich Results Test / Schema Markup Validator after deploy.</li>
            </ul>
          </article>
          <article>
            <h3>Trust without testimonials</h3>
            <ul>
              <li>Work around: case studies, Delivery Commitment, 90-day launch support, founder-since-2001, break-even framing, fit/not-fit honesty.</li>
              <li>Keep proof strip near investment CTAs (already on Revenue Platform).</li>
              <li>When first clients consent, add named quotes + optional logo strip — never fake AggregateRating.</li>
            </ul>
          </article>
          <article>
            <h3>Internal linking</h3>
            <ul>
              <li>Desktop nav: Platform, Work, Insights, Contact.</li>
              <li>Footer omits Insights articles; mobile StandardHeader omits Insights.</li>
              <li>Insight pages are reachable from homepage/platform deep-links only — hub needed.</li>
            </ul>
          </article>
          <article>
            <h3>Legal & privacy</h3>
            <ul>
              <li>Privacy, Cookie, Terms present; drafts note POPIA-conscious review still needed.</li>
              <li>Cookie banner supports analytics consent, but no analytics script is wired yet.</li>
              <li>Private areas correctly noindexed (admin login now included).</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="site-info-section section-shell">
        <div className="site-info-section-head">
          <p className="eyebrow">Feature inventory</p>
          <h2>What is built into the site.</h2>
        </div>
        <div className="site-info-features">
          <div>
            <h3>Commercial journey</h3>
            <ul>
              <li>Homepage buyer narrative + section deep-links</li>
              <li>Revenue Platform long-form product page</li>
              <li>Interactive Revenue Leak Audit</li>
              <li>Discovery Call booking (timezone-aware)</li>
              <li>Contact form → database + admin email</li>
              <li>Eight insight / challenge pages for SEO + Clara</li>
            </ul>
          </div>
          <div>
            <h3>Proof & trust</h3>
            <ul>
              <li>Three commercial case studies with live screenshots</li>
              <li>Delivery Commitment + 90-day launch support</li>
              <li>Fit / not-fit qualification copy</li>
              <li>Investment break-even framing</li>
              <li>Clara voice business advisor (env-dependent)</li>
            </ul>
          </div>
          <div>
            <h3>Client operations</h3>
            <ul>
              <li>Client login (email + access code)</li>
              <li>Client payment panel (PayPal + optional test bypass)</li>
              <li>Admin Payment Generator + plan emails</li>
              <li>Payment Options public explainer</li>
              <li>Stress-test client CSV + checklist in docs/</li>
            </ul>
          </div>
          <div>
            <h3>Platform</h3>
            <ul>
              <li>Next.js App Router on Vercel</li>
              <li>Supabase PostgreSQL via Drizzle</li>
              <li>Resend transactional email</li>
              <li>Optional Cloudflare Turnstile</li>
              <li>JSON-LD schema helpers in lib/json-ld.tsx</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="site-info-section section-shell">
        <div className="site-info-section-head">
          <p className="eyebrow">Launch checklist</p>
          <h2>Next actions by priority.</h2>
        </div>
        <div className="site-info-actions">
          {nextActions.map((row) => (
            <article key={row.item}>
              <span>{row.priority}</span>
              <p>{row.item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-info-section section-shell">
        <div className="site-info-section-head">
          <p className="eyebrow">Key pages to review</p>
          <h2>Public and private route inventory.</h2>
        </div>
        <div className="site-info-pages">
          {pages.map(([href, label]) => (
            <Link key={href} href={href.endsWith("*") ? "/insights/connected-revenue-platform" : href}>
              <span>{href}</span>
              <strong>{label}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-info-section section-shell">
        <div className="site-info-section-head">
          <p className="eyebrow">Stack</p>
          <h2>Technical details.</h2>
        </div>
        <dl className="site-info-stack">
          <div><dt>Platform</dt><dd>Next.js 16 (App Router)</dd></div>
          <div><dt>Hosting</dt><dd>Vercel</dd></div>
          <div><dt>Database</dt><dd>Supabase (PostgreSQL)</dd></div>
          <div><dt>Email</dt><dd>Resend</dd></div>
          <div><dt>Payments</dt><dd>PayPal</dd></div>
          <div><dt>Voice AI</dt><dd>Clara · Google Gemini</dd></div>
          <div><dt>Primary domain</dt><dd>www.crmsolutions.app</dd></div>
          <div><dt>Repository</dt><dd>github.com/ignatiusackermann/crm-solutions</dd></div>
        </dl>
        <p className="site-info-foot-note">
          This page is not indexed by Google (<code>robots: noindex</code>).
          For internal use only. Last updated: {updated}. · CRM Solutions —
          Durban, South Africa · contact via /contact
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
