import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

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

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Blog;
}

export function getServiceBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(servicesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Service;
}

export function getAllPosts(): Blog[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllServices(): Service[] {
  const slugs = getServiceSlugs();
  const services = slugs.map((slug) => getServiceBySlug(slug));
  return services;
}
