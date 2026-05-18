"use client";

import { useFavorites } from "@/lib/favorites-store";
import { products } from "@/data/products";
import { ProductCard } from "@/components/customer/ProductCard";
import Link from "next/link";
import { Bookmark } from "lucide-react";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="flex flex-col bg-white">
      <div className="px-5 pt-2 pb-4">
        <h1 className="text-2xl font-bold text-[#111111]">Saved</h1>
        <p className="text-sm text-[#666666] mt-0.5">{favoriteProducts.length} items</p>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="px-4 grid gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {favoriteProducts.map((p, i) => {
            const isWide = i % 5 === 0 && i !== 0;
            return (
              <div key={p.id} style={isWide ? { gridColumn: "span 2" } : {}}>
                <ProductCard product={p} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col px-5 pt-16">
          <Bookmark size={28} strokeWidth={1.2} className="text-[#ED832B] mb-5" />
          <h2
            className="text-2xl font-black uppercase tracking-tight leading-none mb-2"
            style={{ fontFamily: "var(--font-barlow)", color: "var(--ink)" }}
          >
            Nothing saved.
          </h2>
          <p className="text-sm font-light mb-8" style={{ color: "var(--muted)" }}>
            Tap the heart on any product to save it here.
          </p>
          <Link
            href="/customer/shop"
            className="self-start px-7 py-3 text-sm font-bold uppercase tracking-widest border border-[var(--ink)] transition-colors"
            style={{ fontFamily: "var(--font-barlow)", color: "var(--ink)" }}
          >
            Browse Shop
          </Link>
        </div>
      )}
    </div>
  );
}
