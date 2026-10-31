import type { Metadata, Viewport } from "next";
import { Geist, Bodoni_Moda, Barlow_Condensed, Nunito } from "next/font/google";
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
 *
 * Loaded with a plain Google Fonts stylesheet instead of next/font/google:
 * Next 15.5's next/font/google loader (webpack AND Turbopack) can't parse the new
 * fonts.gstatic.com/l/font?kit=… URLs Google now serves, so a fresh production
 * build fails ("queries have exactly one entry"). A <link> is fetched by the
 * browser at runtime, so nothing is downloaded or parsed at build time. The CSS
 * variables (--font-drop-*) are defined in globals.css.
 */
const DROP_FONTS_HREF =
  "https://fonts.googleapis.com/css2" +
  "?family=Anton" +
  "&family=Bricolage+Grotesque:wght@600;800" +
  "&family=DM+Serif+Display:ital@1" +
  "&family=Fraunces:ital,wght@1,400;1,600" +
  "&family=Space+Grotesk:wght@500;700" +
  "&display=swap";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={DROP_FONTS_HREF} />
      </head>
      <body
        className={`${geist.variable} ${nunito.variable} ${bodoniModa.variable} ${barlowCondensed.variable} font-sans antialiased`}
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
