import { IndustryPage, industryMetadata, type Industry } from "../industry-page";

// Covers both "Service Quotations" and "Safety Wear Quotations (Mining)" on the
// Work page. Sources checked 18 November 2026. Numbers in `source` refer to
// the position in `sources` (1-based).
const industry: Industry = {
  slug: "industrial-mining-supply",
  name: "Industrial & Mining Supply",
  updated: "November 2026",
  seoTitle: "AI and the Industrial Supplier of 2030 | CRM Solutions",
  seoDescription:
    "How self-service buying, AI supplier research and faster quoting are changing industrial and mining suppliers, and what a supplier ready for 2030 looks like.",
  shareTitle: "The industrial supplier of 2030 answers first",
  headline: "In industry, the order goes to the supplier who answers first",
  lede:
    "Picture your business four years from now. A procurement officer at a mine asks an AI assistant for safety-wear suppliers who can deliver a crew order to site, and your name comes up. On your site they paste their stores list, check the sizes, attach the delivery site, and send it. Your quote goes back the same day, and next month they reorder in two minutes. The site manager who needs welders by Monday gets an answer before your competitor has returned the call. Every part of that exists today. This guide shows where industrial buying stands and how to build that supplier now.",
  forcesTitle: "Six changes reshaping how industry buys.",
  forcesIntro:
    "Industrial buyers are under pressure: tighter budgets, stricter compliance and less time. They are changing how they find and choose suppliers. Each point is sourced and dated below.",
  forces: [
    {
      kicker: "Self-service",
      title: "Two in three business buyers would rather not wait for a rep.",
      body: "Gartner’s 2026 sales survey of 646 B2B buyers found that 67% prefer a rep-free buying experience, up from 61% the year before. They still want a person for questions of fit, but not to get a price.",
      source: [1],
    },
    {
      kicker: "AI research",
      title: "Supplier research now starts in AI.",
      body: "In VML’s Future Buyer 2026 study, 55% of B2B buyers said they begin supplier research with generative AI, against 45% who start with Google. Forrester found 94% of business buyers use AI somewhere in the buying process.",
      source: [2, 3],
    },
    {
      kicker: "Proof",
      title: "Buyers check what AI tells them, on your website.",
      body: "Forrester reports that procurement professionals are more likely than other buyers to lose confidence because of inaccurate AI output. They verify on the supplier’s own site: certificates, compliance and real capability.",
      source: [3],
    },
    {
      kicker: "Speed",
      title: "Most suppliers take days to reply.",
      body: "One 2026 benchmark of more than 250,000 B2B enquiries found a median first response time of about 42 hours. In a market where the first credible quote often wins, that is the opening for the supplier who answers today.",
      source: [4],
    },
    {
      kicker: "Mining procurement",
      title: "Mines buy local and buy compliant.",
      body: "South Africa’s Mining Charter set targets for mines to source most goods from South African manufacturers and B-BBEE-compliant suppliers, and in 2026 the framework is being realigned with the B-BBEE Act. Suppliers who show their compliance clearly make the procurement officer’s job easier.",
      source: [5],
    },
    {
      kicker: "Repeat orders",
      title: "The real money is in the reorder.",
      body: "Boots, overalls, steel and maintenance are bought again and again. The supplier who makes the repeat order effortless keeps the account; the one who makes the buyer start from zero invites a comparison every time.",
      source: [],
    },
  ],
  meaningTitle: "Your buyers are busy, cautious and comparing. Make it easy to choose you.",
  meaning: [
    "An industrial website is read by two people in a hurry: the person who needs the product or the crew by a date, and the procurement officer who must prove the supplier qualifies. If either has to search, phone or wait, the next supplier on the list gets the call.",
    "Most industrial suppliers still run their quoting the old way: an email, a spreadsheet, a callback tomorrow. Meanwhile their buyers have moved to self-service and AI research, and they judge a supplier by how quickly and clearly it responds.",
    "The suppliers who win the next five years will let a buyer send a complete request in minutes, show their compliance before anyone asks, answer the same day, and make the next order easier than the first.",
  ],
  visionTitle: "A week at the industrial supplier of 2030.",
  visionIntro:
    "Nothing below is science fiction. Each part is running somewhere today. The advantage goes to the supplier that puts them together first.",
  vision: [
    {
      title: "Monday 07:00 — an AI assistant shortlists you",
      body: "A procurement officer asks for suppliers who can deliver to their region. The assistant reads your products, your areas and your certificates, and puts you on the shortlist.",
    },
    {
      title: "Monday 08:30 — a complete request arrives",
      body: "Quantities, sizes, delivery site and the buyer’s own list, pasted in and matched to your catalogue. No back-and-forth to find out what they actually need.",
    },
    {
      title: "Monday 14:00 — the quote is out",
      body: "Prepared from the request, checked by a person, sent with the same reference number the delivery note and invoice will carry.",
    },
    {
      title: "Thursday — the site manager is answered",
      body: "Workers or steel needed by next week. The request comes in from a phone on site and is acknowledged at once, with a callback time.",
    },
    {
      title: "Next month — the reorder takes two minutes",
      body: "Last month’s order loaded, quantities adjusted, sent. The account stays yours without a sales visit.",
    },
  ],
  packageTitle: "Everything the buyer needs to choose you, and to order again.",
  packageIntro:
    "Your ERP or accounting system issues the invoice. What it will not build is the way a buyer finds you, trusts you and sends you the order. That is the part we build, as one system.",
  packageItems: [
    {
      title: "A quote request built for real orders",
      body: "Lines with quantities, sizes and delivery sites, a pasted list matched to your catalogue, and a reference number on every request.",
    },
    {
      title: "Repeat orders in minutes",
      body: "Any earlier request loaded as the start of a new one, so the buyer only changes what changed.",
    },
    {
      title: "Procurement proof where it is looked for",
      body: "Registration, B-BBEE status, certificates, insurance and safety documentation on the page a procurement officer checks, ready to download.",
    },
    {
      title: "A buyer portal",
      body: "Past requests, quotes and documents for each customer account, on any device, without phoning the office.",
    },
    {
      title: "A voice assistant for the site and the office",
      body: "Answers product and service questions aloud, takes a request by voice, and hands over to a person for anything complex.",
    },
    {
      title: "Content AI can read",
      body: "Clear pages for every product, service and area, structured data and an llms.txt, so AI research tools describe you accurately.",
    },
    {
      title: "Languages your buyers use",
      body: "Where your customers work across borders, the buying path in their language, such as Portuguese for Mozambique.",
    },
    {
      title: "A clear view of what is working",
      body: "Requests received, response times, quotes won and repeat orders, reported in plain language every month.",
    },
  ],
  askTitle: "Five questions to ask about how you quote.",
  askIntro: "The answers show how many orders are decided before you have even replied.",
  ask: [
    { q: "How long does a quote take, from request to reply?", why: "Measure it honestly. If it is more than a day, assume a faster competitor is quoting the same job." },
    { q: "Can a buyer send their whole list at once?", why: "If they must search one product at a time, large orders get retyped, delayed or sent elsewhere." },
    { q: "Is your compliance visible without asking?", why: "Procurement officers verify suppliers. If the documents are not on your site, you add a step to their job." },
    { q: "How easy is the second order?", why: "If a repeat order starts from zero, every reorder is a chance for a competitor to quote." },
    { q: "What would an AI assistant say about you?", why: "Ask one. If it cannot find your products, areas and certificates, it will shortlist someone else." },
  ],
  relatedSlugs: ["yasuke-safety", "shades-of-blue"],
  faq: [
    {
      q: "Do industrial buyers really buy online?",
      a: "They research and request online. Gartner found 67% of B2B buyers prefer a rep-free experience, and most now start supplier research with AI or search. The order may still be confirmed by a person, but the decision starts on your website.",
    },
    {
      q: "Why not just use email for quotes?",
      a: "Email works until volume grows. Requests arrive incomplete, get lost, and repeat orders are retyped. A structured request captures everything once and keeps the history for the next order.",
    },
    {
      q: "How do mining procurement rules affect suppliers?",
      a: "Mines have targets for local and B-BBEE-compliant procurement, and in 2026 the framework is being realigned with the B-BBEE Act. Suppliers are not bound directly, but showing compliance clearly helps mines meet their targets and choose you.",
    },
    {
      q: "Can the site handle different prices for different customers?",
      a: "Yes. A request-for-quote flow lets you price each request for the customer and volume, rather than publishing one price for everyone.",
    },
    {
      q: "Does this work for services as well as products?",
      a: "Yes. Labour hire, fabrication and maintenance requests follow the same pattern: a complete request, proof of capability, a fast reply and an easy repeat.",
    },
    {
      q: "How long does a project like this take?",
      a: "Most supplier platforms go live in weeks, because the structure is proven. The Discovery Call is where we agree the scope and the timeline.",
    },
  ],
  sources: [
    { title: "Gartner sales survey finds 67% of B2B buyers prefer a rep-free experience", publisher: "Gartner", date: "March 2026", url: "https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience" },
    { title: "AI reshapes B2B buying: VML’s The Future Buyer 2026", publisher: "MediaNews4U", date: "November 2026", url: "https://www.medianews4u.com/ai-reshapes-b2b-buying-as-brand-trust-and-risk-aversion-influence-supplier-choices-vmls-future-buyer-2026/" },
    { title: "The state of business buying, 2026", publisher: "Forrester", date: "2026", url: "https://www.forrester.com/blogs/state-of-business-buying-2026" },
    { title: "Speed to lead in 2026 (B2B response-time benchmark)", publisher: "MarketBetter", date: "2026", url: "https://marketbetter.ai/blog/speed-to-lead-guide/" },
    { title: "How Stella Ndabeni and the mining industry are getting the SME groove back", publisher: "Daily Maverick", date: "February 2026", url: "https://www.dailymaverick.co.za/article/2026-02-15-how-stella-ndabeni-and-the-mining-industry-are-getting-the-sme-groove-back" },
  ],
  closingTitle: "Picture every request answered before your competitor calls back. Let us build it this year.",
  closingBody:
    "Book a 60-minute Discovery Call with Ignatius. We will look at how buyers find and request from you today, how long your quotes take, and which part of the 2030 supplier is worth building first.",
};

export const metadata = industryMetadata(industry);

export default function IndustrialMiningSupplyIndustryPage() {
  return <IndustryPage industry={industry} />;
}
