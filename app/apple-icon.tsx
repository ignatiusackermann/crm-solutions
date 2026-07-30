import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — same three-node brand mark as the site wordmark. */
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
          background: "#071726",
          position: "relative",
        }}
      >
        {/* Connectors approximated as thin bars */}
        <div
          style={{
            position: "absolute",
            width: 52,
            height: 3,
            background: "#8a9aa8",
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
            background: "#8a9aa8",
            left: 58,
            top: 105,
            transform: "rotate(28deg)",
            transformOrigin: "left center",
          }}
        />
        {/* Left — deep blue filled */}
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
        {/* Top-right — copper outline */}
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
        {/* Bottom-right — copper filled */}
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
