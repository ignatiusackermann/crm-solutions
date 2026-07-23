import Link from "next/link";
import { CookieSettingsButton } from "./cookie-consent";

function Arrow() { return <span aria-hidden="true">↗</span>; }

export function StandardHeader() {
  return <header className="site-header">
    <Link className="wordmark" href="/" aria-label="CRM Solutions home"><span className="wordmark-icon"><i /><i /><i /></span><span>CRM Solutions</span></Link>
    <nav className="desktop-nav" aria-label="Main navigation"><Link href="/revenue-platform">Revenue Platform</Link><Link href="/#work">Work</Link><Link href="/#insights">Insights</Link><Link href="/#about">About</Link></nav>
    <Link className="header-cta" href="/book-discovery-call">Book a Discovery Call <Arrow /></Link>
    <details className="mobile-menu"><summary aria-label="Open navigation">Menu</summary><nav aria-label="Mobile navigation"><Link href="/">Home</Link><Link href="/revenue-platform">Revenue Platform</Link><Link href="/#work">Work</Link><Link href="/revenue-leak-audit">Revenue Leak Audit</Link><Link href="/payment-options">Payment Options</Link><Link href="/book-discovery-call">Book a Discovery Call</Link></nav></details>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-footer-inner section-shell">
      <div className="footer-identity">
        <Link className="wordmark footer-wordmark" href="/"><span className="wordmark-icon"><i /><i /><i /></span><span>CRM Solutions</span></Link>
        <p>Founder-led from South Africa. Working remotely with growth-minded businesses in the United States and selected international markets.</p>
        <a href="mailto:ignatius@crmsolutions.app">ignatius@crmsolutions.app</a>
      </div>
      <nav className="footer-column" aria-label="Explore">
        <strong>Explore</strong>
        <Link href="/revenue-platform">Revenue Platform</Link>
        <Link href="/revenue-leak-audit">Revenue Leak Audit</Link>
        <Link href="/#work">Selected Work</Link>
        <Link href="/book-discovery-call">Book a Discovery Call</Link>
      </nav>
      <nav className="footer-column" aria-label="Working together">
        <strong>Working together</strong>
        <Link href="/#about">About Ignatius</Link>
        <Link href="/payment-options">Payment Options</Link>
        <Link href="/client/payment">Client Payment Panel</Link>
      </nav>
      <nav className="footer-column" aria-label="Legal">
        <strong>Legal</strong>
        <Link href="/delivery-commitment">Delivery Commitment</Link>
        <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/cookie-policy">Cookie Policy</Link>
        <CookieSettingsButton />
      </nav>
    </div>
    <div className="footer-bottom section-shell"><span>© 2026 CRM Solutions. All rights reserved.</span><span>Business growth systems · Durban, South Africa</span></div>
  </footer>;
}

export function DiscoveryCallSection({ eyebrow = "A focused commercial conversation", title = "Turn the next business decision into a clear plan.", body = "Book a 60-minute Discovery Call with Ignatius. We will examine the constraint, the relevant numbers and whether a Revenue Platform is the sensible next step." }: { eyebrow?: string; title?: string; body?: string }) {
  return <section className="discovery-cta section-shell"><div className="discovery-cta-card">
    <div className="discovery-cta-copy"><p className="eyebrow eyebrow-light">{eyebrow}</p><h2>{title}</h2><p>{body}</p><ul><li>Founder-led</li><li>Monday–Friday</li><li>Automatic timezone conversion</li><li>Google Calendar &amp; Meet ready</li></ul></div>
    <Link className="discovery-cta-link" href="/book-discovery-call"><span>Your next step</span><strong>Book a Discovery Call</strong><p>Select a date, choose your local time and tell me what would make the conversation valuable.</p><span>View available appointments <Arrow /></span></Link>
  </div></section>;
}
