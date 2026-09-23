import { ImageResponse } from "next/og";
import { profile } from "@/content/data";

export const alt = `${profile.shortName} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 80% 30%, #1e3a5f 0%, #0b0d14 45%, #05060a 100%)",
          color: "#e6e9f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#6ee7b7" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#34d399" }} />
          {profile.status}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>RENAN</div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
              backgroundImage: "linear-gradient(90deg, #22d3ee, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AUGUSTO
          </div>
          <div style={{ marginTop: 28, fontSize: 36, color: "#22d3ee" }}>{profile.role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8b93a7" }}>{profile.tagline}</div>
      </div>
    ),
    size,
  );
}
