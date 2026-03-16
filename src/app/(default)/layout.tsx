import "~/styles/globals.css";

// components
import { Footer, Navbar } from "~/components/layout";

// fonts
import { fonts } from "~/fonts";

// provider
import { Provider } from "~/utils/globalProvider";

// metadata
import {
  metadata as rootMetadata,
  viewport as rootViewport,
  organizationJsonLd,
  websiteJsonLd,
} from "./metadata";

// Export metadata and viewport
export const metadata = rootMetadata;
export const viewport = rootViewport;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fonts.outfit.className} antialiased`}>
      <head>
        {/* Preconnect to PostHog origins to save 300–650ms on first connection */}
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="preconnect" href="https://us-assets.i.posthog.com" />
        {/* dns-prefetch fallback for browsers that don't support preconnect */}
        <link rel="dns-prefetch" href="https://us.i.posthog.com" />
        <link rel="dns-prefetch" href="https://us-assets.i.posthog.com" />

        {/* llms.txt discovery — AI crawlers find this like RSS feed links */}
        <link
          rel="llms"
          type="text/plain"
          href="https://www.naganamedia.com/llms.txt"
          title="LLM-readable site index"
        />

        {/* Organization Schema — helps LLMs understand your business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {/* Website Schema — helps with search features */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body>
        {/* Skip-to-content link — WCAG 2.1 AA keyboard accessibility requirement */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-md focus:outline-none"
        >
          Skip to main content
        </a>

        <Provider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
