import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";
import { portfolio, readyToLaunch } from "./portfolio";

const title = "Work | CRM Solutions";
const description =
  "Ten live platforms built by CRM Solutions: online shops, booking engines, quoting systems, an accounting practice, a managing agent, a wedding musician and a holiday membership. Each has its own page on what it does and the challenges behind it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "CRM Solutions",
    url: "https://www.crmsolutions.app/work",
    title: "Work — ten live platforms, and the challenges behind each",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Work — ten live platforms, and the challenges behind each",
    description,
  },
};

// What the sites have in common. Counted from the case studies themselves:
// a site is counted only where its own page describes the feature.
const shared = [
  { value: "10", label: "Live platforms, each on the client’s own domain" },
  { value: "9", label: "Have a voice assistant that answers visitors aloud" },
  { value: "3", label: "Are online shops with card payment" },
  { value: "6", label: "Take bookings on the site itself" },
];

const listSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CRM Solutions portfolio",
  itemListElement: portfolio.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: `https://www.crmsolutions.app/work/${item.slug}`,
  })),
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function WorkPage() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <StandardHeader current="work" />

      <section className="work-index-hero section-shell">
        <div>
          <p className="eyebrow">Work</p>
          <h1>
            Ten live platforms. Ten different commercial problems
            <span>.</span>
          </h1>
        </div>
        <p>
          Every site here is in use by a real business today. Each has its own page that sets
          out what the platform does and the challenges the project had to solve.
        </p>
      </section>

      <section className="work-index-stats section-shell" aria-label="What the ten platforms share">
        {shared.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="work-section work-index-list">
        <div className="section-shell">
          <div className="project-list">
            {portfolio.map((project, index) => (
              <article className="project" key={project.slug}>
                <Link
                  className={`project-visual project-visual-real ${project.tone}`}
                  href={`/work/${project.slug}`}
                  aria-label={`${project.name} case study`}
                >
                  <div className="project-browser project-browser-real">
                    <div className="browser-bar">
                      <i />
                      <i />
                      <i />
                      <span>{project.host}</span>
                    </div>
                    <div className="screenshot-window">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.screenshot}
                        alt={`The ${project.name} website`}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>
                  <span className="visual-label">Live platform</span>
                </Link>
                <div className="project-copy">
                  <span className="project-number">
                    {String(index + 1).padStart(2, "0")} / {project.category}
                  </span>
                  <h2>{project.name}</h2>
                  <p>{project.statement}</p>
                  <ul>
                    {project.themes.map((theme) => (
                      <li key={theme}>{theme}</li>
                    ))}
                  </ul>
                  <Link className="text-link" href={`/work/${project.slug}`}>
                    What it does, and the challenges <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work-section work-index-list work-ready" aria-labelledby="ready-title">
        <div className="section-shell">
          <p className="eyebrow">Ready to launch</p>
          <h2 id="ready-title" className="work-ready-title">
            Built, live and waiting for their owners<span>.</span>
          </h2>
          <div className="project-list">
            {readyToLaunch.map((project) => {
              const href = project.href ?? `/work/${project.slug}`;
              return (
                <article className="project" key={project.slug}>
                  <Link
                    className={`project-visual project-visual-real ${project.tone}`}
                    href={href}
                    aria-label={`${project.name}: ready to launch`}
                  >
                    <div className="project-browser project-browser-real">
                      <div className="browser-bar">
                        <i />
                        <i />
                        <i />
                        <span>{project.host}</span>
                      </div>
                      <div className="screenshot-window">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={project.screenshot} alt={`The ${project.name} demo practice`} loading="lazy" />
                      </div>
                    </div>
                    <span className="visual-label">Ready to launch</span>
                  </Link>
                  <div className="project-copy">
                    <span className="project-number">Available / {project.category}</span>
                    <h2>{project.name}</h2>
                    <p>{project.statement}</p>
                    <ul>
                      {project.themes.map((theme) => (
                        <li key={theme}>{theme}</li>
                      ))}
                    </ul>
                    <Link className="text-link" href={href}>
                      See the practice platform <Arrow />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
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
