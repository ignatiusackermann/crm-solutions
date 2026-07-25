export type InsightSection = {
  heading: string;
  body: string[];
};

export type InsightArticle = {
  slug: string;
  eyebrow: string;
  question: string;
  statement: string;
  challenge: string;
  bottleneck: string;
  summary: string;
  sections: InsightSection[];
  relatedHref: string;
  relatedLabel: string;
};

export const insights: InsightArticle[] = [
  {
    slug: "why-traffic-does-not-create-revenue",
    eyebrow: "Commercial reality",
    question: "Why doesn’t more traffic create more revenue?",
    statement: "Growth breaks when tools don’t share one journey.",
    challenge:
      "The business is investing in attention—ads, content, SEO, referrals—yet the commercial result does not rise in proportion.",
    bottleneck:
      "Website, CRM, inbox, sales follow-up and retention are treated as separate projects. Value leaks in the handoffs.",
    summary:
      "Revenue improves when the customer journey is designed as one system: the offer, the proof, the next step, the follow-up and the return path.",
    sections: [
      {
        heading: "The challenge",
        body: [
          "Established businesses often already have a website, a CRM, email tools and a capable team. The assumption is that more traffic will produce more revenue.",
          "In practice, traffic only exposes the next weak link. If the offer is unclear, the enquiry path is slow, or nobody owns follow-up, extra attention becomes expensive noise.",
        ],
      },
      {
        heading: "The bottleneck",
        body: [
          "The expensive gap is rarely “we need a prettier homepage.” It is the absence of one accountable journey from first click to retained customer.",
          "Marketing measures visits. Sales measures conversations. Operations measures delivery. Nobody owns the commercial path between them.",
        ],
      },
      {
        heading: "What changes when the journey is connected",
        body: [
          "Positioning answers a real buying concern. Conversion paths make the next step obvious. Enquiries are captured with enough context to act. Follow-up happens while intent is high. Existing customers are invited into a next step.",
          "That is commercial system design—not a technology fashion cycle.",
        ],
      },
    ],
    relatedHref: "/#insights",
    relatedLabel: "Back to the homepage diagnosis",
  },
  {
    slug: "website-or-customer-journey",
    eyebrow: "The real constraint",
    question: "Is the website the constraint—or the journey after it?",
    statement: "Your website may not be the real problem.",
    challenge:
      "Leaders commission a redesign because the site feels outdated, while the harder commercial losses sit after the click.",
    bottleneck:
      "Attention without relevance, interest without action, enquiries without follow-through, and customers without a next step.",
    summary:
      "A redesign placed on a broken journey only makes leakage look better. Diagnose the journey before you decorate the front door.",
    sections: [
      {
        heading: "Four common leaks",
        body: [
          "Attention without relevance: marketing attracts visits, but the offer does not answer the buyer’s real concern.",
          "Interest without action: weak proof, confusing choices and friction reduce conversion.",
          "Enquiries without follow-through: slow response and invisible pipelines allow opportunities to decay.",
          "Customers without a next step: poor onboarding and absent retention keep lifetime value low.",
        ],
      },
      {
        heading: "How to decide what to fix first",
        body: [
          "Ask where money is currently being lost: acquisition cost, conversion rate, speed-to-lead, close rate, or repeat purchase.",
          "The first investment should attack the most expensive constraint—not the most visible design complaint.",
        ],
      },
      {
        heading: "What a useful diagnosis produces",
        body: [
          "A clear primary leak, the supporting constraints, the commercial consequence, and a practical first action the business can take with or without CRM Solutions.",
        ],
      },
    ],
    relatedHref: "/revenue-leak-audit",
    relatedLabel: "Start the Revenue Leak Audit",
  },
  {
    slug: "find-revenue-leaks",
    eyebrow: "Revenue Leak Audit",
    question: "How do you find the most expensive revenue leak?",
    statement: "Find where growth is leaking out of the system.",
    challenge:
      "Teams argue about symptoms—traffic, branding, CRM features—without a shared view of where value escapes.",
    bottleneck:
      "Without a structured diagnosis across positioning, demand, conversion, follow-up, retention and measurement, effort is scattered.",
    summary:
      "A short commercial diagnostic identifies the primary leak, supporting constraints and the first action worth taking.",
    sections: [
      {
        heading: "What the audit examines",
        body: [
          "Position: is the offer commercially convincing to the right buyer?",
          "Attract: is demand being created around real intent?",
          "Convert: is trust and the next step easy to act on?",
          "Follow through: are opportunities responded to and kept visible?",
          "Retain: is customer value compounding after the first sale?",
          "Improve: do leaders have numbers that support the next decision?",
        ],
      },
      {
        heading: "What you leave with",
        body: [
          "Your most expensive likely leak, two supporting constraints, the commercial consequence, and a practical first action.",
          "The audit is useful even if we never work together. It creates a shared language for the next investment decision.",
        ],
      },
    ],
    relatedHref: "/revenue-leak-audit",
    relatedLabel: "Run the Revenue Leak Audit",
  },
  {
    slug: "connected-revenue-platform",
    eyebrow: "The Revenue Platform",
    question: "What does a connected revenue platform actually do?",
    statement: "One connected system. Six commercial jobs.",
    challenge:
      "Buying another tool feels productive, but customers still experience a fragmented business.",
    bottleneck:
      "Website, CRM, automation and sales process are procured separately, so no one designs the handoffs.",
    summary:
      "A Revenue Platform connects six jobs—Position, Attract, Convert, Follow through, Retain and Improve—so the business behaves as one commercial system.",
    sections: [
      {
        heading: "The six commercial jobs",
        body: [
          "Position makes value and next step unmistakable.",
          "Attract creates relevant demand around buyer intent.",
          "Convert turns attention into enquiries, bookings and sales.",
          "Follow through responds faster and keeps opportunities visible.",
          "Retain improves repeat business, reviews and referrals.",
          "Improve measures the journey and acts on the next constraint.",
        ],
      },
      {
        heading: "Why connection beats accumulation",
        body: [
          "A customer does not experience your stack as separate products. They experience one business.",
          "The platform is scoped around the constraint that will move contribution profit—not around a catalogue of fashionable features.",
        ],
      },
    ],
    relatedHref: "/revenue-platform",
    relatedLabel: "Explore the Revenue Platform",
  },
  {
    slug: "proof-before-claims",
    eyebrow: "Selected work",
    question: "How do you know a platform will work before you buy it?",
    statement: "Proof beats claims.",
    challenge:
      "Buyers are asked to trust portfolios and promises without seeing how a commercial decision shaped the build.",
    bottleneck:
      "Case studies that only show aesthetics leave the investment case unexamined.",
    summary:
      "Useful proof shows the buying decision, the operating constraint and the system designed around both—not decoration alone.",
    sections: [
      {
        heading: "What proof should reveal",
        body: [
          "The commercial problem the platform was built to solve.",
          "The customer decision the experience had to support.",
          "The operating reality the business had to run after launch.",
        ],
      },
      {
        heading: "How CRM Solutions presents work",
        body: [
          "Each selected platform is framed around a different commercial problem—specialist commerce, patient journeys, product selection—so the thinking is visible before the screenshots.",
        ],
      },
    ],
    relatedHref: "/#work",
    relatedLabel: "See the selected work",
  },
  {
    slug: "no-junior-handoff",
    eyebrow: "Delivery model",
    question: "Who actually builds the system after the strategy call?",
    statement: "No junior handoff after the sale.",
    challenge:
      "Many firms sell senior involvement, then move the work to a junior delivery chain once the contract is signed.",
    bottleneck:
      "Commercial judgment disappears exactly when architecture, priorities and trade-offs become real.",
    summary:
      "CRM Solutions keeps senior judgment in the room from diagnosis through build and measurement—because the hard decisions happen after the proposal.",
    sections: [
      {
        heading: "Why handoffs destroy value",
        body: [
          "The person who understood the business case is no longer present when scope pressure, tooling choices and content gaps appear.",
          "The result is a technically completed project that misses the commercial constraint it was meant to solve.",
        ],
      },
      {
        heading: "What founder-led means here",
        body: [
          "Ignatius Ackermann remains involved in strategy, architecture, build priorities and measurement. Founder-led is not a slogan—it is a delivery control.",
          "The principle is simple: business model before feature list, customer decision before decoration, evidence before claims.",
        ],
      },
    ],
    relatedHref: "/#about",
    relatedLabel: "About the delivery model",
  },
  {
    slug: "from-diagnosis-to-live-system",
    eyebrow: "Delivery path",
    question: "How do you go from uncertainty to a working revenue system?",
    statement: "A controlled path from diagnosis to live system.",
    challenge:
      "Ambiguous projects drift: endless discovery, unclear approvals and launches that surprise the business.",
    bottleneck:
      "Without staged decisions, the team builds before the commercial architecture is settled.",
    summary:
      "A controlled path—Diagnose, Architect, Build, Launch & improve—keeps responsibilities, decisions and progress visible.",
    sections: [
      {
        heading: "Diagnose",
        body: [
          "Establish the objective, current numbers, customer journey and most expensive leakage before production begins.",
        ],
      },
      {
        heading: "Architect",
        body: [
          "Define the offer, content, journeys, system connections, measurement plan and exact scope so the build has a commercial brief.",
        ],
      },
      {
        heading: "Build",
        body: [
          "Design and develop the customer platform, integrations and automation with clear decision points—not silent assumptions.",
        ],
      },
      {
        heading: "Launch & improve",
        body: [
          "Validate the experience, prepare the business and prioritize the next commercial gain from real behaviour.",
        ],
      },
    ],
    relatedHref: "/delivery-commitment",
    relatedLabel: "Read the Delivery Commitment",
  },
  {
    slug: "revenue-platform-investment",
    eyebrow: "Investment case",
    question: "What should a revenue platform investment actually buy?",
    statement: "A serious commercial asset deserves a clear investment case.",
    challenge:
      "Website projects are often priced by page count, while the business is buying a change in revenue behaviour.",
    bottleneck:
      "Without an investment case, leaders cannot tell whether the work is an asset, a cost centre or theatre.",
    summary:
      "Revenue Platform engagements begin at US$10,000. Final investment follows complexity and the value of the constraint—not arbitrary page volume.",
    sections: [
      {
        heading: "What the investment should purchase",
        body: [
          "A clearer commercial journey, a platform the business can operate, measurement that supports decisions, and senior accountability through launch.",
        ],
      },
      {
        heading: "How the figure is shaped",
        body: [
          "Business complexity, customer journeys, content depth, integrations and the value of the problem determine scope.",
          "If the likely return cannot justify the work, the honest answer is not to proceed.",
        ],
      },
      {
        heading: "A useful break-even question",
        body: [
          "How many profitable customers must the system create—or save—to pay for itself? That question is more useful than asking how many pages the website contains.",
        ],
      },
    ],
    relatedHref: "/book-discovery-call",
    relatedLabel: "Book a Discovery Call",
  },
];

export function getInsight(slug: string) {
  return insights.find((item) => item.slug === slug) || null;
}

export function allInsightSlugs() {
  return insights.map((item) => item.slug);
}
