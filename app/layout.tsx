import type { Metadata, Viewport } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-store";
import { FavoritesProvider } from "@/lib/favorites-store";
import { FollowsProvider } from "@/lib/follows-store";

/**
 * Two-family type system (type-refresh branch):
 * - Geist    → all functional UI (body, product names, prices, buttons, headings)
 * - Fraunces → editorial moments only (brand storefront hero, lookbook captions)
 *
 * Old --font-inter / --font-barlow / --font-cormorant variables are aliased
 * to the new fonts in globals.css so existing inline styles keep working.
 */

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Take Two — Vendor Demo",
  description: "Sri Lanka's First Collaborative Fashion Platform — Vendor Demo",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${fraunces.variable} font-sans antialiased`}
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
