import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon — the refined brand mark on the warm cream canvas.
 * Geometry mirrors public/brand/crm-solutions-icon.svg (96px grid scaled 1.875x).
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8F4EC",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 96 96">
          <path d="M35.7 41.8 L57.2 29.5" stroke="#173D67" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M35.7 54.2 L57.2 66.5" stroke="#C85A36" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="27" cy="48" r="10" fill="#173D67" />
          <circle cx="65" cy="25" r="8.7" fill="none" stroke="#C85A36" strokeWidth="4" />
          <circle cx="65" cy="71" r="8.7" fill="#C85A36" />
          <circle cx="65" cy="71" r="3.2" fill="#F8F4EC" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
