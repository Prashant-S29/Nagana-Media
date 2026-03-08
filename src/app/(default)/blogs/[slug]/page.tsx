import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../../../../styles/globals.css";

// types
import type { Metadata } from "next";

// styles
import markdownStyles from "~/styles/markdown-styles.module.css";

// utils
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  calculateReadingTime,
} from "~/utils/api";
import markdownToHtml from "~/utils/markdownToHtml";
import { generateSeo } from "~/utils/generateSeo";

// Force static generation - this is critical for crawlers
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.naganamedia.com";
  const postUrl = `${baseUrl}/blogs/${params.slug}`;
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&excerpt=${encodeURIComponent(post.excerpt)}`;

  return {
    title: post.metaTitle ?? `${post.title} | Nagana Media`,
    description: post.metaDescription ?? post.excerpt,
    keywords: [
      post.primaryKeyword,
      ...(post.secondaryKeywords ?? []),
      "GTM Strategy",
      "B2B Technology",
      "Go-to-Market",
      "AI Strategy",
      "OpenAI",
    ].join(", "),
    authors: [{ name: post.author.name }],
    creator: post.author.name,
    publisher: "Nagana Media",
    category: "Business Strategy",

    // Open Graph
    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      url: postUrl,
      siteName: "Nagana Media",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
        {
          url: post.coverImage,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      creator: "@NaganaMedia",
      images: [ogImageUrl],
    },

    // Additional SEO
    alternates: {
      canonical: postUrl,
    },

    // Structured Data
    other: {
      "article:published_time": post.date,
      "article:author": post.author.name,
      "article:section": "Business Strategy",
      "article:tag": [
        post.primaryKeyword,
        ...(post.secondaryKeywords ?? []),
      ].join(","),
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

const Post: React.FC<Params> = async ({ params }) => {
  const slug = await params;
  const post = getPostBySlug(slug.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content ?? "");
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.naganamedia.com";
  const readingTime = calculateReadingTime(post.content ?? "");
  const relatedPosts = getRelatedPosts(post, 3);

  // Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [`${baseUrl}${post.coverImage}`],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author.name,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Nagana Media",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/static/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blogs/${slug.slug}`,
    },
    keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])],
    articleSection: "Business Strategy",
    wordCount: post.content?.split(" ").length ?? 0,
    timeRequired: `PT${readingTime}M`,
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${baseUrl}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/blogs/${slug.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div
        data-container
        className="flex h-[60vh] w-full items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <div className="px-4 text-center">
          {/* Breadcrumb nav for humans */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center justify-center gap-2 text-xs text-white/50"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-white">
              Blogs
            </Link>
            <span>/</span>
            <span className="line-clamp-1 max-w-[200px] text-white/80">
              {post.title}
            </span>
          </nav>
          <h1 className="mx-auto mt-2 max-w-4xl text-[32px] font-bold leading-tight text-white lg:text-center lg:text-[50px] xl:text-[60px]">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4 text-gray-300">
            <span className="text-sm">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-white/30">·</span>
            <span className="text-sm">{readingTime} min read</span>
            {post.primaryKeyword && (
              <>
                <span className="text-white/30">·</span>
                <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs text-white/80">
                  {post.primaryKeyword}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <article data-container className="markdown mt-10">
        <Image
          src={post.coverImage}
          alt={post.title}
          unoptimized
          width={1200}
          height={600}
          className="h-auto w-full rounded-xl"
          priority
        />

        <div
          className={`${markdownStyles.markdown} mt-8`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section data-container className="border-t py-12">
          <h2 className="text-[24px] font-bold leading-none">
            Related Articles
          </h2>
          <div className="mt-6 grid gap-x-4 gap-y-6 max-[700px]:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blogs/${related.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border bg-[#f9f9f9] transition-shadow hover:shadow-md"
              >
                <div className="relative h-[160px] w-full overflow-hidden">
                  <Image
                    src={related.coverImage}
                    alt={related.title}
                    fill
                    className="object-cover object-top transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <p className="text-xs text-black/40">
                    {new Date(related.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {" · "}
                    {calculateReadingTime(related.content ?? "")} min read
                  </p>
                  <h3 className="text-sm font-semibold leading-snug transition-colors group-hover:text-brand">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Post;
