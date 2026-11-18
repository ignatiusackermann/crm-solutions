import { ImageResponse } from "next/og";

// Site-wide share card. Pages with their own opengraph-image (the case
// studies) override it. Fixed colours: CSS variables do not reach ImageResponse.
export const alt = "What is one returning guest worth to your business?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#0f1b2d", color: "#fff", padding: "72px 80px" }}>
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#e0703a" }}>CRM Solutions</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>What is one returning guest worth to your business?</div>
          <div style={{ fontSize: 30, marginTop: 28, color: "rgba(255,255,255,0.8)" }}>Voice assistants, booking engines and quoting systems, live for real businesses.</div>
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)" }}>crmsolutions.app · Book a Discovery Call</div>
      </div>
    ),
    size,
  );
}
