import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "lava-sa",
  name: "Lava-SA",
  category: "Specialist commerce",
  liveUrl: "https://www.lava-sa.com",
  liveLabel: "Visit Lava-SA",
  eyebrow: "Case study · Lava-SA",
  headline: "Turn a specialist catalogue into confident buying",
  intro:
    "Lava-SA needed more than a product list online. Buyers had to understand specialised equipment, trust the advice, choose the right option and complete a secure purchase—without getting lost in technical detail.",
  challengeTitle: "Complex products. High consideration. Easy drop-off.",
  challenge: [
    "Specialist buyers need education before they are ready to purchase—not a generic shop layout.",
    "Too many choices without clear guidance slows decisions and increases support load.",
    "Trust, shipping certainty and after-sale confidence matter as much as the product page itself.",
  ],
  approachTitle: "A commerce platform built around how specialists actually decide.",
  approach: [
    {
      title: "Product architecture",
      body: "Organised the catalogue around real buying paths so visitors find the right category and comparison faster.",
    },
    {
      title: "Buying confidence",
      body: "Added education, proof and clarity where hesitation usually appears—before checkout, not after a failed sale.",
    },
    {
      title: "Commerce operations",
      body: "Connected the storefront to cart, checkout, payment and order handling so the commercial journey stays intact from interest to fulfilment.",
    },
    {
      title: "Premium presentation",
      body: "Kept the experience calm and authoritative so a specialist brand feels as credible online as it does in person.",
    },
  ],
  resultsTitle: "A store that sells with explanation—not pressure.",
  results: [
    "Clearer path from browsing to the right product choice",
    "Stronger confidence before payment",
    "A platform the business can operate and improve as the range grows",
  ],
  themes: ["Product architecture", "Buying confidence", "Commerce"],
  visualClass: "lava",
  brandLabel: "LAVA",
  brandLine: "Freshness, sealed.",
  ctaHint:
    "Useful when your catalogue is specialised, the ticket size is meaningful, and the website must educate as well as sell.",
};

export const metadata = caseMetadata(study);

export default function LavaSaCasePage() {
  return <CaseStudyPage study={study} />;
}
