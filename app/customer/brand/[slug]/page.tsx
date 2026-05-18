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
import { getShortName } from "@/data/products";

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

  // Drenched colour — brand.color at very low opacity for background tint
  const brandTint = `${brand.color}12`; // ~7% opacity

  return (
    <div className="flex flex-col pb-24" style={{ backgroundColor: "var(--surface)" }}>
      {/* Hero — brand-color gradient at bottom instead of generic black/60 */}
      <div className="relative" style={{ height: 320 }}>
        <Image
          src={brand.heroImage}
          alt={brand.name}
          fill
          className="object-cover object-top"
          priority
        />
        {/* Brand-tinted gradient: top is dark for back button, bottom drains into brand.color */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, transparent 40%, ${brand.color}CC 100%)`,
          }}
        />

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
            className="px-4 py-1.5 text-xs font-bold transition-all border"
            style={{
              backgroundColor: following ? brand.color : "rgba(255,255,255,0.92)",
              color: following ? brand.textColor : brand.color,
              borderColor: following ? brand.color : "rgba(255,255,255,0.6)",
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
          <p className="text-white/90 text-[13px] font-light mt-1 tracking-wide">
            {brand.tagline}
          </p>
        </div>
      </div>

      {/* Lookbook strip — brand-color tinted dot indicator per slide */}
      <div className="mt-3 mb-4" style={{ backgroundColor: brandTint }}>
        <div
          className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {brand.lookbook.map((src, i) => (
            <div
              key={i}
              className="shrink-0 overflow-hidden relative"
              style={{ width: 120, height: 160, scrollSnapAlign: "start" }}
            >
              <Image
                src={src}
                alt={`${brand.name} lookbook ${i + 1}`}
                width={120}
                height={160}
                className="object-cover w-full h-full"
              />
              {/* Brand-color tinted bottom strip */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: brand.color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section header */}
      <div className="px-4 mb-3">
        <p className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: brand.color }}>
          All Products
        </p>
        <p className="text-lg font-bold mt-0.5" style={{ color: "var(--ink)" }}>
          {brandProducts.length} pieces
        </p>
      </div>

      {/* Product grid — first item spans full width as editorial card */}
      {brandProducts.length === 0 ? (
        <p className="text-center text-sm py-10" style={{ color: "var(--muted)" }}>No products yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4">
          {brandProducts.map((product, i) => {
            if (i === 0) {
              return (
                <div key={product.id} style={{ gridColumn: "span 2" }}>
                  {/* Editorial wide card */}
                  <Link href={`/customer/product/${product.id}`} className="relative block overflow-hidden" style={{ aspectRatio: "16/7" }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="390px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to right, ${brand.color}CC 0%, transparent 60%)` }}
                    />
                    <div className="absolute bottom-0 left-0 p-4">
                      <p
                        className="text-white/70 text-[10px] uppercase tracking-widest mb-0.5"
                        style={{ fontFamily: "var(--font-barlow)" }}
                      >
                        {brand.name}
                      </p>
                      <p
                        className="text-white text-xl font-black uppercase leading-tight"
                        style={{ fontFamily: "var(--font-barlow)" }}
                      >
                        {getShortName(product)}
                      </p>
                      <p className="text-white/90 text-sm font-bold mt-1">
                        LKR {product.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            }
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      )}
    </div>
  );
}
