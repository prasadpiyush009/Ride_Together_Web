import { ImageResponse } from "next/og";

export const alt = "Ride Together: Every Ride. Together.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background:
            "radial-gradient(circle at 70% 85%, #7a3a0e 0%, #1a110b 38%, #0a0a0b 70%)",
          color: "#f2eee7",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 8,
            color: "#ff8a1f",
            marginBottom: 24,
          }}
        >
          RIDE TOGETHER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 148,
            fontWeight: 800,
            lineHeight: 0.92,
            textTransform: "uppercase",
          }}
        >
          Every Ride. Together.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            width: 220,
            height: 4,
            background: "#ff8a1f",
          }}
        />
      </div>
    ),
    size,
  );
}
