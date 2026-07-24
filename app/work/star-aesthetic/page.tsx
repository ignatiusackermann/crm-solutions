import { CaseStudyPage, caseMetadata, type CaseStudy } from "../case-study";

const study: CaseStudy = {
  slug: "star-aesthetic",
  name: "Star Aesthetic",
  category: "Aesthetic practice",
  liveUrl: "https://staraesthetic.co.za/",
  liveLabel: "Visit Star Aesthetic",
  eyebrow: "Case study · Star Aesthetic Centre",
  headline: "Make complex treatments feel calm and clear",
  intro:
    "Star Aesthetic Centre needed a patient journey that builds trust quickly: who leads the care, which treatments fit, what to expect, and how to book—without overwhelming first-time visitors.",
  challengeTitle: "High trust. Many options. One decision that matters.",
  challenge: [
    "Prospective patients compare clinics on credibility before they compare price.",
    "Treatment menus can feel technical and intimidating when poorly structured.",
    "Booking and consultation must feel simple, private and professionally led.",
  ],
  approachTitle: "A doctor-led digital journey organised around patient decisions.",
  approach: [
    {
      title: "Premium identity",
      body: "Presented the practice with restraint and authority so clinical credibility is visible from the first screen.",
    },
    {
      title: "Treatment clarity",
      body: "Structured services so visitors understand options, outcomes and next steps without medical jargon getting in the way.",
    },
    {
      title: "Consultation path",
      body: "Made enquiry and booking feel guided—so interest becomes a conversation with the practice, not a dead-end form.",
    },
    {
      title: "Trust signals",
      body: "Placed proof, professionalism and reassurance where patients naturally hesitate before committing.",
    },
  ],
  resultsTitle: "A patient experience that supports the consultation—not just the brochure.",
  results: [
    "Clearer understanding of treatments before the first call",
    "A calmer path from interest to consultation booking",
    "A digital presence that matches the standard of in-clinic care",
  ],
  themes: ["Premium identity", "Treatment clarity", "Consultations"],
  visualClass: "star",
  brandLabel: "STAR AESTHETIC",
  brandLine: "Confidence, naturally.",
  ctaHint:
    "Useful for clinics and professional practices where trust, clarity and booking quality decide growth.",
};

export const metadata = caseMetadata(study);

export default function StarAestheticCasePage() {
  return <CaseStudyPage study={study} />;
}
