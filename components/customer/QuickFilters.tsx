"use client";

import { PackagePlus } from "lucide-react";
import type { Filters, DerivedFilterOptions } from "@/lib/filters";

// Garment quick-filter chips (New In · Shirts · Tees · Knitwear · Trousers · Swim …).
// Hard-edge boxed chips, horizontally scrollable. Tapping a chip toggles it in the
// shared Filters state, so it works alongside the Filters sheet and the active-filter
// chips row. Garment options + counts come from deriveFilterOptions (already ordered
// by GARMENT_ORDER).
export function QuickFilters({
  filters,
  onFiltersChange,
  options,
  title = "Shop by type",
}: {
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  options: DerivedFilterOptions;
  title?: string;
}) {
  const toggleCategory = (value: string) => {
    const on = filters.categories.includes(value);
    onFiltersChange({
      ...filters,
      categories: on
        ? filters.categories.filter((c) => c !== value)
        : [...filters.categories, value],
    });
  };

  const chipBase =
    "shrink-0 flex items-center gap-1.5 border px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors cursor-pointer";
  const on = "bg-[#111111] text-white border-[#111111]";
  const off = "bg-white text-[#111111] border-[#111111]";

  return (
    <div className="px-4 pt-3 pb-1">
      {title && (
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111111] mb-2.5"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          {title}
        </p>
      )}
      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => onFiltersChange({ ...filters, newOnly: !filters.newOnly })}
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
    </div>
  );
}
