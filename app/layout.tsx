import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["400", "500", "600", "700"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Infinity Moments Photography | Wedding Photography & Films",
  description: "Infinity Moments Photography captures Indian weddings, haldi, mehndi, maternity, birthdays and events with a cinematic, premium eye.",
  keywords: ["Infinity Moments Photography", "Indian wedding photographer", "haldi photography", "mehndi photography", "cinematic wedding films", "pre-wedding shoot", "event photography"],
  openGraph: {
    title: "Infinity Moments Photography | Wedding Photography & Films",
    description: "Capturing Every Moment, Creating Timeless Memories.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}><body>{children}</body></html>;
}
