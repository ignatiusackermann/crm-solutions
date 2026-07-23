import type { Metadata } from "next";
import Link from "next/link";
import RevenueLeakAudit from "./revenue-leak-audit";
import { DiscoveryCallSection, SiteFooter } from "../site-components";

export const metadata: Metadata = {
  title: "Revenue Leak Audit | CRM Solutions",
  description:
    "Assess the six stages of your customer journey and identify the commercial constraint that deserves attention first.",
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="CRM Solutions home">
        <span className="wordmark-icon"><i /><i /><i /></span>
        <span>CRM Solutions</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/revenue-platform">Revenue Platform</Link>
        <Link href="/#work">Work</Link>
        <Link href="/#insights">Insights</Link>
        <Link href="/#about">About</Link>
      </nav>
      <Link className="header-cta" href="/book-discovery-call">
        Book a Discovery Call <Arrow />
      </Link>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          <Link href="/">Home</Link>
          <Link href="/revenue-platform">Revenue Platform</Link>
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/revenue-leak-audit">Revenue Leak Audit</Link>
          <Link href="/book-discovery-call">Book a Discovery Call</Link>
        </nav>
      </details>
    </header>
  );
}

export default function RevenueLeakAuditPage() {
  return (
    <main className="audit-page" id="top">
      <Header />
      <section className="audit-hero section-shell">
        <div>
          <p className="eyebrow">A seven-minute commercial diagnostic</p>
          <h1>
            Find where revenue is <em>leaking</em><span>.</span>
          </h1>
        </div>
        <div className="audit-hero-intro">
          <p>
            Examine the six jobs between first attention and retained customer. Leave with a
            ranked view of the constraints, their likely business consequence and a sensible
            first action.
          </p>
          <div>
            <span>No email required</span>
            <span>Immediate result</span>
            <span>Built for decision-makers</span>
          </div>
        </div>
      </section>

      <RevenueLeakAudit />

      <section className="audit-method section-shell">
        <div>
          <p className="eyebrow">What this diagnostic can—and cannot—do</p>
          <h2>A useful signal. Not a pretend financial forecast.</h2>
        </div>
        <div>
          <p>
            The score helps expose weak handoffs across positioning, acquisition, conversion,
            follow-through, retention and measurement. It does not invent a dollar value for a
            problem without your margins, lead quality, capacity and sales cycle.
          </p>
          <p>
            A senior review adds those economics and determines whether the most sensible next
            step is a focused repair, a Revenue Platform—or no project at all.
          </p>
        </div>
      </section>
      <DiscoveryCallSection eyebrow="Move from score to commercial evidence" title="Review the result with the numbers that matter." body="A Discovery Call adds your margins, lead quality, capacity and sales cycle to determine what the highest-priority constraint is actually worth." />
      <SiteFooter />
    </main>
  );
}
