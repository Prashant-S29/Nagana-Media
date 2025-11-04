import Image from "next/image";
import { notFound } from "next/navigation";
import "../../../../styles/globals.css";

// types
import type { Metadata } from "next";

// styles
import markdownStyles from "~/styles/markdown-styles.module.css";

// utils
import { getAllPosts, getPostBySlug } from "~/utils/api";
import markdownToHtml from "~/utils/markdownToHtml";
import { generateSeo } from "~/utils/generateSeo";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://yourdomain.com";
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
      // tags: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      creator: "@NaganaMedia", // Replace with your Twitter handle
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [`${baseUrl}${post.coverImage}`],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      image: `${baseUrl}${post.author.picture}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Nagana Media",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`, // Add your logo path
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blogs/${slug.slug}`,
    },
    keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])],
    articleSection: "Business Strategy",
    wordCount: post.content?.split(" ").length ?? 0,
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        data-container
        className="flex h-[60vh] w-full items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <div className="px-4 text-center">
          <h1 className="mx-auto mt-5 max-w-4xl text-[32px] font-bold leading-tight text-white lg:text-center lg:text-[50px] xl:text-[60px]">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4 text-gray-300">
            {/* <div className="flex items-center gap-2">
              <Image
                src={post.author.picture}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm">{post.author.name}</span>
            </div>
            <span className="text-sm">•</span> */}
            <span className="text-sm">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
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
    </>
  );
};

export default Post;
