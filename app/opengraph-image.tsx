import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { hero } from "@/content/hero";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 72, background: "#0c110e", color: "#e7ece6", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", fontSize: 26, color: "#b5f36a" }}>{site.name}_</div>
      <div style={{ display: "flex", maxWidth: 900, fontSize: 78, fontWeight: 700, lineHeight: 1.06, letterSpacing: -3 }}>{hero.headline}</div>
      <div style={{ display: "flex", borderTop: "1px solid #364337", paddingTop: 24, fontSize: 26, color: "#a6b2a2" }}>{site.role} · React / Next.js / TypeScript</div>
    </div>, size,
  );
}
