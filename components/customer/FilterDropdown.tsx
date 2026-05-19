"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { PriceRangeSlider } from "@/components/customer/PriceRangeSlider";
import type { Filters, FilterOption, DerivedFilterOptions } from "@/lib/filters";
import { EMPTY_FILTERS } from "@/lib/filters";

type SubPanel = "category" | "size" | "colour" | "price" | null;

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  options: DerivedFilterOptions;
  matchCount: number;
}

// ── Option list row ───────────────────────────────────────────────────────────
function OptionRow({
  option,
  selected,
  onToggle,
}: {
  option: FilterOption;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center w-full px-5 py-4 border-b border-[#F0F0F0] text-left cursor-pointer active:bg-[#F7F7F7] transition-colors"
      style={{ touchAction: "manipulation" }}
    >
      {/* Colour dot */}
      {option.hex && (
        <div
          className="w-5 h-5 rounded-full border border-black/10 mr-3 shrink-0"
          style={{ backgroundColor: option.hex }}
        />
      )}

      {/* Label */}
      <span className="flex-1 text-[14px] text-[#111] font-light">
        {option.label}{" "}
        <span className="text-[#999]">({option.count})</span>
      </span>

      {/* Checkmark */}
      {selected && (
        <Check size={15} strokeWidth={2.5} className="text-[#111] ml-2 shrink-0" />
      )}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function FilterDropdown({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  options,
  matchCount,
}: FilterDropdownProps) {
  const [subPanel, setSubPanel] = useState<SubPanel>(null);

  const handleClose = () => {
    setSubPanel(null);
    onClose();
  };

  const handleBack = () => setSubPanel(null);

  // Toggle helpers
  const toggleCategory = (v: string) => {
    const cats = filters.categories.includes(v)
      ? filters.categories.filter((c) => c !== v)
      : [...filters.categories, v];
    onFiltersChange({ ...filters, categories: cats });
  };

  const toggleSize = (v: string) => {
    const sizes = filters.sizes.includes(v)
      ? filters.sizes.filter((s) => s !== v)
      : [...filters.sizes, v];
    onFiltersChange({ ...filters, sizes });
  };

  const toggleColor = (v: string) => {
    const colors = filters.colors.includes(v)
      ? filters.colors.filter((c) => c !== v)
      : [...filters.colors, v];
    onFiltersChange({ ...filters, colors });
  };

  const clearAll = () => {
    onFiltersChange(EMPTY_FILTERS);
    setSubPanel(null);
  };

  // Animation variants for main menu ↔ sub-panel
  const menuVariants = {
    enter: (dir: number) => ({ x: dir * -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
  };
  const panelVariants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: 40, opacity: 0 },
  };

  const mainMenuRows: { id: SubPanel; label: string }[] = [
    { id: "category", label: "Category" },
    { id: "size",     label: "Size" },
    { id: "colour",   label: "Colour" },
    { id: "price",    label: "Price Range" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="filter-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            key="filter-panel"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute top-0 left-0 right-0 bg-white z-50 overflow-hidden"
            style={{ maxHeight: "75vh", display: "flex", flexDirection: "column" }}
          >
            {/* Inner content — animates between main menu and sub-panels */}
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait" initial={false}>
                {subPanel === null ? (
                  /* ── Main menu ── */
                  <motion.div
                    key="main-menu"
                    custom={-1}
                    variants={menuVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex flex-col h-full"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-center px-5 py-4 border-b border-[#F0F0F0] relative">
                      <p
                        className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#111]"
                        style={{ fontFamily: "var(--font-barlow)" }}
                      >
                        Filter
                      </p>
                      <button
                        onClick={handleClose}
                        className="absolute right-5 w-8 h-8 flex items-center justify-center cursor-pointer"
                        style={{ touchAction: "manipulation" }}
                      >
                        <X size={18} strokeWidth={1.5} className="text-[#111]" />
                      </button>
                    </div>

                    {/* Rows */}
                    <div className="flex-1 overflow-y-auto">
                      {mainMenuRows.map((row) => (
                        <button
                          key={row.id}
                          onClick={() => setSubPanel(row.id)}
                          className="flex items-center w-full px-5 py-5 border-b border-[#F0F0F0] cursor-pointer active:bg-[#F7F7F7] transition-colors"
                          style={{ touchAction: "manipulation" }}
                        >
                          <span className="flex-1 text-[14px] text-[#111] font-light text-left">
                            {row.label}
                          </span>
                          <ChevronRight size={15} strokeWidth={1.5} className="text-[#CCC]" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* ── Sub-panel ── */
                  <motion.div
                    key={`sub-${subPanel}`}
                    variants={panelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex flex-col h-full"
                  >
                    {/* Sub-panel header */}
                    <div className="flex items-center px-5 py-4 border-b border-[#F0F0F0] relative">
                      <button
                        onClick={handleBack}
                        className="w-8 h-8 flex items-center justify-center cursor-pointer"
                        style={{ touchAction: "manipulation" }}
                      >
                        <ChevronLeft size={18} strokeWidth={1.5} className="text-[#111]" />
                      </button>
                      <p
                        className="flex-1 text-center text-[12px] font-bold uppercase tracking-[0.18em] text-[#111]"
                        style={{ fontFamily: "var(--font-barlow)" }}
                      >
                        {subPanel === "category" && "Category"}
                        {subPanel === "size"     && "Size"}
                        {subPanel === "colour"   && "Colour"}
                        {subPanel === "price"    && "Price Range"}
                      </p>
                      <button
                        onClick={handleClose}
                        className="w-8 h-8 flex items-center justify-center cursor-pointer"
                        style={{ touchAction: "manipulation" }}
                      >
                        <X size={18} strokeWidth={1.5} className="text-[#111]" />
                      </button>
                    </div>

                    {/* Sub-panel content */}
                    <div className="flex-1 overflow-y-auto">
                      {subPanel === "category" &&
                        options.categories.map((opt) => (
                          <OptionRow
                            key={opt.value}
                            option={opt}
                            selected={filters.categories.includes(opt.value)}
                            onToggle={() => toggleCategory(opt.value)}
                          />
                        ))}

                      {subPanel === "size" &&
                        options.sizes.map((opt) => (
                          <OptionRow
                            key={opt.value}
                            option={opt}
                            selected={filters.sizes.includes(opt.value)}
                            onToggle={() => toggleSize(opt.value)}
                          />
                        ))}

                      {subPanel === "colour" &&
                        options.colors.map((opt) => (
                          <OptionRow
                            key={opt.value}
                            option={opt}
                            selected={filters.colors.includes(opt.value)}
                            onToggle={() => toggleColor(opt.value)}
                          />
                        ))}

                      {subPanel === "price" && (
                        <PriceRangeSlider
                          min={options.priceMin}
                          max={options.priceMax}
                          value={filters.priceRange ?? [options.priceMin, options.priceMax]}
                          onChange={(range) => {
                            const isFullRange =
                              range[0] === options.priceMin && range[1] === options.priceMax;
                            onFiltersChange({
                              ...filters,
                              priceRange: isFullRange ? null : range,
                            });
                          }}
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-t border-[#F0F0F0]">
              <button
                onClick={clearAll}
                className="flex-1 py-3 border border-[#111]/20 text-[12px] font-bold uppercase tracking-[0.12em] text-[#111] cursor-pointer active:bg-[#F5F5F5] transition-colors"
                style={{ touchAction: "manipulation", fontFamily: "var(--font-barlow)" }}
              >
                Clear All
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-3 bg-[#111111] text-[12px] font-bold uppercase tracking-[0.12em] text-white cursor-pointer active:opacity-80 transition-opacity"
                style={{ touchAction: "manipulation", fontFamily: "var(--font-barlow)" }}
              >
                View {matchCount} Item{matchCount !== 1 ? "s" : ""}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
