// Shot list for video 01 (docs/videos/01-sca-za.md, section D).
// The consultation form is typed into with sample data and never submitted.

export const name = "01-sca-za";
const SITE = "https://www.sca-za.co.za";

export const shots = [
  {
    id: "hero",
    url: `${SITE}/`,
    run: async (s) => {
      await s.hold(4);
    },
  },
  {
    id: "proof-stats",
    url: `${SITE}/`,
    run: async (s) => {
      // Portrait: the four proof stats sit below the headline.
      await s.scrollTo(320, 2);
      await s.hold(2.5);
    },
    only: "portrait",
  },
  {
    id: "sandy",
    url: `${SITE}/`,
    run: async (s) => {
      await s.hold(1);
      await s.click(".sandy-launch");
      await s.hold(4);
    },
  },
  {
    id: "consultation-form",
    url: `${SITE}/`,
    run: async (s) => {
      await s.scrollToElement('form input[name="name"]', 1.5, 160);
      await s.hold(0.5);
      await s.type('form input[name="name"]', "Thandi Mokoena");
      await s.type('form input[name="email"]', "thandi@example.com");
      await s.type('form textarea[name="message"]', "SARS letter about my VAT. Can we talk?");
      await s.hold(2);
    },
  },
  {
    id: "services",
    url: `${SITE}/services`,
    run: async (s) => {
      await s.hold(1);
      await s.scrollTo(0.72, 7);
      await s.hold(0.5);
    },
  },
  {
    id: "xero",
    url: `${SITE}/xero`,
    run: async (s) => {
      await s.hold(1);
      await s.scrollTo(1400, 5);
    },
  },
  {
    id: "sars-deadlines",
    url: `${SITE}/resources/sars-deadlines`,
    run: async (s) => {
      await s.hold(1);
      await s.scrollTo(1600, 5);
    },
  },
  {
    id: "guide-library",
    url: `${SITE}/resources/library`,
    run: async (s) => {
      await s.hold(1);
      await s.scrollTo(1800, 5);
    },
  },
  {
    id: "glossary",
    url: `${SITE}/glossary`,
    run: async (s) => {
      await s.hold(1);
      await s.scrollTo(2400, 5);
    },
  },
  {
    id: "book-calendar",
    url: `${SITE}/book`,
    run: async (s) => {
      await s.hold(1);
      await s.scrollTo(500, 2.5);
      await s.hold(2);
    },
  },
  {
    id: "home-overview",
    url: `${SITE}/`,
    run: async (s) => {
      await s.hold(1);
      await s.scrollTo(0.9, 12);
    },
    only: "landscape",
  },
  {
    id: "old-site-before",
    url: "https://web.archive.org/web/2024/https://www.sca-za.com/",
    run: async (s) => {
      await s.hold(4);
    },
    only: "landscape",
  },
];
