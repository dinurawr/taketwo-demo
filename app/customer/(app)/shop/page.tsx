"use client";

import { Suspense, useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Sparkles, User, Heart, Tag, ChevronRight, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { brands } from "@/data/brands";
import { CategoryAccordion } from "@/components/customer/CategoryAccordion";
import { EndlessFeed } from "@/components/customer/EndlessFeed";
import { FilterDropdown } from "@/components/customer/FilterDropdown";
import { FilterChips } from "@/components/customer/FilterChips";
import {
  type Filters,
  EMPTY_FILTERS,
  deriveFilterOptions,
  applyFilters,
  hasActiveFilters,
  activeFilterCount,
} from "@/lib/filters";

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
  if (gender === "swim")  return "women";
  return "for-you";
}

// ── Brand directory ───────────────────────────────────────────────────────────
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
            <div className="w-16 h-16 overflow-hidden shrink-0 relative">
              <Image
                src={brand.heroImage}
                alt={brand.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
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

// ── Main shop grid ────────────────────────────────────────────────────────────
function ShopGrid() {
  const params     = useSearchParams();
  const initGender = params.get("gender") ?? "";

  const [activePill, setActivePill] = useState<Pill>(() => deriveInitialPill(initGender));
  const [query, setQuery]           = useState("");
  const [filters, setFilters]       = useState<Filters>(EMPTY_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);

  // Derive filter options from the full product list (not query-filtered,
  // so counts reflect total catalogue — prevents options disappearing as you filter)
  const filterOptions = useMemo(() => deriveFilterOptions(products), []);

  // Count of products that match current filters (for VIEW ITEMS button)
  const matchCount = useMemo(() => {
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
    return applyFilters(list, filters).length;
  }, [query, filters]);

  const showFilterUI = activePill === "for-you";
  const filterBadge  = activeFilterCount(filters);

  // ── Auto-hide header on scroll ──────────────────────────
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const el = document.getElementById("scroll-container");
    if (!el) return;

    const onScroll = () => {
      const y = el.scrollTop;
      const delta = y - lastScrollY.current;

      // Always show when near the top
      if (y < 80) {
        setHeaderHidden(false);
      } else if (Math.abs(delta) > 6) {
        // Hide scrolling down, show scrolling up — ignore tiny jitter
        setHeaderHidden(delta > 0);
      }

      lastScrollY.current = y;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative flex flex-col bg-white min-h-full pb-24">

      {/* ── Sticky auto-hide header ─────────────────────────── */}
      <motion.div
        className="sticky top-0 -mt-16 bg-white z-30"
        animate={{ y: headerHidden ? "-100%" : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* White spacer behind dynamic island */}
        <div className="h-16" />

        {/* Search bar */}
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
                className="text-[#999] text-[11px] cursor-pointer px-1"
                style={{ touchAction: "manipulation" }}
              >
                ✕
              </button>
            )}
            {/* Filter button — only on For You tab */}
            {showFilterUI && (
              <button
                onClick={() => {
                  setHeaderHidden(false);
                  setFilterOpen(true);
                }}
                className="relative flex items-center gap-1.5 pl-3 border-l border-[#111]/15 cursor-pointer"
                style={{ touchAction: "manipulation" }}
              >
                <SlidersHorizontal size={14} strokeWidth={1.8} className="text-[#111]" />
                <span className="text-[12px] font-semibold text-[#111] tracking-wide">
                  Filters
                </span>
                {filterBadge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#111] text-[9px] font-bold text-white flex items-center justify-center">
                    {filterBadge}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        <AnimatePresence initial={false}>
          {showFilterUI && hasActiveFilters(filters) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <FilterChips
                filters={filters}
                onFiltersChange={setFilters}
                options={filterOptions}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category pills */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-4 overflow-x-auto scrollbar-none">
          {PILLS.map(pill => {
            const active = activePill === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setActivePill(pill.id)}
                className={`flex items-center gap-1.5 px-4 py-2 flex-shrink-0 text-[12px] font-semibold transition-all cursor-pointer border ${
                  active
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#111] border-[#111]"
                }`}
                style={{ touchAction: "manipulation" }}
              >
                {pill.icon}
                {pill.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Content per pill ───────────────────────────────── */}
      {activePill === "for-you" && <EndlessFeed query={query} filters={filters} />}
      {activePill === "brands"  && <BrandsView query={query} />}
      {activePill === "men"     && <CategoryAccordion gender="men"   query={query} />}
      {activePill === "women"   && <CategoryAccordion gender="women" query={query} />}

      {/* ── Filter dropdown overlay ─────────────────────────── */}
      <FilterDropdown
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        options={filterOptions}
        matchCount={matchCount}
      />
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
