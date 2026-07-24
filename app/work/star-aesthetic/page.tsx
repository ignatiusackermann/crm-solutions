import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "star-aesthetic",
  name: "Star Aesthetic",
  category: "Aesthetic practice",
  liveUrl: "https://staraesthetic.co.za/",
  liveLabel: "Visit the live platform",
  heroTone: "star",
  headline: "From treatment menu to a calm patient journey",
  intro:
    "Star Aesthetic Centre needed a digital experience that builds clinical trust quickly—clarifying treatments, presenting doctor-led care, and making consultation the natural next step.",
  meta: [
    { label: "Client", value: "Star Aesthetic Centre" },
    { label: "Focus", value: "Patient journey" },
    { label: "Work", value: "Strategy, design, development" },
    { label: "Outcome", value: "Clearer consultation path" },
  ],
  services: [
    { label: "Strategy", title: "Trust diagnosis" },
    { label: "Experience", title: "Patient journey design" },
    { label: "Platform", title: "Practice website" },
    { label: "Conversion", title: "Consultation booking" },
  ],
  narrativeTitle: "The job was bigger than listing treatments.",
  narrative: [
    "Prospective patients do not buy procedures the way shoppers buy commodities. They evaluate credibility, safety, fit and emotional confidence before they book.",
    "The work was to organise the practice’s digital presence around those decisions—so interest becomes a consultation with less confusion and less hesitation.",
  ],
  pillars: [
    {
      title: "Credibility before catalogue",
      body: "Doctor-led identity and professional presentation that reassure before treatment detail begins.",
    },
    {
      title: "Treatments made understandable",
      body: "Complex options structured so patients can orient quickly without being overwhelmed.",
    },
    {
      title: "A calm path to consultation",
      body: "Enquiry and booking designed as a guided next step—not a cold form at the end of a brochure.",
    },
  ],
  decisionTitle: "Design the patient decision—not merely the pages.",
  decisions: [
    {
      label: "First impression",
      title: "Establish clinical trust immediately",
      body: "Signal professionalism, leadership and standards before asking anyone to choose a treatment.",
    },
    {
      label: "Treatment clarity",
      title: "Help patients understand options without jargon walls",
      body: "Organise services around questions patients actually ask when deciding whether to enquire.",
    },
    {
      label: "Proof & reassurance",
      title: "Reduce fear at the point of commitment",
      body: "Place trust signals where anxiety usually stops the journey short of booking.",
    },
    {
      label: "Consultation",
      title: "Make the next step simple and private",
      body: "Turn interest into a conversation with the practice through a clear, respectful booking path.",
    },
  ],
  layersTitle: "Six layers working as one practice.",
  layersIntro:
    "A clinic website succeeds when identity, education, experience, technology, communication and follow-through support the same patient journey.",
  layers: [
    {
      title: "Practice strategy",
      body: "Define who the practice serves and what decision the site must help them make.",
    },
    {
      title: "Content & messaging",
      body: "Explain care, treatments and expectations in calm, credible language.",
    },
    {
      title: "Experience design",
      body: "Guide visitors from curiosity to consultation without pressure or clutter.",
    },
    {
      title: "Technical platform",
      body: "Build a fast, polished site that feels as considered as the clinic itself.",
    },
    {
      title: "Patient communication",
      body: "Connect enquiries and booking into a clear operational response path.",
    },
    {
      title: "Ongoing improvement",
      body: "Use real enquiry behaviour to refine the journey after launch.",
    },
  ],
  proofTitle: "Every section answers a different patient question.",
  proofPoints: [
    "Who leads my care?",
    "Which treatments are relevant to me?",
    "Is this practice credible?",
    "What should I expect next?",
    "How do I book a consultation?",
  ],
  depthTitle: "Proof of depth—without inventing performance claims.",
  depthIntro:
    "The work is measured by decision clarity: a patient journey that supports trust and consultation quality.",
  depthStats: [
    { value: "1", label: "Doctor-led patient journey" },
    { value: "4", label: "Decision stages designed end-to-end" },
    { value: "6", label: "Practice layers built together" },
    { value: "Live", label: "Operating platform in market" },
  ],
  stewardshipTitle: "Launch is the beginning of the evidence—not the end of the work.",
  stewardship: [
    "Enquiry patterns show which treatments need clearer explanation.",
    "Trust and booking friction can be improved from real behaviour.",
    "The site remains an asset that supports the consultation room—not a static brochure.",
  ],
  closingTitle: "Do you need a prettier clinic site—or a clearer patient engine?",
  brandLabel: "STAR AESTHETIC",
  brandLine: "Confidence, naturally.",
  brandCta: "Book a consultation",
};

export const metadata = caseMetadata(study);

export default function StarAestheticCasePage() {
  return <CaseStudyPage study={study} />;
}
