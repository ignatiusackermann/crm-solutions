import { IndustryPage, industryMetadata, type Industry } from "../industry-page";

// Sources checked 18 November 2026. Numbers in `source` refer to the
// position in `sources` (1-based).
const industry: Industry = {
  slug: "debt-counselling",
  name: "Debt Counselling",
  updated: "November 2026",
  seoTitle: "AI and the Debt Counselling Practice of 2030 | CRM Solutions",
  seoDescription:
    "How record household debt, rising rates and AI are changing debt counselling in South Africa, and what a debt counselling practice ready for 2030 looks like.",
  shareTitle: "The debt counselling practice of 2030 answers at 2 a.m.",
  headline: "People in debt look for help at 2 a.m. The practice that answers wins their trust",
  lede:
    "Picture your practice four years from now. At 02:10 a mother who cannot sleep over a garnishee order finds your site. She talks to your assistant in her own words, without shame and without a form, learns what debt review would mean for her, and books a call-back for the morning. Her documents arrive through a secure link, the Form 17.1 notifications go out on time, and she can see her progress every month until the day her clearance certificate arrives. Every part of that exists today. This guide shows where debt counselling stands and how to build that practice now.",
  forcesTitle: "Five changes reshaping debt counselling.",
  forcesIntro:
    "More South Africans need help than ever, and they look for it in private, on their phones. Each point is sourced and dated below.",
  forces: [
    {
      kicker: "Household debt",
      title: "Household debt is at about 62% of disposable income.",
      body: "The Reserve Bank’s June 2026 Quarterly Bulletin put household debt at about 62.2% of disposable income in the first quarter of 2026, with debt-service costs at 8.4% of disposable income.",
      source: [1],
    },
    {
      kicker: "Rates",
      title: "Borrowing costs are rising again.",
      body: "After a period of relief, interest rates have turned upward in 2026, putting fresh pressure on households that were already stretched.",
      source: [2],
    },
    {
      kicker: "Every income level",
      title: "Debt pressure reaches high earners too.",
      body: "DebtBusters’ 2026 data shows some higher-income consumers needing more than their entire monthly income to service debt. The client of a debt counsellor is no longer only the low earner.",
      source: [3],
    },
    {
      kicker: "The process",
      title: "Debt review runs on forms, deadlines and trust.",
      body: "Each application is notified to credit providers and credit bureaus on the NCR’s Form 17.1, and ends with a clearance certificate on Form 19. Every step is a chance to lose a client, or to keep them confident.",
      source: [4],
    },
    {
      kicker: "Shame",
      title: "People in debt hide it, and search in private.",
      body: "Debt is one of the hardest things to talk about. The first conversation increasingly happens alone, at night, online. The practice that makes that first step feel safe gets the call.",
      source: [],
    },
  ],
  meaningTitle: "The first conversation decides who the client trusts.",
  meaning: [
    "Most people who need debt review wait too long, because asking for help feels like admitting failure. When they finally search, it is late at night, and they are frightened. A website with a long form and a phone number for office hours sends them back to bed with nothing.",
    "At the same time, the work inside a practice is heavy: assessments, budgets, notifications, court or tribunal processes, payment distribution, and years of monthly contact. The practices that win the next five years will make the first conversation feel safe and the long journey feel visible, with technology doing the routine work.",
  ],
  visionTitle: "A client’s journey through the practice of 2030.",
  visionIntro:
    "Nothing below is science fiction. Each part is running somewhere today. The advantage goes to the practice that puts them together first.",
  vision: [
    {
      title: "02:10 — someone finally asks for help",
      body: "They talk to your assistant out loud, in their own words. It explains debt review in plain language, without judgement, and books a free call-back for the morning.",
    },
    {
      title: "09:00 — the counsellor calls, already prepared",
      body: "The conversation summary, income, expenses and creditors are already in the file. The first call is about the person, not the paperwork.",
    },
    {
      title: "Day 2 — documents arrive without chasing",
      body: "Payslips, statements and ID uploaded through a secure link, with reminders that stop the moment they arrive.",
    },
    {
      title: "Every month — progress they can see",
      body: "A client portal shows payments made, balances falling and the next milestone. Clients who can see progress stay the course.",
    },
    {
      title: "The last day — the clearance certificate",
      body: "The Form 19 issued, the bureaus notified, and a message that says what the client has achieved. Then a request for a review, and a referral.",
    },
  ],
  packageTitle: "A practice that feels safe to the client and runs smoothly for the team.",
  packageIntro:
    "Your debt review system handles the restructuring. What it will not build is how a frightened person finds you, trusts you and stays with you. That is the part we build.",
  packageItems: [
    { title: "A website that feels safe at 2 a.m.", body: "Calm, plain-language pages on debt review, garnishees, costs and what to expect, written to reduce shame, not add to it." },
    { title: "A voice assistant that listens", body: "Lets people explain their situation out loud, answers their questions honestly, and books a call-back with a registered counsellor." },
    { title: "A qualification check", body: "A short, private check that tells people whether debt review could help, before anyone asks for their ID number." },
    { title: "Secure document collection", body: "Upload links, checklists and automatic reminders, with documents stored where you know and access limited." },
    { title: "A client portal", body: "Payments, balances, progress and messages in one place, so clients stay informed and stay the course." },
    { title: "A CRM for the whole journey", body: "Every lead, call-back, application and milestone in one place, with reminders for each deadline." },
    { title: "Your NCR registration, front and centre", body: "Your registration number and credentials where every visitor sees them, because trust starts there." },
    { title: "A clear view of what is working", body: "Enquiries, call-backs, applications and completions by source, reported in plain language every month." },
  ],
  askTitle: "Five questions to ask about your practice.",
  askIntro: "The answers show how many people reach out to you, and how many give up before they do.",
  ask: [
    { q: "What happens when someone visits your site at 2 a.m.?", why: "If the answer is a form and an office number, most of them will not be there in the morning." },
    { q: "Does your site make people feel judged?", why: "Read it as someone ashamed of their debt. The tone decides whether they reach out." },
    { q: "How long does it take to collect documents?", why: "Every day of chasing delays the application and tests the client’s commitment." },
    { q: "Can clients see their own progress?", why: "Debt review lasts years. Clients who can see balances falling are far less likely to drop out." },
    { q: "How do you use AI with clients’ financial data?", why: "To listen, summarise and remind, with a person deciding. Data stays private under POPIA and is never used to train anyone’s model." },
  ],
  relatedSlugs: ["debtreliefbiz"],
  extraLink: {
    href: "/for-debt-counsellors",
    label: "The debt counselling website that answers at 2 a.m.",
    body: "See the complete practice platform: the website, Sandy the voice assistant, the client portal and the CRM, ready to launch under your own name and NCR number.",
  },
  faq: [
    { q: "Who can offer debt counselling in South Africa?", a: "Only debt counsellors registered with the National Credit Regulator. Their registration number should be visible on their website and documents." },
    { q: "What happens when someone applies for debt review?", a: "The debt counsellor notifies credit providers and credit bureaus, the consumer’s profile is flagged, and they cannot take new credit until the restructured debt is paid and a clearance certificate is issued." },
    { q: "Can AI give debt advice?", a: "An assistant can explain the process, answer common questions and book a call-back. The assessment and advice must come from a registered debt counsellor." },
    { q: "Is it safe to collect clients’ financial documents online?", a: "It can be, with secure upload links, limited access, a known storage location and providers that do not train on your data, as POPIA requires." },
    { q: "Is there a ready-made platform for a debt counselling practice?", a: "Yes. DebtReliefBiz is a complete practice platform, ready to launch under a registered counsellor’s own name and NCR number." },
    { q: "How long does a project like this take?", a: "A ready-made practice platform can be live in days; a custom build in weeks. The Discovery Call is where we agree what suits your practice." },
  ],
  sources: [
    { title: "Borrowing costs rise again: SA’s fragile recovery comes under fresh pressure (SARB Quarterly Bulletin)", publisher: "Bizcommunity", date: "2026", url: "https://www.bizcommunity.com/article/borrowing-costs-rise-again-sas-fragile-recovery-comes-under-fresh-pressure-858103a" },
    { title: "Interest rate pain is back. Is SA ready for what comes next?", publisher: "Press Portal", date: "June 2026", url: "https://pressportal.co.za/business-and-economy/story/6frgttntq5gnpan9pggb-20260605.html" },
    { title: "South Africa’s top earners hit breaking point as debt swallows 100% of monthly income", publisher: "The Citizen", date: "2026", url: "https://www.citizen.co.za/business/personal-finance/south-africas-top-earners-hit-breaking-point-as-debt-swallows-100-of-monthly-income/" },
    { title: "List of forms (Forms 16, 17.1 and 19)", publisher: "National Credit Regulator", date: "current", url: "https://www.ncr.org.za/index.php/act/list-of-forms" },
  ],
  closingTitle: "Picture the next frightened caller finding you at 2 a.m. Let us build it this year.",
  closingBody:
    "Book a 60-minute Discovery Call with Ignatius. We will look at how people find and reach your practice today, where clients drop away, and whether a ready-made platform or a custom build is the right first step.",
};

export const metadata = industryMetadata(industry);

export default function DebtCounsellingIndustryPage() {
  return <IndustryPage industry={industry} />;
}
