import "~/styles/globals.css";
import { Footer, Navbar } from "~/components/layout";
import { fonts } from "~/fonts";
import { Provider } from "~/utils/globalProvider";
import {
  metadata as rootMetadata,
  viewport as rootViewport,
  organizationJsonLd,
  websiteJsonLd,
} from "./metadata";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fonts.outfit.className} antialiased`}>
      <head>
        {/*
          In production, PostHog traffic is proxied through /ingest (same
          origin) so preconnect hints to posthog.com are wasted. We only
          keep them for local dev where the proxy is disabled.
          In prod the browser already has a connection open to your own
          domain - no hint needed.
        */}
        {process.env.NODE_ENV !== "production" && (
          <>
            <link rel="preconnect" href="https://us.i.posthog.com" />
            <link rel="preconnect" href="https://us-assets.i.posthog.com" />
            <link rel="dns-prefetch" href="https://us.i.posthog.com" />
            <link rel="dns-prefetch" href="https://us-assets.i.posthog.com" />
          </>
        )}
        <link
          rel="llms"
          type="text/plain"
          href="https://www.naganamedia.com/llms.txt"
          title="LLM-readable site index"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
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
