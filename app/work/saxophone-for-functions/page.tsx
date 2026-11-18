import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "saxophone-for-functions",
  name: "Saxophone for Functions",
  category: "Entertainment Bookings",
  liveUrl: "https://www.saxophone-for-functions.co.za/",
  liveLabel: "Visit the live platform",
  heroTone: "sax",
  screenshot: "/portfolio/saxophone-for-functions-desktop.jpg",
  headline: "Ten years of glowing reviews, hidden on a ten-year-old website",
  intro:
    "Friedel Knobel plays live saxophone at weddings, private parties and corporate functions across Gauteng: jazz, Latin, ballads and gospel. He is also a professional sound engineer, so the music is elegant and never too loud. Over the years he collected more than a hundred written reviews. His Joomla website, built around 2016, showed fourteen of them and asked couples to make contact without answering the question they came with: is he free on our date?",
  meta: [
    { label: "Client", value: "Friedel Knobel" },
    { label: "Focus", value: "Event booking enquiries" },
    { label: "Work", value: "Strategy, design, development" },
    { label: "Live since", value: "November 2026" },
  ],
  services: [
    { label: "Strategy", title: "One job: the booking enquiry" },
    { label: "Experience", title: "Hear him, then check the date" },
    { label: "Platform", title: "Enquiries and a diary he can run" },
    { label: "Assistant", title: "Janet, by voice" },
  ],
  narrativeTitle: "A couple wants three answers before they ask for a quote.",
  narrative: [
    "Can we hear him? Is he free on our date? Has he played somewhere like our venue? A wedding couple or an events coordinator decides on those three things, usually late at night and on a phone.",
    "The new site answers all three on the first screen, and then lets the visitor send the enquiry while they are still excited. Friedel works by WhatsApp and email, so the site, and Janet, do the talking for him.",
  ],
  pillars: [
    {
      title: "Hear him first",
      body: "Recordings play from the first screen. The music sells the booking better than any paragraph.",
    },
    {
      title: "Is he free on our date?",
      body: "The availability form checks the date against his diary before the enquiry is even sent.",
    },
    {
      title: "Proof from 107 reviews",
      body: "Every written review since 2009 is on the site, grouped by area and pinned to the venues on a map.",
    },
  ],
  powerTitle: "What the platform does, every day.",
  powerIntro:
    "A musician’s whole booking process, from first listen to a confirmed date, on one site he can run from his phone.",
  power: [
    {
      title: "Check your date",
      body: "Name, date, occasion and venue on the first screen. The form says whether the diary looks open on that day.",
    },
    {
      title: "Janet, by voice",
      body: "Janet answers questions about songs, plays his recordings, checks the diary and fills in the booking form for the visitor to send.",
    },
    {
      title: "A diary on his phone",
      body: "Friedel kept his bookings on paper. Every enquiry now lands in a simple diary where he confirms or declines it and replies by WhatsApp in one tap.",
    },
    {
      title: "107 reviews, all of them",
      body: "Every testimonial from 2009 to 2018 was brought across from the old site, which showed only fourteen.",
    },
    {
      title: "A map of 99 venues",
      body: "Each venue he has played is pinned on a map with its reviews, so a couple can see he knows their venue.",
    },
    {
      title: "Nine area pages",
      body: "Pretoria, Sandton, Johannesburg, Centurion, Midrand, Fourways, Muldersdrift, Hartbeespoort and the East Rand, each with its own reviews and venues.",
    },
    {
      title: "Weddings and corporate, separately",
      body: "A page for couples and a page for events coordinators, because they ask different questions.",
    },
    {
      title: "WhatsApp and email throughout",
      body: "Every contact link opens WhatsApp or email, the way Friedel prefers to work.",
    },
  ],
  challengesTitle: "The reviews were there. The bookings were not being asked for.",
  challengesIntro:
    "Each of these was a real constraint on the project. The answer is what shaped the site.",
  challenges: [
    {
      title: "The best proof was buried",
      problem:
        "More than a hundred written reviews, from couples and from companies such as banks and the JSE, sat in the old site’s archive. Fourteen were on show.",
      answer:
        "All 107 were imported, grouped by area and linked to the venues on a map. The count sits in the first screen.",
    },
    {
      title: "Nobody could check his availability",
      problem:
        "The first question every couple has is whether the date is free. The old site could only answer it after a message and a wait.",
      answer:
        "The form checks the date against his diary, and Janet can answer the question aloud before an enquiry is sent.",
    },
    {
      title: "His diary was pen and paper",
      problem:
        "A site cannot check a diary that is not digital, and asking a working musician to learn a calendar app was never going to last.",
      answer:
        "A small diary dashboard built for his phone: enquiries arrive as pending, he confirms or declines, and marks the days he is busy.",
    },
    {
      title: "He works by WhatsApp, not by phone",
      problem:
        "A standard site puts a phone number everywhere. Friedel prefers WhatsApp and email.",
      answer:
        "Every contact link opens WhatsApp or email, and Janet handles the spoken questions on the site.",
    },
    {
      title: "Ten years of links to an old site",
      problem:
        "The Joomla site had been online since about 2016, with pages linked from venues and directories.",
      answer:
        "Old addresses redirect to their new pages, so none of those links goes dead.",
    },
  ],
  decisionTitle: "Design for the couple planning their wedding at midnight.",
  decisions: [
    {
      label: "Orientation",
      title: "Say what, where and who",
      body: "Live saxophone for weddings and functions in Gauteng, by Friedel Knobel. Nothing to work out.",
    },
    {
      label: "Sound",
      title: "Let them hear it immediately",
      body: "“Hear Friedel play” is the first button. A musician is chosen with the ears.",
    },
    {
      label: "Date",
      title: "Answer the availability question first",
      body: "The form leads with the date, because that decides whether anything else matters.",
    },
    {
      label: "Proof",
      title: "Show the venues they know",
      body: "Reviews and venues by area, so a couple in Hartbeespoort sees reviews from Hartbeespoort.",
    },
  ],
  layersTitle: "Six layers working as one business.",
  layersIntro:
    "The visible website is one layer. Strategy, messaging, experience, technology, communication and stewardship were designed together.",
  layers: [
    {
      title: "Business strategy",
      body: "One job for the site: booking enquiries for weddings and functions across Gauteng.",
    },
    {
      title: "Content & messaging",
      body: "Separate pages for couples and corporate clients, the repertoire, and nine areas with local reviews.",
    },
    {
      title: "Experience design",
      body: "Listen, check the date, send the enquiry: in that order, on the first screen.",
    },
    {
      title: "Technical platform",
      body: "Availability check, diary dashboard, review map, area pages and the voice assistant on one site.",
    },
    {
      title: "Customer communication",
      body: "Enquiries reach Friedel by email and in his diary, and he replies by WhatsApp in one tap.",
    },
    {
      title: "Ongoing improvement",
      body: "An owner’s overview shows what the site contains and what is still to connect.",
    },
  ],
  proofTitle: "Every section answers a different commercial question.",
  proofPoints: [
    "What does he sound like?",
    "Is he free on our date?",
    "Has he played at a venue like ours?",
    "Will he play our songs?",
    "What do other couples and companies say?",
  ],
  depthTitle: "Proof of depth—without inventing performance claims.",
  depthIntro:
    "The site went live on the client’s own domain in November 2026, so there are no booking results to report yet. The measure for now is whether a couple can hear him, check the date and send an enquiry in one visit.",
  depthStats: [
    { value: "107", label: "Written reviews, 2009 to 2018" },
    { value: "99", label: "Venues pinned on the map" },
    { value: "9", label: "Area pages across Gauteng" },
    { value: "77+", label: "Songs in the repertoire" },
  ],
  stewardshipTitle: "Launch is the beginning of the evidence—not the end of the work.",
  stewardship: [
    "The first enquiries will show which areas and which occasions bring the most bookings.",
    "New reviews from recent functions will join the 107 already on the site.",
    "Once his upcoming bookings are all in the diary, the date check becomes exact rather than a guide.",
  ],
  closingTitle: "Can your customers check your availability before they ask?",
};

export const metadata = caseMetadata(study);

export default function SaxophoneForFunctionsCasePage() {
  return <CaseStudyPage study={study} />;
}
