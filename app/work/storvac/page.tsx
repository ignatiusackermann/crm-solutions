import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "storvac",
  name: "Storvac Systems",
  category: "Specialised E-commerce",
  liveUrl: "https://www.storvac.co.za/",
  liveLabel: "Visit the live platform",
  heroTone: "storvac",
  screenshot: "/portfolio/storvac-desktop.jpg",
  headline: "Every wrong choice cost a return, an apology and a customer",
  shareDescription:
    "Storvac Systems lets buyers choose the right capacity themselves, so each order fits the first time and sales calls are about delivery.",
  intro:
    "When a buyer picks the wrong capacity, everybody loses: the product comes back, the buyer is frustrated, and the sale becomes a cost. Storvac Systems used to prevent that one long sales call at a time. Picture it instead: the buyer works out exactly what fits, chooses with confidence, and the first conversation with Storvac is about delivery, not about what they need.",
  meta: [
    { label: "Client", value: "Storvac Systems" },
    { label: "Focus", value: "Selection & enquiry" },
    { label: "Work", value: "Strategy, design, development" },
    { label: "Outcome", value: "Clearer product fit" },
  ],
  services: [
    { label: "Strategy", title: "Selection diagnosis" },
    { label: "Experience", title: "Find-my-size design" },
    { label: "Platform", title: "Product journey build" },
    { label: "Sales", title: "Qualified enquiry path" },
  ],
  narrativeTitle: "The fear of buying the wrong one.",
  narrative: [
    "Technical buyers hesitate for one reason: they are afraid of getting the specification wrong. That fear turns into long calls, slow decisions, or no decision at all.",
    "So the platform leads with decision support: capacity explained, the right configuration found, and only then the order or the enquiry.",
  ],
  pillars: [
    {
      title: "Decision support before detail",
      body: "Help buyers answer “what fits?” before drowning them in technical options.",
    },
    {
      title: "Restrained commerce",
      body: "Keep the storefront focused on the correct next step—specify, enquire or buy.",
    },
    {
      title: "Better sales conversations",
      body: "Raise enquiry quality so the team starts with a defined need, not a blank slate.",
    },
  ],
  powerTitle: "What happens while the sales team is on other calls.",
  powerIntro:
    "The site does the specifying, so the buyers who do call already know what they want.",
  power: [
    {
      title: "Find my size",
      body: "A size guide shows what fits in each bag, so a buyer can choose the right one before reaching the basket.",
    },
    {
      title: "Card or EFT checkout",
      body: "Customers pay by card or by bank transfer, and choose courier delivery or collection.",
    },
    {
      title: "Customer accounts",
      body: "A returning customer signs in, sees past orders and repeats one with a single button.",
    },
    {
      title: "Live stock",
      body: "The shop shows when a product is running low or out of stock, and stock drops as orders are paid.",
    },
    {
      title: "Abandoned-cart reminders",
      body: "A shopper who leaves with a full basket gets a reminder by email.",
    },
    {
      title: "An owner’s admin",
      body: "The owner adds and edits products, prices and photos, marks EFT orders as paid and handles refunds.",
    },
  ],
  challengesTitle: "A small catalogue that still has to feel like a proper shop.",
  challengesIntro:
    "Each of these was a real constraint on the project. The answer is what shaped the site.",
  challenges: [
    {
      title: "Buyers do not know their size",
      problem:
        "The wrong bag is a wasted order and a return. Most first-time buyers cannot tell from a list of dimensions which one fits their need.",
      answer:
        "A size guide sets out what each bag holds in plain terms, and it comes before price or checkout.",
    },
    {
      title: "Few products, full expectations",
      problem:
        "A shop with a handful of products is still judged against the big retailers: payment choice, order emails, accounts and delivery options.",
      answer:
        "The complete shop was built at the right scale: card and EFT, accounts, order history, stock and delivery choices, with nothing added for show.",
    },
    {
      title: "The owner must run it alone",
      problem:
        "A small shop cannot call a developer every time a price changes or an EFT payment arrives.",
      answer:
        "Products, stock, orders and refunds are all handled by the owner in a plain admin area.",
    },
  ],
  decisionTitle: "Design the sizing decision—not merely the pages.",
  decisions: [
    {
      label: "Orientation",
      title: "Clarify the problem the buyer is trying to solve",
      body: "Open with commercial context so visitors self-select into the right path quickly.",
    },
    {
      label: "Capacity & fit",
      title: "Make selection criteria understandable",
      body: "Translate technical variables into practical guidance that reduces wrong-choice risk.",
    },
    {
      label: "Comparison",
      title: "Help buyers narrow options with confidence",
      body: "Show differences that matter to the decision—not every specification at once.",
    },
    {
      label: "Next step",
      title: "Convert clarity into a qualified action",
      body: "Move from understanding to enquiry or purchase while the fit decision is still fresh.",
    },
  ],
  layersTitle: "Six layers working as one commercial system.",
  layersIntro:
    "Selection guidance, messaging, experience, technology, sales handoff and improvement were treated as one operating journey.",
  layers: [
    {
      title: "Business strategy",
      body: "Identify where poor fit and slow selection were costing growth.",
    },
    {
      title: "Content & messaging",
      body: "Explain capacity and options in language buyers can act on.",
    },
    {
      title: "Experience design",
      body: "Guide visitors through find-my-size thinking without catalogue overwhelm.",
    },
    {
      title: "Technical platform",
      body: "Build a clean product and enquiry system the business can operate.",
    },
    {
      title: "Sales communication",
      body: "Pass clearer requirements into human follow-up.",
    },
    {
      title: "Ongoing improvement",
      body: "Use real selection behaviour to refine guidance after launch.",
    },
  ],
  proofTitle: "Every section answers a different commercial question.",
  proofPoints: [
    "What problem am I solving?",
    "What size or configuration do I need?",
    "How do options differ?",
    "What should I do next?",
    "How does the sales team take it from here?",
  ],
  depthTitle: "Proof of depth—without inventing performance claims.",
  depthIntro:
    "The work is measured by decision quality: faster fit, fewer wrong turns, and better conversations.",
  depthStats: [
    { value: "1", label: "Selection-led product journey" },
    { value: "4", label: "Decision stages designed end-to-end" },
    { value: "6", label: "Business layers built together" },
    { value: "Live", label: "Operating platform in market" },
  ],
  stewardshipTitle: "Launch is the beginning of the evidence—not the end of the work.",
  stewardship: [
    "Buyer questions reveal where sizing guidance still needs sharpening.",
    "Enquiry quality shows whether the digital path is doing its job.",
    "The platform remains a commercial tool for selection—not a static brochure.",
  ],
  closingTitle: "Picture every buyer choosing right the first time. What would that save you?",
};

export const metadata = caseMetadata(study);

export default function StorvacCasePage() {
  return <CaseStudyPage study={study} />;
}
