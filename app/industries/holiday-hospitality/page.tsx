import { IndustryPage, industryMetadata, type Industry } from "../industry-page";

// Covers both "Vacation Bookings" and "Vacation Packages" on the Work page.
// Sources checked 18 November 2026. Numbers in `source` refer to the
// position in `sources` (1-based).
const industry: Industry = {
  slug: "holiday-hospitality",
  name: "Holiday & Hospitality",
  updated: "November 2026",
  seoTitle: "AI, Direct Bookings and the Resort of 2030 | CRM Solutions",
  seoDescription:
    "How AI trip planning, booking-site commission and the end of price parity in South Africa are changing resorts, guest houses and holiday memberships.",
  shareTitle: "The resort of 2030 keeps its own guests",
  headline: "Your guests already want to book you. Stop paying someone else to let them",
  lede:
    "Picture your resort four years from now. A family asks an AI assistant for a quiet beach holiday on the South Coast in December, and your chalets are the answer it gives. They land on your own site, see the dates are free, see what is on that week, and book direct. No commission, no lost guest data, no cancellation two days before. After they leave, you invite them back for next year, and they come. Every part of that exists today. This guide shows where hospitality stands and how to build that resort now.",
  forcesTitle: "Six changes reshaping how holidays are booked.",
  forcesIntro:
    "Travellers changed how they plan faster than most properties changed how they sell. Each point is sourced and dated below.",
  forces: [
    {
      kicker: "AI trip planning",
      title: "Half of travellers have used AI to plan a trip.",
      body: "In IATA’s 2026 Global Passenger Survey, 49% of respondents had used artificial intelligence to plan a trip. In one US survey, more summer travellers used AI platforms such as ChatGPT, Gemini and Claude (58%) than traditional travel websites (55%).",
      source: [1, 2],
    },
    {
      kicker: "Booking sites",
      title: "Booking sites take most independent bookings.",
      body: "Cloudbeds’ 2026 report found that online travel agencies took 63.4% of independent hotel bookings in 2025, with some markets approaching 80%.",
      source: [3],
    },
    {
      kicker: "Commission",
      title: "Every booking-site guest costs 15–25%.",
      body: "Online travel agency commission typically runs at 15–25% per booking, before visibility programmes and discounts. On a guest who was already searching for you by name, that is money handed away.",
      source: [4],
    },
    {
      kicker: "Cancellations",
      title: "Direct guests cancel half as often.",
      body: "In the same Cloudbeds data, booking-site cancellations reached 21.8%, more than double the 10.6% rate for direct bookings. A direct guest is a more committed guest.",
      source: [3],
    },
    {
      kicker: "South Africa",
      title: "You may now sell cheaper on your own site.",
      body: "In 2024 Booking.com agreed with the Competition Commission to remove its price parity terms from contracts with South African accommodation providers, so properties can offer better rates through their own direct channels.",
      source: [5],
    },
    {
      kicker: "The traveller",
      title: "Fewer trips, but more spent on each.",
      body: "Stats SA’s 2025 Domestic Tourism Survey found fewer trips than in 2024 but higher spending, with KwaZulu-Natal the second most visited province for overnight trips. Each guest matters more.",
      source: [6],
    },
  ],
  meaningTitle: "The booking sites rent you your own guests.",
  meaning: [
    "Most families who stay at a South Coast resort found it themselves: a friend’s recommendation, a search, a holiday they had years ago. Then, because the resort’s own website could not answer “is it free that week, and what does it cost?”, they booked through a booking site. The resort paid commission on a guest it had already won, and never got their email address.",
    "Now a new layer sits in front of every search: AI assistants that plan the whole trip. They recommend places they can read clearly: availability, prices, what is nearby, what guests say. A property that is only properly described on booking sites will only ever be recommended through them.",
    "The resorts that win the next five years will be easy for both people and AI to understand, will take bookings on their own site, and will keep every guest relationship for the next visit.",
  ],
  visionTitle: "A season at the resort of 2030.",
  visionIntro:
    "Nothing below is science fiction. Each part is running somewhere today. The advantage goes to the property that puts them together first.",
  vision: [
    {
      title: "September — an AI assistant recommends you",
      body: "A family asks for a quiet, affordable beach holiday near Durban in December. The assistant reads your site, your dates, your prices and your reviews, and recommends your chalets by name.",
    },
    {
      title: "21:00 — they book direct",
      body: "Dates checked on your site, the week’s events and the weather shown beside them, a better direct rate, and the deposit paid in a few taps. No commission.",
    },
    {
      title: "Two weeks before — the holiday starts early",
      body: "A welcome message with directions, check-in details, what is on in the area that week and the restaurants worth booking. Guests arrive excited, not confused.",
    },
    {
      title: "During the stay — questions answered at any hour",
      body: "Your assistant answers the Wi-Fi password, the braai rules and the nearest pharmacy aloud, so reception sleeps.",
    },
    {
      title: "January — next year is already booked",
      body: "A thank-you, a review request and an early-booking offer for the same week next year. Returning guests fill the peak before it is advertised.",
    },
  ],
  packageTitle: "Everything the guest sees, connected to everything the resort does.",
  packageIntro:
    "A channel manager keeps the calendars in line. What it will not build is the direct relationship with your guest. That is the part we build, as one system.",
  packageItems: [
    {
      title: "A booking engine on your own site",
      body: "Live availability, prices and secure deposits, so a guest can book direct in a few taps, on any phone.",
    },
    {
      title: "Reasons to choose the dates",
      body: "Events calendars, area guides, weather and things to do beside the availability, so guests choose their week on your site, not a booking site.",
    },
    {
      title: "A site that AI assistants understand",
      body: "Structured data, clear pages for every unit and season, and an llms.txt, so AI trip planners can read and recommend the property accurately.",
    },
    {
      title: "A voice assistant for guests",
      body: "Answers questions about units, dates, the area and house rules aloud, at any hour, before and during the stay.",
    },
    {
      title: "Pre-arrival and post-stay messages",
      body: "Directions, check-in, what is on that week, then a thank-you, a review request and an early-booking offer for next year.",
    },
    {
      title: "Packages and memberships",
      body: "Multi-year holiday memberships, seasonal packages and returning-guest offers explained clearly and sold online.",
    },
    {
      title: "Your guest list, kept",
      body: "Every direct guest’s details, stays and preferences, with consent under POPIA, ready for the next season.",
    },
    {
      title: "A clear view of what is working",
      body: "Direct versus booking-site share, which pages and searches bring bookings, and the commission saved, every month.",
    },
  ],
  askTitle: "Five questions to ask about your bookings.",
  askIntro: "The answers show how much of your own business you are renting back from the booking sites.",
  ask: [
    { q: "What share of last season’s bookings came direct?", why: "If it is under a third, most of your guests are being introduced to you by someone who charges for it." },
    { q: "How many booking-site guests had stayed before?", why: "A returning guest who books through a booking site is commission paid twice for the same relationship." },
    { q: "Can a guest see live availability and pay on your site?", why: "If not, the booking site is the easiest way to book you, so that is where guests go." },
    { q: "Could an AI assistant describe your property correctly?", why: "Ask one. If it cannot find your units, prices or location on your own site, it will recommend someone else’s." },
    { q: "Do you have every past guest’s email address?", why: "That list is the cheapest marketing a resort will ever have. Booking sites keep it for themselves." },
  ],
  relatedSlugs: ["cabana-mio", "coastal-preferred-escapes"],
  extraLink: {
    href: "/value-of-a-returning-guest",
    label: "What is one returning guest worth to you?",
    body: "A quick calculator: what a guest who comes back is worth over the years, and what keeping them costs compared with paying commission again.",
  },
  faq: [
    {
      q: "Can I offer a lower rate on my own website than on Booking.com?",
      a: "In South Africa, Booking.com removed its price parity terms from accommodation contracts after a 2024 agreement with the Competition Commission. Check your own agreement, but direct rates may now be lower.",
    },
    {
      q: "How much do booking sites charge?",
      a: "Commission typically runs at 15–25% per booking, depending on the platform, your agreement and any visibility programmes you join.",
    },
    {
      q: "Should I leave the booking sites altogether?",
      a: "Usually not. They are useful for guests who have never heard of you. The goal is that guests who already know you, or find you through search and AI, can book direct.",
    },
    {
      q: "How do AI assistants decide which properties to recommend?",
      a: "They draw on what they can read and trust: clear pages, prices, availability, location and reviews. A well-structured website makes your property easier to recommend accurately.",
    },
    {
      q: "What is a holiday membership?",
      a: "A way to sell several years of holidays for a fixed monthly payment. It needs very clear explanation, which is why it works best on a website built to answer every question before a family commits.",
    },
    {
      q: "How long does a project like this take?",
      a: "Most hospitality platforms go live in weeks, because the structure is proven. The Discovery Call is where we agree the scope and the timeline.",
    },
  ],
  sources: [
    { title: "AI travel planning: IATA Global Passenger Survey 2026", publisher: "Business Traveller", date: "October 2026", url: "https://www.businesstraveller.com/insights/ai-travel-planning-airline-flight-booking-iata-survey-2026/" },
    { title: "Survey finds AI overtakes travel websites for trip planning (Qlik)", publisher: "MyChesCo", date: "June 2026", url: "https://www.mychesco.com/a/news/regional/survey-finds-ai-overtakes-travel-websites-for-trip-planning/" },
    { title: "2026 State of Independent Hotels Report", publisher: "Cloudbeds", date: "March 2026", url: "https://www.cloudbeds.com/articles/2026-hotels-report-reveal/" },
    { title: "The hidden cost of OTA dependence", publisher: "Irish Hotels Federation", date: "2026", url: "https://www.ihf.ie/suppliers/resources/content/2026/cloudbeds/hidden-cost-ota-dependence" },
    { title: "How SA’s independent hotels can capitalise on the Booking.com price parity ruling", publisher: "Tourism Update", date: "2024", url: "https://www.tourismupdate.com/article/how-sas-independent-hotels-can-capitalise-on-the-bookingcom-price-parity-ruling" },
    { title: "Fewer trips, but spend more per trip: South Africa’s domestic tourism trends", publisher: "Stats SA", date: "2026", url: "https://www.statssa.gov.za/?p=20043" },
  ],
  closingTitle: "Picture next December booked direct. Let us build it this year.",
  closingBody:
    "Book a 60-minute Discovery Call with Ignatius. We will look at where your bookings come from today, what commission is costing you, and which part of the 2030 resort is worth building first.",
};

export const metadata = industryMetadata(industry);

export default function HolidayHospitalityIndustryPage() {
  return <IndustryPage industry={industry} />;
}
