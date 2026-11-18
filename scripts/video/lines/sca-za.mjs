// Sandy's narration for video 01 (docs/videos/01-sca-za.md). One entry per
// shot, so each line can be placed on the timeline separately.

export const name = "01-sca-za";

// How Sandy should sound. Sent to the text-to-speech model with every line.
// Gemini TTS takes a short spoken-style prefix ("Say warmly: …"); a longer
// instruction gets read aloud.
export const style = "Say warmly, calmly and unhurriedly, like a kind South African woman reassuring someone late at night";

export const portrait = [
  { id: "01-midnight", text: "It's twenty to midnight. A business owner can't sleep. SARS has written again." },
  { id: "02-finds", text: "She finds this practice first." },
  { id: "03-proof", text: "Forty-six years in Amanzimtoti. Xero partner. And it shows, in the first second." },
  { id: "04-sandy", text: "Hi, I'm Sandy. I answer questions on tax, payroll and Xero, out loud, any time of night." },
  { id: "05-booked", text: "Two questions later, she books a free consultation for nine the next morning." },
  { id: "06-depth", text: "Eight services. Seven guides. Every deadline, explained." },
  { id: "07-close", text: "Picture your next client finding you tonight. What would they see?" },
];

export const landscape = [
  { id: "01-midnight", text: "It's twenty to midnight in Amanzimtoti. A business owner can't sleep. SARS has written to her again, and she needs an accountant who understands Xero." },
  { id: "02-before", text: "South Coast Advisory has kept the books of South Coast businesses since nineteen eighty. For years, its website said almost none of that, and it never produced a single enquiry." },
  { id: "03-proof", text: "Now the first thing anyone sees is the proof: Xero Silver Partner, forty-six years in Amanzimtoti, SAICA, and a past president of SAIPA." },
  { id: "04-sandy", text: "I'm Sandy. I answer questions about tax, payroll and Xero out loud, at any hour, and when you're ready, I'll book you a free twenty-minute consultation." },
  { id: "05-depth", text: "There's a page for every service, a SARS deadline calendar, seven practical guides, and a glossary of a hundred and seventeen terms. The routine questions are answered before the phone rings." },
  { id: "06-booked", text: "And when she's ready, she books herself in. The practice was asleep. The website wasn't." },
  { id: "07-vision", text: "After years of a website that undersold them, finally one as precise as the books they keep." },
  { id: "08-close", text: "Picture your next client finding you tonight. What would they see?" },
];
