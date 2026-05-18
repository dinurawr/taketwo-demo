"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/lib/favorites-store";
import type { Product } from "@/data/products";
import { getShortName } from "@/data/products";
import { getBrand } from "@/data/brands";

export function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggle } = useFavorites();
  const brand = getBrand(product.brand);
  const fav = isFavorite(product.id);

  return (
    <motion.div
      className="relative overflow-hidden shadow-sm border border-[#F0F0F0]"
      style={{ backgroundColor: "var(--surface)" }}
      whileTap={{ scale: 0.96, opacity: 0.85 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <Link href={`/customer/product/${product.id}`}>
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

      {/* Heart button — 44px hit area */}
      <button
        onClick={() => toggle(product.id)}
        className="absolute top-1 right-1 w-11 h-11 flex items-center justify-center cursor-pointer"
        aria-label="Toggle favorite"
        style={{ touchAction: "manipulation" }}
      >
        {/* Burst ring — animates out then fades on fav toggle */}
        <AnimatePresence>
          {fav && (
            <motion.span
              key="burst"
              className="absolute inset-0 rounded-full"
              initial={{ scale: 0.4, opacity: 0.7, borderWidth: 2, borderColor: "#ED832B", borderStyle: "solid" }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.38, ease: "easeOut" }}
              style={{ borderRadius: "50%" }}
            />
          )}
        </AnimatePresence>
        <motion.div
          animate={fav ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <Heart
            size={20}
            strokeWidth={fav ? 0 : 1.8}
            className={
              fav
                ? "fill-[#ED832B] text-[#ED832B] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
                : "drop-shadow-[0_1px_2px_rgba(0,0,0,0.20)]"
            }
            style={{ color: fav ? "#ED832B" : "var(--ink)" }}
          />
        </motion.div>
      </button>

      {/* Info */}
      <div className="px-2.5 pt-2 pb-2.5">
        <Link href={`/customer/brand/${brand?.id}`} className="block">
          <p className="text-[10px] text-[#859365] font-bold uppercase tracking-wide hover:underline">
            {brand?.name}
          </p>
        </Link>

        <Link href={`/customer/product/${product.id}`}>
          <p className="text-xs font-semibold leading-tight mt-0.5 line-clamp-2" style={{ color: "var(--ink)" }}>
            {getShortName(product)}
          </p>
        </Link>

        <p className="text-sm font-bold mt-1" style={{ color: "var(--ink)" }}>
          LKR {product.price.toLocaleString()}
        </p>

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
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
