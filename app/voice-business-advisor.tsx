"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  EndSensitivity,
  GoogleGenAI,
  Modality,
  ThinkingLevel,
  Type,
  type LiveServerMessage,
  type Session,
} from "@google/genai";

type VoiceStatus = "idle" | "connecting" | "active" | "error";

const ROUTES = {
  home: "/",
  platform: "/revenue-platform",
  audit: "/revenue-leak-audit",
  work: "/#work",
  lava: "/work/lava-sa",
  star: "/work/star-aesthetic",
  storvac: "/work/storvac",
  discovery: "/book-discovery-call",
  payments: "/payment-options",
  commitment: "/delivery-commitment",
  terms: "/terms-and-conditions",
  privacy: "/privacy-policy",
  cookies: "/cookie-policy",
} as const;

const ALLOWED_PATHS = new Set(Object.values(ROUTES).map((route) => route.split("#")[0]));

function pageText(): string {
  if (typeof document === "undefined") return "";
  const main = document.querySelector("main");
  return ((main as HTMLElement | null)?.innerText || "")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 6500);
}

function routeIsAllowed(route: string): boolean {
  if (!route.startsWith("/") || route.startsWith("//")) return false;
  return ALLOWED_PATHS.has(route.split("#")[0]);
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

function systemPrompt(pathname: string): string {
  return `You are Clara, CRM Solutions' AI Voice Business Advisor. You are the most capable, composed and commercially useful voice guide a serious business owner could meet on an agency website.

IDENTITY AND OPENING
- Speak first. Say: "Hello — I'm Clara, CRM Solutions' AI Voice Business Advisor. I can explain any part of the site and help you decide what is relevant to your business. May I ask who I'm speaking with?"
- Learn the visitor's first name within the first two turns. If they ask a question first, answer briefly, then ask their name.
- Be transparent that you are an AI voice advisor. Never imply that you are Ignatius or a human employee.
- English by default. Continue naturally in another supported language when the visitor requests it.

VOICE AND JUDGMENT
- Calm, warm, senior and precise. Never sound breathless, salesy or over-familiar.
- Prefer 1–3 spoken sentences per turn. Explain one idea, then pause.
- Ask intelligent questions about the business, the constraint and the commercial objective.
- Use plain business language. Never invent results, client facts, availability, prices or guarantees.
- When something needs Ignatius' judgment, say so and offer the Discovery Call.

CRM SOLUTIONS
- Founder-led by Ignatius Ackermann from Durban, South Africa; established in 2001; serving growth-minded US and selected international businesses remotely.
- Category: Business Growth Systems. The site, customer journey, CRM, automation and follow-up should work as one connected revenue system.
- Core message: Make every click, enquiry and customer worth more.

OFFERS AND METHOD
- Revenue Leak Audit: 12 business questions across six Revenue Loop stages; produces a score out of 100, stage scores, three ranked constraints and practical first actions.
- Revenue Platform: engagements begin at R20,000. It connects positioning, website, conversion journeys, CRM, automation, follow-up, retention and measurement. Exact scope depends on complexity, content, journeys, integrations and value.
- Revenue Loop stages: Position, Attract, Convert, Follow through, Retain and Improve.
- Growth Stewardship: ongoing review and optimisation after the core platform is live.
- Discovery Call: a focused 60-minute conversation with Ignatius, Monday to Friday, with three South African availability slots shown automatically in the visitor's timezone.
- Payment approach: normally 50% deposit and 50% final payment. Custom two-part arrangements can be created. Public wording is provider-neutral; the current secure checkout provider is shown only when payment is made.
- Delivery Commitment: CRM Solutions guarantees what it controls—approved scope, clear milestones, senior communication, testing, and correction of an agreed deliverable that misses its approved specification at no added professional fee. This is not a promise of revenue, rankings or outcomes beyond CRM Solutions' control. It includes 90-day launch support under the published terms.

SELECTED WORK
- Lava-SA: a specialist commerce platform designed around distinct buyer journeys, product education, trust, selection, purchase and post-sale connection.
- Star Aesthetic Centre: a doctor-led patient journey that organises treatments, skincare, trust and booking decisions.
- Storvac Systems: clearer product selection and commercial enquiry paths for specialist storage systems.
- Never claim unverified revenue improvements. Describe the systems and verified launch evidence only.

SITE TOOLS
- Use read_site_page when exact published wording or a detail should be checked before answering.
- Use navigate_to when the visitor asks to see a page, wants to take the Audit, book a call, review work or understand a published term. Say what you are opening, then call the tool.
- Use scroll_to_section for a point already on the current page.
- Only navigate within this approved route map: ${JSON.stringify(ROUTES)}.
- A successful tool response is the source of truth. Never claim that a page moved or opened before the tool confirms it.

PRIVACY AND SAFETY
- Do not request payment-card details, passwords, identity numbers, health data or confidential company information.
- Do not provide legal, medical or financial advice. Explain published CRM Solutions information and recommend professional advice where appropriate.
- Voice audio is processed to provide the live conversation. If asked, direct the visitor to the Privacy and Cookie Policies.

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

  const sessionRef = useRef<Session | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const playAtRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const mutedRef = useRef(false);
  const endedByUserRef = useRef(false);

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

  const teardown = useCallback(
    async (userEnded = false) => {
      endedByUserRef.current = userEnded;
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
    [stopPlayback],
  );

  useEffect(() => {
    return () => {
      void teardown(false);
    };
  }, [teardown]);

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

      const responses = await Promise.all(
        calls.map(async (call) => {
          const args = (call.args || {}) as Record<string, string>;
          let response: Record<string, unknown>;

          if (call.name === "navigate_to") {
            const route = args.route || "";
            if (!routeIsAllowed(route)) {
              response = { success: false, error: "That route is not approved." };
            } else {
              router.push(route);
              response = { success: true, route, message: "The approved page is opening." };
            }
          } else if (call.name === "scroll_to_section") {
            const found = scrollToSubject(args.subject || "");
            response = {
              success: found,
              subject: args.subject,
              message: found ? "The relevant section is in view." : "No matching section was found.",
            };
          } else if (call.name === "read_site_page") {
            const route = args.route || pathname;
            if (!routeIsAllowed(route)) {
              response = { success: false, error: "That route is not approved." };
            } else if (route.split("#")[0] === pathname) {
              response = { success: true, route, publishedText: pageText() };
            } else {
              try {
                const result = await fetch(route, { credentials: "same-origin" });
                const html = await result.text();
                const documentCopy = new DOMParser().parseFromString(html, "text/html");
                documentCopy.querySelectorAll("script,style,svg,noscript").forEach((node) => node.remove());
                const text = (documentCopy.querySelector("main")?.textContent || "")
                  .replace(/\s+/g, " ")
                  .trim()
                  .slice(0, 6500);
                response = { success: result.ok, route, publishedText: text };
              } catch {
                response = { success: false, route, error: "The page could not be read." };
              }
            }
          } else {
            response = { success: false, error: "Unknown tool." };
          }

          return {
            id: call.id,
            name: call.name,
            response,
          };
        }),
      );

      sessionRef.current?.sendToolResponse({ functionResponses: responses });
    },
    [pathname, router],
  );

  const handleMessage = useCallback(
    (message: LiveServerMessage) => {
      if (message.serverContent?.interrupted) stopPlayback();
      const audio = message.data;
      if (audio) playAudio(audio);
      if (message.toolCall?.functionCalls?.length) void handleToolCall(message);
    },
    [handleToolCall, playAudio, stopPlayback],
  );

  const start = useCallback(async () => {
    setStatus("connecting");
    setError("");
    endedByUserRef.current = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      const tokenResult = await fetch("/api/gemini-voice-token", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const tokenBody = (await tokenResult.json()) as {
        token?: string;
        model?: string;
        apiVersion?: string;
        error?: string;
      };
      if (!tokenResult.ok || !tokenBody.token) {
        throw new Error(tokenBody.error || "The private voice connection is not available.");
      }

      const ai = new GoogleGenAI({
        apiKey: tokenBody.token,
        httpOptions: { apiVersion: tokenBody.apiVersion || "v1alpha" },
      });

      const session = await ai.live.connect({
        model: tokenBody.model || "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: systemPrompt(pathname),
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
          tools: [
            {
              functionDeclarations: [
                {
                  name: "navigate_to",
                  description: "Open an approved CRM Solutions page for the visitor.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      route: {
                        type: Type.STRING,
                        description: `One exact route from: ${Object.values(ROUTES).join(", ")}`,
                      },
                    },
                    required: ["route"],
                  },
                },
                {
                  name: "scroll_to_section",
                  description: "Bring a relevant section of the current page into view.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      subject: {
                        type: Type.STRING,
                        description: "The visible heading or subject to bring into view.",
                      },
                    },
                    required: ["subject"],
                  },
                },
                {
                  name: "read_site_page",
                  description: "Read the published text of an approved page before explaining it.",
                  parameters: {
                    type: Type.OBJECT,
                    properties: {
                      route: {
                        type: Type.STRING,
                        description: "An exact approved CRM Solutions route.",
                      },
                    },
                    required: ["route"],
                  },
                },
              ],
            },
          ],
        },
        callbacks: {
          onmessage: handleMessage,
          onerror: () => {
            setError("The live voice connection was interrupted. Please try again.");
            setStatus("error");
          },
          onclose: () => {
            if (!endedByUserRef.current) {
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
  }, [handleMessage, pathname]);

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
          <small>AI Voice Business Advisor</small>
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
            <p className="voice-intro">Clara can explain any point on this website, compare the options and open the page that makes the answer clearer.</p>
            <div className="voice-orbit" aria-hidden="true">
              <span /><span /><span />
              <VoiceGlyph />
            </div>
            {error && <p className="voice-error">{error}</p>}
            <button type="button" className="voice-start" onClick={() => void start()} disabled={status === "connecting"}>
              {status === "connecting" ? <><i /> Connecting securely…</> : <><VoiceGlyph /> Start voice conversation</>}
            </button>
            <p className="voice-privacy">By starting, you consent to live audio processing for this conversation. <a href="/privacy-policy">Privacy</a></p>
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
