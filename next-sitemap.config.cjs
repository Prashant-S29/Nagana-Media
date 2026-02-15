/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.naganamedia.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ["/api/*", "/admin/*", "/_next/*"],
  // Robot.txt generation with AI crawler support
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin"],
      },
      // OpenAI GPT Crawlers
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      // Anthropic Claude
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      // Google AI (Bard/Gemini)
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Common Crawl (used by many AI training datasets)
      {
        userAgent: "CCBot",
        allow: "/",
      },
      // Perplexity AI
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Apple Intelligence
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      // Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      // Meta AI
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.naganamedia.com"}/sitemap.xml`,
    ],
  },
  // Priority settings
  priority: 0.7,
  changefreq: "weekly",
  // Transform function to set priorities for different page types
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
    // Blog posts - high priority for SEO and LLM crawlers
    if (path.includes("/blogs/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }
    // Services pages
    if (path.includes("/services/")) {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    // Other pages - use explicit values instead of config properties
    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
