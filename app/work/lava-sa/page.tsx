import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "lava-sa",
  name: "Lava-SA",
  category: "Specialist commerce",
  liveUrl: "https://www.lava-sa.com",
  liveLabel: "Visit the live platform",
  heroTone: "lava",
  headline: "From specialist catalogue to a premium ecommerce system",
  intro:
    "Lava-SA needed a commercial platform that educates specialist buyers, builds trust around high-consideration products, and carries the sale cleanly from selection to payment and fulfilment.",
  meta: [
    { label: "Client", value: "Lava-SA" },
    { label: "Focus", value: "Specialist commerce" },
    { label: "Work", value: "Strategy, design, development" },
    { label: "Outcome", value: "Connected buying journey" },
  ],
  services: [
    { label: "Strategy", title: "Commercial diagnosis" },
    { label: "Experience", title: "Buying-path design" },
    { label: "Platform", title: "Ecommerce build" },
    { label: "Operations", title: "Checkout & fulfilment" },
  ],
  narrativeTitle: "The job was bigger than selling machines.",
  narrative: [
    "A catalogue alone does not create confident purchase decisions. Specialist buyers need orientation, comparison, reassurance and a clear next step before they commit money and operational change.",
    "The work was to design the commercial journey around how those buyers actually decide—then build the storefront, content and checkout as one connected system.",
  ],
  pillars: [
    {
      title: "Systems built for scale",
      body: "Product architecture, cart, checkout and order handling designed so growth does not break the operating model.",
    },
    {
      title: "Content that converts intent",
      body: "Education and proof placed where hesitation appears, so traffic becomes informed demand.",
    },
    {
      title: "A brand presence that sells trust",
      body: "Premium presentation that matches the seriousness of the purchase—not a generic template shop.",
    },
  ],
  decisionTitle: "Design the buying decision—not merely the pages.",
  decisions: [
    {
      label: "Search & orientation",
      title: "Help the right buyer find the right category quickly",
      body: "Structure the catalogue around real purchase paths so visitors are not forced to reverse-engineer the range.",
    },
    {
      label: "Comparison & confidence",
      title: "Reduce uncertainty before checkout",
      body: "Make differences, fit and reassurance visible while intent is high—before abandoned carts become lost sales.",
    },
    {
      label: "Purchase & payment",
      title: "Carry the decision through a clean commercial close",
      body: "Checkout and payment should feel as trustworthy as the advisory content that led there.",
    },
    {
      label: "After the sale",
      title: "Keep the relationship intact after payment",
      body: "Order clarity and post-sale connection protect reputation and create room for repeat business.",
    },
  ],
  layersTitle: "Six layers working as one business.",
  layersIntro:
    "The visible website is only one layer. Strategy, messaging, experience, technology, communication and stewardship were designed together.",
  layers: [
    {
      title: "Business strategy",
      body: "Clarify the commercial objective, buyer types and where value is won or lost.",
    },
    {
      title: "Content & messaging",
      body: "Explain products and proof in language that supports a buying decision.",
    },
    {
      title: "Experience design",
      body: "Guide attention through selection, trust and action without noise.",
    },
    {
      title: "Technical platform",
      body: "Build the storefront and commerce mechanics as a reliable operating system.",
    },
    {
      title: "Customer communication",
      body: "Keep enquiries, orders and follow-up connected to the same journey.",
    },
    {
      title: "Ongoing improvement",
      body: "Treat launch as the start of evidence—not the end of the work.",
    },
  ],
  proofTitle: "Every section answers a different commercial question.",
  proofPoints: [
    "What do we sell—and to whom?",
    "Why should a specialist trust this source?",
    "Which option fits my need?",
    "What happens after I pay?",
    "How does the business fulfil and support the sale?",
  ],
  depthTitle: "Proof of depth—without inventing performance claims.",
  depthIntro:
    "The measure of the work is commercial completeness: a coherent journey from first visit to fulfilled order, not decorative pages.",
  depthStats: [
    { value: "1", label: "Connected commerce journey" },
    { value: "4", label: "Decision stages designed end-to-end" },
    { value: "6", label: "Business layers built together" },
    { value: "Live", label: "Operating platform in market" },
  ],
  stewardshipTitle: "Launch is the beginning of the evidence—not the end of the work.",
  stewardship: [
    "Real buyer behaviour reveals the next constraint.",
    "Product, content and checkout can be improved from evidence—not opinion.",
    "The platform remains a commercial asset the business can operate and extend.",
  ],
  closingTitle: "Do you need a new website—or a better revenue engine?",
  brandLabel: "LAVA",
  brandLine: "Freshness, sealed.",
  brandCta: "Shop the range",
};

export const metadata = caseMetadata(study);

export default function LavaSaCasePage() {
  return <CaseStudyPage study={study} />;
}
