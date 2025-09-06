import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

// types
import type { Blog, Service } from "~/types";

const postsDirectory = join(process.cwd(), "_posts");
const servicesDirectory = join(process.cwd(), "_services");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getServiceSlugs() {
  return fs.readdirSync(servicesDirectory);
}

export function getPostBySlug(slug: string): Blog | null {
  try {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return { ...data, slug: realSlug, content } as Blog;
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export function getServiceBySlug(slug: string): Service | null {
  try {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(servicesDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return { ...data, slug: realSlug, content } as Service;
  } catch (error) {
    console.error(`Error loading service ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): Blog[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Blog => post !== null)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllServices(): Service[] {
  const slugs = getServiceSlugs();
  const services = slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is Service => service !== null);
  return services;
}

// Enhanced SEO utility functions
export function generatePostSEO(post: Blog, baseUrl: string) {
  const postUrl = `${baseUrl}/blogs/${post.slug}`;
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(post.title ?? "")}&excerpt=${encodeURIComponent(post.excerpt ?? "")}`;

  return {
    title: post.metaTitle ?? `${post.title} | Nagana Media`,
    description: post.metaDescription ?? post.excerpt ?? "",
    url: postUrl,
    ogImage: ogImageUrl,
    keywords: [
      post.primaryKeyword,
      ...(post.secondaryKeywords ?? []),
      "GTM Strategy",
      "B2B Technology",
      "Go-to-Market",
      "Business Strategy",
    ].filter(Boolean),
  };
}

export function generateServiceSEO(service: Service, baseUrl: string) {
  const serviceUrl = `${baseUrl}/services/${service.slug}`;
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(service.title ?? "")}&excerpt=${encodeURIComponent("")}`;

  return {
    title: `${service.title} | Nagana Media`,
    // TODO: add description
    description: "",
    url: serviceUrl,
    ogImage: ogImageUrl,
    keywords: [
      // service.primaryKeyword,
      // ...(service.secondaryKeywords ?? []),
      "Digital Marketing",
      "B2B Services",
      "Marketing Strategy",
    ].filter(Boolean),
  };
}

// Get related posts based on tags or keywords
export function getRelatedPosts(currentPost: Blog, limit = 3): Blog[] {
  const allPosts = getAllPosts().filter(
    (post) => post.slug !== currentPost.slug,
  );

  if (!currentPost.secondaryKeywords && !currentPost.primaryKeyword) {
    return allPosts.slice(0, limit);
  }

  const keywords = [
    currentPost.primaryKeyword,
    ...(currentPost.secondaryKeywords ?? []),
  ]
    .filter(Boolean)
    .map((k) => k?.toLowerCase());

  const relatedPosts = allPosts
    .map((post) => {
      const postKeywords = [
        post.primaryKeyword,
        ...(post.secondaryKeywords ?? []),
      ]
        .filter(Boolean)
        .map((k) => k?.toLowerCase());

      const commonKeywords = keywords.filter((keyword) =>
        postKeywords.some((postKeyword) =>
          postKeyword?.includes(keyword ?? ""),
        ),
      );

      return {
        post,
        relevance: commonKeywords.length,
      };
    })
    .filter((item) => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map((item) => item.post);

  // If not enough related posts, fill with recent posts
  if (relatedPosts.length < limit) {
    const remainingSlots = limit - relatedPosts.length;
    const recentPosts = allPosts
      .filter((post) => !relatedPosts.includes(post))
      .slice(0, remainingSlots);

    return [...relatedPosts, ...recentPosts];
  }

  return relatedPosts;
}

// Search functionality
export function searchPosts(query: string): Blog[] {
  const allPosts = getAllPosts();
  const searchTerms = query
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 2);

  if (searchTerms.length === 0) {
    return allPosts;
  }

  return allPosts
    .map((post) => {
      const searchContent = [
        post.title,
        post.excerpt,
        post.primaryKeyword,
        ...(post.secondaryKeywords ?? []),
        post.content,
      ]
        .join(" ")
        .toLowerCase();

      const matches = searchTerms.filter((term) =>
        searchContent.includes(term),
      ).length;

      return {
        post,
        relevance: matches,
      };
    })
    .filter((item) => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .map((item) => item.post);
}

// Get posts by category/tag
export function getPostsByKeyword(keyword: string): Blog[] {
  const allPosts = getAllPosts();
  const searchKeyword = keyword.toLowerCase();

  return allPosts.filter((post) => {
    const postKeywords = [
      post.primaryKeyword,
      ...(post.secondaryKeywords ?? []),
    ]
      .filter(Boolean)
      .map((k) => k?.toLowerCase());

    return postKeywords.some((k) => k?.includes(searchKeyword));
  });
}

// Get featured posts (you can customize this logic)
export function getFeaturedPosts(limit = 5): Blog[] {
  return getAllPosts().slice(0, limit); // Since your Blog type doesn't have a featured field, just return recent posts
}

// Get recent posts
export function getRecentPosts(limit = 5): Blog[] {
  return getAllPosts().slice(0, limit);
}

// Utility to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Enhanced post data with reading time and other metadata
export function getEnhancedPostBySlug(
  slug: string,
): (Blog & { readingTime: number; wordCount: number }) | null {
  const post = getPostBySlug(slug);

  if (!post) {
    return null;
  }

  const wordCount = post.content.split(/\s+/).length;
  const readingTime = calculateReadingTime(post.content);

  return {
    ...post,
    readingTime,
    wordCount,
  };
}
