"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Sparkles, User, Heart, Tag, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { brands } from "@/data/brands";
import { CategoryAccordion } from "@/components/customer/CategoryAccordion";
import { EndlessFeed } from "@/components/customer/EndlessFeed";

type Pill = "for-you" | "brands" | "men" | "women";

const PILLS: { id: Pill; label: string; icon: React.ReactNode }[] = [
  { id: "for-you", label: "For you",  icon: <Sparkles size={13} strokeWidth={1.8} /> },
  { id: "brands",  label: "Brands",   icon: <Tag       size={13} strokeWidth={1.8} /> },
  { id: "men",     label: "Men",      icon: <User      size={13} strokeWidth={1.8} /> },
  { id: "women",   label: "Women",    icon: <Heart     size={13} strokeWidth={1.8} /> },
];

function deriveInitialPill(gender: string): Pill {
  if (gender === "men")   return "men";
  if (gender === "women") return "women";
  if (gender === "swim")  return "women"; // swim rolls up into women accordion now
  return "for-you";
}

// ── Brand directory ───────────────────────────────────────────────────────
function BrandsView({ query }: { query: string }) {
  const filtered = brands.filter((b) =>
    query.trim() ? b.name.toLowerCase().includes(query.toLowerCase()) : true
  );

  return (
    <div className="px-4 space-y-3">
      <p className="text-[11px] text-[#AAA] font-light uppercase tracking-widest pb-1">
        {filtered.length} brand{filtered.length !== 1 ? "s" : ""}
      </p>
      {filtered.map((brand) => {
        const brandProductCount = products.filter(
          (p) => p.brand === brand.id && p.category !== "Children"
        ).length;

        return (
          <Link
            key={brand.id}
            href={`/customer/brand/${brand.id}`}
            className="flex items-center gap-4 bg-white border border-[#111111]/20 p-3 active:opacity-70 transition-opacity"
          >
            {/* Hero image thumbnail — hard corners */}
            <div className="w-16 h-16 overflow-hidden shrink-0 relative">
              <Image
                src={brand.heroImage}
                alt={brand.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: brand.color }}
                />
                <p className="text-sm font-bold text-[#111111] truncate">{brand.name}</p>
              </div>
              <p className="text-[11px] text-[#999999] truncate">{brand.tagline}</p>
              <p className="text-[10px] text-[#BBBBBB] mt-1">
                {brandProductCount} product{brandProductCount !== 1 ? "s" : ""} &middot;{" "}
                {brand.followerCount.toLocaleString()} followers
              </p>
            </div>

            <ChevronRight size={15} className="text-[#CCCCCC] shrink-0" />
          </Link>
        );
      })}
    </div>
  );
}

function ShopGrid() {
  const params     = useSearchParams();
  const initGender = params.get("gender") ?? "";

  const [activePill, setActivePill] = useState<Pill>(() => deriveInitialPill(initGender));
  const [query, setQuery]           = useState("");

  return (
    <div className="flex flex-col bg-white min-h-full pb-24">

      {/* ── Search bar (hard-edge underline) ─────────────── */}
      <div className="px-4 pt-1 pb-2">
        <div className="flex items-center gap-2 border-b border-[#111111] px-1 py-3">
          <Search size={15} strokeWidth={2} className="text-[#111] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-[14px] text-[#111] placeholder-[#999] outline-none font-light"
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

      {/* ── Filter pills — layoutId sliding active fill ──── */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-4 overflow-x-auto scrollbar-none">
        {PILLS.map(pill => {
          const active = activePill === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setActivePill(pill.id)}
              className="relative flex items-center gap-1.5 px-4 py-2 flex-shrink-0 text-[12px] font-semibold cursor-pointer border border-[var(--ink)] overflow-hidden"
              style={{ touchAction: "manipulation", color: active ? "var(--surface)" : "var(--ink)" }}
            >
              {active && (
                <motion.span
                  layoutId="pill-fill"
                  className="absolute inset-0"
                  style={{ backgroundColor: "var(--ink)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {pill.icon}
                {pill.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Content per pill ─────────────────────────────── */}
      {activePill === "for-you" && <EndlessFeed query={query} />}
      {activePill === "brands"  && <BrandsView query={query} />}
      {activePill === "men"     && <CategoryAccordion gender="men"   query={query} />}
      {activePill === "women"   && <CategoryAccordion gender="women" query={query} />}
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
