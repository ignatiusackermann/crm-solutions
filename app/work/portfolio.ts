// One entry per site in the portfolio. The /work index, the home page and the
// "more work" links on each case study all read this list, so a new site is
// added here once and then given its own page in app/work/<slug>/page.tsx.

export type PortfolioTone = "lava" | "star" | "storvac" | "shades" | "cpe" | "cabana" | "yasuke" | "sca" | "scap" | "sax" | "drb" | "ab";

export type PortfolioEntry = {
  slug: string;
  name: string;
  category: string;
  statement: string;
  themes: string[];
  tone: PortfolioTone;
  screenshot: string;
  host: string;
  // Where the card links. Defaults to /work/<slug>.
  href?: string;
};

export const portfolio: PortfolioEntry[] = [
  {
    slug: "sca-za",
    name: "South Coast Advisory",
    category: "Accounting",
    statement:
      "After years of a website that undersold them, finally one as precise as the books they keep.",
    themes: ["Found first", "Booked online", "Answered aloud"],
    tone: "sca",
    screenshot: "/portfolio/sca-za-desktop.jpg",
    host: "www.sca-za.co.za",
  },
  {
    slug: "sca-properties",
    name: "SCA Properties",
    category: "Property Management",
    statement:
      "The first thing trustees see is now as well run as the complexes they manage.",
    themes: ["Proposal requests", "Owner portal", "Voice assistant"],
    tone: "scap",
    screenshot: "/portfolio/sca-properties-desktop.jpg",
    host: "www.sca-properties.co.za",
  },
  {
    slug: "saxophone-for-functions",
    name: "Saxophone for Functions",
    category: "Entertainment Bookings",
    statement:
      "107 glowing reviews, and at last a website that sounds as good as he does.",
    themes: ["Event enquiries", "Diary check", "Voice assistant"],
    tone: "sax",
    screenshot: "/portfolio/saxophone-for-functions-desktop.jpg",
    host: "www.saxophone-for-functions.co.za",
  },
  {
    slug: "lava-sa",
    name: "Lava-SA",
    category: "Specialised E-commerce",
    statement:
      "Premium products deserved a premium shop window. Now they have one.",
    themes: ["Product architecture", "Buying confidence", "Commerce"],
    tone: "lava",
    screenshot: "/portfolio/lava-sa-desktop.jpg",
    host: "lava-sa.com",
  },
  {
    slug: "star-aesthetic",
    name: "Star Aesthetic",
    category: "Medical & Health E-commerce",
    statement:
      "Patients judge a clinic before they walk in. Now that first impression is as refined as the care they give.",
    themes: ["Premium identity", "Treatment clarity", "Consultations"],
    tone: "star",
    screenshot: "/portfolio/star-aesthetic-desktop.jpg",
    host: "staraesthetic.co.za",
  },
  {
    slug: "storvac",
    name: "Storvac Systems",
    category: "Specialised E-commerce",
    statement:
      "Engineered systems, finally sold by a website engineered the same way.",
    themes: ["Decision support", "Find my size", "Restrained commerce"],
    tone: "storvac",
    screenshot: "/portfolio/storvac-desktop.jpg",
    host: "storvac.co.za",
  },
  {
    slug: "shades-of-blue",
    name: "Shades of Blue",
    category: "Service Quotations",
    statement:
      "Their teams never keep a client waiting. Now neither does the quote.",
    themes: ["Quote requests", "Procurement proof", "Client area"],
    tone: "shades",
    screenshot: "/portfolio/shades-of-blue-desktop.jpg",
    host: "shadesobl.co.za",
  },
  {
    slug: "coastal-preferred-escapes",
    name: "Coastal Preferred Escapes",
    category: "Vacation Packages",
    statement:
      "A five-year family holiday membership, finally presented to feel like the holiday itself.",
    themes: ["New product launch", "Week finder", "Membership"],
    tone: "cpe",
    screenshot: "/portfolio/coastal-preferred-escapes-desktop.jpg",
    host: "coastalpreferredescapes.co.za",
  },
  {
    slug: "cabana-mio",
    name: "Cabana Mio",
    category: "Vacation Bookings",
    statement:
      "The holiday now starts on the first page, as inviting as the beach outside the door.",
    themes: ["Direct bookings", "Events calendar", "Area guides"],
    tone: "cabana",
    screenshot: "/portfolio/cabana-mio-desktop.jpg",
    host: "cabanamio.co.za",
  },
  {
    slug: "yasuke-safety",
    name: "Yasuke Safety",
    category: "Safety Wear Quotations (Mining)",
    statement:
      "Built for the mine, not the casual shopper, and as tough as the boots they sell.",
    themes: ["Bulk quantities", "Repeat orders", "Voice assistant"],
    tone: "yasuke",
    screenshot: "/portfolio/yasuke-safety-desktop.jpg",
    host: "www.yasukesafety.co.za",
  },
];

// Platforms built by CRM Solutions with no owner yet, ready to launch under a
// buyer's own name. Shown apart from the client work so they are never
// mistaken for a client project.
export const readyToLaunch: PortfolioEntry[] = [
  {
    slug: "debtreliefbiz",
    name: "DebtReliefBiz",
    category: "Debt Counselling",
    statement:
      "A debt counselling practice that answers worried callers at 2 a.m., ready to launch under a registered counsellor’s own name.",
    themes: ["Ready to launch", "Sandy answers 24/7", "Client portal & CRM"],
    tone: "drb",
    screenshot: "/portfolio/debtreliefbiz-desktop.jpg",
    host: "debtreliefbiz.co.za",
    href: "/for-debt-counsellors",
  },
  {
    slug: "aestheticbiz",
    name: "AestheticBiz",
    category: "Medical Spa (USA)",
    statement:
      "A medical spa that books, sells skincare and rewards loyalty on its own brand, ready to launch for a US practice in 90 days.",
    themes: ["Ready to launch", "Booking & retail", "Voice guide"],
    tone: "ab",
    screenshot: "/portfolio/aestheticbiz-desktop.jpg",
    host: "www.aestheticbiz.site",
    href: "https://www.aestheticbiz.site/",
  },
];
