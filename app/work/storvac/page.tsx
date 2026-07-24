import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "storvac",
  name: "Storvac Systems",
  category: "Product selection",
  liveUrl: "https://www.storvac.co.za/",
  liveLabel: "Visit Storvac",
  eyebrow: "Case study · Storvac Systems",
  headline: "Help buyers choose the right size—faster",
  intro:
    "Storvac Systems sells solutions where the wrong fit wastes money. The platform had to help visitors understand capacity, compare options and reach a confident selection without a long sales call for every enquiry.",
  challengeTitle: "Specification anxiety slows the sale.",
  challenge: [
    "Buyers often know they need a solution—but not which capacity or configuration is correct.",
    "Too much technical detail too early creates hesitation; too little creates wrong orders.",
    "Sales time is wasted answering the same sizing questions that a clear journey can resolve online.",
  ],
  approachTitle: "Decision support first. Commerce second.",
  approach: [
    {
      title: "Find my size thinking",
      body: "Designed the experience around the buyer’s real question: what fits my need—not what sits in the catalogue.",
    },
    {
      title: "Decision support",
      body: "Made capacity and selection criteria understandable so visitors can self-qualify before contacting the team.",
    },
    {
      title: "Restrained commerce",
      body: "Kept the storefront focused on the right next step—enquire, specify or buy—without noisy ecommerce theatre.",
    },
    {
      title: "Sales handoff",
      body: "Prepared clearer enquiries so conversations start with a defined need instead of a blank slate.",
    },
  ],
  resultsTitle: "Faster fit. Fewer wrong turns. Better conversations.",
  results: [
    "Shorter path from interest to a suitable product direction",
    "Less confusion around sizing and selection",
    "Higher-quality enquiries for the sales team",
  ],
  themes: ["Decision support", "Find my size", "Restrained commerce"],
  visualClass: "storvac",
  brandLabel: "STORVAC",
  brandLine: "The right fit, faster.",
  ctaHint:
    "Useful when product fit is the bottleneck—and your website should qualify and guide before the sales call.",
};

export const metadata = caseMetadata(study);

export default function StorvacCasePage() {
  return <CaseStudyPage study={study} />;
}
