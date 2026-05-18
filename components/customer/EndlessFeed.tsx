"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { getShortName } from "@/data/products";
import { getBrand } from "@/data/brands";
import { ProductCard } from "@/components/customer/ProductCard";
import Image from "next/image";
import Link from "next/link";

const MAX_CYCLES = 5;

function shuffleWithSeed<T>(list: T[], seed: number): T[] {
  const arr = [...list];
  let rng = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    rng = (rng * 9301 + 49297) % 233280;
    const j = Math.floor((rng / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Featured editorial card — spans full width, 16:7 aspect
function FeaturedCard({ product }: { product: Product }) {
  const brand = getBrand(product.brand);
  return (
    <div style={{ gridColumn: "span 2" }}>
      <Link href={`/customer/product/${product.id}`} className="relative block overflow-hidden" style={{ aspectRatio: "16/7" }}>
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="390px" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }}
        />
        <div className="absolute bottom-0 left-0 p-4">
          {brand && (
            <p className="text-[10px] uppercase tracking-widest mb-1"
               style={{ color: "#859365", fontFamily: "var(--font-barlow)", fontWeight: 700 }}>
              {brand.name}
            </p>
          )}
          <p className="text-white text-lg font-black uppercase leading-tight"
             style={{ fontFamily: "var(--font-barlow)" }}>
            {getShortName(product)}
          </p>
          <p className="text-white/80 text-sm font-bold mt-1">
            LKR {product.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
}

export function EndlessFeed({ query }: { query: string }) {
  const [cycles, setCycles] = useState(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const baseList = useMemo<Product[]>(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    setCycles(1);
  }, [query]);

  const renderedList = useMemo(() => {
    const out: { key: string; product: Product }[] = [];
    for (let c = 0; c < cycles; c++) {
      const shuffled = c === 0 ? baseList : shuffleWithSeed(baseList, c * 31 + 7);
      shuffled.forEach((p, i) => out.push({ key: `${c}-${i}-${p.id}`, product: p }));
    }
    return out;
  }, [baseList, cycles]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    if (cycles >= MAX_CYCLES) return;

    const scrollRoot = document.getElementById("scroll-container");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCycles((c) => Math.min(c + 1, MAX_CYCLES));
        }
      },
      { root: scrollRoot, rootMargin: "200px 0px", threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [cycles]);

  return (
    <div className="px-3 pb-6">
      <p className="text-[11px] text-[#AAA] font-light uppercase tracking-widest pb-3 px-1">
        For you
      </p>

      {renderedList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-base font-bold mb-2" style={{ color: "var(--ink)" }}>Nothing found.</p>
          <p className="text-sm font-light" style={{ color: "var(--muted)" }}>Try a different search.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            {renderedList.map(({ key, product }, index) => {
              // Every 6th item (0-indexed at 5, 11, 17...) becomes a featured wide card
              if (index > 0 && (index + 1) % 6 === 0) {
                return <FeaturedCard key={key} product={product} />;
              }
              return <ProductCard key={key} product={product} />;
            })}
          </div>

          {cycles < MAX_CYCLES ? (
            <div ref={sentinelRef} className="h-12 flex items-center justify-center mt-4">
              <div className="w-5 h-5 rounded-full border-2 border-[#111111]/20 border-t-[#111111] animate-spin" />
            </div>
          ) : (
            <p className="text-[10px] uppercase tracking-widest text-[#CCCCCC] text-center mt-6">
              You&apos;ve reached the end
            </p>
          )}
        </>
      )}
    </div>
  );
}
