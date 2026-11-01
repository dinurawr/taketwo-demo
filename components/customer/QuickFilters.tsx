"use client";

import { Sparkles, PackagePlus } from "lucide-react";
import type { Filters, DerivedFilterOptions } from "@/lib/filters";

// Row 1 of the shop header: "For you" followed by the garment quick-filters
// (New In · Shirts · Tees · Knitwear · … · Swim). Hard-edge boxed chips, one
// horizontally scrollable line. Garment chips toggle the shared Filters state
// (so they work alongside the Filters sheet); "For you" resets the category / New In
// selection and shows the whole feed. Garment options + counts come from
// deriveFilterOptions (already ordered by GARMENT_ORDER).
export function QuickFilters({
  filters,
  onFiltersChange,
  options,
  forYouActive,
  onForYou,
  onSelect,
}: {
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  options: DerivedFilterOptions;
  /** "For you" is active when the feed is showing with no category / New In picked. */
  forYouActive: boolean;
  onForYou: () => void;
  /** Called whenever a garment / New In chip is tapped (e.g. to leave a directory view). */
  onSelect?: () => void;
}) {
  const toggleCategory = (value: string) => {
    const on = filters.categories.includes(value);
    onFiltersChange({
      ...filters,
      categories: on
        ? filters.categories.filter((c) => c !== value)
        : [...filters.categories, value],
    });
    onSelect?.();
  };

  const chipBase =
    "shrink-0 flex items-center gap-1.5 border px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors cursor-pointer";
  const on = "bg-[#111111] text-white border-[#111111]";
  const off = "bg-white text-[#111111] border-[#111111]";

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none px-4 pt-3">
      <button
        type="button"
        onClick={onForYou}
        aria-pressed={forYouActive}
        className={`${chipBase} ${forYouActive ? on : off}`}
        style={{ touchAction: "manipulation" }}
      >
        <Sparkles size={12} strokeWidth={2} />
        For you
      </button>
      <button
        type="button"
        onClick={() => {
          onFiltersChange({ ...filters, newOnly: !filters.newOnly });
          onSelect?.();
        }}
        aria-pressed={filters.newOnly}
        className={`${chipBase} ${filters.newOnly ? on : off}`}
        style={{ touchAction: "manipulation" }}
      >
        <PackagePlus size={12} strokeWidth={2} />
        New In
      </button>
      {options.categories.map((c) => {
        const active = filters.categories.includes(c.value);
        return (
          <button
            key={c.value}
            type="button"
            onClick={() => toggleCategory(c.value)}
            aria-pressed={active}
            className={`${chipBase} ${active ? on : off}`}
            style={{ touchAction: "manipulation" }}
          >
            {c.label}
            <span className={active ? "text-white/60" : "text-[#111111]/40"}>{c.count}</span>
          </button>
        );
      })}
    </div>
  );
}
