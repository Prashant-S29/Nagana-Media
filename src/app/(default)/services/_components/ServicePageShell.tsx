import Link from "next/link";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import markdownStyles from "~/styles/markdown-styles.module.css";

import { getServiceBySlug } from "~/data/services";

export const dynamic = "force-static";

type ServicePageShellProps = {
  slug: string;
  children: ReactNode;
};

export function generateServiceMetadata(slug: string): Metadata {
  const service = getServiceBySlug(slug);

  if (!service) {
    return notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.naganamedia.com";
  const isStaging = baseUrl.includes("staging.");
  const serviceUrl = `${baseUrl}/services/${slug}`;

  return {
    title: `${service.title} | Nagana Media Services`,
    description: service.description,
    keywords: [
      service.title,
      "GTM Strategy",
      "B2B Technology",
      "Sales Enablement",
      "Marketing Enablement",
    ].join(", "),
    authors: [{ name: "Nagana Media Team" }],
    creator: "Nagana Media",
    publisher: "Nagana Media",
    category: "Business Services",
    openGraph: {
      title: service.title,
      description: service.description,
      url: serviceUrl,
      siteName: "Nagana Media",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      creator: "@NaganaMedia",
    },
    alternates: {
      canonical: serviceUrl,
    },
    robots: {
      index: !isStaging,
      follow: !isStaging,
      nocache: isStaging,
      googleBot: {
        index: !isStaging,
        follow: !isStaging,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function ServicePageShell({ slug, children }: ServicePageShellProps) {
  const service = getServiceBySlug(slug);

  if (!service) {
    return notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.naganamedia.com";

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
        name: "Services",
        item: `${baseUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${baseUrl}/services/${slug}`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Nagana Media",
      url: baseUrl,
    },
    serviceType: service.title,
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    url: `${baseUrl}/services/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div
        data-container
        className="flex min-h-[60vh] w-full items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <div className="w-full sm:text-center">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-2 text-xs text-white/50 sm:justify-center"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <span>/</span>
            <span className="text-white/80">{service.title}</span>
          </nav>
          <h1 className="text-[40px] font-bold leading-none text-white lg:text-[50px] xl:text-[60px]">
            {service.title}
          </h1>

          <p className="mt-2 text-base font-light leading-tight text-white sm:mt-5 sm:text-base">
            {service.description}
          </p>
        </div>
      </div>
      <article data-container className="mt-10">
        <div className={markdownStyles.markdown}>{children}</div>
      </article>
    </>
  );
}
