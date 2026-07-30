import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — light canvas so it matches the site, not a black tile. */
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
          background: "#f5f2ea",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 52,
            height: 3,
            background: "#6b7c8a",
            left: 58,
            top: 72,
            transform: "rotate(-28deg)",
            transformOrigin: "left center",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 52,
            height: 3,
            background: "#6b7c8a",
            left: 58,
            top: 105,
            transform: "rotate(28deg)",
            transformOrigin: "left center",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 36,
            height: 36,
            borderRadius: 18,
            background: "#123b74",
            left: 40,
            top: 72,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 36,
            height: 36,
            borderRadius: 18,
            border: "5px solid #c75c36",
            left: 104,
            top: 36,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 36,
            height: 36,
            borderRadius: 18,
            background: "#c75c36",
            left: 104,
            top: 108,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
