import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter } from "../site-components";

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  liveUrl: string;
  liveLabel: string;
  eyebrow: string;
  headline: string;
  intro: string;
  challengeTitle: string;
  challenge: string[];
  approachTitle: string;
  approach: { title: string; body: string }[];
  resultsTitle: string;
  results: string[];
  themes: string[];
  visualClass: "lava" | "star" | "storvac";
  brandLabel: string;
  brandLine: string;
  ctaHint: string;
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function CaseHeader({ current }: { current: string }) {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="CRM Solutions home">
        <span className="wordmark-icon">
          <i />
          <i />
          <i />
        </span>
        <span>CRM Solutions</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/revenue-platform">Revenue Platform</Link>
        <Link className="nav-current" href="/#work">
          Work
        </Link>
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
          <Link href="/#work">Work</Link>
          <Link href={current}>This case study</Link>
          <Link href="/book-discovery-call">Book a Discovery Call</Link>
        </nav>
      </details>
    </header>
  );
}

function CaseVisual({ study }: { study: CaseStudy }) {
  return (
    <div className={`project-visual case-hero-visual ${study.visualClass}`} aria-hidden="true">
      <div className="project-browser">
        <div className="browser-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="project-brand">
          <span className="brand-mark" />
          <span>{study.brandLabel}</span>
        </div>
        <div className="project-display">
          <div className="display-copy">
            <b>{study.brandLine}</b>
            <span />
            <span />
            <button tabIndex={-1}>
              {study.visualClass === "star"
                ? "Book a consultation"
                : study.visualClass === "storvac"
                  ? "Find my size"
                  : "Shop the range"}
            </button>
          </div>
          <div className="display-object">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <span className="visual-label">Platform preview</span>
    </div>
  );
}

const siblings = [
  { href: "/work/lava-sa", name: "Lava-SA" },
  { href: "/work/star-aesthetic", name: "Star Aesthetic" },
  { href: "/work/storvac", name: "Storvac Systems" },
];

export function caseMetadata(study: CaseStudy): Metadata {
  return {
    title: `${study.name} | CRM Solutions Work`,
    description: study.intro,
  };
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <main className="case-page" id="top">
      <CaseHeader current={`/work/${study.slug}`} />

      <section className="case-hero section-shell">
        <div className="case-hero-copy">
          <p className="eyebrow">{study.eyebrow}</p>
          <p className="case-category">{study.category}</p>
          <h1>
            {study.headline}
            <span>.</span>
          </h1>
          <p className="case-intro">{study.intro}</p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              {study.liveLabel} <Arrow />
            </a>
            <Link className="text-link" href="/book-discovery-call">
              Discuss a similar build <Arrow />
            </Link>
          </div>
          <ul className="case-themes">
            {study.themes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>
        </div>
        <CaseVisual study={study} />
      </section>

      <section className="case-section section-shell">
        <div className="case-section-heading">
          <span className="section-index">01 / The commercial problem</span>
          <h2>{study.challengeTitle}</h2>
        </div>
        <div className="case-challenge-grid">
          {study.challenge.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-approach">
        <div className="section-shell">
          <div className="case-section-heading light">
            <span className="section-index">02 / What we built</span>
            <h2>{study.approachTitle}</h2>
          </div>
          <div className="case-approach-grid">
            {study.approach.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section section-shell">
        <div className="case-section-heading">
          <span className="section-index">03 / What changed for the business</span>
          <h2>{study.resultsTitle}</h2>
        </div>
        <ul className="case-results">
          {study.results.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="case-note">{study.ctaHint}</p>
      </section>

      <section className="case-more section-shell">
        <div>
          <p className="eyebrow">More selected work</p>
          <h2>Other platforms shaped around a buying decision.</h2>
        </div>
        <div className="case-more-links">
          {siblings
            .filter((item) => item.href !== `/work/${study.slug}`)
            .map((item) => (
              <Link key={item.href} href={item.href}>
                {item.name} <Arrow />
              </Link>
            ))}
        </div>
      </section>

      <DiscoveryCallSection
        eyebrow="If this sounds familiar"
        title="Bring the same clarity to your customer journey."
        body="Book a Discovery Call to examine where attention, enquiries or follow-up are leaking—and whether a connected platform is the sensible next step."
      />
      <SiteFooter />
    </main>
  );
}
