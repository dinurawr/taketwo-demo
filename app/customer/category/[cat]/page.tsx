"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProductCard } from "@/components/customer/ProductCard";
import { products } from "@/data/products";

const PAGE_SIZE = 8;
const LOAD_MORE = 4;

export default function CategoryPage() {
  const params = useParams();
  const cat = (params?.cat as string) ?? "all";
  const label = cat.charAt(0).toUpperCase() + cat.slice(1);

  const filtered =
    cat === "all"
      ? products
      : products.filter((p) => p.category.toLowerCase() === cat.toLowerCase());

  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [cat]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && visible < filtered.length) {
          setLoading(true);
          setTimeout(() => {
            setVisible((prev) => Math.min(prev + LOAD_MORE, filtered.length));
            setLoading(false);
          }, 400);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading, visible, filtered.length]);

  return (
    <div className="flex flex-col bg-white min-h-full pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-4 border-b border-[#F0F0F0]">
        <Link href="/customer/home">
          <ChevronLeft size={20} strokeWidth={1.5} className="text-[#111111]" />
        </Link>
        <h1
          className="text-sm font-bold text-[#111111] uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          {cat === "all" ? "Shop All" : label}
        </h1>
        <span className="ml-auto text-xs text-[#999999] font-light">{filtered.length} items</span>
      </div>

      {/* Product grid */}
      <div className="px-4 pt-4 grid grid-cols-2 gap-3">
        {filtered.slice(0, visible).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#999999] px-5">
          <p className="font-medium text-[#111111]">No products in this category yet</p>
        </div>
      )}

      {/* Sentinel + spinner */}
      <div ref={sentinelRef} className="flex justify-center py-6">
        {loading && (
          <div className="w-6 h-6 rounded-full border-2 border-[#859365] border-t-transparent animate-spin" />
        )}
      </div>
    </div>
  );
}
