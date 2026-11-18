import { IndustryPage, industryMetadata, type Industry } from "../industry-page";

// Sources checked 18 November 2026. Numbers in `source` refer to the
// position in `sources` (1-based).
const industry: Industry = {
  slug: "medical-health",
  name: "Medical & Health",
  updated: "November 2026",
  seoTitle: "AI and the Private Practice of 2030 | CRM Solutions",
  seoDescription:
    "How AI scribes, Claude for Healthcare and AI-informed patients are changing private practices and clinics, and what a practice ready for 2030 looks like.",
  shareTitle: "The private practice of 2030: calmer, trusted and fully booked",
  headline: "Patients now arrive informed. The practice of 2030 is ready for them",
  lede:
    "Picture your practice four years from now. A nervous patient reads about a treatment at midnight and finds clear, honest answers from you, not a forum. They book a consultation without a phone call. Notes write themselves while the doctor listens. Recalls, aftercare and follow-ups go out on their own. The rooms stay full, and the team goes home on time. Every part of that exists today. This guide shows where healthcare stands, what is changing, and how to build that practice now.",
  forcesTitle: "Six changes reshaping private practice.",
  forcesIntro:
    "Healthcare moves carefully, and it should. But these changes have already started, and patients are moving faster than most practices. Each one is sourced and dated below.",
  forces: [
    {
      kicker: "Patients",
      title: "One in four adults already asks AI about their health.",
      body: "A West Health–Gallup survey of more than 5,500 US adults found that one in four use AI tools for health advice, and most of them do it before or after seeing a doctor. Patients arrive with questions already formed.",
      source: [1],
    },
    {
      kicker: "The consulting room",
      title: "Doctors are correcting what AI told their patients.",
      body: "In a 2026 Zocdoc survey, 83% of doctors said they had to correct information patients brought from AI, and more than one in five patients admitted hiding their AI use. The practice that gives patients good answers first earns their trust.",
      source: [2],
    },
    {
      kicker: "Claude for Healthcare",
      title: "Frontier AI is now built for clinical settings.",
      body: "In January 2026 Anthropic launched Claude for Healthcare: HIPAA-ready tools for providers, payers and health-tech companies, with opt-in connections to medical coding and coverage data. Anthropic says it does not train its models on users’ health data.",
      source: [3, 4],
    },
    {
      kicker: "Documentation",
      title: "AI scribes are spreading, and need a careful eye.",
      body: "Ambient AI scribes went from 20% to 29% of surveyed US physicians in a year. Results vary: UK GPs reported less time on notes and a lighter cognitive load, but nearly a third reported frequent errors. The note still needs a clinician’s review.",
      source: [5, 6],
    },
    {
      kicker: "The law",
      title: "Health data is special personal information.",
      body: "Under POPIA, information about a person’s health is special personal information, with stricter rules on who may process it and why. Every booking form, chatbot and email that touches a patient falls under it.",
      source: [7],
    },
    {
      kicker: "The profession",
      title: "AI does not change the ethical rules.",
      body: "The HPCSA’s rules on advertising, canvassing and touting still apply online, and practitioners remain responsible for misleading content even when AI wrote it. Its social media guidance (Booklet 16) was updated in March 2025.",
      source: [8, 9],
    },
  ],
  meaningTitle: "Trust is decided before the first appointment.",
  meaning: [
    "Patients do not choose a doctor or a clinic the way they choose a product. They are weighing safety, credibility and how they will feel, usually alone and often late at night. Today many of them ask an AI first. If your practice is not the clear, calm answer they find, someone else becomes their first impression.",
    "At the same time, the work behind the scenes is changing. Notes, coding, recalls and reminders are becoming assisted tasks. Done well, that gives clinicians time back. Done carelessly, it creates risk with the most sensitive information there is.",
    "The practices that win the next five years will do both: become the trusted answer before the patient walks in, and use AI behind the scenes with the care the profession demands.",
  ],
  visionTitle: "A day in the practice of 2030.",
  visionIntro:
    "Nothing below is science fiction. Each part is running somewhere today. The advantage goes to the practice that puts them together first, within the ethical rules.",
  vision: [
    {
      title: "23:50 — a nervous patient finds you",
      body: "They read a calm, plain explanation of the treatment, what it involves, the risks and who it is not for. They ask your assistant two questions aloud, then book a consultation for next week without a phone call.",
    },
    {
      title: "07:30 — the day is already prepared",
      body: "Intake forms completed online, medical aid details captured, reminders confirmed. Reception starts the day greeting patients, not chasing paperwork.",
    },
    {
      title: "10:00 — the doctor listens, the note drafts itself",
      body: "An AI scribe drafts the consultation note while the doctor keeps eye contact. The doctor reviews and signs it before the next patient. Nothing is filed unchecked.",
    },
    {
      title: "15:00 — aftercare goes out on time",
      body: "Treatment-specific aftercare instructions, a check-in message on day three, and the follow-up booking, sent automatically in the practice’s own voice.",
    },
    {
      title: "All year — patients come back",
      body: "Recalls, check-ups and seasonal reminders arrive when they should. Patients feel looked after between visits, and the diary stays full without a marketing push.",
    },
  ],
  packageTitle: "Everything the patient sees, built with the care your profession demands.",
  packageIntro:
    "AI vendors will sell you a scribe. What they will not build is how your practice is found, trusted and returned to. That is the part we build, as one system rather than a stack of subscriptions.",
  packageItems: [
    {
      title: "A website patients trust at first sight",
      body: "Calm design, plain-language treatment pages, clear credentials and doctor-led care, written within the HPCSA’s advertising rules: no promises, no misleading claims.",
    },
    {
      title: "Treatment guides that answer the private questions",
      body: "What it is, who it suits, what to expect, recovery and risks. The answers patients look for at midnight, so your practice is the source, not a forum.",
    },
    {
      title: "A voice assistant that knows its limits",
      body: "Answers questions about treatments, preparation and bookings aloud, at any hour. It never diagnoses, and it hands over to a person when it should.",
    },
    {
      title: "Online consultation booking",
      body: "Patients choose a time, receive confirmations and reminders, and complete intake before they arrive, with fewer no-shows.",
    },
    {
      title: "Aftercare, recalls and follow-ups",
      body: "Automated, treatment-specific messages that keep patients safe and bring them back, written in the practice’s own voice.",
    },
    {
      title: "Products and packages online",
      body: "Where it suits the practice, aftercare products and treatment packages sold securely online, with payment and delivery handled.",
    },
    {
      title: "POPIA-minded by design",
      body: "Only the information that is needed, stored where you know, with consent recorded and access limited. Health data treated as the special information it is.",
    },
    {
      title: "A clear view of what is working",
      body: "Which searches, treatments and pages bring new patients in, reported in plain language every month.",
    },
  ],
  askTitle: "Five questions to ask before AI touches patient data.",
  askIntro:
    "Patients trust you with their most private information. The right AI protects that trust. These are the questions we answer before anything goes live.",
  ask: [
    {
      q: "Is patient data used to train the AI?",
      why: "It should not be. Get it in writing, as Anthropic states for Claude’s health features.",
    },
    {
      q: "Where is the data stored, and under which agreement?",
      why: "Health information is special personal information under POPIA. Know the operator, the country and the access list.",
    },
    {
      q: "Who reviews what the AI writes?",
      why: "Notes, letters and patient messages need a clinician’s review. Studies of AI scribes still find omissions and errors.",
    },
    {
      q: "Does the assistant stay out of diagnosis?",
      why: "A website assistant can inform and book. It must not diagnose, and it must hand over to a person when a patient needs one.",
    },
    {
      q: "Does every claim meet the HPCSA’s rules?",
      why: "AI-written marketing is still your marketing. Practitioners remain responsible for misleading content, wherever it came from.",
    },
  ],
  relatedSlugs: ["star-aesthetic"],
  faq: [
    {
      q: "Will AI replace doctors?",
      a: "No. It is taking over documentation, admin and first answers to routine questions. Diagnosis, judgement and the relationship with the patient stay with clinicians, and patients say that is what they want.",
    },
    {
      q: "Is it legal to use AI with patient information in South Africa?",
      a: "It can be, with care. Health information is special personal information under POPIA, so you need a lawful basis, limited access, a known storage location, and providers who do not train on your data. Take advice for your specific use.",
    },
    {
      q: "Can a practice website use patient testimonials?",
      a: "Be careful. The HPCSA’s rules on advertising, canvassing and touting apply online, and it holds practitioners responsible for misleading content. Check Booklet 2 and Booklet 16, or ask the HPCSA, before publishing reviews or before-and-after images.",
    },
    {
      q: "Are AI scribes worth it?",
      a: "For many clinicians they reduce time on notes and mental load, but results vary and errors still occur. Treat the draft as a draft: review it before it is filed.",
    },
    {
      q: "What is Claude for Healthcare?",
      a: "A set of tools Anthropic launched in January 2026 for healthcare providers, payers and health-tech companies, built for HIPAA-regulated settings. Availability and terms differ by region, so check before relying on it in South Africa.",
    },
    {
      q: "How long does a project like this take?",
      a: "Most practice platforms go live in weeks, because the structure is proven. The Discovery Call is where we agree the scope and timeline for your practice.",
    },
  ],
  sources: [
    { title: "One in four US adults use AI for health advice (West Health–Gallup)", publisher: "Epocrates", date: "2026", url: "https://www.epocrates.com/online/article/millions-of-americans-now-turn-to-ai-for-health-advice-before-seeing-a-doctor" },
    { title: "The health secret 1 in 5 patients keep from their doctors (Zocdoc survey)", publisher: "Stacker / KEYT", date: "August 2026", url: "https://keyt.com/stacker-medical-care/2026/08/31/the-health-secret-1-in-5-patients-keep-from-their-doctors/" },
    { title: "Anthropic launches Claude for Healthcare", publisher: "Fierce Healthcare", date: "January 2026", url: "https://www.fiercehealthcare.com/ai-and-machine-learning/jpm26-anthropic-launches-claude-healthcare-targeting-health-systems-payers" },
    { title: "Claude for healthcare and life sciences", publisher: "Anthropic", date: "2026", url: "https://anthropic.com/news/healthcare-life-sciences" },
    { title: "Take note: the AI scribe era is here", publisher: "Medical Economics", date: "March 2026", url: "https://www.medicaleconomics.com/view/take-note-the-ai-scribe-era-is-here" },
    { title: "AI scribes cut workload but need oversight", publisher: "HealthManagement.org", date: "2026", url: "https://healthmanagement.org/c/it/news/ai-scribes-cut-workload-but-need-oversight" },
    { title: "Protection of Personal Information Act 4 of 2013", publisher: "South African Government", date: "2013", url: "https://www.gov.za/documents/protection-personal-information-act" },
    { title: "Booklet 2: Generic Ethical Rules with annexures", publisher: "HPCSA", date: "current", url: "https://www.hpcsa.co.za/Uploads/professional_practice/ethics/Booklet_2_Generic_Ethical_Rules_with_anexures.pdf" },
    { title: "HPCSA guidance on AI and social media (Booklet 16 updated March 2025)", publisher: "HPCSA blog", date: "2025", url: "https://www.hpcsa-blogs.co.za/?p=6578" },
  ],
  closingTitle: "Picture your practice in 2030. Let us build it this year.",
  closingBody:
    "Book a 60-minute Discovery Call with Ignatius. We will look at how patients find and choose you today, where the practice still runs by hand, and which part of the 2030 practice is worth building first.",
};

export const metadata = industryMetadata(industry);

export default function MedicalHealthIndustryPage() {
  return <IndustryPage industry={industry} />;
}
