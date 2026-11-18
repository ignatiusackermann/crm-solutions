import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";
import { GUIDES } from "./guides";

const description =
  "Sourced guides to how AI and customer expectations are changing each industry we build for, and what a business ready for 2030 looks like.";

export const metadata: Metadata = {
  title: "Industry Guides: AI and the 2030 Business | CRM Solutions",
  description,
  alternates: { canonical: "/industries" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "CRM Solutions",
    url: "https://www.crmsolutions.app/industries",
    title: "Industry guides: what the 2030 business looks like",
    description,
  },
  twitter: { card: "summary_large_image", title: "Industry guides: what the 2030 business looks like", description },
};


export default function IndustriesPage() {
  return (
    <main id="top" className="ind-page">
      <StandardHeader />
      <section className="ind-hero section-shell">
        <p className="eyebrow">Industry guides</p>
        <h1>
          Every industry is changing. Here is what the next five years look like
          <span>.</span>
        </h1>
        <p className="ind-lede">{description}</p>
      </section>
      <section className="ind-section section-shell">
        <div className="ind-guides">
          {GUIDES.map((g) => (
            <Link key={g.slug} href={`/industries/${g.slug}`} className="ind-guide">
              <h2>{g.name}</h2>
              <p>{g.line}</p>
              <span className="text-link">
                Read the guide <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <DiscoveryCallSection />
      <SiteFooter />
    </main>
  );
}
