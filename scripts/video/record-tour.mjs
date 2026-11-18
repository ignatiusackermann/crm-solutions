// Records a site's one-page video: the voice agent narrates /site-info?video=1
// from the opening section to the closing call to action while the page
// scrolls with her. One continuous take, no editing.
//
// The page exposes `window.__sandyTour = { rate, chunks: [{ at, b64 }], lines,
// sync: [{ ctx, wall }], done }` in video mode. Picture: Chrome DevTools
// screencast frames with wall-clock timestamps. Sound: the agent's own PCM
// from the page, placed on the same clock. ffmpeg joins them.
//
//   node scripts/video/record-tour.mjs <url> <portrait|landscape> <out-name>
//   node scripts/video/record-tour.mjs "https://debtreliefbiz.co.za/site-info?video=1&cut=short" portrait 00-debtreliefbiz-short
//
// Output: video-assets/<out-name>/<format>.mp4 (git-ignored).

import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const [, , url, format = "portrait", outName = "tour"] = process.argv;
if (!url) throw new Error("Usage: record-tour.mjs <url> <portrait|landscape> <out-name>");

const FORMATS = {
  portrait: { width: 540, height: 960, scale: 2, mobile: true },
  landscape: { width: 1920, height: 1080, scale: 1, mobile: false },
};
const fmt = FORMATS[format];
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9334;
const outDir = path.resolve("video-assets", outName);
const frameDir = path.join(outDir, `_frames_${format}`);
rmSync(frameDir, { recursive: true, force: true });
mkdirSync(frameDir, { recursive: true });
const profile = path.join(os.tmpdir(), `crm-tour-${Date.now()}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Autoplay must be allowed so the agent's audio plays without a click.
const edge = spawn(EDGE, [
  "--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  "--hide-scrollbars", "--no-first-run", "--disable-extensions",
  "--autoplay-policy=no-user-gesture-required", "about:blank",
], { stdio: "ignore" });

let target;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250);
  try { target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page"); } catch {}
}
if (!target) throw new Error("Edge did not start");
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let nextId = 1;
const pending = new Map();
const listeners = [];
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method) listeners.forEach((l) => l(msg));
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId++;
  pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});
// Every page call has a time limit, so a busy or frozen page can never hang the recorder.
const evaluate = async (expression, ms = 15000) => {
  const res = await Promise.race([
    send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }),
    sleep(ms).then(() => { throw new Error("page did not answer within " + ms / 1000 + " s"); }),
  ]);
  return res.result?.value;
};

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: fmt.width, height: fmt.height, deviceScaleFactor: fmt.scale, mobile: fmt.mobile });
if (fmt.mobile) {
  await send("Emulation.setUserAgentOverride", { userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36" });
  await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
}

const loaded = new Promise((r) => listeners.push((m) => m.method === "Page.loadEventFired" && r()));
await send("Page.navigate", { url });
await Promise.race([loaded, sleep(20000)]);
await sleep(3000);
if (!(await evaluate("typeof window.__sandyTour !== 'undefined' || document.querySelector('#tour-opening') !== null"))) {
  console.log("  ! the page has no video mode (no #tour-opening / __sandyTour) — is it deployed?");
}

// Screencast: every frame arrives with a wall-clock timestamp (seconds).
const frames = [];
listeners.push(async (m) => {
  if (m.method !== "Page.screencastFrame") return;
  const { data, sessionId, metadata } = m.params;
  const file = path.join(frameDir, `${String(frames.length).padStart(6, "0")}.jpg`);
  frames.push({ file, t: metadata.timestamp });
  writeFileSync(file, Buffer.from(data, "base64"));
  send("Page.screencastFrameAck", { sessionId }).catch(() => {});
});
// Full-HD frames at the full rate can swamp the connection and stall the page,
// so landscape takes every second frame at slightly lower quality.
await send("Page.startScreencast", { format: "jpeg", quality: fmt.mobile ? 85 : 78, maxWidth: fmt.width * fmt.scale, maxHeight: fmt.height * fmt.scale, everyNthFrame: fmt.mobile ? 1 : 2 });
await sleep(1500); // a moment on the opening scene before she speaks

console.log(`Recording ${outName} — ${format}`);
await evaluate("window.dispatchEvent(new Event('sandy:tour'))");
const started = Date.now();
let lastReport = 0;
const isDone = async () => { try { return await evaluate("Boolean(window.__sandyTour && window.__sandyTour.done)"); } catch (e) { console.log("  … " + e.message); return false; } };
while (!(await isDone())) {
  if (Date.now() - started > 6 * 60 * 1000) { console.log("  ! tour did not finish within 6 minutes"); break; }
  if (Date.now() - lastReport > 15000) {
    lastReport = Date.now();
    const p = await evaluate("(() => { const t = window.__sandyTour || {}; return { lines: (t.lines || []).length, chunks: (t.chunks || []).length, section: (t.lines || []).slice(-1)[0]?.section || '' }; })()").catch(() => null);
    console.log(`  … ${Math.round((Date.now() - started) / 1000)} s: ${p?.lines ?? 0} lines, ${p?.chunks ?? 0} audio chunks, on ${p?.section || "-"}`);
  }
  await sleep(500);
}
await sleep(1500); // hold the closing scene
await send("Page.stopScreencast");
// Fetch the voice in batches: one large reply over a busy connection can take
// longer than the time limit.
const head = await evaluate("(() => { const t = window.__sandyTour || {}; return { rate: t.rate, sync: t.sync, lines: t.lines, count: (t.chunks || []).length }; })()", 60000);
const tour = { rate: head.rate, sync: head.sync, lines: head.lines, chunks: [] };
for (let i = 0; i < head.count; i += 40) {
  const batch = await evaluate(`window.__sandyTour.chunks.slice(${i}, ${i + 40})`, 60000);
  tour.chunks.push(...batch);
}
console.log(`  ✓ collected ${tour.chunks.length} audio chunks`);
ws.close();
edge.kill();
await sleep(500);
try { rmSync(profile, { recursive: true, force: true }); } catch {}

if (frames.length < 2) throw new Error("No frames captured");
const t0 = frames[0].t;

// Picture: variable frame rate from the real timestamps.
const list = frames.map((f, i) => {
  const dur = i + 1 < frames.length ? frames[i + 1].t - f.t : 1 / 30;
  return `file '${f.file.replace(/\\/g, "/")}'\nduration ${Math.max(dur, 0.001).toFixed(4)}`;
}).join("\n") + `\nfile '${frames[frames.length - 1].file.replace(/\\/g, "/")}'\n`;
const listFile = path.join(frameDir, "frames.txt");
writeFileSync(listFile, list);
const total = frames[frames.length - 1].t - t0;

// Sound: place each chunk at its playback time, converted to the video clock.
const rate = tour.rate || 24000;
const sync = tour.sync?.[0];
let audioFile = null;
if (tour.chunks?.length && sync) {
  const offset = sync.wall - sync.ctx - t0; // video seconds = ctx seconds + offset
  const pcm = Buffer.alloc(Math.ceil((total + 1) * rate) * 2);
  for (const c of tour.chunks) {
    const buf = Buffer.from(c.b64, "base64");
    const at = Math.round((c.at + offset) * rate) * 2;
    if (at >= 0 && at < pcm.length) buf.copy(pcm, at, 0, Math.min(buf.length, pcm.length - at));
  }
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(rate, 24);
  h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  audioFile = path.join(outDir, `${format}-voice.wav`);
  writeFileSync(audioFile, Buffer.concat([h, pcm]));
} else {
  console.log("  ! no audio captured from the page (window.__sandyTour.chunks/sync missing)");
}

const out = path.join(outDir, `${format}.mp4`);
const args = ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile];
if (audioFile) args.push("-i", audioFile);
args.push("-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-crf", "18", "-movflags", "+faststart");
if (audioFile) args.push("-c:a", "aac", "-b:a", "192k", "-shortest");
args.push(out);
execFileSync("ffmpeg", args);
rmSync(frameDir, { recursive: true, force: true });
console.log(`  ✓ ${path.relative(process.cwd(), out)} (${total.toFixed(1)} s, ${frames.length} frames${audioFile ? ", with Sandy's voice" : ", NO audio"})`);
