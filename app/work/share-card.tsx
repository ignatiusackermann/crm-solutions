import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { portfolio, readyToLaunch } from "./portfolio";

// The 1200×630 card WhatsApp, LinkedIn and Facebook show when a case study is
// shared: category, client name and the card line on the left, the real site
// screenshot on the right. Each app/work/<slug>/opengraph-image.tsx calls this.

export const shareSize = { width: 1200, height: 630 };
export const shareContentType = "image/png";

// Fixed brand colours for a generated image: the colour engine's CSS variables
// are not available inside ImageResponse.
const NAVY = "#0f1b2d";
const ACCENT = "#e0703a";

export async function workShareCard(slug: string) {
  const item = [...portfolio, ...readyToLaunch].find((p) => p.slug === slug);
  if (!item) throw new Error(`No portfolio entry for ${slug}`);
  const file = await readFile(path.join(process.cwd(), "public", item.screenshot));
  const shot = `data:image/jpeg;base64,${file.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: NAVY, color: "#fff" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 520, padding: "56px 48px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: ACCENT }}>{item.category}</div>
            <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.05, marginTop: 18 }}>{item.name}</div>
            <div style={{ fontSize: 27, lineHeight: 1.35, marginTop: 24, color: "rgba(255,255,255,0.86)" }}>{item.statement}</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
            Built by <span style={{ color: "#fff", marginLeft: 8, fontWeight: 700 }}>CRM Solutions</span>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", paddingRight: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot} alt="" width={640} height={440} style={{ objectFit: "cover", objectPosition: "top", borderRadius: 12 }} />
        </div>
      </div>
    ),
    shareSize,
  );
}
