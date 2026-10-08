import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "#2563eb",
          color: "white",
          fontSize: 40,
          fontWeight: 800,
        }}
      >
        {site.name.slice(0, 1)}
      </div>
    ),
    size,
  );
}
