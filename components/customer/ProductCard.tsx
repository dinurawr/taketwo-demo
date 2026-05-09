"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites } from "@/lib/favorites-store";
import type { Product } from "@/data/products";
import { getBrand } from "@/data/brands";

export function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggle } = useFavorites();
  const brand = getBrand(product.brand);
  const fav = isFavorite(product.id);

  return (
    <motion.div
      className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-[#F0F0F0]"
      whileTap={{ scale: 0.96, opacity: 0.85 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <Link href={`/customer/product/${product.id}`}>
        <div className="aspect-[3/4] relative bg-[#F0F3EC]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 390px) 45vw, 180px"
          />
        </div>
      </Link>
      {/* Favorite button */}
      <button
        onClick={() => toggle(product.id)}
        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
        aria-label="Toggle favorite"
      >
        <Heart
          size={14}
          className={fav ? "fill-[#ED832B] text-[#ED832B]" : "text-[#666666]"}
          strokeWidth={fav ? 0 : 1.5}
        />
      </button>
      {/* Info */}
      <div className="p-2.5">
        <p className="text-[10px] text-[#859365] font-bold uppercase tracking-wide">
          {brand?.name}
        </p>
        <Link href={`/customer/product/${product.id}`}>
          <p className="text-xs font-semibold text-[#111111] leading-tight mt-0.5 line-clamp-2">
            {product.name}
          </p>
        </Link>
        <p className="text-sm font-bold text-[#111111] mt-1">
          LKR {product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
