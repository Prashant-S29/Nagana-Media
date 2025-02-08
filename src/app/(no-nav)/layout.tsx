import "~/styles/globals.css";

import { type Metadata } from "next";

// utils
import { GLOBAL_Provider } from "~/utils/globalProvider";
import { generateSeo } from "~/utils/generateSeo";

// fonts
import { fonts } from "~/fonts";

// Generate SEO metadata
export const metadata: Metadata = generateSeo({
  title: {
    template: `%s | Nagana Media - We make technology resonate`,
    default: "Nagana Media - We make technology resonate",
  },
  description: "We make technology resonate",
  url: "/",
});

export default async function NoNavLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fonts.outfit.className} antialiased`}>
      <body>
        <GLOBAL_Provider >{children}</GLOBAL_Provider>
      </body>
    </html>
  );
}
