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
      "After years of a website that undersold them, finally one as well run as the complexes they manage.",
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
      "After years of a website that undersold him, finally one that sounds as good as he does.",
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
      "After years of a website that undersold them, finally one as premium as the products they sell.",
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
      "After years of a website that undersold them, finally one as refined as the care they give.",
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
      "After years of a website that undersold them, finally one as precisely engineered as the systems they sell.",
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
      "After years of a website that undersold them, finally one that quotes as fast as their teams work.",
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
      "After years of a website that undersold them, finally one as inviting as the beach outside the door.",
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
      "After years of a website that undersold them, finally one built as tough as the boots they sell.",
    themes: ["Bulk quantities", "Repeat orders", "Voice assistant"],
    tone: "yasuke",
    screenshot: "/portfolio/yasuke-safety-desktop.jpg",
    host: "www.yasukesafety.co.za",
  },
];
