import { IndustryPage, industryMetadata, type Industry } from "../industry-page";

// Sources checked 18 November 2026. Numbers in `source` refer to the
// position in `sources` (1-based).
const industry: Industry = {
  slug: "specialised-ecommerce",
  name: "Specialised E-commerce",
  updated: "November 2026",
  seoTitle: "AI Shopping and the Specialist Store of 2030 | CRM Solutions",
  seoDescription:
    "How AI shopping agents, marketplaces and R159bn of South African online retail are changing specialist stores, and what a store ready for 2030 looks like.",
  shareTitle: "The specialist store of 2030 sells like its best salesperson",
  headline: "Specialist products are not sold by a catalogue. They are sold by confidence",
  lede:
    "Picture your store four years from now. A buyer asks an AI assistant which machine suits a small workshop, and it recommends yours, because your site explains it better than anyone. On your site they compare two models side by side, ask your assistant a technical question aloud, choose the right capacity, and pay. Nothing comes back. The phone rings less, and the orders that do need a conversation arrive already qualified. Every part of that exists today. This guide shows where online retail stands and how to build that store now.",
  forcesTitle: "Six changes reshaping specialist online retail.",
  forcesIntro:
    "South Africans are buying more online than ever, but not from more stores. Each point is sourced and dated below.",
  forces: [
    {
      kicker: "The market",
      title: "Online passed 10% of South African retail.",
      body: "World Wide Worx projects South African online retail at about R159 billion in 2026, growing by roughly 22.5%, and online sales passed 10% of national retail turnover in mid-2026. Overall retail grew about 4%.",
      source: [1, 2],
    },
    {
      kicker: "The shopper",
      title: "Fewer people shop online, but they spend more.",
      body: "Only 34.2% of adults shop online, slightly fewer than a year before, yet those who do are spending more. The specialist store’s buyer is experienced, comparing, and hard to impress.",
      source: [3],
    },
    {
      kicker: "Marketplaces",
      title: "The marketplaces own the casual purchase.",
      body: "Takealot is used by 35.3% of online shoppers and Shein by 21.5%. A specialist store cannot win on range or price. It wins on knowing the product better than anyone.",
      source: [3],
    },
    {
      kicker: "AI shopping",
      title: "AI assistants are becoming the shop window.",
      body: "In January 2026 Google announced the Universal Commerce Protocol, which lets shoppers buy from approved merchants inside AI Mode and Gemini. ChatGPT now uses the Agentic Commerce Protocol to show products and send buyers to the merchant’s own checkout. Both read your product data, not your design.",
      source: [4, 5],
    },
    {
      kicker: "Checkout",
      title: "Seven in ten carts are still abandoned.",
      body: "The Baymard Institute’s compilation of 50 studies puts the average online cart abandonment rate at about 70%. Unexpected extra costs are the most common reason.",
      source: [6],
    },
    {
      kicker: "The specialist",
      title: "Doubt is the real competitor.",
      body: "For a high-consideration product, the buyer’s fear of choosing wrong costs more sales than any rival. The stores that explain, compare and reassure turn that fear into an order.",
      source: [],
    },
  ],
  meaningTitle: "Your best salesperson cannot be on every page. Now the website can be.",
  meaning: [
    "Every specialist seller knows the pattern. A serious buyer looks at a product for a long time, sends a question nobody answers until tomorrow, and buys somewhere else, or not at all. The products that need the most explaining are the ones a plain online catalogue sells worst.",
    "AI changes both ends of that. Shoppers increasingly ask an assistant first, and the assistant recommends the stores whose product information it can read and trust. And on your own site, an assistant can answer the technical question at 22:00 the way your best salesperson would.",
    "The specialist stores that win the next five years will be the clearest source of truth about their products: for buyers, for search engines and for AI.",
  ],
  visionTitle: "A day in the specialist store of 2030.",
  visionIntro:
    "Nothing below is science fiction. Each part is running somewhere today. The advantage goes to the store that puts them together first.",
  vision: [
    {
      title: "08:00 — an AI assistant recommends you",
      body: "A buyer asks which model suits their workload. The assistant reads your specifications, comparisons and guides, and names your product with a link to your store.",
    },
    {
      title: "22:00 — the technical question is answered",
      body: "Your assistant explains the difference between two capacities aloud, using your own product knowledge, and helps the buyer choose the right one.",
    },
    {
      title: "22:10 — the order goes through",
      body: "Total cost shown up front, delivery dates clear, payment in a few taps. No surprise at checkout, no abandoned cart.",
    },
    {
      title: "Next week — the buyer becomes an owner",
      body: "Setup guides, care instructions and a check-in message arrive on their own. Fewer support calls, fewer returns.",
    },
    {
      title: "Every few months — they come back",
      body: "Consumables, accessories and upgrades offered at the right time, to the right customer, in the store’s own voice.",
    },
  ],
  packageTitle: "A store that sells like your best salesperson, and keeps the customer.",
  packageIntro:
    "Marketplaces sell products. A specialist store sells certainty. That is what we build, as one system rather than a theme and a stack of plugins.",
  packageItems: [
    {
      title: "Product pages that answer every question",
      body: "Specifications, use cases, comparisons and honest guidance on who each product is for, written for buyers and readable by AI.",
    },
    {
      title: "Selection tools",
      body: "Capacity guides, comparison tables and product finders that help a buyer choose the right model without a phone call.",
    },
    {
      title: "A voice assistant that knows the range",
      body: "Answers technical questions aloud, at any hour, from your own product knowledge, and hands over to a person for complex orders.",
    },
    {
      title: "A checkout without surprises",
      body: "Delivery and total cost shown early, guest checkout, secure local payment and clear delivery dates.",
    },
    {
      title: "Product data ready for AI shopping",
      body: "Structured product data, clean feeds and an llms.txt, so search engines and AI assistants can read, compare and recommend your products accurately.",
    },
    {
      title: "Education that builds trust",
      body: "Guides, videos and buying advice that answer the questions before purchase and reduce returns after it.",
    },
    {
      title: "After-sale journeys",
      body: "Setup help, care reminders, consumables and upgrade offers that turn one order into a customer relationship.",
    },
    {
      title: "A clear view of what is working",
      body: "Which products, pages and searches bring orders, where buyers drop off, and what returns cost, every month.",
    },
  ],
  askTitle: "Five questions to ask about your online store.",
  askIntro: "The answers show how much of your expertise is reaching the buyer, and how much is still stuck in your head.",
  ask: [
    { q: "Could a buyer choose the right product without phoning you?", why: "If not, every sale waits for you, and the buyers who will not wait go elsewhere." },
    { q: "Does the full cost appear before checkout?", why: "Unexpected costs are the most common reason carts are abandoned." },
    { q: "What would an AI assistant say about your products?", why: "Ask one. If it cannot find your specifications on your own site, it will recommend a competitor’s." },
    { q: "How many orders come back, and why?", why: "Returns are usually a selection problem the website could have solved." },
    { q: "Do you hear from customers after the sale?", why: "Consumables, upgrades and referrals live in the relationship after the first order." },
  ],
  relatedSlugs: ["lava-sa", "storvac"],
  extraLink: {
    href: "/value-of-returning-customer",
    label: "What is one returning customer worth to you?",
    body: "A quick calculator: what a customer who buys again is worth over the years, and what keeping them is worth to the business.",
  },
  faq: [
    {
      q: "How big is online retail in South Africa?",
      a: "World Wide Worx projects about R159 billion in 2026, roughly 10% of all retail, growing much faster than retail overall.",
    },
    {
      q: "Should a specialist store sell on Takealot instead?",
      a: "Marketplaces can add reach, but they compete on range and price. A specialist’s own store is where expertise, margin and the customer relationship live. Many do both.",
    },
    {
      q: "What is agentic commerce?",
      a: "AI assistants that help shoppers find, compare and sometimes buy products on their behalf. They rely on clear, structured product information from the merchant.",
    },
    {
      q: "Can ChatGPT or Gemini sell my products?",
      a: "Google’s AI Mode and Gemini can complete purchases for approved merchants, currently in limited markets. ChatGPT shows products and sends buyers to the merchant’s checkout. In both cases, clear product data on your own site is the starting point.",
    },
    {
      q: "How do I reduce cart abandonment?",
      a: "Show the full cost early, allow guest checkout, keep checkout short, and make delivery dates clear. Those are the reasons shoppers give most often for leaving.",
    },
    {
      q: "How long does a project like this take?",
      a: "Most specialist stores go live in weeks, because the structure is proven. The Discovery Call is where we agree the scope and the timeline.",
    },
  ],
  sources: [
    { title: "SA online retail to reach R159 billion in 2026", publisher: "World Wide Worx", date: "September 2026", url: "https://www.worldwideworx.com/?p=3097" },
    { title: "SA online retail races to R159bn as growth accelerates", publisher: "ITWeb", date: "September 2026", url: "https://www.itweb.co.za/article/sa-online-retail-races-to-r159bn-as-growth-accelerates/o1Jr5MxPopQMKdWL" },
    { title: "Online retail in South Africa 2026 (World Wide Worx)", publisher: "TechCentral", date: "September 2026", url: "https://techcentral.co.za/online-retail-south-africa-2026-world-wide-worx/285678/" },
    { title: "Google agentic checkout: buying in AI Mode and Gemini", publisher: "BigCommerce", date: "2026", url: "https://www.bigcommerce.com/articles/ecommerce/google-agentic-checkout/" },
    { title: "ACP vs UCP: which agentic commerce protocol?", publisher: "Pento", date: "2026", url: "https://www.pento.ai/blog/acp-vs-ucp" },
    { title: "Cart abandonment rate statistics", publisher: "Baymard Institute", date: "2025–2026", url: "https://baymard.com/blog/cart-abandonment-rate-statistics" },
  ],
  closingTitle: "Picture your store selling like your best salesperson. Let us build it this year.",
  closingBody:
    "Book a 60-minute Discovery Call with Ignatius. We will look at where buyers hesitate today, what an AI assistant says about your products, and which part of the 2030 store is worth building first.",
};

export const metadata = industryMetadata(industry);

export default function SpecialisedEcommerceIndustryPage() {
  return <IndustryPage industry={industry} />;
}
