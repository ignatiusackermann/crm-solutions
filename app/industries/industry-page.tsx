import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";
import { portfolio, readyToLaunch } from "../work/portfolio";

// One complete, sourced guide per industry. Each industry is a data object
// (app/industries/<slug>/page.tsx) rendered by IndustryPage, so every guide has
// the same shape: where the industry stands, what it means, the 2030 practice,
// the complete package, what to ask before buying AI, proof, FAQs and sources.

export type Industry = {
  slug: string;
  name: string; // "Accounting"
  updated: string; // "November 2026"
  seoTitle: string; // 30–65 characters, ends "| CRM Solutions"
  seoDescription: string; // 70–160 characters
  shareTitle: string;
  headline: string;
  lede: string;
  forcesTitle: string;
  forcesIntro: string;
  forces: { kicker: string; title: string; body: string; source: number[] }[];
  meaningTitle: string;
  meaning: string[];
  visionTitle: string;
  visionIntro: string;
  vision: { title: string; body: string }[];
  packageTitle: string;
  packageIntro: string;
  packageItems: { title: string; body: string }[];
  askTitle: string;
  askIntro: string;
  ask: { q: string; why: string }[];
  relatedSlugs: string[]; // portfolio slugs shown as live proof
  extraLink?: { href: string; label: string; body: string };
  faq: { q: string; a: string }[];
  sources: { title: string; publisher: string; date: string; url: string }[];
  closingTitle: string;
  closingBody: string;
};

const SITE = "https://www.crmsolutions.app";

export function industryMetadata(industry: Industry): Metadata {
  const url = `${SITE}/industries/${industry.slug}`;
  return {
    title: industry.seoTitle,
    description: industry.seoDescription,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      type: "article",
      locale: "en_ZA",
      siteName: "CRM Solutions",
      url,
      title: industry.shareTitle,
      description: industry.seoDescription,
    },
    twitter: { card: "summary_large_image", title: industry.shareTitle, description: industry.seoDescription },
    robots: { index: true, follow: true },
  };
}

function Cite({ ids }: { ids: number[] }) {
  if (ids.length === 0) return null;
  return (
    <sup className="ind-cite">
      {ids.map((id, i) => (
        <span key={id}>
          {i > 0 ? "," : ""}
          <a href={`#source-${id}`} aria-label={`Source ${id}`}>
            {id}
          </a>
        </span>
      ))}
    </sup>
  );
}

export function IndustryPage({ industry }: { industry: Industry }) {
  const url = `${SITE}/industries/${industry.slug}`;
  const related = industry.relatedSlugs
    .map((slug) => [...portfolio, ...readyToLaunch].find((p) => p.slug === slug))
    .filter((p): p is (typeof portfolio)[number] => Boolean(p));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: industry.headline,
        description: industry.seoDescription,
        url,
        dateModified: new Date().toISOString().slice(0, 10),
        author: { "@type": "Organization", name: "CRM Solutions", url: SITE },
        publisher: { "@type": "Organization", name: "CRM Solutions", url: SITE },
        about: industry.name,
        citation: industry.sources.map((s) => s.url),
      },
      {
        "@type": "FAQPage",
        mainEntity: industry.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Industries", item: `${SITE}/industries` },
          { "@type": "ListItem", position: 2, name: industry.name, item: url },
        ],
      },
    ],
  };

  return (
    <main id="top" className="ind-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <StandardHeader />

      <section className="ind-hero section-shell">
        <p className="eyebrow">
          <Link href="/industries">Industry guides</Link> · {industry.name} · Updated {industry.updated}
        </p>
        <h1>
          {industry.headline}
          <span>.</span>
        </h1>
        <p className="ind-lede">{industry.lede}</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/book-discovery-call">
            Book a Discovery Call <span aria-hidden="true">↗</span>
          </Link>
          <a className="text-link" href="#the-2030-practice">
            See the 2030 practice <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="ind-section section-shell" aria-labelledby="forces-title">
        <div className="vrc-heading">
          <p className="eyebrow">Where the industry stands</p>
          <h2 id="forces-title">{industry.forcesTitle}</h2>
          <p>{industry.forcesIntro}</p>
        </div>
        <div className="ind-forces">
          {industry.forces.map((force) => (
            <article key={force.title}>
              <p className="ind-kicker">{force.kicker}</p>
              <h3>{force.title}</h3>
              <p>
                {force.body}
                <Cite ids={force.source} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="ind-section ind-band" aria-labelledby="meaning-title">
        <div className="section-shell ind-meaning">
          <div>
            <p className="eyebrow">What it means for your practice</p>
            <h2 id="meaning-title">{industry.meaningTitle}</h2>
          </div>
          <div>
            {industry.meaning.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-section section-shell" id="the-2030-practice" aria-labelledby="vision-title">
        <div className="vrc-heading">
          <p className="eyebrow">Picture it</p>
          <h2 id="vision-title">{industry.visionTitle}</h2>
          <p>{industry.visionIntro}</p>
        </div>
        <ol className="ind-vision">
          {industry.vision.map((v) => (
            <li key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ind-section section-shell" aria-labelledby="package-title">
        <div className="vrc-heading">
          <p className="eyebrow">The complete package</p>
          <h2 id="package-title">{industry.packageTitle}</h2>
          <p>{industry.packageIntro}</p>
        </div>
        <div className="ind-package">
          {industry.packageItems.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ind-section ind-band" aria-labelledby="ask-title">
        <div className="section-shell">
          <div className="vrc-heading">
            <p className="eyebrow">Before you buy any AI</p>
            <h2 id="ask-title">{industry.askTitle}</h2>
            <p>{industry.askIntro}</p>
          </div>
          <ol className="ind-ask">
            {industry.ask.map((a) => (
              <li key={a.q}>
                <h3>{a.q}</h3>
                <p>{a.why}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {related.length > 0 && (
        <section className="vrc-proof section-shell" aria-labelledby="related-title">
          <div className="vrc-heading">
            <p className="eyebrow">Live in this industry</p>
            <h2 id="related-title">See it working for a real {industry.name.toLowerCase()} business.</h2>
          </div>
          <div className="vrc-proof-grid">
            {related.map((project) => (
              <article key={project.slug} className="vrc-proof-card">
                <div className="vrc-browser" aria-hidden="true">
                  <div className="vrc-browser-bar">
                    <i />
                    <i />
                    <i />
                    <span>{project.host}</span>
                  </div>
                  <div className="vrc-browser-window">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.screenshot} alt="" loading="lazy" />
                  </div>
                </div>
                <div className="vrc-proof-copy">
                  <div className="vrc-proof-topline">
                    <span>{project.category}</span>
                    <span>{readyToLaunch.includes(project) ? "Ready to launch" : "Live platform"}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.statement}</p>
                  <div className="vrc-proof-links">
                    {readyToLaunch.includes(project) ? null : (
                      <Link className="text-link" href={`/work/${project.slug}`}>
                        Read the case study <span aria-hidden="true">→</span>
                      </Link>
                    )}
                    <a href={`https://${project.host.replace(/^https?:\/\//, "")}/`} target="_blank" rel="noreferrer">
                      Visit {project.host} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
            {industry.extraLink && (
              <article className="vrc-proof-card ind-extra">
                <div className="vrc-proof-copy">
                  <div className="vrc-proof-topline">
                    <span>Free tool</span>
                  </div>
                  <h3>{industry.extraLink.label}</h3>
                  <p>{industry.extraLink.body}</p>
                  <div className="vrc-proof-links">
                    <Link className="text-link" href={industry.extraLink.href}>
                      Open it <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            )}
          </div>
        </section>
      )}

      <section className="vrc-faq section-shell" aria-labelledby="faq-title">
        <div>
          <p className="eyebrow">Questions owners ask</p>
          <h2 id="faq-title">Straight answers.</h2>
        </div>
        <div className="vrc-faq-list">
          {industry.faq.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="ind-section section-shell ind-sources" aria-labelledby="sources-title">
        <p className="eyebrow">Sources</p>
        <h2 id="sources-title">Where these facts come from.</h2>
        <ol>
          {industry.sources.map((s, i) => (
            <li key={s.url} id={`source-${i + 1}`}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.title}
              </a>{" "}
              — {s.publisher}, {s.date}
            </li>
          ))}
        </ol>
        <p className="ind-note">
          Vendor figures are the vendor&rsquo;s own claims, and survey figures are from the samples
          named. We update this guide as the industry moves.
        </p>
      </section>

      <DiscoveryCallSection
        eyebrow="A focused conversation about your practice"
        title={industry.closingTitle}
        body={industry.closingBody}
      />
      <SiteFooter />
    </main>
  );
}
