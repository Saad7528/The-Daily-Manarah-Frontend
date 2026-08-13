import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const title = searchParams.get("title") || "ডেইলি মানারাহ নিউজ পোর্টাল";
    const category = searchParams.get("category") || "রাজনীতি";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#0f172a", // Dark navy background
            backgroundImage: "radial-gradient(circle at 90% 10%, #065f46 0%, transparent 60%)", // Emerald glow
            padding: "80px",
            boxSizing: "border-box",
            fontFamily: "sans-serif",
          }}
        >
          {/* Top Branding Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Brand Logo & Text */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Minaret SVG Representation */}
              <div
                style={{
                  display: "flex",
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#fbbf24",
                  borderRadius: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "16px",
                  color: "#0f172a",
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                M
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: "900",
                    letterSpacing: "2px",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  DAILY MANARAH
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    letterSpacing: "4px",
                    color: "#94a3b8",
                    marginTop: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  Beacon of Truth & Integrity
                </span>
              </div>
            </div>

            {/* Category Tag */}
            <div
              style={{
                backgroundColor: "#059669",
                color: "#ffffff",
                padding: "8px 24px",
                borderRadius: "9999px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {category}
            </div>
          </div>

          {/* Middle Headline Area */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "950px",
              marginTop: "40px",
            }}
          >
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "900",
                color: "#ffffff",
                lineHeight: "1.3",
                margin: 0,
                wordBreak: "break-word",
              }}
            >
              {title}
            </h1>
          </div>

          {/* Bottom Footer Details */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "2px solid rgba(255,255,255,0.1)",
              paddingTop: "24px",
              marginTop: "40px",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                color: "#64748b",
                fontWeight: "bold",
              }}
            >
              Verified Report / Fact-Checked
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#fbbf24",
                fontWeight: "bold",
              }}
            >
              www.dailymanarah.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
