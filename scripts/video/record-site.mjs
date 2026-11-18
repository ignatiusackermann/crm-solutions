// Records scripted screen captures of a live site for the voice-agent videos.
//
// Drives the installed Microsoft Edge over the Chrome DevTools Protocol (no
// Playwright or Puppeteer needed), captures one JPEG per frame while the
// script scrolls, types and clicks, then stitches each shot into an MP4 with
// ffmpeg. Frames are captured on a fixed timeline, so scrolls come out smooth
// whatever the machine's speed.
//
//   node scripts/video/record-site.mjs scripts/video/shots/sca-za.mjs portrait
//   node scripts/video/record-site.mjs scripts/video/shots/sca-za.mjs landscape
//   node scripts/video/record-site.mjs scripts/video/shots/sca-za.mjs portrait services   (one shot)
//
// Output: video-assets/<name>/<format>/<NN-shot>.mp4 (git-ignored).

import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";

const [, , shotFile, format = "portrait", onlyId] = process.argv;
if (!shotFile) throw new Error("Usage: record-site.mjs <shots.mjs> <portrait|landscape>");
const { name, shots } = await import(pathToFileURL(path.resolve(shotFile)).href);

const FPS = 30;
const FORMATS = {
  // CSS size × device scale factor = 1080×1920 / 1920×1080 video.
  portrait: { width: 540, height: 960, scale: 2, mobile: true },
  landscape: { width: 1920, height: 1080, scale: 1, mobile: false },
};
const fmt = FORMATS[format];
if (!fmt) throw new Error(`Unknown format ${format}`);

const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9333;
const outDir = path.resolve("video-assets", name, format);
mkdirSync(outDir, { recursive: true });
const profile = path.join(os.tmpdir(), `crm-video-${Date.now()}`);

const edge = spawn(EDGE, [
  "--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  "--hide-scrollbars", "--mute-audio", "--no-first-run", "--disable-extensions", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250);
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    target = list.find((t) => t.type === "page");
  } catch {}
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
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluate = async (expression) =>
  (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.value;

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: fmt.width, height: fmt.height, deviceScaleFactor: fmt.scale, mobile: fmt.mobile,
});
if (fmt.mobile) {
  await send("Emulation.setUserAgentOverride", {
    userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36",
  });
  await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
}

async function navigate(url) {
  const loaded = new Promise((r) => {
    const l = (m) => { if (m.method === "Page.loadEventFired") { listeners.splice(listeners.indexOf(l), 1); r(); } };
    listeners.push(l);
  });
  await send("Page.navigate", { url });
  await Promise.race([loaded, sleep(20000)]);
  await sleep(2500);
  // Dismiss cookie / privacy notices with the least-permissive choice.
  await evaluate(`(() => {
    const b = [...document.querySelectorAll('button, a')].find(e => /^(essential only|decline|reject|ok|got it|close)$/i.test(e.textContent.trim()));
    if (b) b.click();
  })()`);
  await sleep(600);
}

// One shot = a directory of frames turned into one MP4.
async function recordShot(index, shot) {
  const frameDir = path.join(outDir, `_frames_${index}`);
  rmSync(frameDir, { recursive: true, force: true });
  mkdirSync(frameDir, { recursive: true });
  let n = 0;
  const frame = async () => {
    const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 88, captureBeyondViewport: false });
    writeFileSync(path.join(frameDir, `${String(n++).padStart(5, "0")}.jpg`), Buffer.from(data, "base64"));
  };
  const api = {
    evaluate,
    hold: async (seconds) => { for (let i = 0; i < seconds * FPS; i++) { await frame(); await sleep(15); } },
    // Eased scroll from the current position to a target (px or "bottom").
    scrollTo: async (to, seconds) => {
      const from = await evaluate("window.scrollY");
      const max = await evaluate("document.documentElement.scrollHeight - innerHeight");
      // A number below 1 is a fraction of the page; "bottom" is the very end.
      const end = to === "bottom" ? max : to < 1 ? Math.round(max * to) : to;
      const steps = Math.round(seconds * FPS);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        await evaluate(`window.scrollTo(0, ${Math.round(from + (end - from) * e)})`);
        await sleep(20);
        await frame();
      }
    },
    scrollToElement: async (selector, seconds, offset = 80) => {
      const y = await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); return el ? el.getBoundingClientRect().top + scrollY - ${offset} : null; })()`);
      if (y !== null) await api.scrollTo(Math.max(0, y), seconds);
    },
    // Types into a field one character every two frames.
    type: async (selector, text) => {
      await evaluate(`document.querySelector(${JSON.stringify(selector)})?.focus()`);
      for (const ch of text) { await send("Input.insertText", { text: ch }); await frame(); await frame(); }
    },
    click: async (selector) => { await evaluate(`document.querySelector(${JSON.stringify(selector)})?.click()`); },
  };

  await navigate(shot.url);
  await shot.run(api);
  const out = path.join(outDir, `${String(index + 1).padStart(2, "0")}-${shot.id}.mp4`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(frameDir, "%05d.jpg"),
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-movflags", "+faststart", out]);
  rmSync(frameDir, { recursive: true, force: true });
  console.log(`  ✓ ${path.basename(out)} (${(n / FPS).toFixed(1)} s)`);
}

console.log(`Recording ${name} — ${format}`);
try {
  for (const [i, shot] of shots.entries()) {
    if (shot.only && shot.only !== format) continue;
    if (onlyId && shot.id !== onlyId) continue;
    try { await recordShot(i, shot); } catch (err) { console.log(`  ✗ ${shot.id}: ${err.message}`); }
  }
} finally {
  ws.close();
  edge.kill();
  await sleep(500);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
if (!existsSync(outDir)) process.exit(1);
