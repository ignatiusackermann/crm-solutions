import { IndustryPage, industryMetadata, type Industry } from "../industry-page";

// Sources checked 18 November 2026. Numbers in `source` refer to the
// position in `sources` (1-based).
const industry: Industry = {
  slug: "property-management",
  name: "Property Management",
  updated: "November 2026",
  seoTitle: "AI and the Managing Agent of 2030 | CRM Solutions",
  seoDescription:
    "How compliance, levy arrears, AI and owner expectations are changing sectional title and HOA management, and what a managing agent ready for 2030 looks like.",
  shareTitle: "The managing agent of 2030: trusted by trustees, chosen before the meeting",
  headline: "Trustees are choosing a new kind of managing agent",
  lede:
    "Picture your agency four years from now. A board chair, tired of late reports, finds you at night and reads exactly how you would run their scheme. Owners in Johannesburg and London check their levy statements and maintenance requests on their phones. Arrears are followed up on day one, with every document ready for CSOS. The monthly pack lands on time, every time. Trustees stop chasing, and start recommending. Every part of that exists today. This guide shows where the industry stands and how to build that agency now.",
  forcesTitle: "Six changes reshaping property management.",
  forcesIntro:
    "Community schemes are run by volunteers who carry legal duties and other people’s money. The rules are tightening, the owners expect more, and the tools have changed. Each point is sourced below.",
  forces: [
    {
      kicker: "Arrears",
      title: "Trustees must pursue arrears, and delay makes it worse.",
      body: "Under the Sectional Titles Schemes Management Act, trustees cannot let arrears slide; doing so invites challenge from paying owners. A unit cannot transfer until its levy arrears are settled or secured, and arrears left for months become harder to recover.",
      source: [1, 2],
    },
    {
      kicker: "CSOS",
      title: "The Ombud wants a complete file.",
      body: "Schemes can apply to the Community Schemes Ombud Service for an order to pay arrears, but adjudicators can reject claims where the documentation is incomplete. The agent who keeps clean records wins the case.",
      source: [3],
    },
    {
      kicker: "Regulation",
      title: "An unregistered agent is a risk the board carries.",
      body: "Under the Property Practitioners Act, managing agents must hold a valid Fidelity Fund Certificate. A scheme that appoints an unregistered agent may be unable to claim from the Fidelity Fund if something goes wrong.",
      source: [4],
    },
    {
      kicker: "Owners",
      title: "Boards expect self-service, not phone calls.",
      body: "In an AppFolio survey of association board members, 57% said it is extremely or very important that management companies use modern technology and offer self-service tools.",
      source: [5],
    },
    {
      kicker: "AI",
      title: "Most community managers already use AI.",
      body: "A 2025 snap survey by the Community Associations Institute’s research foundation found about seven in ten respondents already using AI in some form, and nearly three in ten using it daily, for drafting, summarising and answering owners.",
      source: [6],
    },
    {
      kicker: "The agency",
      title: "Agencies are adopting automation fast.",
      body: "A 2026 Buildium survey of about 1,000 property management professionals found a third of companies already using AI or automation, and half of the rest planning or investigating it.",
      source: [7],
    },
  ],
  meaningTitle: "Trustees do not want a cheaper agent. They want to stop worrying.",
  meaning: [
    "Most boards that change managing agent are not shopping on price. They are tired: of reports that arrive late, of arrears nobody seems to chase, of owners who live far away and phone the chair because they cannot get an answer anywhere else.",
    "Those frustrations are exactly what modern systems remove. Statements, requests, documents and reminders can run on their own, and AI can draft the routine replies so the portfolio manager spends time on the scheme, not the inbox.",
    "The agents who win the next five years will make that visible before the trustees meet them: a website that answers the board’s real questions, a proposal they can take to the meeting, and proof that the monthly pack will never be late again.",
  ],
  visionTitle: "A month in the managing agency of 2030.",
  visionIntro:
    "Nothing below is science fiction. Each part is running somewhere today. The advantage goes to the agency that puts them together first.",
  vision: [
    {
      title: "Day 1 — levies out, arrears followed up",
      body: "Statements go to every owner automatically. Anyone unpaid gets a polite reminder the same day, and the file for CSOS starts building itself, with every notice dated.",
    },
    {
      title: "Any night — a board chair finds you",
      body: "They read how you handle arrears, reporting and maintenance, ask your assistant two questions aloud, and request a proposal for their 40-unit complex before bed.",
    },
    {
      title: "Day 7 — the monthly pack, on time",
      body: "Income and expenditure, arrears, reserve fund, maintenance log: prepared from the books, reviewed by a person, and in the trustees’ hands without a reminder.",
    },
    {
      title: "Any day — owners help themselves",
      body: "An owner abroad downloads a statement, logs a leaking gutter with a photo and sees its progress, all from a phone. The chair’s phone stays quiet.",
    },
    {
      title: "Year end — the AGM is calm",
      body: "Budgets, minutes, CSOS returns and the maintenance plan are already in order. The meeting is about the scheme’s future, not last year’s complaints.",
    },
  ],
  packageTitle: "Everything the trustees see, connected to everything the agency does.",
  packageIntro:
    "Accounting and levy software keeps the books. What it will not build is how your agency is found, chosen and trusted by the next board. That is the part we build, as one system.",
  packageItems: [
    {
      title: "A website that wins the board",
      body: "Pages for each scheme type and each town you serve, written for trustees comparing agents, with your registration and your proof where they look for it.",
    },
    {
      title: "Proposal requests, not contact forms",
      body: "A request that captures the scheme, the units and the current problem, gives the trustee a reference number, and lets you reply with a real proposal.",
    },
    {
      title: "Meetings and site inspections booked online",
      body: "Office meetings or morning inspections, with travel time per town built into the diary.",
    },
    {
      title: "An owner and trustee portal",
      body: "Statements, documents, meeting packs and maintenance requests in one place, on any phone, for owners who live nearby or abroad.",
    },
    {
      title: "A voice assistant for owners and trustees",
      body: "Answers questions about levies, switching agents and rental pools aloud, at any hour, and books the meeting.",
    },
    {
      title: "Guides that prove you know the law",
      body: "Plain-language guides on arrears, CSOS returns, reserve funds and changing agent: the questions every board asks, answered before they call.",
    },
    {
      title: "Levy clearance and requests online",
      body: "Conveyancers request clearance figures and owners log requests without a phone call, each with a reference.",
    },
    {
      title: "A clear view of what is working",
      body: "Which towns, scheme types and pages bring proposal requests in, reported in plain language every month.",
    },
  ],
  askTitle: "Five questions trustees should ask any managing agent.",
  askIntro:
    "These are the questions boards ask us. The agency that can answer all five, in writing, is the one that wins the mandate.",
  ask: [
    { q: "Is your Fidelity Fund Certificate valid, and can we check it?", why: "Boards can verify it on the PPRA’s practitioner search. Without it, the scheme’s protection may be gone." },
    { q: "When do we receive the monthly pack?", why: "A fixed day, every month, with arrears, reserves and maintenance included, not only a balance sheet." },
    { q: "How fast are arrears followed up?", why: "Day one, with dated notices kept for CSOS. Delay costs the scheme money." },
    { q: "Can owners abroad see their own accounts?", why: "A portal with statements and requests stops the chair from becoming the help desk." },
    { q: "How do you use AI with owners’ information?", why: "Drafting and summarising, yes, with a person approving. Owners’ data stays private under POPIA and is not used to train anyone’s model." },
  ],
  relatedSlugs: ["sca-properties"],
  faq: [
    {
      q: "What must a managing agent be registered for in South Africa?",
      a: "Managing agents who manage property for reward must hold a valid Fidelity Fund Certificate under the Property Practitioners Act. Check the current requirements with the PPRA before appointing an agent.",
    },
    {
      q: "Can trustees use CSOS to recover levy arrears?",
      a: "Yes. Trustees or directors can apply to the Community Schemes Ombud Service for an order for payment, but the application needs complete documentation or it may be rejected.",
    },
    {
      q: "Can a unit be sold while levies are in arrears?",
      a: "Transfer cannot be registered until the levy arrears are settled or adequately secured, which is why a levy clearance certificate is part of every sale.",
    },
    {
      q: "Will AI replace managing agents?",
      a: "It will replace the routine work: statements, reminders, first drafts and answers to common questions. Judgement, relationships with trustees and accountability stay with people.",
    },
    {
      q: "Why does a managing agent need a better website?",
      a: "Because boards compare agents online before they meet any of them. A site that answers their questions and makes a proposal easy to request gets the meeting.",
    },
    {
      q: "How long does a project like this take?",
      a: "Most agency platforms go live in weeks, because the structure is proven. The Discovery Call is where we agree the scope and the timeline.",
    },
  ],
  sources: [
    { title: "Sectional title arrears collections: a legal perspective", publisher: "Mulder Attorneys", date: "October 2025", url: "https://mulderattorneys.co.za/2025/10/27/sectional-title-arrears-collections-a-legal-perspective-for-2025/" },
    { title: "Sectional title arrears in South Africa: what every owner, buyer and trustee needs to know", publisher: "PropWiz", date: "2026", url: "https://www.propwiz.co.za/articles/sectional-title-arrears-in-south-africa-what-every-owner-buyer-and-trustee-needs-to-know/1370" },
    { title: "CSOS offers a better way to approach levy arrears", publisher: "Trafalgar", date: "2026", url: "https://news.trafalgar.co.za/csos-offers-a-better-way-to-approach-levy/" },
    { title: "Is your managing agent correctly registered?", publisher: "Estate Living", date: "2026", url: "https://www.estate-living.co.za/news/is-your-managing-agent-correctly-registered" },
    { title: "Three things homeowners need (board member survey)", publisher: "AppFolio", date: "2026", url: "https://www.appfolio.com/blog/three-things-homeowners-need" },
    { title: "New survey spotlights the use of AI in community associations", publisher: "Community Associations Institute", date: "2025", url: "https://hoaresources.caionline.org/new-survey-spotlights-the-use-of-ai-in-community-associations/" },
    { title: "AI in property management: how early adopters are pulling ahead", publisher: "Buildium", date: "2026", url: "https://www.buildium.com/blog/ai-in-property-management-early-adopters/" },
  ],
  closingTitle: "Picture the next board choosing you before the meeting. Let us build it this year.",
  closingBody:
    "Book a 60-minute Discovery Call with Ignatius. We will look at how trustees find and judge your agency today, where the work still runs by hand, and which part of the 2030 agency is worth building first.",
};

export const metadata = industryMetadata(industry);

export default function PropertyManagementIndustryPage() {
  return <IndustryPage industry={industry} />;
}
