"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryPills } from "@/components/customer/CategoryPills";
import { ProductCard } from "@/components/customer/ProductCard";
import { useMenu } from "@/lib/menu-store";
import { products } from "@/data/products";

const PAGE_SIZE = 8;
const LOAD_MORE = 4;

export default function CustomerHome() {
  const { open: openMenu } = useMenu();
  const featured = products[0];
  const allGrid = products.slice(1);

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
      {/* Sticky top bar — always visible, no scroll trigger */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-black/5">
        <div className="flex items-center justify-between px-4 py-2.5">
          <button
            onClick={openMenu}
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Open menu"
          >
            <span className="w-5 h-0.5 bg-[#111111] rounded-full" />
            <span className="w-3 h-0.5 bg-[#111111] rounded-full self-start" />
          </button>
          <Image src="/logo.png" alt="Take Two" width={72} height={42} priority />
          <Link
            href="/customer/search"
            className="w-9 h-9 flex items-center justify-center"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.5} className="text-[#111111]" />
          </Link>
        </div>
      </div>

      {/* Hero card */}
      <div className="px-5 pt-4 mb-5">
        <motion.div whileTap={{ scale: 0.98 }}>
          <Link href={`/customer/product/${featured.id}`}>
            <div className="relative h-[420px] rounded-3xl overflow-hidden bg-[#859365]">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h2
                  className="text-4xl font-bold text-white leading-none"
                  style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.01em" }}
                >
                  VALLEY
                </h2>
                <div className="h-0.5 w-16 bg-[#ED832B] mt-2 mb-4" />
                <div className="flex items-center justify-between">
                  <p className="text-white/80 text-sm">{featured.name}</p>
                  <div className="w-10 h-10 rounded-full bg-[#ED832B] flex items-center justify-center">
                    <span className="text-white text-lg font-bold">→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Section header */}
      <div className="px-5 mb-3">
        <h2 className="text-2xl font-bold text-[#111111] leading-tight">
          Explore
          <br />
          <span className="text-[#4A89C2]">Your New Style</span>
        </h2>
      </div>

      {/* Category pills */}
      <div className="mb-4">
        <CategoryPills active="All" />
      </div>

      {/* Product grid */}
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
