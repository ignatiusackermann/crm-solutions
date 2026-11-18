import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";

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

// Add each guide here as it is published.
const GUIDES = [
  {
    href: "/industries/accounting",
    name: "Accounting",
    line: "The accounting practice of 2030 is being built this year: Xero and Claude in the ledger, SARS automating the simple return, and clients asking for an adviser.",
  },
  {
    href: "/industries/medical-health",
    name: "Medical & Health",
    line: "Patients now arrive informed. AI scribes, Claude for Healthcare and AI-informed patients, within POPIA and the HPCSA rules.",
  },
  {
    href: "/industries/property-management",
    name: "Property Management",
    line: "Trustees are choosing a new kind of managing agent: arrears chased on day one, a portal for owners abroad, and a monthly pack that is never late.",
  },
  {
    href: "/industries/holiday-hospitality",
    name: "Holiday & Hospitality",
    line: "Your guests already want to book you. AI trip planners, booking-site commission and the end of price parity in South Africa.",
  },
  {
    href: "/industries/specialised-ecommerce",
    name: "Specialised E-commerce",
    line: "Specialist products are sold by confidence. R159bn of online retail, marketplaces, AI shopping agents and the 70% abandoned cart.",
  },
];

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
            <Link key={g.href} href={g.href} className="ind-guide">
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
