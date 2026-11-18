import { IndustryPage, industryMetadata, type Industry } from "../industry-page";

// Sources checked 18 November 2026. Numbers in `source` refer to the
// position in `sources` (1-based).
const industry: Industry = {
  slug: "entertainment-bookings",
  name: "Entertainment Bookings",
  updated: "November 2026",
  seoTitle: "AI and the Event Entertainer of 2030 | CRM Solutions",
  seoDescription:
    "How AI wedding planning, instant replies and online reviews are changing bookings for musicians, DJs and event entertainers, and what 2030 looks like.",
  shareTitle: "The entertainer of 2030 gets booked while on stage",
  headline: "Couples book the entertainer who answers first. Make sure it is you",
  lede:
    "Picture your diary four years from now. While you play a first dance on Saturday night, another couple, planning their wedding on the sofa, hears your recordings, checks that your date is free, asks your assistant whether you play their song, and sends the booking before your set ends. You reply on Monday to a confirmed enquiry, not a cold one. Every part of that exists today. This guide shows how couples and event planners now choose entertainment, and how to build that booking engine now.",
  forcesTitle: "Five changes in how events are booked.",
  forcesIntro:
    "Weddings and functions are booked on phones, at night, often in a single sitting. Each point is sourced and dated below.",
  forces: [
    {
      kicker: "AI planning",
      title: "AI use among couples nearly doubled in a year.",
      body: "The Knot’s 2026 Real Weddings Study of more than 10,000 US couples found AI adoption among couples rose to 36%. Zola’s 2026 report puts it higher: more than half of its couples use AI in some way to plan.",
      source: [1, 2],
    },
    {
      kicker: "The human part",
      title: "AI drafts the plan. Couples still want people they trust.",
      body: "Zola found couples embrace AI for efficiency but keep emotional milestones firmly human, and The Knot found they rely on trusted platforms to validate details. Music is one of the most emotional choices of the day.",
      source: [1, 2],
    },
    {
      kicker: "Speed",
      title: "Two in three couples book the first supplier who responds.",
      body: "Easy Weddings’ annual research found 66% of couples book the first supplier who responds, and suppliers who reply within an hour are far more likely to win the booking than those who wait a day.",
      source: [3],
    },
    {
      kicker: "The team",
      title: "Couples are juggling about thirteen suppliers.",
      body: "Couples hire an average of 13 vendors for their wedding, according to The Knot. The entertainer who makes their part easy, with clear answers and a simple booking, is remembered and recommended.",
      source: [1],
    },
    {
      kicker: "Online research",
      title: "Most of the choosing happens online.",
      body: "64% of couples used wedding planning websites or apps, according to The Knot’s vendor research. Reviews, recordings and venues played are judged before anyone picks up a phone.",
      source: [4],
    },
  ],
  meaningTitle: "You cannot answer enquiries while you are performing. Your website can.",
  meaning: [
    "Entertainers are busiest exactly when couples are planning: weekend evenings. The enquiry that arrives at 21:00 on a Saturday, while you are on stage, is answered on Monday. By then the couple has booked whoever replied first.",
    "Couples want three things before they ask for a quote: to hear you, to know you are free on their date, and to see that you have played somewhere like their venue. A website that answers all three, at any hour, does the selling while you do the playing.",
    "The entertainers who win the next five years will be easy to hear, easy to check and easy to book, and will keep the reviews and recommendations of every event they play.",
  ],
  visionTitle: "A weekend in the entertainer’s diary of 2030.",
  visionIntro:
    "Nothing below is science fiction. Each part is running somewhere today. The advantage goes to the entertainer who puts them together first.",
  vision: [
    {
      title: "Saturday 20:45 — you are on stage",
      body: "A couple finds you, plays three of your recordings, and sees that your diary looks open on their date.",
    },
    {
      title: "Saturday 20:52 — their questions are answered",
      body: "Your assistant tells them, aloud, that you play their first-dance song, that you bring your own sound, and that you have played their venue before.",
    },
    {
      title: "Saturday 21:00 — the booking request is in",
      body: "Date, venue, occasion and guest count, sent with a confirmation to the couple and a pending entry in your diary.",
    },
    {
      title: "Monday 09:00 — one tap to reply",
      body: "You confirm the date from your phone and reply on WhatsApp in one tap. The couple feels looked after.",
    },
    {
      title: "Two weeks after — a review, and the next booking",
      body: "A thank-you and a review request go out on their own. The review appears on your site under their venue and area, where the next couple will see it.",
    },
  ],
  packageTitle: "A booking engine that works while you perform.",
  packageIntro:
    "Listing sites send you leads and charge for them. What they will not build is your own stage online, where couples hear you, check your date and book you directly. That is what we build.",
  packageItems: [
    { title: "Hear you first", body: "Recordings on the first screen, organised by style and moment: ceremony, cocktail hour, first dance, dinner." },
    { title: "Check your date", body: "An availability check against your diary, so couples know at once whether to keep reading." },
    { title: "A voice assistant that knows your repertoire", body: "Answers questions about songs, sound, travel and venues aloud, and fills in the booking form for the couple to send." },
    { title: "A diary you can run from your phone", body: "Every enquiry lands as pending; you confirm, decline or reply on WhatsApp in one tap, and mark the days you are busy." },
    { title: "Reviews by venue and area", body: "Every review placed on a map and on area pages, so a couple sees you have played near them." },
    { title: "Weddings and corporate, separately", body: "Couples and events coordinators ask different questions. Each gets its own page and its own path to booking." },
    { title: "Area pages that rank", body: "A page for every area you play, written for local searches and readable by AI assistants." },
    { title: "A clear view of what is working", body: "Enquiries by area and occasion, how fast you replied, and how many became bookings, every month." },
  ],
  askTitle: "Five questions to ask about your bookings.",
  askIntro: "The answers show how many bookings are decided before you even see the enquiry.",
  ask: [
    { q: "Can a couple hear you within ten seconds of arriving?", why: "Music is chosen by ear. If recordings are buried, the couple leaves before they listen." },
    { q: "Can they see if you are free on their date?", why: "It is the first question every couple has. If they have to ask and wait, they ask someone else too." },
    { q: "How fast are weekend enquiries answered?", why: "Two in three couples book the first supplier who responds. Weekends are when you cannot." },
    { q: "Are your reviews where couples can see them?", why: "Reviews hidden on old pages or third-party sites do not help the couple reading your site tonight." },
    { q: "What would an AI assistant say about you?", why: "Ask one. If it cannot find your areas, venues and style, it will suggest another entertainer." },
  ],
  relatedSlugs: ["saxophone-for-functions"],
  faq: [
    { q: "Do couples really use AI to plan weddings?", a: "Yes. The Knot found AI adoption among US couples rose to 36% in its 2026 study, and Zola reports more than half of its couples use AI in some way. They still rely on trusted people for the emotional choices." },
    { q: "How quickly should I reply to an enquiry?", a: "As fast as you can. Easy Weddings found two in three couples book the first supplier who responds. A website that answers questions and takes the booking request at any hour gives you that speed while you work." },
    { q: "Should I stay on listing sites?", a: "They can help couples discover you. Your own site is where they hear you, check your date and book you without a middleman." },
    { q: "Can the site check my real availability?", a: "Yes. Your diary, kept on your phone, feeds the availability check, so couples see whether your date looks open before they enquire." },
    { q: "Does this work for DJs, bands and other entertainers?", a: "Yes. Any entertainer booked by date and venue benefits from the same pattern: hear, check, book, review." },
    { q: "How long does a project like this take?", a: "Most entertainer platforms go live in weeks, because the structure is proven. The Discovery Call is where we agree the scope and the timeline." },
  ],
  sources: [
    { title: "The Knot Worldwide unveils 2026 Real Weddings Study", publisher: "The Knot Worldwide", date: "February 2026", url: "https://www.theknotww.com/press-releases/the-knot-worldwide-unveils-2026-real-weddings-study" },
    { title: "The First Look Report 2026", publisher: "Zola", date: "2026", url: "https://www.zola.com/expert-advice/the-first-look-report-2026" },
    { title: "This is how quickly you need to respond to enquiries", publisher: "Easy Weddings", date: "2025", url: "https://easyweddings.com.au/pro-education/responding-to-enquiries" },
    { title: "The Knot Real Weddings: 2025 Vendor Report", publisher: "WeddingPro", date: "2025", url: "https://pros.weddingpro.com/?p=35668" },
  ],
  closingTitle: "Picture the next booking arriving while you play. Let us build it this year.",
  closingBody:
    "Book a 60-minute Discovery Call with Ignatius. We will look at how couples find and judge you today, how fast enquiries are answered, and which part of the 2030 booking engine is worth building first.",
};

export const metadata = industryMetadata(industry);

export default function EntertainmentBookingsIndustryPage() {
  return <IndustryPage industry={industry} />;
}
