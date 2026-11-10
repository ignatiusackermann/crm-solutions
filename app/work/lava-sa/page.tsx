import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "lava-sa",
  name: "Lava-SA",
  category: "Specialist commerce",
  liveUrl: "https://www.lava-sa.com",
  liveLabel: "Visit the live platform",
  heroTone: "lava",
  screenshot: "/portfolio/lava-sa-desktop.jpg",
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
  powerTitle: "What the platform does, every day.",
  powerIntro:
    "Lava-SA sells vacuum sealers that cost as much as a good appliance. The site has to do the explaining a showroom would do, then take the order.",
  power: [
    {
      title: "A full online shop",
      body: "Machines, bags, rolls and spare parts, with card payment at checkout and order emails to the customer and the business.",
    },
    {
      title: "Janet, the voice assistant",
      body: "A visitor can ask a question out loud at any hour and get an answer drawn from the site’s own product information.",
    },
    {
      title: "Lava TV",
      body: "Product, care and servicing videos sit beside the machines they belong to, so a buyer can see one working before paying.",
    },
    {
      title: "Abandoned-cart reminders",
      body: "A shopper who leaves with a full basket gets a reminder by email, with the basket waiting.",
    },
    {
      title: "Reviews and rewards",
      body: "Customers are asked for a review after buying, and returning customers earn rewards on later orders.",
    },
    {
      title: "An owner’s admin",
      body: "Orders, customers, mailings and content are managed by the business, without a developer in the middle.",
    },
  ],
  challengesTitle: "Selling a serious machine to someone who cannot touch it.",
  challengesIntro:
    "Each of these was a real constraint on the project. The answer is what shaped the site.",
  challenges: [
    {
      title: "A high price, bought unseen",
      problem:
        "A buyer spending thousands of rand on a machine wants to see it, compare it and ask about it. A product photo and a price do none of that.",
      answer:
        "Every machine has its own page with video, the differences between models are set out side by side, and a voice assistant answers what is left.",
    },
    {
      title: "Three kinds of buyer in one catalogue",
      problem:
        "A hunter, a home cook and a butchery need different machines, and existing owners only want bags or a spare part. One product list serves none of them well.",
      answer:
        "The catalogue is arranged around what the buyer is trying to do, with spare parts and consumables on their own short path.",
    },
    {
      title: "The sale does not end at checkout",
      problem:
        "Bags and rolls are bought again and again. A shop that forgets the customer after the first order leaves most of the value behind.",
      answer:
        "Accounts, rewards, review requests and mailings keep the customer connected to the shop after the machine arrives.",
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
};

export const metadata = caseMetadata(study);

export default function LavaSaCasePage() {
  return <CaseStudyPage study={study} />;
}
