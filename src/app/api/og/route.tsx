// app/api/og/route.tsx
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") ?? "Welcome to Nagana Media!";
    const excerpt =
      searchParams.get("excerpt") ??
      "We are a leading B2B technology company that provides innovative solutions to businesses worldwide.";

    // You can load custom fonts if needed
    // const font = await fetch(
    //   new URL('../../../public/fonts/Inter-Bold.ttf', import.meta.url),
    // ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage:
              "linear-gradient(135deg, #0c1323 0%, #1e2f45 100%)",
            position: "relative",
            padding: "60px",
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage:
                "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Brand/Logo area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              top: "40px",
              right: "60px",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Nagana Media
          </div>

          {/* Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: "900px",
              gap: "30px",
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: title.length > 60 ? "48px" : "56px",
                fontWeight: "bold",
                color: "white",
                lineHeight: "1.1",
                margin: 0,
                textAlign: "center",
              }}
            >
              {title}
            </h1>

            {/* Excerpt */}
            <p
              style={{
                fontSize: "24px",
                color: "#e5e7eb",
                lineHeight: "1.4",
                margin: 0,
                textAlign: "center",
                maxWidth: "800px",
              }}
            >
              {excerpt}
            </p>

            {/* Bottom accent */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "4px",
                  background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
                  borderRadius: "2px",
                }}
              />
              <span
                style={{
                  color: "#9ca3af",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                GTM Strategy Insights
              </span>
              <div
                style={{
                  width: "60px",
                  height: "4px",
                  background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>

          {/* Bottom branding */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "60px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              color: "#9ca3af",
              fontSize: "16px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#3b82f6",
              }}
            />
            B2B Technology Leadership
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // fonts: [
        //   {
        //     name: 'Inter',
        //     data: font,
        //     style: 'normal',
        //     weight: 700,
        //   },
        // ],
      },
    );
  } catch (error) {
    // console.log(`${e.message}`);
    console.error("Error generating the image", error);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
