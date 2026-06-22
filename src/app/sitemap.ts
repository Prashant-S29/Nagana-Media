import type { MetadataRoute } from "next";

import { getAllPosts, getAllServices } from "~/utils/api";

// Canonical production host. Hardcoded (not branch-derived) so preview/staging
// builds still emit the production URLs search engines should index.
const SITE_URL = "https://www.naganamedia.com";

/**
 * Native App Router sitemap.
 *
 * This replaces the previous `next-sitemap` postbuild step, which wrote
 * `public/sitemap.xml` AFTER `next build` — too late, because Vercel snapshots
 * `public/` during the build, so the stale committed copy kept getting served.
 * Next.js emits this route as part of the build output, so it is always fresh
 * and always served. Regenerates automatically on every deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static routes (priority / changefreq mirror the old config) ──────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/blogs`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/ai-seo-audit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/meet-the-experts`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // llms.txt — machine-readable index, surfaced so AI crawlers discover it.
    { url: `${SITE_URL}/llms.txt`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  // ── Service pages (from _services) ───────────────────────────────────────
  const serviceRoutes: MetadataRoute.Sitemap = getAllServices().map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── Blog posts (from _posts) — real publish date as lastmod ──────────────
  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
