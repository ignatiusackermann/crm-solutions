import type { Metadata } from "next";
import Link from "next/link";
import BookingEngine from "./booking-engine";
import { SiteFooter } from "../site-components";

export const metadata: Metadata = {
  title: "Book a Discovery Call | CRM Solutions",
  description:
    "Choose a date and time for a focused 60-minute Discovery Call with Ignatius Ackermann of CRM Solutions.",
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function BookDiscoveryCallPage() {
  return (
    <main id="top">
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
        <Link className="header-cta nav-current" href="#booking">Book a Discovery Call <Arrow /></Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/">Home</Link>
            <Link href="/revenue-platform">Revenue Platform</Link>
            <Link href="/#work">Work</Link>
            <Link href="/revenue-leak-audit">Revenue Leak Audit</Link>
          </nav>
        </details>
      </header>

      <section className="booking-hero section-shell">
        <div>
          <p className="eyebrow">A focused commercial conversation</p>
          <h1>Book a Discovery Call<span>.</span></h1>
        </div>
        <div className="booking-hero-copy">
          <p>
            A 60-minute founder-led conversation about the constraint, the economics and whether
            a Revenue Platform is the right next step.
          </p>
          <ul>
            <li><span>01</span> Your most expensive likely revenue constraint</li>
            <li><span>02</span> The current numbers and commercial opportunity</li>
            <li><span>03</span> A practical next decision—with or without CRM Solutions</li>
          </ul>
        </div>
      </section>

      <BookingEngine />

      <section className="booking-expect section-shell">
        <div>
          <p className="eyebrow">What to expect</p>
          <h2>Useful before it becomes a sales conversation.</h2>
        </div>
        <div>
          <p>
            Bring your current website, the business goal, any relevant lead or sales numbers,
            and the one commercial problem you most want to solve.
          </p>
          <p>
            If the economics do not justify a US$10,000+ engagement, Ignatius will say so.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
