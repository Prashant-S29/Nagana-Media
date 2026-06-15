const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDirectory = path.join(process.cwd(), "_posts");

/**
 * @param {Date | string | unknown} date
 * @returns {string}
 */
const normalizeDate = (date) => {
  if (date instanceof Date) {
    return date.toISOString();
  }

  if (typeof date === "string") {
    return date;
  }

  return new Date().toISOString();
};

const getBlogSitemapEntries = () => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(
        path.join(postsDirectory, file),
        "utf8",
      );
      const { data } = matter(fileContents);

      return {
        loc: `/blogs/${slug}`,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: normalizeDate(data.date),
      };
    });
};

/** @type {Record<string, string>} */
const postDates = Object.fromEntries(
  getBlogSitemapEntries().map((entry) => [entry.loc, entry.lastmod]),
);

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

  // Extra paths to include in the sitemap that Next.js doesn't auto-discover.
  // Blog paths are derived from _posts so CMS-created posts are always listed.
  // llms.txt is listed here so Google and every sitemap-reading AI bot finds it.
  additionalPaths: async (config) => [
    ...getBlogSitemapEntries(),
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

    // Individual blog posts - use real publish date for lastmod
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
