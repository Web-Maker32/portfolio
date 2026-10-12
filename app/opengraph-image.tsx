import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 55%, #ecfeff 100%)",
          color: "#0f172a",
        }}
      >
        <div style={{ fontSize: 25, fontWeight: 700, letterSpacing: 8, color: "#2563eb" }}>
          FULL-STACK DEVELOPER · PAKISTAN
        </div>
        <div style={{ marginTop: 32, fontSize: 76, fontWeight: 800, letterSpacing: -3 }}>
          {site.name}
        </div>
        <div style={{ marginTop: 24, fontSize: 34, color: "#475569" }}>
          React · Next.js · TypeScript · Supabase
        </div>
        <div style={{ marginTop: 48, fontSize: 24, fontWeight: 600, color: "#2563eb" }}>
          Personal projects and code
        </div>
      </div>
    ),
    size,
  );
}
