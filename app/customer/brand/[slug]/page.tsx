"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useFollows } from "@/lib/follows-store";
import { getBrand } from "@/data/brands";
import { products } from "@/data/products";
import { ProductCard } from "@/components/customer/ProductCard";

export default function BrandStorefront({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const brand = getBrand(slug);
  const { isFollowing, toggle } = useFollows();

  if (!brand) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[#999999] text-sm">
        Brand not found.
      </div>
    );
  }

  const following = isFollowing(brand.id);
  const displayFollowers = brand.followerCount + (following ? 1 : 0);
  const brandProducts = products.filter(
    (p) => p.brand === brand.id && p.category !== "Children"
  );

  return (
    <div className="flex flex-col bg-white pb-24">
      {/* Hero */}
      <div className="relative" style={{ height: 320 }}>
        <Image
          src={brand.heroImage}
          alt={brand.name}
          fill
          className="object-cover object-top"
          priority
        />
        {/* Gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Back button */}
        <Link
          href="/customer/shop"
          className="absolute top-14 left-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          aria-label="Back"
        >
          <ChevronLeft size={20} className="text-white" />
        </Link>

        {/* Follow button — top right */}
        <div className="absolute top-14 right-4 flex flex-col items-end gap-1">
          <motion.button
            onClick={() => toggle(brand.id)}
            whileTap={{ scale: 0.93 }}
            className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              backgroundColor: following ? brand.color : "rgba(255,255,255,0.92)",
              color: following ? brand.textColor : "#111111",
            }}
          >
            {following ? "Following" : "Follow"}
          </motion.button>
          <p className="text-[10px] text-white/80 font-medium">
            {displayFollowers.toLocaleString()} followers
          </p>
        </div>

        {/* Brand name + slogan — bottom left of hero */}
        <div className="absolute bottom-5 left-4 right-20">
          <p
            className="text-white leading-none uppercase"
            style={{
              fontFamily: "var(--font-barlow)",
              fontWeight: 900,
              fontSize: 32,
              letterSpacing: "-0.01em",
            }}
          >
            {brand.name}
          </p>
          <p className="text-white/80 text-[13px] font-light mt-1 tracking-wide">
            {brand.tagline}
          </p>
        </div>
      </div>

      {/* Lookbook strip */}
      <div className="mt-3 mb-4">
        <div
          className="flex gap-2 overflow-x-auto px-4 scrollbar-none"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {brand.lookbook.map((src, i) => (
            <div
              key={i}
              className="shrink-0 overflow-hidden"
              style={{ width: 120, height: 160, scrollSnapAlign: "start" }}
            >
              <Image
                src={src}
                alt={`${brand.name} lookbook ${i + 1}`}
                width={120}
                height={160}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section header */}
      <div className="px-4 mb-3">
        <p className="text-[11px] uppercase tracking-widest text-[#999999] font-semibold">
          All Products
        </p>
        <p className="text-lg font-bold text-[#111111] mt-0.5">
          {brandProducts.length} pieces
        </p>
      </div>

      {/* Product grid */}
      {brandProducts.length === 0 ? (
        <p className="text-center text-sm text-[#999999] py-10">No products yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4">
          {brandProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
