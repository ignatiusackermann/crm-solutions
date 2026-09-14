"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  EndSensitivity,
  GoogleGenAI,
  Modality,
  ThinkingLevel,
  type LiveServerMessage,
  type Session,
} from "@google/genai";
import {
  CLARA_ROUTES,
  CLARA_TOOLS,
  calendarText,
  runClaraTool,
  type Availability,
  type ClaraBooking,
  type ClaraCallback,
} from "@/lib/clara/tools";

type VoiceStatus = "idle" | "connecting" | "active" | "error";
type Speaker = "Visitor" | "Clara";

const TRANSCRIPT_LIMIT = 12000;
const SETUP_WAIT_MS = 6000;

function pageText(): string {
  if (typeof document === "undefined") return "";
  const main = document.querySelector("main");
  return ((main as HTMLElement | null)?.innerText || "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 6500);
}

function scrollToSubject(subject: string): boolean {
  const query = subject.trim().toLowerCase();
  if (!query) return false;
  if (/(top|opening|hero|start)/.test(query)) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }
  if (/(footer|bottom)/.test(query)) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    return true;
  }
  const direct = document.getElementById(query);
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>("h1,h2,h3,section[id],[data-section]"),
  );
  const match =
    direct ||
    candidates.find((element) =>
      (element.textContent || "").toLowerCase().includes(query),
    );
  if (!match) return false;
  match.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

async function readSitePage(route: string): Promise<Record<string, unknown>> {
  if (route.split("#")[0] === window.location.pathname) {
    return { success: true, route, publishedText: pageText() };
  }
  try {
    const result = await fetch(route, { credentials: "same-origin" });
    const html = await result.text();
    const documentCopy = new DOMParser().parseFromString(html, "text/html");
    documentCopy.querySelectorAll("script,style,svg,noscript").forEach((node) => node.remove());
    const text = (documentCopy.querySelector("main")?.textContent || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 6500);
    return { success: result.ok, route, publishedText: text };
  } catch {
    return { success: false, route, error: "The page could not be read." };
  }
}

function visitorTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Johannesburg";
  } catch {
    return "Africa/Johannesburg";
  }
}

function resample(input: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (fromRate === toRate) return input;
  const ratio = fromRate / toRate;
  const length = Math.round(input.length / ratio);
  const output = new Float32Array(length);
  for (let index = 0; index < length; index += 1) {
    output[index] = input[Math.floor(index * ratio)] ?? 0;
  }
  return output;
}

function pcmToBase64(input: Float32Array): string {
  const pcm = new Int16Array(input.length);
  for (let index = 0; index < input.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, input[index] ?? 0));
    pcm[index] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  const bytes = new Uint8Array(pcm.buffer);
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index] ?? 0);
  }
  return btoa(binary);
}

function base64ToFloat32(value: string): Float32Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  const pcm = new Int16Array(bytes.buffer);
  const output = new Float32Array(pcm.length);
  for (let index = 0; index < pcm.length; index += 1) {
    const sample = pcm[index] ?? 0;
    output[index] = sample / (sample < 0 ? 0x8000 : 0x7fff);
  }
  return output;
}

function systemPrompt(pathname: string, calendar: string): string {
  return `You are Clara, CRM Solutions' AI Voice Business Advisor. You are the most capable, composed and commercially useful voice guide a serious business owner could meet on an agency website.

IDENTITY AND OPENING
- Speak first. Say: "Hello — I'm Clara, CRM Solutions' AI Voice Business Advisor. I can explain any part of the site, help you decide what is relevant to your business, and book a call with Ignatius if that would help. May I ask who I'm speaking with?"
- Learn the visitor's first name within the first two turns. If they ask a question first, answer briefly, then ask their name.
- Be transparent that you are an AI voice advisor. Never imply that you are Ignatius or a human employee.
- English by default. Continue naturally in another supported language when the visitor requests it.

VOICE AND JUDGMENT
- Calm, warm, senior and precise. Never sound breathless, salesy or over-familiar.
- Prefer 1–3 spoken sentences per turn. Explain one idea, then pause.
- Ask intelligent questions about the business, the constraint and the commercial objective.
- Use plain business language. Never invent results, client facts, availability, prices or guarantees.
- When something needs Ignatius' judgment, say so and offer to book the Discovery Call.

CRM SOLUTIONS
- Founder-led by Ignatius Ackermann from Durban, South Africa, building commercial platforms since 2001. CRM Solutions works with established South African businesses that want the whole customer journey connected.
- Category: Business Growth Systems. The site, customer journey, CRM, automation and follow-up should work as one connected revenue system.
- Core message: Make every click, enquiry and customer worth more.

OFFERS AND METHOD
- Revenue Leak Audit: 12 business questions across six Revenue Loop stages; produces a score out of 100, stage scores, three ranked constraints and practical first actions.
- Revenue Platform: engagements begin at R20,000. It connects positioning, website, conversion journeys, CRM, automation, follow-up, retention and measurement. Exact scope depends on complexity, content, journeys, integrations and value.
- Revenue Loop stages: Position, Attract, Convert, Follow through, Retain and Improve.
- Growth Stewardship: ongoing review and optimisation after the core platform is live.
- Discovery Call: a focused 60-minute online conversation with Ignatius, Monday to Friday excluding South African public holidays, with morning, afternoon and evening start times in South African time. You can book it during this conversation.
- Payment: terms are agreed with each client in the written proposal. Do not quote a payment split or instalment structure; say Ignatius sets this out in the proposal.
- Delivery Commitment: CRM Solutions guarantees what it controls—approved scope, clear milestones, senior communication, testing, and correction of an agreed deliverable that misses its approved specification at no added professional fee. This is not a promise of revenue, rankings or outcomes beyond CRM Solutions' control. It includes 90-day launch support under the published terms.

SELECTED WORK
- Lava-SA: a specialist commerce platform designed around distinct buyer journeys, product education, trust, selection, purchase and post-sale connection.
- Star Aesthetic Centre: a doctor-led patient journey that organises treatments, skincare, trust and booking decisions.
- Storvac Systems: clearer product selection and commercial enquiry paths for specialist storage systems.
- Never claim unverified revenue improvements. Describe the systems and verified launch evidence only.

INDUSTRY PAGES
- Accounting practices: /for-accounting-practices — the standing-still calculator: how many new clients a practice must win each year just to stay the same size.
- Established local businesses: /value-of-returning-customer — what a returning customer is worth.
- Guest houses and hospitality: /value-of-a-returning-guest — what a returning guest is worth.

BOOKING A DISCOVERY CALL
- Offer to book when the visitor wants to speak to Ignatius, asks something that needs his judgment (scope, price for their situation, fit), or shows clear intent. Offer once, then follow their lead. Never push.
- Before booking you need: first name and surname; email address; company name; and what would make the call valuable, in their own words. A phone number and website are helpful but optional.
- Email addresses: ask the visitor to spell it, then read it back. Confirm any unusual spelling letter by letter.
- Always call check_availability before offering times. Offer at most three options. Say times in South African time; when the tool gives visitor_local, mention their local time as well.
- Resolve days from the BOOKING CALENDAR below. Never work out weekdays or dates yourself.
- Before booking, read back the day, time, full name, email and company, and ask "Shall I book that for you?". Only a clear yes counts.
- Then call book_discovery_call exactly once. Never say the call is booked until the tool confirms it.
- After success, confirm the day and time, and say a confirmation email with the calendar details is on its way and Ignatius has been notified.
- If the tool reports slot_taken, apologise briefly, check availability again and offer new times.
- For any other failure, do not retry. Offer to open the booking page (/book-discovery-call) or to arrange a callback.
- Book only one Discovery Call per conversation.

CALLBACKS
- If the visitor would rather be phoned, confirm their name and phone number, ask when suits them and what they want to discuss, then call request_callback once.
- If a tool fails, the direct number is 076 180 9799.

SITE TOOLS
- Use read_site_page when exact published wording or a detail should be checked before answering.
- Use navigate_to when the visitor asks to see a page, wants to take the Audit, review work or understand a published term. Say what you are opening, then call the tool.
- Use scroll_to_section for a point already on the current page.
- Only navigate within this approved route map: ${JSON.stringify(CLARA_ROUTES)}.
- A successful tool response is the source of truth. Never claim that a page moved, opened or a booking went through before the tool confirms it.

PRIVACY AND SAFETY
- Do not request payment-card details, passwords, identity numbers, health data or confidential company information. A name, email, phone number and company name for a booking or callback are fine.
- Do not provide legal, medical or financial advice. Explain published CRM Solutions information and recommend professional advice where appropriate.
- Voice audio is processed to provide the live conversation, and a transcript is kept so Ignatius can follow up. If asked, direct the visitor to the Privacy and Cookie Policies.

BOOKING CALENDAR
${calendar}

CURRENT PAGE
Path: ${pathname}
Visible page text:
${pageText()}`;
}

function VoiceGlyph({ muted = false }: { muted?: boolean }) {
  return muted ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5l14 14M9.5 9.6v2.3a2.5 2.5 0 0 0 3.9 2.1M14.5 9.6V7a2.5 2.5 0 0 0-4.8-1M6.8 14.8A6 6 0 0 0 17 15M12 18v3M9 21h6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9.5" y="3" width="5" height="12" rx="2.5" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4M9 21h6" />
    </svg>
  );
}

export function VoiceBusinessAdvisor() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<ClaraBooking | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const sessionRef = useRef<Session | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const playAtRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const mutedRef = useRef(false);
  const endedByUserRef = useRef(false);

  // Per-conversation state lives in refs: Gemini's callbacks outlive renders.
  const passRef = useRef<string | undefined>(undefined);
  const bookingsRef = useRef<ClaraBooking[]>([]);
  const callbackRef = useRef<ClaraCallback | null>(null);
  const callbackSentRef = useRef(false);
  const transcriptRef = useRef<string[]>([]);
  const lastSpeakerRef = useRef<Speaker | null>(null);
  const startedAtRef = useRef("");
  const savedRef = useRef(true);
  const setupDoneRef = useRef<(() => void) | null>(null);
  // Tool calls run strictly one after another. On Star Aesthetic, Gemini re-sent
  // a booking while the first was still in flight; run in parallel, both passed
  // the duplicate check and two slots were booked (11 Sept 2026). Queued, the
  // repeat sees the first booking.
  const toolQueueRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const stopPlayback = useCallback(() => {
    sourcesRef.current.forEach((source) => {
      try {
        source.stop();
      } catch {}
    });
    sourcesRef.current.clear();
    playAtRef.current = 0;
    setSpeaking(false);
  }, []);

  const noteLine = useCallback((line: string) => {
    transcriptRef.current.push(line);
    lastSpeakerRef.current = null;
  }, []);

  const appendTranscript = useCallback((speaker: Speaker, fragment?: string) => {
    if (!fragment) return;
    const lines = transcriptRef.current;
    const last = lines.length - 1;
    if (lastSpeakerRef.current === speaker && last >= 0) {
      lines[last] = `${lines[last] ?? ""}${fragment}`;
    } else {
      lines.push(`${speaker}: ${fragment.trimStart()}`);
      lastSpeakerRef.current = speaker;
    }
  }, []);

  // Saves the conversation to the admin Voice log, once per conversation. The
  // beacon variant survives the visitor closing the tab mid-call.
  const saveSession = useCallback((viaBeacon = false) => {
    if (savedRef.current || !passRef.current) return;
    const transcript = transcriptRef.current
      .map((line) => line.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join("\n")
      .slice(-TRANSCRIPT_LIMIT);
    const firstBooking = bookingsRef.current[0] ?? null;
    if (!transcript && !firstBooking && !callbackRef.current) return;
    savedRef.current = true;

    const body = JSON.stringify({
      pass: passRef.current,
      transcript,
      page: window.location.pathname,
      startedAt: startedAtRef.current,
      endedAt: new Date().toISOString(),
      booking: firstBooking,
      callback: callbackRef.current,
    });
    try {
      if (viaBeacon && typeof navigator.sendBeacon === "function") {
        navigator.sendBeacon("/api/clara-session", new Blob([body], { type: "application/json" }));
        return;
      }
      void fetch("/api/clara-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => undefined);
    } catch {
      /* the page is going away */
    }
  }, []);

  const teardown = useCallback(
    async (userEnded = false) => {
      endedByUserRef.current = userEnded;
      saveSession();
      stopPlayback();
      processorRef.current?.disconnect();
      processorRef.current = null;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      try {
        sessionRef.current?.close();
      } catch {}
      sessionRef.current = null;
      await inputContextRef.current?.close().catch(() => undefined);
      await outputContextRef.current?.close().catch(() => undefined);
      inputContextRef.current = null;
      outputContextRef.current = null;
      setMuted(false);
      setStatus("idle");
    },
    [saveSession, stopPlayback],
  );

  useEffect(() => {
    return () => {
      void teardown(false);
    };
  }, [teardown]);

  useEffect(() => {
    if (status !== "active") return;
    const onPageHide = () => saveSession(true);
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, [saveSession, status]);

  const playAudio = useCallback((base64: string) => {
    const context =
      outputContextRef.current ||
      new AudioContext({ sampleRate: 24000 });
    outputContextRef.current = context;
    if (context.state === "suspended") void context.resume();
    const samples = base64ToFloat32(base64);
    const buffer = context.createBuffer(1, samples.length, 24000);
    buffer.copyToChannel(new Float32Array(samples), 0);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    const startsAt = Math.max(context.currentTime + 0.02, playAtRef.current);
    source.start(startsAt);
    playAtRef.current = startsAt + buffer.duration;
    sourcesRef.current.add(source);
    setSpeaking(true);
    source.onended = () => {
      sourcesRef.current.delete(source);
      if (sourcesRef.current.size === 0) setSpeaking(false);
    };
  }, []);

  const handleToolCall = useCallback(
    async (message: LiveServerMessage) => {
      const calls = message.toolCall?.functionCalls ?? [];
      if (!calls.length || !sessionRef.current) return;

      const functionResponses: { id?: string; name?: string; response: Record<string, unknown> }[] = [];
      for (const call of calls) {
        const result = await runClaraTool(call.name, call.args as Record<string, unknown> | undefined, {
          pass: passRef.current,
          timezone: visitorTimezone(),
          alreadyBooked: bookingsRef.current,
          callbackSent: callbackSentRef,
          navigate: (route) => router.push(route),
          scroll: scrollToSubject,
          readPage: readSitePage,
          transcript: () => transcriptRef.current,
          page: () => window.location.pathname,
        });

        if (result.booking) {
          const booked = result.booking;
          bookingsRef.current = [...bookingsRef.current, booked];
          setBooking(booked);
          setShowConfirmation(true);
          noteLine(
            `[Booked Discovery Call: ${booked.saTime} — ${booked.firstName} ${booked.lastName}, ${booked.company}, ${booked.email}]`,
          );
        }
        if (result.callback) {
          callbackRef.current = result.callback;
          noteLine(`[Callback requested: ${result.callback.name}, ${result.callback.phone}]`);
        }
        functionResponses.push({ id: call.id, name: call.name, response: result.response });
      }

      try {
        sessionRef.current?.sendToolResponse({ functionResponses });
      } catch {
        /* the session closed while the tool ran */
      }
    },
    [noteLine, router],
  );

  const handleMessage = useCallback(
    (message: LiveServerMessage) => {
      if (message.setupComplete) {
        setupDoneRef.current?.();
        setupDoneRef.current = null;
      }
      if (message.serverContent?.interrupted) stopPlayback();
      appendTranscript("Visitor", message.serverContent?.inputTranscription?.text);
      appendTranscript("Clara", message.serverContent?.outputTranscription?.text);
      const audio = message.data;
      if (audio) playAudio(audio);
      if (message.toolCall?.functionCalls?.length) {
        toolQueueRef.current = toolQueueRef.current
          .then(() => handleToolCall(message))
          .catch(() => undefined);
      }
    },
    [appendTranscript, handleToolCall, playAudio, stopPlayback],
  );

  const start = useCallback(async () => {
    setStatus("connecting");
    setError("");
    setShowConfirmation(false);
    endedByUserRef.current = false;

    passRef.current = undefined;
    bookingsRef.current = [];
    callbackRef.current = null;
    callbackSentRef.current = false;
    transcriptRef.current = [];
    lastSpeakerRef.current = null;
    startedAtRef.current = new Date().toISOString();
    savedRef.current = false;
    toolQueueRef.current = Promise.resolve();
    setBooking(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      // Load the live calendar alongside the token, so Clara starts the call
      // already knowing which days can be booked.
      const availabilityRequest = fetch("/api/discovery-bookings", { cache: "no-store" })
        .then(async (response) => (response.ok ? ((await response.json()) as Availability) : null))
        .catch(() => null);

      const tokenResult = await fetch("/api/gemini-voice-token", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const tokenBody = (await tokenResult.json()) as {
        token?: string;
        model?: string;
        apiVersion?: string;
        pass?: string | null;
        error?: string;
      };
      if (!tokenResult.ok || !tokenBody.token) {
        throw new Error(tokenBody.error || "The private voice connection is not available.");
      }
      passRef.current = tokenBody.pass || undefined;
      const availability = await availabilityRequest;

      const ai = new GoogleGenAI({
        apiKey: tokenBody.token,
        httpOptions: { apiVersion: tokenBody.apiVersion || "v1alpha" },
      });

      // connect() resolves when the socket opens, not when Gemini has loaded
      // the system prompt and tools. Anything sent before setupComplete is
      // answered by bare Gemini, so the opening line waits for it.
      const setupDone = new Promise<void>((resolve) => {
        setupDoneRef.current = resolve;
      });

      const session = await ai.live.connect({
        model: tokenBody.model || "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: systemPrompt(pathname, calendarText(availability)),
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
          },
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          realtimeInputConfig: {
            automaticActivityDetection: {
              disabled: false,
              endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
              silenceDurationMs: 1200,
            },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          tools: [{ functionDeclarations: CLARA_TOOLS }],
        },
        callbacks: {
          onmessage: handleMessage,
          onerror: () => {
            setError("The live voice connection was interrupted. Please try again.");
            setStatus("error");
          },
          onclose: () => {
            if (!endedByUserRef.current) {
              saveSession();
              setStatus((current) => (current === "active" ? "idle" : current));
            }
          },
        },
      });
      sessionRef.current = session;

      const inputContext = new AudioContext();
      inputContextRef.current = inputContext;
      await inputContext.resume();
      const source = inputContext.createMediaStreamSource(stream);
      const processor = inputContext.createScriptProcessor(4096, 1, 1);
      const silentGain = inputContext.createGain();
      silentGain.gain.value = 0;
      processorRef.current = processor;
      source.connect(processor);
      processor.connect(silentGain);
      silentGain.connect(inputContext.destination);
      processor.onaudioprocess = (event) => {
        if (mutedRef.current || !sessionRef.current) return;
        const samples = event.inputBuffer.getChannelData(0);
        sessionRef.current.sendRealtimeInput({
          audio: {
            data: pcmToBase64(resample(samples, inputContext.sampleRate, 16000)),
            mimeType: "audio/pcm;rate=16000",
          },
        });
      };

      setStatus("active");
      setOpen(false);
      await Promise.race([
        setupDone,
        new Promise<void>((resolve) => window.setTimeout(resolve, SETUP_WAIT_MS)),
      ]);
      session.sendRealtimeInput({
        text: "The visitor has deliberately started the voice conversation. Speak your opening now.",
      });
    } catch (caught) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setError(caught instanceof Error ? caught.message : "The voice connection could not start.");
      setStatus("error");
      setOpen(true);
    }
  }, [handleMessage, pathname, saveSession]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (next) sessionRef.current?.sendRealtimeInput({ audioStreamEnd: true });
  };

  if (status === "active") {
    return (
      <div className="voice-active-bar" role="status" aria-live="polite">
        <span className={`voice-live-dot ${speaking ? "speaking" : ""}`} />
        <div>
          <strong>{speaking ? "Clara is speaking…" : muted ? "Microphone muted" : "Clara is listening…"}</strong>
          {booking ? (
            <small className="voice-booked">Discovery Call booked</small>
          ) : (
            <small>AI Voice Business Advisor</small>
          )}
        </div>
        <button type="button" className="voice-control" onClick={toggleMute} aria-label={muted ? "Unmute microphone" : "Mute microphone"}>
          <VoiceGlyph muted={muted} />
          <span>{muted ? "Unmute" : "Mute"}</span>
        </button>
        <button type="button" className="voice-end" onClick={() => void teardown(true)}>
          End
        </button>
      </div>
    );
  }

  return (
    <>
      {booking && showConfirmation && !open && (
        <div className="voice-booking-note" role="status">
          <div>
            <strong>Discovery Call booked</strong>
            <span>{booking.visitorTime || booking.saTime}</span>
            <small>Confirmation sent to {booking.email}</small>
          </div>
          <button type="button" onClick={() => setShowConfirmation(false)} aria-label="Dismiss booking confirmation">×</button>
        </div>
      )}
      {open && (
        <section className="voice-panel" aria-label="Clara Voice Business Advisor">
          <header>
            <div className="voice-avatar" aria-hidden="true">C</div>
            <div>
              <strong>Clara</strong>
              <span><i /> AI Voice Business Advisor</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close voice advisor">×</button>
          </header>
          <div className="voice-panel-body">
            <h2>Ask. Understand.<br />Move forward.</h2>
            <p className="voice-intro">Clara can explain any point on this website, compare the options, open the page that makes the answer clearer — and book your Discovery Call with Ignatius.</p>
            <div className="voice-orbit" aria-hidden="true">
              <span /><span /><span />
              <VoiceGlyph />
            </div>
            {error && <p className="voice-error">{error}</p>}
            <button type="button" className="voice-start" onClick={() => void start()} disabled={status === "connecting"}>
              {status === "connecting" ? <><i /> Connecting securely…</> : <><VoiceGlyph /> Start voice conversation</>}
            </button>
            <p className="voice-privacy">By starting, you consent to live audio processing for this conversation and a transcript being kept for follow-up. <a href="/privacy-policy">Privacy</a></p>
          </div>
        </section>
      )}
      {!open && (
        <button type="button" className="voice-launcher" onClick={() => setOpen(true)} aria-label="Open Clara, the Voice Business Advisor">
          <span className="voice-launcher-icon"><VoiceGlyph /></span>
          <span><strong>Ask Clara</strong><small>Voice Business Advisor</small></span>
        </button>
      )}
    </>
  );
}
