"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Filters, DerivedFilterOptions } from "@/lib/filters";

interface FilterChipsProps {
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  options: DerivedFilterOptions;
}

interface ChipProps {
  label: React.ReactNode;
  onRemove: () => void;
}

function Chip({ label, onRemove }: ChipProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#111]/15 bg-white text-[11px] font-medium text-[#111] shrink-0"
    >
      {label}
      <button
        onClick={onRemove}
        className="flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100"
        style={{ touchAction: "manipulation" }}
        aria-label="Remove filter"
      >
        <X size={10} strokeWidth={2.5} />
      </button>
    </motion.div>
  );
}

function fmtLKR(n: number) {
  return "LKR " + n.toLocaleString("en-LK");
}

export function FilterChips({ filters, onFiltersChange, options }: FilterChipsProps) {
  // Look up a colour label from hex
  const colorLabel = (hex: string) =>
    options.colors.find((c) => c.value === hex)?.label ?? hex;

  // Look up a category label from value
  const categoryLabel = (val: string) =>
    options.categories.find((c) => c.value === val)?.label ?? val;

  const removeCategory = (v: string) =>
    onFiltersChange({ ...filters, categories: filters.categories.filter((c) => c !== v) });

  const removeSize = (v: string) =>
    onFiltersChange({ ...filters, sizes: filters.sizes.filter((s) => s !== v) });

  const removeColor = (v: string) =>
    onFiltersChange({ ...filters, colors: filters.colors.filter((c) => c !== v) });

  const removePriceRange = () =>
    onFiltersChange({ ...filters, priceRange: null });

  return (
    <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto scrollbar-none">
      <AnimatePresence initial={false}>
        {/* Category chips */}
        {filters.categories.map((v) => (
          <Chip
            key={`cat-${v}`}
            label={categoryLabel(v)}
            onRemove={() => removeCategory(v)}
          />
        ))}

        {/* Size chips */}
        {filters.sizes.map((v) => (
          <Chip
            key={`size-${v}`}
            label={v}
            onRemove={() => removeSize(v)}
          />
        ))}

        {/* Colour chips */}
        {filters.colors.map((v) => (
          <Chip
            key={`color-${v}`}
            label={
              <span className="flex items-center gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: v }}
                />
                {colorLabel(v)}
              </span>
            }
            onRemove={() => removeColor(v)}
          />
        ))}

        {/* Price range chip */}
        {filters.priceRange && (
          <Chip
            key="price"
            label={`${fmtLKR(filters.priceRange[0])} – ${fmtLKR(filters.priceRange[1])}`}
            onRemove={removePriceRange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
