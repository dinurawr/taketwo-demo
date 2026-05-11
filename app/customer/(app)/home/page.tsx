"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Search, Star } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryPills } from "@/components/customer/CategoryPills";
import { ProductCard } from "@/components/customer/ProductCard";
import { products } from "@/data/products";

const PAGE_SIZE = 8;
const LOAD_MORE = 4;

// Featured promo — Valley Summer Shirt
const FEATURED = products.find((p) => p.id === "valley-summer-shirt") ?? products[0];

export default function CustomerHome() {
  const allGrid = products.filter((p) => p.id !== FEATURED.id);

  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && visible < allGrid.length) {
          setLoading(true);
          setTimeout(() => {
            setVisible((prev) => Math.min(prev + LOAD_MORE, allGrid.length));
            setLoading(false);
          }, 400);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading, visible, allGrid.length]);

  return (
    <div className="flex flex-col bg-white">

      {/* ── Greeting header ──────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#859365] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          {/* Greeting text */}
          <div>
            <p className="text-[11px] text-[#888888] leading-none mb-0.5">Good afternoon,</p>
            <p
              className="text-[18px] text-[#111111] leading-none font-semibold"
              style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
            >
              Paul
            </p>
          </div>
        </div>

        {/* Notification bell */}
        <button
          className="relative w-10 h-10 flex items-center justify-center rounded-full bg-black/5"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.5} className="text-[#111111]" />
          {/* Orange unread dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ED832B] rounded-full" />
        </button>
      </div>

      {/* ── Search pill ──────────────────────────────────── */}
      <div className="px-5 mb-4">
        <Link
          href="/customer/search"
          className="flex items-center gap-2.5 bg-black/[0.05] rounded-full px-4 py-2.5"
        >
          <Search size={15} strokeWidth={1.5} className="text-[#888888]" />
          <span className="text-sm text-[#999999]">Search styles, brands…</span>
        </Link>
      </div>

      {/* ── Category pills ───────────────────────────────── */}
      <div className="mb-4">
        <CategoryPills active="All" />
      </div>

      {/* ── Featured promo card ──────────────────────────── */}
      <div className="px-5 mb-5">
        <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.15 }}>
          <Link href={`/customer/product/${FEATURED.id}`}>
            <div className="relative h-[340px] rounded-[24px] overflow-hidden bg-[#F0F3EC]">
              <Image
                src={FEATURED.image}
                alt={FEATURED.name}
                fill
                className="object-cover object-top"
                priority
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              {/* Top-left discount badge */}
              <div className="absolute top-3 left-3 bg-[#ED832B] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Up to 35% off
              </div>

              {/* Top-right star + rating */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white text-[#111111] text-[11px] font-bold px-2.5 py-1 rounded-full">
                <Star size={11} className="fill-[#ED832B] text-[#ED832B]" />
                {FEATURED.rating}
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-[11px] uppercase tracking-wider font-semibold">
                    Valley
                  </p>
                  <p className="text-white text-base font-semibold leading-tight mt-0.5">
                    {FEATURED.name}
                  </p>
                  <p className="text-white/80 text-sm font-bold mt-1">
                    LKR {FEATURED.price.toLocaleString()}
                  </p>
                </div>
                {/* Shop Now pill */}
                <div className="bg-white text-[#111111] text-xs font-bold px-4 py-2 rounded-full shrink-0 ml-3">
                  Shop Now
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* ── Popular section heading ───────────────────────── */}
      <div className="px-5 mb-3 flex items-baseline justify-between">
        <h2
          className="text-[22px] font-bold text-[#111111]"
          style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.02em" }}
        >
          POPULAR
        </h2>
        <Link href="/customer/category/all" className="text-xs text-[#4A89C2] font-semibold">
          See all
        </Link>
      </div>

      {/* ── Product grid ─────────────────────────────────── */}
      <div className="px-5 grid grid-cols-2 gap-3">
        {allGrid.slice(0, visible).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Sentinel + spinner */}
      <div ref={sentinelRef} className="flex justify-center py-6">
        {loading && (
          <div className="w-6 h-6 rounded-full border-2 border-[#859365] border-t-transparent animate-spin" />
        )}
      </div>
    </div>
  );
}
