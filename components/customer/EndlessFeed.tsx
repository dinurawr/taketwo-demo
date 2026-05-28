"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/customer/ProductCard";
import { type Filters, applyFilters, hasActiveFilters } from "@/lib/filters";

const MAX_CYCLES = 5;

// Deterministic shuffle by seed — keeps cycles distinct without re-shuffling on every render
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

export function EndlessFeed({ query, filters }: { query: string; filters?: Filters }) {
  const [cycles, setCycles] = useState(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Filter base list by text query then structured filters
  const baseList = useMemo<Product[]>(() => {
    let list = products;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (filters && hasActiveFilters(filters)) {
      list = applyFilters(list, filters);
    }
    return list;
  }, [query, filters]);

  // Reset cycles when query or filters change
  useEffect(() => {
    setCycles(1);
  }, [query, filters]);

  // Build the rendered list — one shuffled copy per cycle
  const renderedList = useMemo(() => {
    const out: { key: string; product: Product }[] = [];
    for (let c = 0; c < cycles; c++) {
      const shuffled = c === 0 ? baseList : shuffleWithSeed(baseList, c * 31 + 7);
      shuffled.forEach((p, i) => out.push({ key: `${c}-${i}-${p.id}`, product: p }));
    }
    return out;
  }, [baseList, cycles]);

  // IntersectionObserver — load more when sentinel scrolls into view
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
    <div className="pb-6">
      <p className="text-[11px] text-[#AAA] font-light uppercase tracking-widest pb-3 px-4">
        For you
      </p>

      {renderedList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
          <p className="text-base font-bold text-[#111111] mb-2">Nothing found.</p>
          <p className="text-sm text-[#999999] font-light">
            {filters && hasActiveFilters(filters)
              ? "Try adjusting your filters."
              : "Try a different search."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-0.5">
            {renderedList.map(({ key, product }) => (
              <ProductCard key={key} product={product} />
            ))}
          </div>

          {/* Sentinel for endless scroll */}
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
