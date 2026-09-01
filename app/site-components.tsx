import Link from "next/link";
import { CookieSettingsButton } from "./cookie-consent";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ClientLoginIcon() {
  return (
    <Link
      className="header-account"
      href="/client/login"
      aria-label="Client login"
      title="Client login"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="8" r="3.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M5.5 19.2c1.7-3.1 4-4.7 6.5-4.7s4.8 1.6 6.5 4.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}

export function StandardHeader({
  current,
}: {
  current?: "platform" | "work" | "contact" | "book";
}) {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="CRM Solutions home">
        <img
          src="/brand/crm-solutions-logo-primary-outlined.svg"
          alt="CRM Solutions — Business Growth Systems"
          width={350}
          height={96}
        />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/revenue-platform">Revenue Platform</Link>
        <Link href="/#work">Work</Link>
        <Link href="/#insights">Insights</Link>
        <Link href="/contact" className={current === "contact" ? "nav-current" : undefined}>
          Contact
        </Link>
      </nav>
      <div className="header-actions">
        <ClientLoginIcon />
        <Link
          className={`header-cta${current === "book" ? " nav-current" : ""}`}
          href="/book-discovery-call"
        >
          Book a Discovery Call <Arrow />
        </Link>
      </div>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          <Link href="/">Home</Link>
          <Link href="/revenue-platform">Revenue Platform</Link>
          <Link href="/#work">Work</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/client/login">Client login</Link>
          <Link href="/revenue-leak-audit">Revenue Leak Audit</Link>
          <Link href="/payment-options">Payment Options</Link>
          <Link href="/book-discovery-call">Book a Discovery Call</Link>
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner section-shell">
        <div className="footer-identity">
          <Link className="wordmark footer-wordmark" href="/" aria-label="CRM Solutions home">
            <img
              src="/brand/crm-solutions-logo-primary-outlined.svg"
              alt="CRM Solutions — Business Growth Systems"
              width={350}
              height={96}
            />
          </Link>
          <p>
            Founder-led from Durban. Working with established South African
            businesses that want the whole customer journey connected.
          </p>
          <Link href="/contact">Contact</Link>
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
          <Link href="/ignatius-ackermann">About Ignatius</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/payment-options">Payment Options</Link>
          <Link href="/client/login">Client Login</Link>
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
      <div className="footer-bottom section-shell">
        <span>© 2026 CRM Solutions. All rights reserved.</span>
        <span>Business growth systems · Durban, South Africa</span>
      </div>
    </footer>
  );
}

export function DiscoveryCallSection({
  eyebrow = "A focused commercial conversation",
  title = "Turn the next business decision into a clear plan.",
  body = "Book a 60-minute Discovery Call with Ignatius. We will examine the constraint, the relevant numbers and whether a Revenue Platform is the sensible next step.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="discovery-cta section-shell">
      <div className="discovery-cta-card">
        <div className="discovery-cta-copy">
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{body}</p>
          <ul>
            <li>Founder-led</li>
            <li>Monday–Friday</li>
            <li>Automatic timezone conversion</li>
            <li>Google Calendar &amp; Meet ready</li>
          </ul>
        </div>
        <Link className="discovery-cta-link" href="/book-discovery-call">
          <span>Your next step</span>
          <strong>Book a Discovery Call</strong>
          <p>
            Select a date, choose your local time and tell me what would make the
            conversation valuable.
          </p>
          <span>
            View available appointments <Arrow />
          </span>
        </Link>
      </div>
    </section>
  );
}
