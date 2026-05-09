"use client";

import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/customer/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const allBrands = [...new Set(products.map((p) => p.brand))];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [minPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = products.filter((p) => {
    const matchQuery =
      query === "" ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase());
    const matchBrand = !selectedBrand || p.brand === selectedBrand;
    const matchPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchQuery && matchBrand && matchPrice;
  });

  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-2 pb-3">
        <Link href="/customer">
          <ChevronLeft size={20} strokeWidth={1.5} className="text-[#111111]" />
        </Link>
        <div className="flex-1 flex items-center gap-2 bg-[#F8F8F6] rounded-full px-4 py-2.5 border border-[#E8E8E8]">
          <Search size={16} className="text-[#999999] shrink-0" />
          <input
            type="text"
            placeholder="Search products, brands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#111111] placeholder:text-[#999999] outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X size={14} className="text-[#999999]" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors ${
            showFilters ? "bg-[#859365] border-[#859365]" : "bg-white border-[#E8E8E8]"
          }`}
        >
          <SlidersHorizontal
            size={16}
            className={showFilters ? "text-white" : "text-[#111111]"}
          />
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="mx-5 mb-4 bg-[#F8F8F6] rounded-2xl p-4 border border-[#E8E8E8]">
          <p className="text-xs font-bold text-[#111111] mb-2 uppercase tracking-wide">Brand</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            <button
              onClick={() => setSelectedBrand(null)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border-2 transition-colors ${
                !selectedBrand ? "bg-[#859365] text-white border-[#859365]" : "text-[#111111] border-[#E8E8E8]"
              }`}
            >
              All
            </button>
            {allBrands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b === selectedBrand ? null : b)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border-2 transition-colors capitalize ${
                  selectedBrand === b
                    ? "bg-[#859365] text-white border-[#859365]"
                    : "text-[#111111] border-[#E8E8E8]"
                }`}
              >
                {b.replace("-", " ")}
              </button>
            ))}
          </div>
          <p className="text-xs font-bold text-[#111111] mb-2 uppercase tracking-wide">
            Max Price: LKR {maxPrice.toLocaleString()}
          </p>
          <input
            type="range"
            min={0}
            max={50000}
            step={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#ED832B]"
          />
        </div>
      )}

      <p className="px-5 mb-3 text-xs text-[#999999]">
        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        {query ? ` for "${query}"` : ""}
      </p>

      <div className="px-5 grid grid-cols-2 gap-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#999999]">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-medium text-[#111111]">No results found</p>
          <p className="text-sm mt-1">Try different keywords or filters</p>
        </div>
      )}
    </div>
  );
}
