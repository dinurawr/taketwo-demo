"use client";

import Link from "next/link";
import { ArrowUpRight, Tag } from "lucide-react";
import { brands } from "@/data/brands";

// Row 2 of the shop header: "All brands" (opens the brand directory) followed by one
// chip per brand that links to that brand's storefront. Same hard-edge chip style as
// the garment row above it, one horizontally scrollable line.
export function BrandChips({
  directoryActive,
  onDirectory,
}: {
  directoryActive: boolean;
  onDirectory: () => void;
}) {
  const chip =
    "shrink-0 flex items-center gap-1.5 border px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors";

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none px-4 pt-2 pb-4">
      <button
        type="button"
        onClick={onDirectory}
        aria-pressed={directoryActive}
        className={`${chip} cursor-pointer ${
          directoryActive
            ? "bg-[#111111] text-white border-[#111111]"
            : "bg-white text-[#111111] border-[#111111]"
        }`}
        style={{ touchAction: "manipulation" }}
      >
        <Tag size={12} strokeWidth={2} />
        All brands
      </button>
      {brands.map((b) => (
        <Link
          key={b.id}
          href={`/customer/brand/${b.id}`}
          className={`${chip} bg-white text-[#111111] border-[#111111] active:bg-[#111111] active:text-white`}
          style={{ touchAction: "manipulation" }}
        >
          {b.name}
          <ArrowUpRight size={12} strokeWidth={2} />
        </Link>
      ))}
    </div>
  );
}
