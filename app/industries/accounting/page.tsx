import { IndustryPage, industryMetadata, type Industry } from "../industry-page";

// Sources checked 18 November 2026. Numbers in `source` refer to the
// position in `sources` (1-based).
const industry: Industry = {
  slug: "accounting",
  name: "Accounting",
  updated: "November 2026",
  seoTitle: "AI and the Accounting Practice of 2030 | CRM Solutions",
  seoDescription:
    "How AI, Xero, Claude and SARS automation are changing South African accounting practices, and what a practice ready for 2030 looks like.",
  shareTitle: "The accounting practice of 2030 is being built this year",
  headline: "The accounting practice of 2030 is being built this year",
  lede:
    "Picture your practice four years from now. New clients find you at night and book themselves in. Bank reconciliations finish before anyone opens Xero. Clients hear from you all year, not only when you need documents. And the partners spend their best hours advising, which is what clients have wanted all along. Every part of that exists today. This guide shows where the industry stands, what is changing, and how to build that practice now.",
  forcesTitle: "Six changes that are reshaping the practice.",
  forcesIntro:
    "Some of these are outside your control. All of them have already started. Each one is sourced and dated below, because a practice that advises on facts deserves a guide that does the same.",
  forces: [
    {
      kicker: "SARS",
      title: "The simple return is becoming SARS’s job.",
      body: "SARS expected to issue about six million auto-assessments in July 2026, and this year extended them to some provisional taxpayers for the first time. The once-a-year individual return is a shrinking source of fees.",
      source: [1],
    },
    {
      kicker: "Xero + Claude",
      title: "Claude is moving inside the ledger.",
      body: "In March 2026 Xero and Anthropic announced a multi-year partnership that puts Claude inside Xero and lets Xero data be used in Claude. Xero says the shared financial data is used only within the user’s session and not to train Claude’s models.",
      source: [2],
    },
    {
      kicker: "Xero JAX",
      title: "Reconciliation and month-end are being automated.",
      body: "Xero’s JAX now reads source documents into Xero and reconciles bank transactions automatically; Xero claims it saves around half of the monthly reconciliation time. In August 2026 it added a month-end agent, and XeroForce lets firms build their own agents from a written prompt.",
      source: [3, 4],
    },
    {
      kicker: "Claude for finance",
      title: "Agents for the close, the audit and the spreadsheet.",
      body: "In May 2026 Anthropic released ready-made finance agents, including a ledger reconciler, a month-end closer and a statement auditor, with Claude add-ins for Excel, Word and PowerPoint. Work that filled junior hours is becoming a reviewed, assisted task.",
      source: [5],
    },
    {
      kicker: "Clients",
      title: "Clients want an adviser, and most firms are not one yet.",
      body: "In a 2026 survey of accounting clients, 91% wanted their firm to act as a proactive business adviser, but only 4% described their firm as primarily advisory. One in three already turns to AI or online research for regulatory guidance.",
      source: [6],
    },
    {
      kicker: "People",
      title: "Skilled people are scarce, and AI is now part of the job.",
      body: "SAIPA has estimated a shortage of more than 20,000 skilled accounting professionals in South Africa. SAICA’s January 2026 assessment tested digital fluency alongside judgement, and 88% of US accountants in Intuit’s 2026 survey already use AI for client work.",
      source: [7, 8, 9],
    },
  ],
  meaningTitle: "The compliance fee shrinks. The relationship becomes the product.",
  meaning: [
    "When SARS files the simple return and software reconciles the bank, the hours a practice used to bill for disappear. That is the frightening half of the story, and it is the half most practices are living through: busier than ever, with the easy fees quietly thinning out.",
    "The other half is the opportunity. Clients do not want less from their accountant. They want more: answers between deadlines, a warning before a cash-flow problem, someone who knows their business. The practices that win the next five years will be the ones that turn freed-up hours into advice, and make it easy for the right new clients to find them.",
    "That is not a software decision alone. It is how the practice is found, how a new client is welcomed, how documents arrive, and how every client hears from you all year. Those are exactly the parts most practices still run by hand.",
  ],
  visionTitle: "A day in the practice of 2030.",
  visionIntro: "Nothing below is science fiction. Each part is running somewhere today; the advantage goes to the practice that puts them together first.",
  vision: [
    {
      title: "23:40 — a new client finds you",
      body: "A business owner who cannot sleep over a SARS letter searches for a Xero accountant nearby. Your practice is the first result, your credentials are the first thing they read, and your assistant answers two questions aloud before they book a consultation for the morning.",
    },
    {
      title: "07:00 — the books are already current",
      body: "Bank feeds reconciled overnight, documents read and filed, exceptions flagged for a person to review. The team starts the day on judgement, not data entry.",
    },
    {
      title: "10:00 — documents arrive without chasing",
      body: "Each client has a checklist and an upload link. Reminders go out on their own and stop when the file arrives. Nobody spends October on the phone.",
    },
    {
      title: "14:00 — the partner advises",
      body: "With compliance running on rails, the partner reviews a client’s cash-flow forecast and phones before the problem lands. This is the service clients told the surveys they want.",
    },
    {
      title: "All year — every client hears from you",
      body: "The Budget Speech changes that affect them, the provisional tax dates, a reminder to check an auto-assessment before accepting it. Written once in the practice’s own voice, sent automatically.",
    },
  ],
  packageTitle: "Everything the client sees, connected to everything the practice does.",
  packageIntro:
    "Xero and Claude will automate the ledger. What they will not build is how your practice is found, chosen and remembered. That is the part we build, as one system rather than six subscriptions.",
  packageItems: [
    {
      title: "A website that wins the local search",
      body: "A page for every service, for Xero and for your town, written for the searches business owners type and the AI assistants they now ask. Structured data and an llms.txt so search engines and AI tools understand the practice.",
    },
    {
      title: "A voice assistant that speaks for the practice",
      body: "Answers questions on tax, payroll and Xero aloud, at any hour, in plain language, and turns the conversation into a booked consultation.",
    },
    {
      title: "Consultations booked straight into the diary",
      body: "A free first conversation, requested from any page or chosen on the calendar, with confirmations and reminders sent automatically.",
    },
    {
      title: "Onboarding and document collection",
      body: "A clear first-year journey for every new client, checklists, secure upload links and follow-ups that stop when the documents arrive.",
    },
    {
      title: "A year-round client contact calendar",
      body: "The messages that keep clients close between deadlines, written in your voice and sent on schedule, so the relationship never goes silent.",
    },
    {
      title: "Guides that earn trust and an email address",
      body: "Deadline calendars, checklists and plain-language explanations that answer tonight’s question and start the relationship before the first invoice.",
    },
    {
      title: "Reviews you approve",
      body: "Happy clients leave a testimonial, nothing appears until the practice approves it, and every new review strengthens the local search.",
    },
    {
      title: "A clear view of what is working",
      body: "Which searches, pages and conversations bring new clients in, reported in plain language every month.",
    },
  ],
  askTitle: "Five questions to ask before AI touches client data.",
  askIntro: "Accountants carry their clients’ most sensitive information. The right AI makes the practice safer, not looser. These are the questions we answer before anything goes live.",
  ask: [
    { q: "Is client data used to train the AI?", why: "It should not be. Ask for it in writing, as Xero states for its Claude integration." },
    { q: "Where is the data stored, and who can see it?", why: "POPIA applies to every client record. Know the operator, the country and the access list." },
    { q: "What can the AI do without a person approving it?", why: "Agents should prepare and flag. Postings, submissions and payments need a human sign-off and a clear limit." },
    { q: "Can every answer be traced?", why: "A reviewer should see which document or rule an answer came from, and correct it." },
    { q: "Does it speak in the practice’s voice?", why: "An assistant on your website is your practice talking. It should be trained on your services and your boundaries, and know when to hand over to a person." },
  ],
  relatedSlugs: ["sca-za"],
  extraLink: {
    href: "/for-accounting-practices",
    label: "How many clients must you win just to stay the same size?",
    body: "A four-minute calculator for practice owners: what a client is worth over the years they stay, how many leave, and the replacement number in Rand.",
  },
  faq: [
    {
      q: "Will AI replace accountants?",
      a: "It is replacing tasks, not the accountant: data entry, bank reconciliation and first drafts of routine work. Judgement, advice and accountability stay with people, and that is the work clients say they want more of.",
    },
    {
      q: "Is Claude really part of Xero now?",
      a: "Xero and Anthropic announced a multi-year partnership in March 2026 to bring Claude into Xero and Xero data into Claude. Xero has said the features roll out over time, so availability depends on your region and plan.",
    },
    {
      q: "What does SARS auto-assessment mean for my practice?",
      a: "Fewer simple individual returns to file. SARS expected about six million auto-assessments in 2026 and extended them to some provisional taxpayers. The value shifts to checking assessments, planning and advice.",
    },
    {
      q: "Is it safe to use AI with client financial data under POPIA?",
      a: "It can be, if the provider does not train on your data, you know where it is stored, access is limited, and a person approves anything that leaves the practice. Ask those questions in writing.",
    },
    {
      q: "We already have a website. Why rebuild it?",
      a: "Because most practice websites were built to be looked at, not to win clients. If yours has not produced enquiries, the problem is usually that it cannot be found for the right searches, says little about why you are trusted, and makes the first step hard.",
    },
    {
      q: "How long does a project like this take?",
      a: "Most practice platforms go live in weeks, not months, because the structure is proven. The Discovery Call is where we agree the scope and the timeline for your practice.",
    },
  ],
  sources: [
    { title: "Changes for filing season 2026", publisher: "SARS", date: "2026", url: "https://www.sars.gov.za/latest-news/changes-for-filing-season-2026/" },
    { title: "Xero and Anthropic collaborate to bring AI-powered financial intelligence to millions of small businesses", publisher: "Xero", date: "March 2026", url: "https://www.xero.com/media-releases/xero-and-anthropic-collaborate/" },
    { title: "Xero announces new AI innovations at Xerocon London", publisher: "Xero", date: "July 2026", url: "https://www.xero.com/media-releases/xero-announces-new-ai-innovations-xerocon-london/" },
    { title: "Xero announces new AI innovations for small businesses and accountants at Xerocon US", publisher: "Xero", date: "August 2026", url: "https://www.xero.com/media-releases/new-ai-innovations-xerocon-denver/" },
    { title: "Anthropic launches AI agents for financial services", publisher: "CFOtech", date: "May 2026", url: "https://cfotech.news/story/anthropic-launches-ai-agents-for-financial-services" },
    { title: "Your clients are happy. They’re also learning to live without you (ClearlyRated 2026 survey of 180 US accounting clients)", publisher: "CustomerThink", date: "2026", url: "https://customerthink.com/your-clients-are-happy-theyre-also-learning-to-live-without-you/" },
    { title: "South Africa is running out of accountants", publisher: "BusinessTech (citing SAIPA)", date: "2023", url: "https://businesstech.co.za/news/business/745255/south-africa-is-running-out-of-accountants/" },
    { title: "Building the CAs of tomorrow: SAICA’s January 2026 IAC results", publisher: "The Public Dispatch", date: "2026", url: "https://publicdispatch.co.za/story/building-the-cas-of-tomorrow-saicas-january-2026-iac-results-signal-a-profession" },
    { title: "Intuit’s 2026 Accountant Technology Survey (725 US professionals)", publisher: "Accounting Today", date: "2026", url: "https://www.accountingtoday.com/partnerinsights/article/intuit/intuits-2026-accountant-technology-survey-ai-fragmentation-and-the-future-of-the-profession" },
  ],
  closingTitle: "Picture your practice in 2030. Let us build it this year.",
  closingBody:
    "Book a 60-minute Discovery Call with Ignatius. We will look at how new clients find you today, where the practice still runs by hand, and which part of the 2030 practice is worth building first.",
};

export const metadata = industryMetadata(industry);

export default function AccountingIndustryPage() {
  return <IndustryPage industry={industry} />;
}
