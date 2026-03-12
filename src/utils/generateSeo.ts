import type { Metadata } from "next";

import { siteConfig } from "~/config";

interface Props {
  title:
    | string
    | {
        template: string;
        default: string;
      };
  description: string;
  url: string;
  image?: string;
  keywords?: string[];
  robots?: {
    index?: boolean;
    follow?: boolean;
    noindex?: boolean;
    nofollow?: boolean;
  };
  author?: string;
  openGraphType?: "website" | "article" | "book" | "profile";
}

export const generateSeo = ({
  title,
  description,
  url,
  image,
  keywords,
  robots,
  author,
  openGraphType = "website",
}: Props): Metadata => {
  const imageUrl = image ?? siteConfig.ogImage.url;
  const canonicalUrl = url.startsWith("http") ? url : `${siteConfig.url}${url}`;

  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      url: canonicalUrl,
      locale: "en_US",
      type: openGraphType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: typeof title === "string" ? title : siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: typeof title === "string" ? title : siteConfig.name,
        },
      ],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };

  if (keywords && keywords.length > 0) {
    metadata.keywords = keywords;
  }

  // Always set explicit robots directives (default: index + follow)
  metadata.robots = {
    index: robots?.index ?? true,
    follow: robots?.follow ?? true,
    nocache: false,
    googleBot: {
      index: robots?.index ?? true,
      follow: robots?.follow ?? true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };

  if (author) {
    metadata.authors = [{ name: author }];
    metadata.creator = author;
  }

  return metadata;
};
