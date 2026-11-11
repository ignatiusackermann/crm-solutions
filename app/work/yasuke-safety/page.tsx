import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "yasuke-safety",
  name: "Yasuke Safety",
  category: "Mine supply",
  liveUrl: "https://www.yasukesafety.co.za/",
  liveLabel: "Visit the live platform",
  heroTone: "yasuke",
  screenshot: "/portfolio/yasuke-safety-desktop.jpg",
  headline: "A once-off quote button cannot take a mine's order",
  intro:
    "Yasuke Safety supplies safety boots, boiler suits and protective equipment to mines and contractors in Tete Province, Mozambique. The old website was a standard shop, with a quote request switched on. That form was built for a person buying a few items once. A mine orders for a crew, in large quantities, and then orders the same thing again.",
  meta: [
    { label: "Client", value: "Yasuke Safety" },
    { label: "Focus", value: "Bulk quotes & repeat orders" },
    { label: "Work", value: "Strategy, design, development" },
    { label: "Live since", value: "November 2026" },
  ],
  services: [
    { label: "Strategy", title: "Mine buying, not shop buying" },
    { label: "Experience", title: "A list, not a single product" },
    { label: "Platform", title: "Bulk request and reorder" },
    { label: "Assistant", title: "Sandy, by voice" },
  ],
  narrativeTitle: "The job was the order, not the catalogue.",
  narrative: [
    "A procurement officer at a mine does not browse a shop and add one pair of boots. They order for a shift: many pairs, several sizes, often a whole list, and they need a price in meticais for that list.",
    "The old quote request asked for one product at a time and treated every request as new. Large orders were being typed out by hand, and a repeat order meant starting again. The catalogue stayed. The way an order is asked for was replaced.",
  ],
  pillars: [
    {
      title: "One product, many people",
      body: "A line is a product, a colour and a size breakdown, not a single pair. The total can be sent with sizes to follow.",
    },
    {
      title: "A list, not a button",
      body: "A buyer can paste the list the stores already keep. Each line is matched to the catalogue and then adjusted.",
    },
    {
      title: "Last month's order, again",
      body: "A previous request can be opened, the quantities changed, and sent as a new quote. Nothing is retyped.",
    },
  ],
  powerTitle: "What the platform does, every day.",
  powerIntro:
    "One catalogue, two kinds of buyer, and a request that can carry a crew order instead of a single product.",
  power: [
    {
      title: "Bulk quantities on one line",
      body: "Eight pairs of one boot, or a size run, sit on a single line of the request. Sizes can follow later.",
    },
    {
      title: "Paste a stores list",
      body: "Up to thirty lines can be pasted in. Each line is matched to a product, then the buyer confirms it.",
    },
    {
      title: "Reorder a previous request",
      body: "The last order, or any earlier one, loads into a new request. Only the quantities that changed need editing.",
    },
    {
      title: "A shorter path for the smaller buyer",
      body: "A contractor who needs one kit or a few items can still add them from the public catalogue. That path was kept. It is no longer the path a mine is pushed through.",
    },
    {
      title: "Kits for a role",
      body: "Six kits cover the plant operator, the workshop, the wash plant, the geologist, the visitor and the camp. A kit is a starting list, not a single product.",
    },
    {
      title: "Sandy, by voice",
      body: "Sandy can take the same request aloud: search, add a quantity, mark sizes to follow, and name the delivery site.",
    },
    {
      title: "One reference, then the paperwork",
      body: "The request is priced in meticais on the day. The quote, delivery note and invoice follow that same reference.",
    },
    {
      title: "Two languages",
      body: "Portuguese for Mozambique is the default. English is the other. The buying path is the same in both.",
    },
  ],
  challengesTitle: "The quote form was built for the wrong order.",
  challengesIntro:
    "Each of these was a real constraint on the project. The answer is what shaped the site.",
  challenges: [
    {
      title: "A shop quote cannot hold a crew order",
      problem:
        "A standard shop quote request is one product, a small quantity, sent once. A mine's order is a list, large quantities and a size split. The old form could be filled in, and it still produced the wrong kind of request.",
      answer:
        "The request was rebuilt as lines with quantities, sizes and a size-to-follow option, so a crew order fits on one form.",
    },
    {
      title: "Large orders were being retyped",
      problem:
        "Stores already keep a list. Asking someone to search the shop once per line meant the list was copied by hand, and mistakes came with it.",
      answer:
        "A buyer can paste the list. Each line is matched to the catalogue and then checked, instead of being searched one product at a time.",
    },
    {
      title: "Every repeat order started from zero",
      problem:
        "Boots and suits are bought again next month, often in the same sizes. The old shop had no memory of the last request, so the same order was assembled again.",
      answer:
        "Any earlier request can be loaded as the start of a new one. Only the quantities that changed need editing.",
    },
    {
      title: "Two kinds of buyer were sharing one button",
      problem:
        "A contractor buying a kit, and a mine buying for a crew, were sent through the same quote request. One found it too heavy. The other found it too small.",
      answer:
        "The public site keeps the shorter request. The mine portal is the bulk path: lists, quantities, a delivery site and reorder.",
    },
    {
      title: "The old shop address still had to work",
      problem:
        "The domain moved from the previous website to this one, and the company's email stayed where it was. Old links could not simply disappear.",
      answer:
        "Old shop, contact and about addresses redirect to the new pages. The email was left where it was.",
    },
  ],
  decisionTitle: "Design the order the mine actually sends.",
  decisions: [
    {
      label: "Orientation",
      title: "Show at once who this is for",
      body: "The opening screen names the product, the province and the mines it supplies, so a procurement officer knows they are in the right place.",
    },
    {
      label: "The list",
      title: "Accept the document the buyer already has",
      body: "A spreadsheet, a photo of a list, or a pasted set of lines. The site starts from their list instead of asking them to shop.",
    },
    {
      label: "Quantity",
      title: "Make a large order the normal case",
      body: "Sizes and quantities are part of the line. A single pair is still possible. It is no longer the shape of the form.",
    },
    {
      label: "Again",
      title: "Keep the last order within reach",
      body: "Repeat buying is how a mine works. The previous request is one step away, ready to adjust and send.",
    },
  ],
  layersTitle: "Six layers working as one business.",
  layersIntro:
    "The visible website is one layer. Strategy, messaging, experience, technology, communication and stewardship were designed together.",
  layers: [
    {
      title: "Business strategy",
      body: "Separate the contractor who buys a few items from the mine that orders for a crew, and give each a path.",
    },
    {
      title: "Content & messaging",
      body: "Plain descriptions of the products, the kits and the areas served, in Portuguese and English.",
    },
    {
      title: "Experience design",
      body: "The quote is the first thing on the page. The catalogue supports the order. It does not replace it.",
    },
    {
      title: "Technical platform",
      body: "Catalogue, bulk request, reorder, the mine portal and the voice assistant on one site.",
    },
    {
      title: "Customer communication",
      body: "A reference number on the request, then the quote and the documents that follow it, in meticais.",
    },
    {
      title: "Ongoing improvement",
      body: "An owner's overview shows what the site contains and what is still to connect.",
    },
  ],
  proofTitle: "Every section answers a different commercial question.",
  proofPoints: [
    "Can you supply a whole crew, not one pair?",
    "Can I send the list I already have?",
    "Can I order the same thing again next month?",
    "Will you quote in meticais, on the day?",
    "Can I ask in Portuguese or English?",
  ],
  depthTitle: "Proof of depth—without inventing performance claims.",
  depthIntro:
    "The site went live in November 2026, so there are no order results to report yet. The measure for now is whether a mine's real order fits the form.",
  depthStats: [
    { value: "103", label: "Products a request can be built from" },
    { value: "6", label: "Role kits, each a starting list" },
    { value: "6", label: "Supply areas across Tete Province" },
    { value: "2", label: "Languages: Portuguese and English" },
  ],
  stewardshipTitle: "Launch is the beginning of the evidence—not the end of the work.",
  stewardship: [
    "The first real mine lists will show which lines the paste-and-match gets right, and which need a clearer name.",
    "Repeat orders will show what a mine buys every month, and what should sit ready for them.",
    "The portal grows into a record of each mine's requests once the real users are on it.",
  ],
  closingTitle: "Does your quote form fit the order your customer actually sends?",
};

export const metadata = caseMetadata(study);

export default function YasukeSafetyCasePage() {
  return <CaseStudyPage study={study} />;
}
