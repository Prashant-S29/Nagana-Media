import type { MetadataRoute } from "next";

const SITE_URL = "https://www.naganamedia.com";

// Paths no crawler (search or AI) should index.
const disallow = ["/api/", "/_next/", "/admin"];

// Search + AI crawlers we explicitly welcome. All share the same allow/disallow
// as the catch-all; listing them documents intent and future-proofs per-bot
// tweaks. Mirrors the previous next-sitemap robots policy.
const allowedBots = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "ChatGPT-User",
  "anthropic-ai",
  "Claude-Web",
  "Google-Extended",
  "CCBot",
  "PerplexityBot",
  "Applebot-Extended",
  "cohere-ai",
  "FacebookBot",
];

/**
 * Native App Router robots.txt — replaces the next-sitemap-generated
 * `public/robots.txt` (same reason as sitemap.ts: public-file timing on Vercel).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...allowedBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
