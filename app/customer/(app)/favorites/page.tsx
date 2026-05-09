"use client";

import { useFavorites } from "@/lib/favorites-store";
import { products } from "@/data/products";
import { ProductCard } from "@/components/customer/ProductCard";
import Link from "next/link";

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
        <div className="px-5 grid grid-cols-2 gap-3">
          {favoriteProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
          <p className="text-5xl mb-4">🤍</p>
          <h2 className="text-lg font-bold text-[#111111] mb-2">Nothing saved yet</h2>
          <p className="text-sm text-[#666666] mb-6">Tap the heart on any product to save it here</p>
          <Link
            href="/customer"
            className="px-6 py-3 bg-[#859365] text-white rounded-full text-sm font-semibold"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}
