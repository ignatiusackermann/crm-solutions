// Generates the narration for a voice-agent video with Gemini text-to-speech.
//
// Reads GEMINI_API_KEY from the environment or from .env.local (never printed,
// never written anywhere). Writes one WAV per line plus a joined track with a
// short pause between lines:
//   video-assets/<name>/voice/<format>/<NN-id>.wav
//   video-assets/<name>/voice/<format>-full.wav  (and .m4a)
//
//   node scripts/video/voiceover.mjs scripts/video/lines/sca-za.mjs portrait
//   node scripts/video/voiceover.mjs scripts/video/lines/sca-za.mjs landscape
//
// Optional: GEMINI_TTS_VOICE (default Puck, the Gemini Live default that Sandy
// uses on the site because no voice is set), GEMINI_TTS_MODEL.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [, , linesFile, format = "portrait"] = process.argv;
if (!linesFile) throw new Error("Usage: voiceover.mjs <lines.mjs> <portrait|landscape>");
const script = await import(pathToFileURL(path.resolve(linesFile)).href);
const lines = script[format];
if (!lines) throw new Error(`No ${format} lines in ${linesFile}`);

function readKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  if (existsSync(".env.local")) {
    const m = readFileSync(".env.local", "utf8").match(/^GEMINI_API_KEY=(.+)$/m);
    if (m) return m[1].trim().replace(/^['"]|['"]$/g, "");
  }
  throw new Error("GEMINI_API_KEY not found (set it in .env.local or the environment).");
}
const key = readKey();
const VOICE = process.env.GEMINI_TTS_VOICE || "Puck";
const MODEL = process.env.GEMINI_TTS_MODEL || "gemini-2.5-flash-preview-tts";
const RATE = 24000; // Gemini TTS returns 24 kHz, 16-bit mono PCM.

function wav(pcm) {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(RATE, 24); h.writeUInt32LE(RATE * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

async function speak(text) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${script.style}\n\nSay: ${text}` }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
      },
    }),
  });
  if (!res.ok) throw new Error(`TTS failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const b64 = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData?.data;
  if (!b64) throw new Error("TTS returned no audio");
  return Buffer.from(b64, "base64");
}

const dir = path.resolve("video-assets", script.name, "voice", format);
mkdirSync(dir, { recursive: true });
const pause = Buffer.alloc(Math.round(RATE * 0.45) * 2); // 0.45 s between lines
const parts = [];
console.log(`Voice-over ${script.name} — ${format} — voice ${VOICE}`);
for (const [i, line] of lines.entries()) {
  const pcm = await speak(line.text);
  const file = path.join(dir, `${String(i + 1).padStart(2, "0")}-${line.id}.wav`);
  writeFileSync(file, wav(pcm));
  parts.push(pcm, pause);
  console.log(`  ✓ ${path.basename(file)} (${(pcm.length / 2 / RATE).toFixed(1)} s)`);
}
const full = path.resolve("video-assets", script.name, "voice", `${format}-full.wav`);
writeFileSync(full, wav(Buffer.concat(parts)));
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", full, "-c:a", "aac", "-b:a", "192k", full.replace(/\.wav$/, ".m4a")]);
const total = Buffer.concat(parts).length / 2 / RATE;
console.log(`  = ${path.basename(full)} (${total.toFixed(1)} s total)`);
