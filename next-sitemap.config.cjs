// Real publish dates for blog posts (used for accurate lastmod)
/** @type {Record<string, string>} */
const postDates = {
  "/blogs/surviving-the-ai-shift-2026": "2026-01-22T02:22:00.000Z",
  "/blogs/microsoft_ignite_2025_recap": "2025-12-04T05:35:07.322Z",
  "/blogs/ignite-2025-preview": "2025-11-18T05:35:07.322Z",
  "/blogs/mcaps-2025-2026-partner-priorities": "2025-09-06T05:35:07.322Z",
  "/blogs/gtm-strategy-for-b2b-technology-companies-evolution":
    "2025-09-06T05:35:07.322Z",
};

const disallowRules = ["/api/", "/_next/", "/admin"];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.naganamedia.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/admin/*", "/_next/*"],

  // robots.txt with per-bot /_next/ disallow so font files are never crawled
  robotsTxtOptions: {
    policies: [
      // Default catch-all
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowRules,
      },
      // Google search crawler
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowRules,
      },
      // Bing search crawler
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: disallowRules,
      },
      // OpenAI GPT crawlers
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: disallowRules,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: disallowRules,
      },
      // Anthropic Claude
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: disallowRules,
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: disallowRules,
      },
      // Google AI (Gemini / Bard training)
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: disallowRules,
      },
      // Common Crawl (used by many AI training datasets)
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: disallowRules,
      },
      // Perplexity AI
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: disallowRules,
      },
      // Apple Intelligence
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: disallowRules,
      },
      // Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: disallowRules,
      },
      // Meta AI
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: disallowRules,
      },
    ],
    additionalSitemaps: [],
    transformRobotsTxt: async (_, robotsTxt) => {
      return (
        robotsTxt +
        "\n# LLMs.txt - machine-readable site index for AI crawlers and LLMs\n" +
        "# LLMs: https://www.naganamedia.com/llms.txt\n"
      );
    },
  },

  // Extra paths to include in the sitemap that Next.js doesn't auto-discover
  // llms.txt is listed here so Google and every sitemap-reading AI bot finds it
  additionalPaths: async (config) => [
    {
      loc: "/llms.txt",
      changefreq: "weekly",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    },
  ],

  // Default priority / changefreq (overridden per route in transform)
  priority: 0.7,
  changefreq: "weekly",

  // Per-route transform: accurate lastmod + correct priority / changefreq
  transform: async (config, path) => {
    // Homepage
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Individual blog posts — use real publish date for lastmod
    if (path.includes("/blogs/") && path !== "/blogs") {
      const publishDate = postDates[path];
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: publishDate ?? new Date().toISOString(),
      };
    }

    // Blog index page
    if (path === "/blogs") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Individual service pages
    if (path.includes("/services/") && path !== "/services") {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Services index
    if (path === "/services") {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.75,
        lastmod: new Date().toISOString(),
      };
    }

    // About & Contact
    if (path === "/about" || path === "/contact") {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Fallback
    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    };
  },
};
