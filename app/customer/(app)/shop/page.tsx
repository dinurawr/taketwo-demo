"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Sparkles, User, Heart, Waves, Tag } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/customer/ProductCard";

type Pill = "for-you" | "brands" | "men" | "women" | "swim";

const PILLS: { id: Pill; label: string; icon: React.ReactNode }[] = [
  { id: "for-you", label: "For you",  icon: <Sparkles size={13} strokeWidth={1.8} /> },
  { id: "brands",  label: "Brands",   icon: <Tag       size={13} strokeWidth={1.8} /> },
  { id: "men",     label: "Men",      icon: <User      size={13} strokeWidth={1.8} /> },
  { id: "women",   label: "Women",    icon: <Heart     size={13} strokeWidth={1.8} /> },
  { id: "swim",    label: "Swim",     icon: <Waves     size={13} strokeWidth={1.8} /> },
];

function deriveInitialPill(gender: string, cat: string): Pill {
  if (gender === "men")   return "men";
  if (gender === "women") return "women";
  if (gender === "swim")  return "swim";
  return "for-you";
}

function ShopGrid() {
  const params     = useSearchParams();
  const router     = useRouter();
  const initGender = params.get("gender") ?? "";
  const initCat    = params.get("cat")    ?? "";

  const [activePill, setActivePill] = useState<Pill>(() => deriveInitialPill(initGender, initCat));
  const [query, setQuery]           = useState("");

  const filtered = useMemo(() => {
    let list = products;

    // Gender filter from pill
    if (activePill === "men")   list = list.filter(p => p.category === "Men");
    if (activePill === "women") list = list.filter(p => p.category === "Women");
    if (activePill === "swim")  list = list.filter(p => p.category === "Swim");
    // "brands" + "for-you" → show all (could be extended later)

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activePill, query]);

  return (
    <div className="flex flex-col bg-white min-h-full pb-24">

      {/* ── Search bar ─────────────────────────────────────── */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-2 bg-[#F2F2F2] rounded-full px-4 py-3">
          <Search size={15} strokeWidth={2} className="text-[#999] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search styles, brands..."
            className="flex-1 bg-transparent text-[13px] text-[#111] placeholder-[#AAA] outline-none font-light"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#999] text-[11px] cursor-pointer"
              style={{ touchAction: "manipulation" }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Filter pills ───────────────────────────────────── */}
      <div className="flex items-center gap-2 px-4 pb-4 overflow-x-auto scrollbar-none">
        {PILLS.map(pill => {
          const active = activePill === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setActivePill(pill.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full flex-shrink-0 text-[12px] font-semibold transition-all cursor-pointer border ${
                active
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#333] border-[#E0E0E0]"
              }`}
              style={{ touchAction: "manipulation" }}
            >
              {pill.icon}
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* ── Results count ──────────────────────────────────── */}
      <div className="px-4 pb-3">
        <p className="text-[11px] text-[#AAA] font-light uppercase tracking-widest">
          {filtered.length} item{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Product grid ───────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="px-4 grid grid-cols-2 gap-3">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center px-5">
          <p className="text-base font-bold text-[#111111] mb-2">Nothing found.</p>
          <p className="text-sm text-[#999999] font-light">Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 rounded-full border-2 border-[#859365] border-t-transparent animate-spin" />
      </div>
    }>
      <ShopGrid />
    </Suspense>
  );
}
