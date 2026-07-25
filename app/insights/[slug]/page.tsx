import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../../site-components";
import { allInsightSlugs, getInsight } from "../insights";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return allInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return { title: "Insight | CRM Solutions" };
  return {
    title: `${insight.question} | CRM Solutions`,
    description: insight.summary,
  };
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default async function InsightPage({ params }: { params: Params }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  return (
    <main className="insight-page" id="top">
      <StandardHeader />
      <section className="insight-hero section-shell">
        <p className="eyebrow">{insight.eyebrow}</p>
        <h1>
          {insight.question}
          <span>.</span>
        </h1>
        <p className="insight-statement">{insight.statement}</p>
      </section>

      <section className="insight-body section-shell">
        <aside className="insight-aside">
          <div>
            <span>Challenge</span>
            <p>{insight.challenge}</p>
          </div>
          <div>
            <span>Bottleneck</span>
            <p>{insight.bottleneck}</p>
          </div>
          <Link className="text-link" href={insight.relatedHref}>
            {insight.relatedLabel} <Arrow />
          </Link>
        </aside>

        <article className="insight-copy">
          <p className="insight-summary">{insight.summary}</p>
          {insight.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <p className="insight-close">
            This page is part of the CRM Solutions commercial knowledge base—used to keep
            website guidance, Discovery Calls and the Clara voice advisor aligned to the
            same diagnosis.
          </p>
        </article>
      </section>

      <DiscoveryCallSection
        eyebrow="Turn understanding into a decision"
        title="If this is the constraint, the next conversation should be precise."
        body="Book a Discovery Call to examine whether this bottleneck is the one worth solving now—and what a connected Revenue Platform would need to change."
      />
      <SiteFooter />
    </main>
  );
}
