import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, StandardHeader } from "../../site-components";
import { getInsight } from "../../insights/insights";
import ContactThankYouHero from "./thank-you-hero";

export const metadata: Metadata = {
  title: "Thank You | Contact CRM Solutions",
  description: "Your message to CRM Solutions has been received.",
  robots: { index: false, follow: false },
};

const FEATURED_INSIGHTS = [
  "find-revenue-leaks",
  "website-or-customer-journey",
  "why-traffic-does-not-create-revenue",
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function ContactThankYouPage() {
  const insights = FEATURED_INSIGHTS.map((slug) => getInsight(slug)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );

  return (
    <main id="top" className="thank-you-page">
      <StandardHeader current="contact" />
      <ContactThankYouHero />

      <section className="contact-next section-shell">
        <div className="contact-next-head">
          <p className="eyebrow">While you wait</p>
          <h2>Stay with the problem — useful next steps.</h2>
        </div>
        <div className="contact-next-grid">
          <article className="contact-next-card">
            <span>01</span>
            <h3>Book a Discovery Call</h3>
            <p>
              A focused 60-minute conversation with Ignatius about the constraint, the
              numbers and whether a Revenue Platform is the right next step.
            </p>
            <Link className="text-link" href="/book-discovery-call">
              Choose a time <Arrow />
            </Link>
          </article>
          <article className="contact-next-card">
            <span>02</span>
            <h3>Take the Revenue Leak Audit</h3>
            <p>
              A short diagnostic that surfaces where attention, enquiries or revenue may be
              leaking — useful before or after we speak.
            </p>
            <Link className="text-link" href="/revenue-leak-audit">
              Start the survey <Arrow />
            </Link>
          </article>
          <article className="contact-next-card">
            <span>03</span>
            <h3>Read a practical insight</h3>
            <p>
              Short articles on traffic, journeys and connected revenue systems — written for
              owners who want clarity, not marketing noise.
            </p>
            <Link className="text-link" href="/#insights">
              Browse insights <Arrow />
            </Link>
          </article>
        </div>
      </section>

      {insights.length > 0 ? (
        <section className="contact-insights section-shell">
          <div className="contact-insights-head">
            <p className="eyebrow">From the insights library</p>
            <h2>Worth reading while the reply is on its way.</h2>
          </div>
          <ul className="contact-insights-list">
            {insights.map((item) => (
              <li key={item.slug}>
                <Link href={`/insights/${item.slug}`}>
                  <span>{item.question}</span>
                  <em>{item.statement}</em>
                  <b>
                    Read <Arrow />
                  </b>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <SiteFooter />
    </main>
  );
}
