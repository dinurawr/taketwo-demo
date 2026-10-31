import type { Metadata, Viewport } from "next";
import {
  Geist,
  Bodoni_Moda,
  Barlow_Condensed,
  Nunito,
  Anton,
  Fraunces,
  Bricolage_Grotesque,
  DM_Serif_Display,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-store";
import { FavoritesProvider } from "@/lib/favorites-store";
import { FollowsProvider } from "@/lib/follows-store";

/**
 * Four-family type system:
 *
 * Geist            → all functional UI: body, product cards, prices, buttons, nav labels
 * Nunito           → pill tabs + filter chips only (SF Pro Rounded equivalent)
 * Bodoni Moda      → editorial moments only: brand storefront hero, lookbook captions
 * Barlow Condensed → TAKETWO wordmark + impact uppercase display labels only
 *
 * Backwards-compat aliases in globals.css map old --font-* variables to the
 * new stack so existing component inline styles keep working.
 */

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

/**
 * Drop display faces — one per brand, used ONLY for the homepage drop titles
 * (see data/drops.ts). Each matches the brand's personality:
 *   Ember → Anton (bold statement)        Nilo → Fraunces italic (considered)
 *   Valley → Bricolage (warm everyday)    Halcyon → DM Serif Display italic (sun-soaked)
 *   North Lane → Space Grotesk (modern minimal)
 */
const anton = Anton({
  variable: "--font-drop-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-drop-fraunces",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["italic"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-drop-bricolage",
  subsets: ["latin"],
  weight: ["600", "800"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-drop-dmserif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-drop-space",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Take Two — Vendor Demo",
  description: "Sri Lanka's First Collaborative Fashion Platform — Vendor Demo",
};

export const viewport: Viewport = {
  width: "device-width",
  // This is a phone-frame mockup demo — fully lock the browser zoom so the page
  // always renders at scale 1 (consistent on any deep link / direct load),
  // tapping a search input never triggers iOS Safari's focus-zoom (inputs are
  // < 16px), and pinch-zoom can't break the scaled phone illusion.
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${nunito.variable} ${bodoniModa.variable} ${barlowCondensed.variable} ${anton.variable} ${fraunces.variable} ${bricolage.variable} ${dmSerif.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <CartProvider>
          <FavoritesProvider>
            <FollowsProvider>{children}</FollowsProvider>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
