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
import { execFileSync, spawnSync } from "node:child_process";
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
const MODEL = process.env.GEMINI_TTS_MODEL || "gemini-3.1-flash-tts-preview";
let RATE = 24000; // set from the first response; Gemini TTS is 16-bit mono.

// Some models return raw 16-bit PCM ("audio/l16; rate=24000"), others a WAV
// file. Either way, return the PCM samples and remember the sample rate.
function toPcm(buf, mime) {
  if (/wav/i.test(mime) || buf.subarray(0, 4).toString() === "RIFF") {
    RATE = buf.readUInt32LE(24);
    let off = 12;
    while (off + 8 <= buf.length) {
      const id = buf.subarray(off, off + 4).toString();
      const size = buf.readUInt32LE(off + 4);
      if (id === "data") return buf.subarray(off + 8, off + 8 + size);
      off += 8 + size + (size % 2);
    }
    throw new Error("WAV without a data chunk");
  }
  const m = mime.match(/rate=(\d+)/);
  if (m) RATE = Number(m[1]);
  return buf;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function wav(pcm) {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(RATE, 24); h.writeUInt32LE(RATE * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

async function speak(text, attempt = 1) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${script.style}: ${text}` }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
      },
    }),
  });
  if (res.status === 429 && attempt <= 4) {
    const body = await res.text();
    // A daily quota cannot be waited out; say so instead of retrying.
    if (/PerDay/.test(body)) throw new Error("Gemini free-tier daily limit for this voice model is used up. Try again tomorrow, or enable billing on the key.");
    const wait = Number(body.match(/"retryDelay":\s*"(\d+)/)?.[1] || 30);
    console.log(`  … rate limit, waiting ${wait} s`);
    await sleep((wait + 2) * 1000);
    return speak(text, attempt + 1);
  }
  if (!res.ok) throw new Error(`TTS failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) {
    if (attempt <= 2) return speak(text, attempt + 1); // occasional empty reply
    throw new Error("TTS returned no audio");
  }
  return toPcm(Buffer.from(part.inlineData.data, "base64"), part.inlineData.mimeType || "");
}

const dir = path.resolve("video-assets", script.name, "voice", format);
mkdirSync(dir, { recursive: true });
console.log(`Voice-over ${script.name} — ${format} — voice ${VOICE} — ${MODEL}`);

// The whole narration in ONE request (free-tier limits are per request, and
// one take keeps the delivery consistent), then split into one file per line
// at the pauses between them.
const full = path.resolve("video-assets", script.name, "voice", `${format}-full.wav`);
let pcm;
if (process.env.SPLIT_ONLY && existsSync(full)) {
  // Re-split an existing take without spending another request.
  pcm = toPcm(readFileSync(full), "audio/wav");
} else {
  // Long narrations come back empty, so send at most ~100 words per request.
  const groups = [];
  let group = [];
  let count = 0;
  for (const l of lines) {
    const w = l.text.split(/\s+/).length;
    if (group.length && count + w > 100) { groups.push(group); group = []; count = 0; }
    group.push(l.text);
    count += w;
  }
  groups.push(group);
  const takes = [];
  for (const g of groups) {
    takes.push(await speak(g.join("\n\n")), Buffer.alloc(Math.round(RATE * 0.6) * 2));
  }
  pcm = Buffer.concat(takes.slice(0, -1));
  writeFileSync(full, wav(pcm));
}
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", full, "-c:a", "aac", "-b:a", "192k", full.replace(/\.wav$/, ".m4a")]);
const total = pcm.length / 2 / RATE;
console.log(`  = ${path.basename(full)} (${total.toFixed(1)} s total)`);

// Find the pauses. For each line boundary, estimate where it should fall from
// the word counts, then cut at the detected pause nearest that point.
// ffmpeg writes silencedetect results to stderr.
const text = spawnSync("ffmpeg", ["-hide_banner", "-i", full, "-af", "silencedetect=noise=-38dB:d=0.3", "-f", "null", "-"], { encoding: "utf8" }).stderr;
const starts = [...text.matchAll(/silence_start: ([\d.]+)/g)].map((m) => Number(m[1]));
const ends = [...text.matchAll(/silence_end: ([\d.]+) \| silence_duration: ([\d.]+)/g)].map((m) => ({ end: Number(m[1]), dur: Number(m[2]) }));
const pauses = ends
  .map((e, i) => (starts[i] + e.end) / 2)
  .filter((t) => t > 0.5 && t < total - 0.5);
const words = lines.map((l) => l.text.split(/\s+/).length);
const allWords = words.reduce((a, b) => a + b, 0);
const gaps = [];
let cum = 0;
for (let i = 0; i < lines.length - 1; i++) {
  cum += words[i];
  const expected = (total * cum) / allWords;
  const after = gaps.length ? gaps[gaps.length - 1] : 0;
  const best = pauses
    .filter((t) => t > after)
    .sort((a, b) => Math.abs(a - expected) - Math.abs(b - expected))[0];
  if (best !== undefined) gaps.push(best);
}
// Manual correction after listening or transcribing: CUTS="8.22,11.38,19.55,…"
// (seconds, one per line boundary) replaces the automatic cut points.
if (process.env.CUTS) gaps.splice(0, gaps.length, ...process.env.CUTS.split(",").map(Number));
if (gaps.length !== lines.length - 1) console.log(`  ! found ${gaps.length} pauses for ${lines.length} lines — check the cuts`);
const cuts = [0, ...gaps, total];
for (const [i, line] of lines.entries()) {
  if (cuts[i + 1] === undefined) break;
  const from = Math.max(0, cuts[i]);
  const to = cuts[i + 1];
  const file = path.join(dir, `${String(i + 1).padStart(2, "0")}-${line.id}.wav`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", full, "-ss", from.toFixed(3), "-to", to.toFixed(3), file]);
  console.log(`  ✓ ${path.basename(file)} (${(to - from).toFixed(1)} s) ${line.text.slice(0, 48)}…`);
}
