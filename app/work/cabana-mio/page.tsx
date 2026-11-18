import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "cabana-mio",
  name: "Cabana Mio",
  category: "Vacation Bookings",
  liveUrl: "https://www.cabanamio.co.za/",
  liveLabel: "Visit the live platform",
  heroTone: "cabana",
  screenshot: "/portfolio/cabana-mio-desktop.jpg",
  headline: "The guests already wanted to stay. The booking sites took the commission",
  intro:
    "Picture a family who searched for Cabana Mio by name, found it on a booking site, and booked there. The resort paid commission on a guest it had already won. For a holiday resort, that is the most painful booking of all. Cabana Mio, self-catering beach chalets in Amanzimtoti, now takes its own bookings: guests check the dates, see what is on, and book direct.",
  meta: [
    { label: "Client", value: "Cabana Mio" },
    { label: "Focus", value: "Direct bookings" },
    { label: "Work", value: "Strategy, design, development" },
    { label: "Live since", value: "October 2026" },
  ],
  services: [
    { label: "Strategy", title: "Direct-booking plan" },
    { label: "Experience", title: "Search-first design" },
    { label: "Platform", title: "Booking engine" },
    { label: "Assistant", title: "Cheryl, by voice" },
  ],
  narrativeTitle: "Paying commission on your own guests.",
  narrative: [
    "Travellers search for a place and a date together. If a resort’s own website cannot answer “is it free that weekend, and what does it cost?”, the guest goes back to a booking site, and the resort pays commission on a guest who was already looking for it.",
    "So that answer now sits in the first screen, the booking is taken on the resort’s own site, and the events, places to visit and weather give guests a reason to choose their dates.",
  ],
  pillars: [
    {
      title: "Dates before brochure",
      body: "The search for check-in and check-out is the first thing on the page, as on the booking sites guests already know.",
    },
    {
      title: "Reasons to come",
      body: "Events, places to visit, guides and the seasons give a guest a reason to choose a weekend and stay longer.",
    },
    {
      title: "The office stays in control",
      body: "Rates, seasons, closed dates and deposits are managed by the resort in its own admin area.",
    },
  ],
  powerTitle: "What happens while the owner is asleep.",
  powerIntro:
    "The site answers, books and inspires on the resort’s own domain, with no booking site in between.",
  power: [
    {
      title: "Its own booking engine",
      body: "Live availability across the chalets, season pricing, and a booking held with a reference and an EFT deposit.",
    },
    {
      title: "An events calendar joined to the booking calendar",
      body: "Concerts, races and festivals appear on the dates a guest is choosing, each with a “stay for it” link.",
    },
    {
      title: "A map with measured driving times",
      body: "Beaches, golf courses, restaurants and attractions around the resort, each with the distance and minutes by road.",
    },
    {
      title: "Guides and things to do",
      body: "Pages for the Comrades Marathon, the Durban July, deep-sea fishing, golf, family days and day trips.",
    },
    {
      title: "Cheryl, the voice assistant",
      body: "Cheryl checks availability, finds events and takes a booking by voice, and confirms the details before she books.",
    },
    {
      title: "Weather and seasons",
      body: "Sea and air temperature, rainfall, sunrise and sunset for each month, so guests can choose when to come.",
    },
  ],
  challengesTitle: "A booking engine, a sister brand and no stock photography.",
  challengesIntro:
    "Each of these was a real constraint on the project. The answer is what shaped the site.",
  challenges: [
    {
      title: "Bookings come from more than one place",
      problem:
        "The resort’s chalets were already sold through an outside booking system. A second engine taking bookings for the same chalets risks selling one night twice.",
      answer:
        "The engine refuses a double booking at database level, and a calendar feed lets the two systems be kept in step.",
    },
    {
      title: "Booking sites hold the search results",
      problem:
        "For a search like “accommodation in Amanzimtoti”, the large booking sites take nearly every result. A small resort cannot outrank them on the same words.",
      answer:
        "The site aims at searches the booking sites ignore: events, golf, fishing, races and what is on this weekend, each leading back to available dates.",
    },
    {
      title: "Two brands, one resort",
      problem:
        "A holiday membership sold at the same resort has its own website. The two could confuse guests and compete in search.",
      answer:
        "The subjects were divided once, in writing. This site owns short stays, events and area guides; the membership site owns the five-year plan.",
    },
    {
      title: "Real photographs, not stock",
      problem:
        "The pictures to hand were informal ones taken at the resort. Stock images of a beach would look more polished and say nothing true about the place.",
      answer:
        "The design carries the quality through type, colour and layout, and the photographs show the real chalets and the real path to the beach.",
    },
  ],
  decisionTitle: "Design the booking decision—not merely the pages.",
  decisions: [
    {
      label: "Search",
      title: "Answer “is it free?” in the first screen",
      body: "Check-in, check-out and one button, with shortcuts for a weekend, a week from Friday and the December holidays.",
    },
    {
      label: "Reasons",
      title: "Give the dates a purpose",
      body: "What is on during the stay appears beside the dates, so an event becomes a reason to book.",
    },
    {
      label: "Booking",
      title: "Take the booking without sending the guest away",
      body: "Chalets, extras, details and deposit are handled on the resort’s own site.",
    },
    {
      label: "Arrival",
      title: "Prepare the guest before they travel",
      body: "An arrival guide covers directions, beach safety and emergency numbers.",
    },
  ],
  layersTitle: "Six layers working as one business.",
  layersIntro:
    "The visible website is one layer. Strategy, messaging, experience, technology, communication and stewardship were designed together.",
  layers: [
    {
      title: "Business strategy",
      body: "Win the direct booking, and sell the nights and weekends the membership does not.",
    },
    {
      title: "Content & messaging",
      body: "Local knowledge with sources: events, guides, drive times and seasons.",
    },
    {
      title: "Experience design",
      body: "The resort’s own colours on a shared seaside design system, so it sits beside its sister brand.",
    },
    {
      title: "Technical platform",
      body: "Booking engine, events, map, voice assistant and office admin on one database.",
    },
    {
      title: "Customer communication",
      body: "A booking reference and deposit details at once, and an arrival guide before the trip.",
    },
    {
      title: "Ongoing improvement",
      body: "A marketing plan sets out which kinds of stay to promote, in the order their dates come up.",
    },
  ],
  proofTitle: "Every section answers a different commercial question.",
  proofPoints: [
    "Is a chalet free on my dates, and what does it cost?",
    "What is happening nearby while I am there?",
    "How far is it to the places I want to visit?",
    "What will the weather and the sea be like?",
    "How do I book and pay?",
  ],
  depthTitle: "Proof of depth—without inventing performance claims.",
  depthIntro:
    "The site went live in October 2026, so there are no results to report yet. The measure for now is that a guest can search, choose and hold a booking on the resort’s own site.",
  depthStats: [
    { value: "1", label: "Booking engine owned by the resort" },
    { value: "25", label: "Places on the map, with measured drive times" },
    { value: "100/100", label: "Search audit score before launch" },
    { value: "Live", label: "Operating platform in market" },
  ],
  stewardshipTitle: "Launch is the beginning of the evidence—not the end of the work.",
  stewardship: [
    "Visitor figures will show which events and guides bring guests to the booking search.",
    "A review request after every stay builds the resort’s own reputation, on its own site.",
    "Past guests are the first people to hear about free dates and what is on.",
  ],
  closingTitle: "Picture your guests booking you direct. How much more would you keep?",
};

export const metadata = caseMetadata(study);

export default function CabanaMioCasePage() {
  return <CaseStudyPage study={study} />;
}
