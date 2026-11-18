// One entry per site in the portfolio. The /work index, the home page and the
// "more work" links on each case study all read this list, so a new site is
// added here once and then given its own page in app/work/<slug>/page.tsx.

export type PortfolioTone = "lava" | "star" | "storvac" | "shades" | "cpe" | "cabana" | "yasuke" | "sca" | "scap" | "sax";

export type PortfolioEntry = {
  slug: string;
  name: string;
  category: string;
  statement: string;
  themes: string[];
  tone: PortfolioTone;
  screenshot: string;
  host: string;
};

export const portfolio: PortfolioEntry[] = [
  {
    slug: "sca-za",
    name: "South Coast Advisory",
    category: "Accounting",
    statement:
      "Forty-six years of loyal clients, and not one of them came from the website.",
    themes: ["Found first", "Booked online", "Answered aloud"],
    tone: "sca",
    screenshot: "/portfolio/sca-za-desktop.jpg",
    host: "www.sca-za.co.za",
  },
  {
    slug: "sca-properties",
    name: "SCA Properties",
    category: "Managing agents",
    statement:
      "Turning a managing agent’s website into the place a trustee asks for a proposal.",
    themes: ["Proposal requests", "Owner portal", "Voice assistant"],
    tone: "scap",
    screenshot: "/portfolio/sca-properties-desktop.jpg",
    host: "www.sca-properties.co.za",
  },
  {
    slug: "saxophone-for-functions",
    name: "Saxophone for Functions",
    category: "Wedding & event music",
    statement:
      "Letting a couple hear the saxophonist, check his diary and send a booking in one visit.",
    themes: ["Event enquiries", "Diary check", "Voice assistant"],
    tone: "sax",
    screenshot: "/portfolio/saxophone-for-functions-desktop.jpg",
    host: "www.saxophone-for-functions.co.za",
  },
  {
    slug: "lava-sa",
    name: "Lava-SA",
    category: "Specialist commerce",
    statement:
      "Turning a specialist product catalogue into a premium commerce and education platform.",
    themes: ["Product architecture", "Buying confidence", "Commerce"],
    tone: "lava",
    screenshot: "/portfolio/lava-sa-desktop.jpg",
    host: "lava-sa.com",
  },
  {
    slug: "star-aesthetic",
    name: "Star Aesthetic",
    category: "Aesthetic practice",
    statement:
      "Structuring complex treatment choices into a calm, credible patient journey.",
    themes: ["Premium identity", "Treatment clarity", "Consultations"],
    tone: "star",
    screenshot: "/portfolio/star-aesthetic-desktop.jpg",
    host: "staraesthetic.co.za",
  },
  {
    slug: "storvac",
    name: "Storvac Systems",
    category: "Product selection",
    statement:
      "Helping buyers understand capacity and find the right solution faster.",
    themes: ["Decision support", "Find my size", "Restrained commerce"],
    tone: "storvac",
    screenshot: "/portfolio/storvac-desktop.jpg",
    host: "storvac.co.za",
  },
  {
    slug: "shades-of-blue",
    name: "Shades of Blue",
    category: "Industrial services",
    statement:
      "Replacing a brochure site with a quoting system for labour hire, steel and building maintenance.",
    themes: ["Quote requests", "Procurement proof", "Client area"],
    tone: "shades",
    screenshot: "/portfolio/shades-of-blue-desktop.jpg",
    host: "shadesobl.co.za",
  },
  {
    slug: "coastal-preferred-escapes",
    name: "Coastal Preferred Escapes",
    category: "Holiday membership",
    statement:
      "Launching a five-year family holiday membership that a visitor can understand in one visit.",
    themes: ["New product launch", "Week finder", "Membership"],
    tone: "cpe",
    screenshot: "/portfolio/coastal-preferred-escapes-desktop.jpg",
    host: "coastalpreferredescapes.co.za",
  },
  {
    slug: "cabana-mio",
    name: "Cabana Mio",
    category: "Holiday resort",
    statement:
      "Giving a beach resort its own booking engine, and its guests a reason to choose the dates.",
    themes: ["Direct bookings", "Events calendar", "Area guides"],
    tone: "cabana",
    screenshot: "/portfolio/cabana-mio-desktop.jpg",
    host: "cabanamio.co.za",
  },
  {
    slug: "yasuke-safety",
    name: "Yasuke Safety",
    category: "Mine supply",
    statement:
      "Replacing a once-off shop quote with a bulk request a mine can send again.",
    themes: ["Bulk quantities", "Repeat orders", "Voice assistant"],
    tone: "yasuke",
    screenshot: "/portfolio/yasuke-safety-desktop.jpg",
    host: "www.yasukesafety.co.za",
  },
];
