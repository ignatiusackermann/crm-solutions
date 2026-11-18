import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "sca-properties",
  name: "SCA Properties",
  category: "Property Management",
  liveUrl: "https://www.sca-properties.co.za/",
  liveLabel: "Visit the live platform",
  heroTone: "scap",
  screenshot: "/portfolio/sca-properties-desktop.jpg",
  headline: "Trustees choose a managing agent. The website never asked them to.",
  intro:
    "SCA Properties manages sectional title schemes, home owners associations, share blocks, timeshare and rental pools on the KZN South Coast. It belongs to an accounting group that has been in Amanzimtoti since 1980. The old WordPress site described property in general terms, sent owners to a third-party login, and gave a board of trustees no clear way to ask for a proposal.",
  meta: [
    { label: "Client", value: "SCA Properties" },
    { label: "Focus", value: "Proposal requests from trustees" },
    { label: "Work", value: "Strategy, design, development" },
    { label: "Live since", value: "November 2026" },
  ],
  services: [
    { label: "Strategy", title: "One job: the trustee’s proposal" },
    { label: "Experience", title: "Accountants who run a complex" },
    { label: "Platform", title: "Proposals, bookings, owner portal" },
    { label: "Assistant", title: "Claire, by voice" },
  ],
  narrativeTitle: "The buyer is a board of trustees, not a tenant.",
  narrative: [
    "A managing agent is not chosen by someone browsing for a flat. It is chosen by trustees who are unhappy with their current agent, worried about levy arrears, or tired of late financial reports. They compare two or three agents, and they need something to put in front of the rest of the board.",
    "So the scope was cut on purpose: schemes and rental pools only. No property sales, no rentals, no guest bookings. Every page leads a trustee to one step: request a proposal, or book a meeting or a site inspection.",
  ],
  pillars: [
    {
      title: "Books kept by accountants",
      body: "The difference that matters to a trustee: levies collected and a full report pack every month, from an accounting practice.",
    },
    {
      title: "A proposal, not a contact form",
      body: "The request asks for the scheme, the number of units and the trustee’s role, so the reply can be a real proposal.",
    },
    {
      title: "Built for owners who live elsewhere",
      body: "Holiday complexes on the South Coast are often owned from Gauteng or abroad. The portal and the monthly pack are made for them.",
    },
  ],
  powerTitle: "What the platform does, every day.",
  powerIntro:
    "One site that wins the trustee, then serves the owners and the office once the scheme signs.",
  power: [
    {
      title: "Proposal requests",
      body: "Name, role, scheme, units and current situation in one form on the first screen, with a reference number and a confirmation email.",
    },
    {
      title: "Meetings and site inspections",
      body: "One booking engine with two kinds of appointment: an office meeting, or a morning site inspection with travel time per town.",
    },
    {
      title: "Owner and trustee portal",
      body: "The site’s own portal replaces the third-party login the old site linked to.",
    },
    {
      title: "Claire, by voice",
      body: "Claire answers questions about levies, switching agents and rental pools aloud, at any hour, and points the trustee to a meeting.",
    },
    {
      title: "Six kinds of scheme",
      body: "Sectional title, HOAs, share blocks, timeshare, rental pools and commercial, each with its own page.",
    },
    {
      title: "Eight towns, Durban to Margate",
      body: "A page for each area served, so a trustee searching for a managing agent in their town finds one.",
    },
    {
      title: "Trustee guides and a health check",
      body: "Seven guides, on levy arrears, CSOS returns, reserve funds and changing agent, plus a scheme health check.",
    },
    {
      title: "Levy clearance and requests",
      body: "Conveyancers request levy clearance figures and owners log maintenance requests online, without a phone call.",
    },
  ],
  challengesTitle: "A property website that was about the wrong kind of property.",
  challengesIntro:
    "Each of these was a real constraint on the project. The answer is what shaped the site.",
  challenges: [
    {
      title: "The site spoke to the wrong buyer",
      problem:
        "The old site read like a general property business. The people who actually appoint a managing agent, trustees and HOA boards, had nothing written for them.",
      answer:
        "The scope was narrowed to schemes and rental pools, and every page was written for a trustee comparing agents.",
    },
    {
      title: "No way to ask for a proposal",
      problem:
        "A board that wanted a quote had to phone or send a general message, and then explain their scheme from the start.",
      answer:
        "A proposal request on the first screen collects the scheme, the units and the problem, and gives the trustee a reference number.",
    },
    {
      title: "It could not look like the sister firm",
      problem:
        "SCA Properties belongs to the same group as the accounting practice. Two sites that looked the same would blur two different services.",
      answer:
        "A lighter, softer design of its own, with the accounting background used as proof rather than as the brand.",
    },
    {
      title: "Owners were sent to someone else’s login",
      problem:
        "The owner login was a link to a third-party system, so the managing agent’s own site ended at another company’s screen.",
      answer:
        "The site has its own owner and trustee portal, and the old login addresses now lead to it.",
    },
    {
      title: "Sixty-three old addresses, and email that had to keep working",
      problem:
        "The WordPress site had pages that were linked and bookmarked, and the office email ran on the same hosting as the old site.",
      answer:
        "Old addresses redirect to their new pages, and the email records were kept in place when the domain moved.",
    },
  ],
  decisionTitle: "Design for the trustee who has to convince the board.",
  decisions: [
    {
      label: "Orientation",
      title: "Name the scheme types and the coast",
      body: "Managing agents for sectional title and holiday complexes on the KZN South Coast. A trustee knows at once whether this agent fits.",
    },
    {
      label: "Proof",
      title: "Lead with the accounting",
      body: "Since 1980, SAICA, PPRA, and a holiday complex in the group. Facts a board can check, not slogans.",
    },
    {
      label: "Action",
      title: "Make the proposal the first thing",
      body: "The request form sits beside the headline. A meeting or a site inspection is the next option.",
    },
    {
      label: "After",
      title: "Show what happens next",
      body: "Every form ends on a thank-you page with a reference number and the next steps, and a confirmation email follows.",
    },
  ],
  layersTitle: "Six layers working as one business.",
  layersIntro:
    "The visible website is one layer. Strategy, messaging, experience, technology, communication and stewardship were designed together.",
  layers: [
    {
      title: "Business strategy",
      body: "One job for the site: win proposals from schemes and rental pools. Everything else was cut.",
    },
    {
      title: "Content & messaging",
      body: "Service, area and guide pages written for trustees, in plain language about levies, reports and compliance.",
    },
    {
      title: "Experience design",
      body: "The proposal request first, then booking, then the guides that build trust.",
    },
    {
      title: "Technical platform",
      body: "Proposals, bookings, owner portal, levy clearance, voice assistant, and a site that installs as an app.",
    },
    {
      title: "Customer communication",
      body: "Reference numbers on every request, a copy to the office and a confirmation to the sender.",
    },
    {
      title: "Ongoing improvement",
      body: "An owner’s overview shows what the site contains and what is still to connect.",
    },
  ],
  proofTitle: "Every section answers a different commercial question.",
  proofPoints: [
    "Do you manage schemes like ours, in our town?",
    "Who keeps the books, and how often do we see them?",
    "What does it take to change managing agent?",
    "Can you come and look at the complex?",
    "Can owners who live elsewhere see what is happening?",
  ],
  depthTitle: "Proof of depth—without inventing performance claims.",
  depthIntro:
    "The site went live on 16 November 2026, so there are no proposal results to report yet. The measure for now is whether a trustee can ask for a proposal in one visit.",
  depthStats: [
    { value: "37", label: "Pages in the sitemap" },
    { value: "6", label: "Kinds of scheme, each with its own page" },
    { value: "8", label: "Towns served, Durban to Margate" },
    { value: "7", label: "Guides written for trustees" },
  ],
  stewardshipTitle: "Launch is the beginning of the evidence—not the end of the work.",
  stewardship: [
    "The first proposal requests will show which kind of scheme and which town brings the most interest.",
    "Search Console will show which area and scheme pages start to rank.",
    "As owners use the portal, it becomes the record each scheme relies on.",
  ],
  closingTitle: "Does your website ask your real buyer for the business?",
};

export const metadata = caseMetadata(study);

export default function ScaPropertiesCasePage() {
  return <CaseStudyPage study={study} />;
}
