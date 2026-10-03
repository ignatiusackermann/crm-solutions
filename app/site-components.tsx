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

/* One list of industry pages, used by the header dropdown on every page,
   the home page's own header and the mobile menus. Add a new industry here
   and it appears everywhere. */
export const INDUSTRY_LINKS = [
  { href: "/for-accounting-practices", label: "Accounting practices" },
  { href: "/for-debt-counsellors", label: "Debt counselling practices" },
  { href: "/value-of-a-returning-guest", label: "Guest houses & hospitality" },
  { href: "/value-of-returning-customer", label: "Established local businesses" },
] as const;

/* CSS-only dropdown: it opens on hover and on keyboard focus (focus-within),
   so it needs no JavaScript and works before hydration. */
export function IndustriesMenu() {
  return (
    <div className="nav-dropdown">
      <button type="button" className="nav-dropdown-toggle" aria-haspopup="true">
        Industries
        <span aria-hidden="true">▾</span>
      </button>
      <div className="nav-dropdown-panel">
        {INDUSTRY_LINKS.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MobileIndustryLinks() {
  return (
    <>
      {INDUSTRY_LINKS.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </>
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
        <IndustriesMenu />
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
          <MobileIndustryLinks />
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
          {/* Visible NAP. The Organization schema in lib/json-ld.tsx claims the
              same number and address, and structured data carries more weight
              when the page it sits on corroborates it. */}
          <address className="footer-contact">
            <a href="tel:+27761809799">076 180 9799</a>
            <span>104 Lothian Rd, Durban North, Durban, 4051</span>
          </address>
          <Link href="/contact">Contact</Link>
          {/* The same two profiles are claimed in the schema (Facebook on the
              Organization, LinkedIn on the Person), so the visible links
              corroborate what the structured data says. */}
          <div className="footer-social">
            <a
              href="https://www.linkedin.com/in/ignatiusackermann/"
              target="_blank"
              rel="noreferrer"
              aria-label="Ignatius Ackermann on LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C21.6 8.65 23 10.6 23 14v7h-4v-6.2c0-1.5-.03-3.4-2.07-3.4-2.07 0-2.39 1.6-2.39 3.3V21h-4V9Z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/p/CRM-Solutions-100066631755979/"
              target="_blank"
              rel="noreferrer"
              aria-label="CRM Solutions on Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
                <path d="M14 9V7.3c0-.8.2-1.3 1.4-1.3H17V3.1A20 20 0 0 0 14.8 3C12.3 3 10.5 4.5 10.5 7v2H8v3h2.5v9H14v-9h2.6l.4-3H14Z" />
              </svg>
            </a>
          </div>
        </div>
        <nav className="footer-column" aria-label="Who we work with">
          <strong>Who we work with</strong>
          <Link href="/for-accounting-practices">Accounting practices</Link>
          <Link href="/for-debt-counsellors">Debt counselling practices</Link>
          <Link href="/value-of-a-returning-guest">Guest houses &amp; hospitality</Link>
          <Link href="/value-of-returning-customer">Established local businesses</Link>
        </nav>
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
