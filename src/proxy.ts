import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl;
  const isStaging =
    hostname.startsWith("staging.") || hostname.includes("vercel.app");

  // Log AI crawler visits (optional - useful for monitoring)
  const userAgent = request.headers.get("user-agent") ?? "";
  const aiCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "anthropic-ai",
    "Claude-Web",
    "CCBot",
    "Google-Extended",
    "PerplexityBot",
    "Applebot-Extended",
    "cohere-ai",
    "FacebookBot",
  ];

  if (aiCrawlers.some((bot) => userAgent.includes(bot))) {
    console.log(`[AI Crawler] ${userAgent} visited ${pathname}`);
  }

  // Redirect old URLs (if you had previous URL structure)
  // Example: Redirect /blog/* to /blogs/*
  if (pathname.startsWith("/blog/") && !pathname.startsWith("/blogs/")) {
    const newPath = pathname.replace("/blog/", "/blogs/");
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  // Ensure trailing slashes are consistent (remove trailing slash)
  if (pathname !== "/" && pathname.endsWith("/")) {
    const newUrl = new URL(request.url);
    newUrl.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(newUrl, 301);
  }

  // Add security headers
  const response = NextResponse.next();

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/") ||
    isStaging
  ) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  // Help crawlers understand the canonical URL
  response.headers.set("X-Robots-Tag", "index, follow");

  return response;
}

// Configure which paths to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (robots.txt, sitemap.xml, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap|assets).*)",
  ],
};
