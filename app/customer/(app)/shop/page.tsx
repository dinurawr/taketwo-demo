"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/customer/ProductCard";

function ShopGrid() {
  const params = useSearchParams();
  const cat = params.get("cat") ?? "";
  const gender = params.get("gender") ?? "";

  // Filter products
  let filtered = products;

  // Filter by gender/category tab
  if (gender && gender !== "all") {
    const genderMap: Record<string, string> = {
      women: "Women",
      men: "Men",
      swim: "Swim",
      children: "Children",
    };
    const mappedCategory = genderMap[gender.toLowerCase()];
    if (mappedCategory) {
      filtered = filtered.filter((p) => p.category === mappedCategory);
    }
  }

  // Filter by categoryGroup
  if (cat && cat !== "all") {
    filtered = filtered.filter((p) => p.categoryGroup === cat);
    // If nothing matches the group filter, show all from that gender
    if (filtered.length === 0) {
      if (gender && gender !== "all") {
        const genderMap: Record<string, string> = { women: "Women", men: "Men", swim: "Swim", children: "Children" };
        filtered = products.filter((p) => p.category === genderMap[gender.toLowerCase()]);
      } else {
        filtered = products;
      }
    }
  }

  // Build a heading
  const catLabel = cat
    ? cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "All";
  const genderLabel = gender
    ? gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()
    : "";
  const heading = `${genderLabel}${genderLabel && catLabel ? " — " : ""}${catLabel !== "All" ? catLabel : ""}` || "Shop All";

  return (
    <div className="flex flex-col bg-white min-h-full pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-4 border-b border-[#F0F0F0]">
        <Link href="/customer/home">
          <ChevronLeft size={20} strokeWidth={1.5} className="text-[#111111]" />
        </Link>
        <h1
          className="text-sm font-bold text-[#111111] uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          {heading}
        </h1>
        <span className="ml-auto text-xs text-[#999999] font-light">{filtered.length} items</span>
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="px-4 pt-4 grid grid-cols-2 gap-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 py-20 text-center px-5">
          <p className="text-base font-bold text-[#111111] mb-2">Nothing here yet.</p>
          <p className="text-sm text-[#999999] font-light">Check back soon for new arrivals.</p>
          <Link
            href="/customer/shop"
            className="mt-6 px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Shop All
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="w-6 h-6 rounded-full border-2 border-[#859365] border-t-transparent animate-spin" /></div>}>
      <ShopGrid />
    </Suspense>
  );
}
