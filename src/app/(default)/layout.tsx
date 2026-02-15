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
        {/* Organization Schema - helps LLMs understand your business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {/* Website Schema - helps with search features */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body>
        <Provider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
