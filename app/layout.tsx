import type { Metadata } from "next";
import { Inter, Barlow_Condensed, Cormorant_Garamond, Dancing_Script } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-store";
import { FavoritesProvider } from "@/lib/favorites-store";
import { FollowsProvider } from "@/lib/follows-store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Take Two — Vendor Demo",
  description: "Sri Lanka's First Collaborative Fashion Platform — Vendor Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${barlowCondensed.variable} ${cormorantGaramond.variable} ${dancingScript.variable} font-sans antialiased`}
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
