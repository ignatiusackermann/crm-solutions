// The published industry guides. The /industries hub, the Industries menu and
// the "Read the industry guide" link on each case study all read this list,
// so a new guide is added here once.

export type Guide = {
  slug: string;
  name: string;
  line: string;
  // Case studies (and ready-to-launch platforms) that belong to this industry.
  workSlugs: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "accounting",
    name: "Accounting",
    line: "The accounting practice of 2030 is being built this year: Xero and Claude in the ledger, SARS automating the simple return, and clients asking for an adviser.",
    workSlugs: ["sca-za"],
  },
  {
    slug: "medical-health",
    name: "Medical & Health",
    line: "Patients now arrive informed. AI scribes, Claude for Healthcare and AI-informed patients, within POPIA and the HPCSA rules.",
    workSlugs: ["star-aesthetic", "aestheticbiz"],
  },
  {
    slug: "property-management",
    name: "Property Management",
    line: "Trustees are choosing a new kind of managing agent: arrears chased on day one, a portal for owners abroad, and a monthly pack that is never late.",
    workSlugs: ["sca-properties"],
  },
  {
    slug: "holiday-hospitality",
    name: "Holiday & Hospitality",
    line: "Your guests already want to book you. AI trip planners, booking-site commission and the end of price parity in South Africa.",
    workSlugs: ["cabana-mio", "coastal-preferred-escapes"],
  },
  {
    slug: "specialised-ecommerce",
    name: "Specialised E-commerce",
    line: "Specialist products are sold by confidence. R159bn of online retail, marketplaces, AI shopping agents and the 70% abandoned cart.",
    workSlugs: ["lava-sa", "storvac"],
  },
  {
    slug: "industrial-mining-supply",
    name: "Industrial & Mining Supply",
    line: "The order goes to the supplier who answers first. Self-service buying, AI supplier research, mining procurement and the two-minute reorder.",
    workSlugs: ["shades-of-blue", "yasuke-safety"],
  },
  {
    slug: "entertainment-bookings",
    name: "Entertainment Bookings",
    line: "Couples book the entertainer who answers first. AI wedding planning, instant replies, reviews by venue and a diary that books itself.",
    workSlugs: ["saxophone-for-functions"],
  },
  {
    slug: "debt-counselling",
    name: "Debt Counselling",
    line: "People in debt look for help at 2 a.m. Record household debt, rising rates and a first conversation without shame.",
    workSlugs: ["debtreliefbiz"],
  },
];

export function guideForWork(workSlug: string): Guide | undefined {
  return GUIDES.find((g) => g.workSlugs.includes(workSlug));
}
