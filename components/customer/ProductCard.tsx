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
      className="relative bg-white overflow-hidden shadow-sm border border-[#F0F0F0]"
      whileTap={{ scale: 0.96, opacity: 0.85 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <Link href={`/customer/product/${product.id}`}>
        {/* Image area — light-grey background */}
        <div className="aspect-[3/4] relative bg-[#F5F5F3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 390px) 45vw, 180px"
          />
        </div>
      </Link>

      {/* Heart button — 44px hit area, visual is 28px */}
      <button
        onClick={() => toggle(product.id)}
        className="absolute top-1 right-1 w-11 h-11 flex items-center justify-center cursor-pointer"
        aria-label="Toggle favorite"
        style={{ touchAction: "manipulation" }}
      >
        <div className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <Heart
            size={14}
            className={fav ? "fill-[#ED832B] text-[#ED832B]" : "text-[#666666]"}
            strokeWidth={fav ? 0 : 1.5}
          />
        </div>
      </button>

      {/* Info */}
      <div className="px-2.5 pt-2 pb-2.5">
        {/* Brand label — links to brand storefront */}
        <Link href={`/customer/brand/${brand?.id}`} className="block">
          <p className="text-[10px] text-[#859365] font-bold uppercase tracking-wide hover:underline">
            {brand?.name}
          </p>
        </Link>

        <Link href={`/customer/product/${product.id}`}>
          <p className="text-xs font-semibold text-[#111111] leading-tight mt-0.5 line-clamp-2">
            {product.name}
          </p>
        </Link>

        <p className="text-sm font-bold text-[#111111] mt-1">
          LKR {product.price.toLocaleString()}
        </p>

        {/* Colour dot row */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.hex}
                className="w-3 h-3 rounded-full border border-black/10"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[#999999]">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
