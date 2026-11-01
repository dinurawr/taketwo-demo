import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-store";
import { FavoritesProvider } from "@/lib/favorites-store";
import { FollowsProvider } from "@/lib/follows-store";

/**
 * Type system (CSS variables are defined in globals.css):
 *
 * Geist            → all functional UI: body, product cards, prices, buttons, nav labels
 * Nunito           → pill tabs + filter chips only (SF Pro Rounded equivalent)
 * Bodoni Moda      → editorial moments only: brand storefront hero, lookbook captions
 * Barlow Condensed → TAKETWO wordmark + impact uppercase display labels only
 * Drop faces       → homepage drop titles only (data/drops.ts), one per brand:
 *                    Anton (Ember), Fraunces italic (Nilo), Bricolage Grotesque (Valley),
 *                    DM Serif Display italic (Halcyon), Space Grotesk (North Lane)
 *
 * All nine families load from ONE Google Fonts stylesheet <link>, not next/font/google.
 * Next 15.5's next/font/google loader (webpack AND Turbopack) can't parse the new
 * fonts.gstatic.com/l/font?kit=… URLs Google now serves, so any build that has to
 * fetch fonts fresh (e.g. a Vercel build-cache miss) fails — it broke production
 * deploys twice. A <link> is fetched by the browser at runtime, so nothing is
 * downloaded or parsed at build time.
 */
const FONTS_HREF =
  "https://fonts.googleapis.com/css2" +
  // UI
  "?family=Geist:wght@300..900" +
  "&family=Nunito:wght@500..700" +
  "&family=Bodoni+Moda:ital,wght@0,400..900;1,400..900" +
  "&family=Barlow+Condensed:wght@700;800;900" +
  // Drop display faces
  "&family=Anton" +
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
        <link rel="stylesheet" href={FONTS_HREF} />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          <FavoritesProvider>
            <FollowsProvider>{children}</FollowsProvider>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
