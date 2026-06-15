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
  weight: ["400", "500", "600", "700", "800", "900"],
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

export const metadata: Metadata = {
  title: "Take Two — Vendor Demo",
  description: "Sri Lanka's First Collaborative Fashion Platform — Vendor Demo",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // This is a phone-frame mockup demo — disable browser zoom so tapping a
  // search input doesn't trigger iOS Safari's focus-zoom (inputs are < 16px)
  // and pinch-zoom can't break the scaled phone illusion.
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
