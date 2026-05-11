"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { CategoryPills } from "@/components/customer/CategoryPills";
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
    <div className="flex flex-col bg-white">

      {/* ── Greeting header (mirrors home) ───────────────── */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#859365] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <p className="text-[11px] text-[#888888] leading-none mb-0.5">
              {cat === "all" ? "All Products" : `${label} · ${filtered.length} items`}
            </p>
            <p
              className="text-[18px] text-[#111111] leading-none font-semibold"
              style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
            >
              {cat === "all" ? "Everything" : label}
            </p>
          </div>
        </div>

        <button
          className="relative w-10 h-10 flex items-center justify-center rounded-full bg-black/5"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.5} className="text-[#111111]" />
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
        <CategoryPills active={cat === "all" ? "All" : label} />
      </div>

      {/* ── Product grid ─────────────────────────────────── */}
      <div className="px-5 grid grid-cols-2 gap-3">
        {filtered.slice(0, visible).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#999999]">
          <p className="text-4xl mb-4">👗</p>
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
