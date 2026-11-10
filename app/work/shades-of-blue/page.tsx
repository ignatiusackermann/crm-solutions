import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "shades-of-blue",
  name: "Shades of Blue",
  category: "Industrial services",
  liveUrl: "https://www.shadesobl.co.za/",
  liveLabel: "Visit the live platform",
  heroTone: "shades",
  screenshot: "/portfolio/shades-of-blue-desktop.jpg",
  headline: "From brochure site to a quoting system for industry",
  intro:
    "Shades of Blue Lifestyles supplies labour, steel fabrication and building maintenance to mines and factories across Gauteng. The old website described the company. The new one takes the quote request and follows the job through.",
  meta: [
    { label: "Client", value: "Shades of Blue Lifestyles" },
    { label: "Focus", value: "Quotes & procurement" },
    { label: "Work", value: "Strategy, design, development" },
    { label: "Live since", value: "November 2026" },
  ],
  services: [
    { label: "Strategy", title: "Buyer and procurement diagnosis" },
    { label: "Experience", title: "Quote-first design" },
    { label: "Platform", title: "Quoting and client area" },
    { label: "Assistant", title: "Blue, by voice" },
  ],
  narrativeTitle: "The job was bigger than a new look.",
  narrative: [
    "A contractor’s website is read by two people: the site manager who needs workers or steel by a date, and the procurement officer who must prove the supplier qualifies. Each has a different question, and each leaves if it is not answered quickly.",
    "The work was to put a quote request within reach of every page, place the procurement proof where it is looked for, and connect what happens after the enquiry to the same system.",
  ],
  pillars: [
    {
      title: "A quote on every page",
      body: "The request form sits in the opening screen and follows the visitor through every service and area page.",
    },
    {
      title: "Proof for procurement",
      body: "B-BBEE level, registration and cover are stated up front, with a supplier pack ready to download.",
    },
    {
      title: "Follow-through after the enquiry",
      body: "A client can sign in and see where a quote or site inspection stands, without phoning the office.",
    },
  ],
  powerTitle: "What the platform does, every day.",
  powerIntro:
    "Four service lines, sixteen area pages and two very different audiences, handled by one connected site.",
  power: [
    {
      title: "Quote requests and a quote basket",
      body: "A buyer asks for one service or gathers several items into a single request, with the scope, site and date attached.",
    },
    {
      title: "Site-inspection booking",
      body: "A visit is booked online and confirmed with a reference and a job card, so the first meeting is already organised.",
    },
    {
      title: "Blue, the voice assistant",
      body: "Blue answers questions about services, quotes and B-BBEE aloud, and starts from the page the visitor is on.",
    },
    {
      title: "A client area",
      body: "Clients sign in with a code sent by email and follow the progress of each quote and inspection, with notes from the team.",
    },
    {
      title: "A supplier pack for procurement",
      body: "The company’s credentials are packaged as one PDF, which is the document a procurement officer has to file.",
    },
    {
      title: "A separate door for job seekers",
      body: "People looking for work register a CV on their own page, and those messages reach a separate inbox.",
    },
  ],
  challengesTitle: "Two audiences, four trades and an inbox full of CVs.",
  challengesIntro:
    "Each of these was a real constraint on the project. The answer is what shaped the site.",
  challenges: [
    {
      title: "Job seekers outnumbered buyers",
      problem:
        "A labour-hire company attracts far more people looking for work than companies looking to buy. In a shared inbox, a real enquiry is easy to miss.",
      answer:
        "Job seekers have their own page and their own inbox. Quote requests arrive separately, each with a reference number.",
    },
    {
      title: "The buyer is not the only decision-maker",
      problem:
        "A site manager may want the supplier, but procurement must approve it. If the credentials are hard to find, the order goes to a supplier already on the list.",
      answer:
        "Procurement status is in the header of every page, and the supplier pack puts the documents in one download.",
    },
    {
      title: "Four businesses under one name",
      problem:
        "Labour hire, steel fabrication, building maintenance and consumables are bought by different people for different reasons. One general page speaks to none of them.",
      answer:
        "Each service has its own pages, its own quote path and its own thank-you page that names what was asked for.",
    },
    {
      title: "Moving an established address without losing it",
      problem:
        "The old site had years of links and search history, and the company’s email ran on the same server.",
      answer:
        "Every old address forwards to its new page, and the email was left exactly where it was during the switch.",
    },
  ],
  decisionTitle: "Design the buying decision—not merely the pages.",
  decisions: [
    {
      label: "Orientation",
      title: "Show at once what is supplied, and where",
      body: "The opening screen names the three main services, the town and the area served, so the right visitor knows they are in the right place.",
    },
    {
      title: "Answer the procurement question early",
      label: "Qualification",
      body: "Level, ownership, registration and cover are visible before the visitor scrolls, because a buyer who cannot use the supplier will not read on.",
    },
    {
      label: "Request",
      title: "Make asking for a quote the easiest thing on the page",
      body: "A short form with the service, the site and the scope. Larger requests are gathered into one basket.",
    },
    {
      label: "After the request",
      title: "Keep the client informed without a phone call",
      body: "Status changes are recorded by the office and emailed to the client, and the client area shows the same record.",
    },
  ],
  layersTitle: "Six layers working as one business.",
  layersIntro:
    "The visible website is one layer. Strategy, messaging, experience, technology, communication and stewardship were designed together.",
  layers: [
    {
      title: "Business strategy",
      body: "Separate the buyer, the procurement officer and the job seeker, and decide what each should do.",
    },
    {
      title: "Content & messaging",
      body: "Plain descriptions of each service, checked against what the company can evidence.",
    },
    {
      title: "Experience design",
      body: "A drawing-board look that suits steel and construction, with the quote form always in reach.",
    },
    {
      title: "Technical platform",
      body: "Quoting, booking, the client area and the staff admin running on one database.",
    },
    {
      title: "Customer communication",
      body: "Reference numbers, confirmation emails and status updates from first request to finished job.",
    },
    {
      title: "Ongoing improvement",
      body: "An owner’s overview page shows what the site contains and what remains to be done.",
    },
  ],
  proofTitle: "Every section answers a different commercial question.",
  proofPoints: [
    "What do you supply, and in which areas?",
    "Do you qualify as a supplier for my company?",
    "How do I get a price for my scope?",
    "Can someone come and look at the site?",
    "Where does my request stand?",
  ],
  depthTitle: "Proof of depth—without inventing performance claims.",
  depthIntro:
    "The site went live in November 2026, so there are no results to report yet. The measure for now is completeness: every route a buyer can take ends in a recorded request.",
  depthStats: [
    { value: "4", label: "Service lines, each with its own quote path" },
    { value: "16", label: "Area pages for the towns it serves" },
    { value: "2", label: "Audiences kept apart: buyers and job seekers" },
    { value: "Live", label: "Operating platform in market" },
  ],
  stewardshipTitle: "Launch is the beginning of the evidence—not the end of the work.",
  stewardship: [
    "The first months of enquiries will show which services and areas draw real demand.",
    "Reviews from completed jobs build the proof that new buyers look for.",
    "The client area can grow into a full record of each customer’s work.",
  ],
  closingTitle: "Does your website describe the business—or win the work?",
};

export const metadata = caseMetadata(study);

export default function ShadesOfBlueCasePage() {
  return <CaseStudyPage study={study} />;
}
