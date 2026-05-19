"use client";

import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/brands";

export function ShopByBrand() {
  return (
    <div className="bg-white px-4 pt-6 pb-8">
      {/* Section title */}
      <h2
        className="text-[15px] font-bold text-[#111111] mb-4"
        style={{ fontFamily: "var(--font-barlow)" }}
      >
        Shop by brand
      </h2>

      {/* 2-column grid */}
      <div className="grid grid-cols-2 gap-3">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/customer/brand/${brand.id}`}
            className="flex items-center justify-center bg-[#F8F8F6] border border-[#EEEEEE] active:opacity-70 transition-opacity"
            style={{ height: 88, touchAction: "manipulation" }}
          >
            <div className="relative w-[80%] h-[60%]">
              <Image
                src={brand.logoFile}
                alt={brand.name}
                fill
                className="object-contain"
                sizes="120px"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
