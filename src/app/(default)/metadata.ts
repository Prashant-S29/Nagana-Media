import type { Metadata, Viewport } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.naganamedia.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1323" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "Nagana Media - GTM Strategy & B2B Technology Marketing",
    template: "%s | Nagana Media",
  },

  description:
    "Expert go-to-market strategy, sales enablement, and marketing solutions for B2B technology companies. Transform your GTM approach with Nagana Media.",

  keywords: [
    "GTM Strategy",
    "Go-to-Market",
    "B2B Technology",
    "Sales Enablement",
    "Marketing Enablement",
    "Program Management",
    "AI Strategy",
    "Technology Consulting",
    "Business Strategy",
    "Digital Transformation",
  ],

  authors: [{ name: "Nagana Media Team" }],
  creator: "Nagana Media",
  publisher: "Nagana Media",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Nagana Media",
    title: "Nagana Media - GTM Strategy & B2B Technology Marketing",
    description:
      "Expert go-to-market strategy, sales enablement, and marketing solutions for B2B technology companies.",
    images: [
      {
        url: `${baseUrl}/opengraph.webp`,
        width: 1200,
        height: 630,
        alt: "Nagana Media - GTM Strategy & B2B Technology Marketing Experts",
        type: "image/webp",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@NaganaMedia",
    title: "Nagana Media - GTM Strategy & B2B Technology Marketing",
    description:
      "Expert go-to-market strategy, sales enablement, and marketing solutions for B2B technology companies.",
    creator: "@NaganaMedia",
    images: [
      {
        url: `${baseUrl}/assets/static/heroImage.webp`,
        width: 1200,
        height: 630,
        alt: "Nagana Media - GTM Strategy & B2B Technology Marketing Experts",
      },
    ],
  },

  // Verification tags
  verification: {
    google: "Et0jrdqsg2x6VW-c8mFI9BHBanLYE_ZGg9JUJWS5bFE",
    yandex: "6d18dc2247a7304f",
    // other: { "msvalidate.01": "{{BING_VERIFICATION_CODE}}" }, ← fill after Bing Webmaster setup
  },

  // Canonical for home page (child pages override this via generateMetadata)
  alternates: {
    canonical: baseUrl,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/static/logo.png",
  },

  // Manifest for PWA
  manifest: "/manifest.json",

  // Other metadata
  category: "Business Services",

  // Additional metadata for better LLM understanding
  other: {
    "og:site_name": "Nagana Media",
    "article:publisher": "Nagana Media",
  },
};

// JSON-LD for Organization (helps LLMs understand your business)
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nagana Media",
  url: baseUrl,
  logo: `${baseUrl}/assets/static/logo.png`,
  description:
    "Expert go-to-market strategy, sales enablement, and marketing solutions for B2B technology companies.",
  sameAs: [
    "https://www.linkedin.com/company/nagana-media",
    "https://twitter.com/NaganaMedia",
    "https://www.instagram.com/naganamedia",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    url: `${baseUrl}/contact`,
    email: "contact@naganamedia.com",
    telephone: "+91-63771-91007",
    availableLanguage: ["English"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "6, Raghu Vihar, Maharani Farm, Durgapura",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  foundingDate: "2020",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 1,
    maxValue: 10,
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  knowsAbout: [
    "Go-to-Market Strategy",
    "Sales Enablement",
    "Marketing Enablement",
    "B2B Technology",
    "Program Management",
    "AI Strategy",
    "Digital Transformation",
  ],
};

// JSON-LD for WebSite (helps with sitelinks search box)
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nagana Media",
  url: baseUrl,
  description:
    "Expert go-to-market strategy, sales enablement, and marketing solutions for B2B technology companies.",
  publisher: {
    "@type": "Organization",
    name: "Nagana Media",
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/assets/static/logo.png`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${baseUrl}/blogs?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
