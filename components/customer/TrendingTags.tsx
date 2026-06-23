"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brands } from "@/data/brands";

// Hard-edge "trending" tag row — boxed chips with a ↗ glyph, horizontally
// scrollable. Used on both the Shop and Search pages.
const TAGS: { label: string; href: string }[] = [
  { label: "Shop All", href: "/customer/shop" },
  ...brands.map((b) => ({ label: b.name, href: `/customer/brand/${b.id}` })),
];

export function TrendingTags({ title = "Trending Searches" }: { title?: string }) {
  return (
    <div className="px-4 py-3">
      {title && (
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111111] mb-2.5"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          {title}
        </p>
      )}
      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {TAGS.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="shrink-0 flex items-center gap-1 border border-[#111111] px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#111111] active:bg-[#111111] active:text-white transition-colors"
            style={{ touchAction: "manipulation" }}
          >
            {t.label}
            <ArrowUpRight size={12} strokeWidth={2} />
          </Link>
        ))}
      </div>
    </div>
  );
}
