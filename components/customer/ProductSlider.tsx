"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { getShortName } from "@/data/products";

interface ProductSliderProps {
  title: string;
  products: Product[];
  ctaHref?: string;
}

export function ProductSlider({ title, products, ctaHref = "/customer/shop" }: ProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_WIDTH = 148; // px — card width + gap approximation for dot tracking

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / CARD_WIDTH);
    setActiveIndex(Math.min(idx, products.length - 1));
  }, [products.length]);

  if (products.length === 0) return null;

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-6 pb-3">
        <h2
          className="text-[15px] font-bold text-[#111111]"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          {title}
        </h2>
        <Link
          href={ctaHref}
          className="flex items-center gap-0.5 border border-[#111111] px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-[#111111] active:opacity-70 transition-opacity"
          style={{ fontFamily: "var(--font-barlow)", touchAction: "manipulation" }}
        >
          Shop now
          <ChevronRight size={11} strokeWidth={2.5} />
        </Link>
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-none"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/customer/product/${product.id}`}
            className="shrink-0 active:opacity-80 transition-opacity"
            style={{ width: 136, scrollSnapAlign: "start", touchAction: "manipulation" }}
          >
            {/* Image */}
            <div
              className="relative bg-[#F5F5F3] overflow-hidden mb-2"
              style={{ width: 136, height: 170 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover object-top"
                sizes="136px"
              />
            </div>

            {/* Info */}
            <p className="text-[10px] font-bold text-[#859365] uppercase tracking-wide mb-0.5">
              {product.brand.replace("-", " ")}
            </p>
            <p className="text-[12px] font-semibold text-[#111111] leading-tight line-clamp-2">
              {getShortName(product)}
            </p>
            <p className="text-[13px] font-bold text-[#111111] mt-1">
              LKR {product.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>

      {/* Pagination dots */}
      {products.length > 1 && (
        <div className="flex justify-center gap-1.5 pb-5">
          {products.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-200 ${
                i === activeIndex
                  ? "bg-[#111111] w-4 h-1.5"
                  : "bg-[#CCCCCC] w-1.5 h-1.5"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
