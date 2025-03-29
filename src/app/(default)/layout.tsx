import "~/styles/globals.css";

// components
import { Footer, Navbar } from "~/components/layout";

// utils
import { generateSeo } from "~/utils/generateSeo";

// fonts
import { fonts } from "~/fonts";

// provider
import { Provider } from "~/utils/globalProvider";

// Generate SEO metadata
export const generateMetadata = () =>
  generateSeo({
    title: {
      template: `%s | Nagana Media - We make technology resonate.`,
      default: "Nagana Media - We make technology resonate.",
    },
    description: "We make technology resonate",
    url: "/",
  });

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fonts.outfit.className} antialiased`}>
      <body>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
