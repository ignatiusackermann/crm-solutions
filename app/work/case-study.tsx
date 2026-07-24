import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter } from "../site-components";

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  liveUrl: string;
  liveLabel: string;
  heroTone: "lava" | "star" | "storvac";
  headline: string;
  intro: string;
  meta: { label: string; value: string }[];
  services: { label: string; title: string }[];
  narrativeTitle: string;
  narrative: string[];
  pillars: { title: string; body: string }[];
  decisionTitle: string;
  decisions: { label: string; title: string; body: string }[];
  layersTitle: string;
  layersIntro: string;
  layers: { title: string; body: string }[];
  proofTitle: string;
  proofPoints: string[];
  depthTitle: string;
  depthIntro: string;
  depthStats: { value: string; label: string }[];
  stewardshipTitle: string;
  stewardship: string[];
  closingTitle: string;
  brandLabel: string;
  brandLine: string;
  brandCta: string;
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function CaseHeader({ tone }: { tone: CaseStudy["heroTone"] }) {
  return (
    <header className={`site-header case-header case-header-${tone}`}>
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
          <Link href="/#work">Work</Link>
          <Link href="/book-discovery-call">Book a Discovery Call</Link>
        </nav>
      </details>
    </header>
  );
}

function CaseVisual({ study }: { study: CaseStudy }) {
  return (
    <div className={`project-visual case-hero-visual ${study.heroTone}`} aria-hidden="true">
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
            <button tabIndex={-1}>{study.brandCta}</button>
          </div>
          <div className="display-object">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <span className="visual-label">Live platform preview</span>
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
    <main className={`case-page case-${study.heroTone}`} id="top">
      <CaseHeader tone={study.heroTone} />

      <section className={`case-hero case-hero-${study.heroTone}`}>
        <div className="section-shell case-hero-grid">
          <div className="case-hero-copy">
            <p className="eyebrow eyebrow-light">{study.category}</p>
            <h1>
              {study.headline}
              <span>.</span>
            </h1>
            <p>{study.intro}</p>
            <div className="hero-actions">
              <a
                className="button button-copper"
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                {study.liveLabel} <Arrow />
              </a>
              <Link className="text-link text-link-light" href="/book-discovery-call">
                Discuss a similar build <Arrow />
              </Link>
            </div>
          </div>
          <CaseVisual study={study} />
        </div>
        <div className="section-shell case-meta">
          {study.meta.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={`case-services case-services-${study.heroTone}`}>
        <div className="section-shell case-services-grid">
          {study.services.map((item) => (
            <article key={item.title}>
              <span>{item.label}</span>
              <strong>{item.title}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="case-light section-shell">
        <div className="case-split">
          <h2>{study.narrativeTitle}</h2>
          <div className="case-copy-stack">
            {study.narrative.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="case-pillars">
          {study.pillars.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-light case-light-tight section-shell">
        <div className="case-split">
          <h2>{study.decisionTitle}</h2>
          <div className="case-decision-list">
            {study.decisions.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>{item.label}</small>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-layers">
        <div className="section-shell case-split case-split-dark">
          <div>
            <h2>{study.layersTitle}</h2>
            <p>{study.layersIntro}</p>
          </div>
          <div className="case-layers-grid">
            {study.layers.map((item) => (
              <article key={item.title}>
                <i aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-light section-shell">
        <div className="case-split">
          <div>
            <h2>{study.proofTitle}</h2>
            <ul className="case-proof-list">
              {study.proofPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <CaseVisual study={study} />
        </div>
      </section>

      <section className={`case-depth case-depth-${study.heroTone}`}>
        <div className="section-shell">
          <div className="case-depth-intro">
            <h2>{study.depthTitle}</h2>
            <p>{study.depthIntro}</p>
          </div>
          <div className="case-depth-grid">
            {study.depthStats.map((item) => (
              <article key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-light section-shell">
        <div className="case-split">
          <h2>{study.stewardshipTitle}</h2>
          <ul className="case-stewardship">
            {study.stewardship.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="case-closing">
          <h2>{study.closingTitle}</h2>
          <div className="hero-actions">
            <Link className="button button-primary" href="/book-discovery-call">
              Book a Discovery Call <Arrow />
            </Link>
            <a className="text-link" href="mailto:ignatius@crmsolutions.app">
              Email Ignatius <Arrow />
            </a>
          </div>
        </div>
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
        eyebrow="Your commercial problem will need a different answer"
        title="Bring the same clarity to your customer journey."
        body="Book a Discovery Call to examine where attention, enquiries or follow-up are leaking—and whether a connected platform is the sensible next step."
      />
      <SiteFooter />
    </main>
  );
}
