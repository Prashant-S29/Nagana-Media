import { Outfit, Bebas_Neue, Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  adjustFontFallback: true,
//   fallback: [montserrat.className],
});

const bebas_neue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  adjustFontFallback: true,
//   fallback: [montserrat.className],
});


export const fonts = {
  montserrat,
  outfit,
  bebas_neue,
};