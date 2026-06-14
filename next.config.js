/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/**
 * Content Security Policy — covers all inline scripts used by Next.js App Router,
 * PostHog (posthog-js@1.255.1 requires unsafe-inline/eval for its recorder), and
 * the Calendly embed used in CalendlyFormEmbed.tsx.
 *
 * Start in Report-Only mode first if you need to audit violations without breaking
 * the site: rename the key to "Content-Security-Policy-Report-Only".
 */
const cspDirectives = [
  "default-src 'self'",
  // Next.js inline scripts + PostHog recorder needs unsafe-inline / unsafe-eval
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://us-assets.i.posthog.com https://www.googletagmanager.com https://unpkg.com",
  "style-src 'self' 'unsafe-inline'",
  // blob: and data: are required by next/image and some rich-text renderers
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com",
  // PostHog API calls go through our /ingest proxy (same origin) —
  // the direct PostHog host is kept as a fallback for the first request
  // before the proxy is ready.
  "connect-src 'self' blob: https://us.i.posthog.com https://us-assets.i.posthog.com https://api.github.com https://unpkg.com",
  // Calendly embed (src/components/feature/CalendlyFormEmbbed/)
  "frame-src 'self' https://calendly.com",
  // Prevent DOM-based XSS — remove if PostHog or other scripts use innerHTML
  // "require-trusted-types-for 'script'",
].join("; ");

/** @type {import("next").NextConfig} */
const nextConfig = {
  // ─── Performance ────────────────────────────────────────────────────────────
  reactStrictMode: true,

  // Image optimisation
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Strip console.* in production (keep errors + warnings)
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // ─── Experimental ───────────────────────────────────────────────────────────
  experimental: {
    // Inline critical CSS and defer the rest — removes the two render-blocking
    // CSS chunks identified in the PageSpeed audit (issue 1.2 / 1.9).
    // Requires the `critters` package (installed as devDependency).
    optimizeCss: true,

    // Tree-shake ESM packages more aggressively (issue 1.5 — legacy JS)
    esmExternals: true,

    // Per-package import optimisation — reduces initial bundle parse time
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
    ],
  },

  // ─── Headers ────────────────────────────────────────────────────────────────
  async headers() {
    return [
      // Global security + SEO headers applied to every route
      {
        source: "/:path*",
        headers: [
          // Performance
          { key: "X-DNS-Prefetch-Control", value: "on" },

          // Security — HSTS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // Security — Content Security Policy (issue 3.2)
          {
            key: "Content-Security-Policy",
            value: cspDirectives,
          },

          // Security — keep pop-up support for Decap CMS GitHub OAuth.
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },

          // Security — prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Security — restrict embedding to same origin
          { key: "X-Frame-Options", value: "SAMEORIGIN" },

          // Security — referrer policy (tightened from origin-when-cross-origin)
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          // Security — disable unused browser APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },

          // SEO — control Googlebot crawl behaviour
          {
            key: "X-Robots-Tag",
            value:
              "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
        ],
      },

      // Decap CMS admin + GitHub OAuth popup need opener access so the
      // callback window can pass the GitHub token back to /admin.
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/api/decap/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "unsafe-none" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },

      // ── Static asset caching (issue 5.10) ─────────────────────────────────
      // public/assets/ — team images, blog covers, static images
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Redundant path kept for clarity / legacy links
      {
        source: "/assets/blog/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Next.js content-hashed JS/CSS chunks
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // ── PostHog proxy cache (issue 1.8) ───────────────────────────────────
      // PostHog's CDN only caches these for 5 min – 4 h. By routing through
      // our own /ingest proxy we can set a much longer TTL so repeat visitors
      // don't re-download 132 KiB of analytics scripts on every visit.
      {
        source: "/ingest/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  // ─── Rewrites — PostHog proxy (issues 1.3 / 1.8) ───────────────────────────
  // Proxying PostHog through our own domain lets us:
  //  1. Cache assets longer than PostHog's CDN allows (issue 1.8).
  //  2. Avoid ad-blockers that block posthog.com directly.
  //  3. Keep the CSP connect-src restricted to 'self'.
  //
  // The PostHogProvider is updated to send events to `api_host: "/ingest"`.
  async rewrites() {
    const adminRewrite = {
      source: "/admin",
      destination: "/admin/index.html",
    };

    // Only proxy PostHog in production. In local dev the Next.js server tries
    // to reach PostHog's US servers from the machine's network and times out
    // (ETIMEDOUT). The PostHogProvider falls back to the direct host in dev.
    if (process.env.NODE_ENV !== "production") {
      return [adminRewrite];
    }

    return [
      adminRewrite,
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },

  // ─── URL / routing ──────────────────────────────────────────────────────────
  trailingSlash: false,
  skipTrailingSlashRedirect: true,

  // ─── Misc ───────────────────────────────────────────────────────────────────
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
};

export default nextConfig;
