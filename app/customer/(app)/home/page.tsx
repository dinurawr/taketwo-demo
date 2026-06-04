"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { products } from "@/data/products";
import { ProductSlider } from "@/components/customer/ProductSlider";
import { ShopByBrand } from "@/components/customer/ShopByBrand";

type Tab = "WOMEN" | "MEN";

// ── Hero images (3 per tab, cycle every 4 s) ─────────────────────────────
const HERO_IMAGES: Record<Tab, string[]> = {
  WOMEN: [
    // Dramatic B&W editorial — initial image on Women tab
    "https://images.unsplash.com/photo-1562151270-c7d22ceb586a?w=800&q=80",
    "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=800&q=80",
    "https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=800&q=80",
  ],
  MEN: [
    "https://images.unsplash.com/photo-1656695230389-01185e6fbff8?w=800&q=80",
    "https://images.unsplash.com/photo-1550995694-3f5f4a7e1bd2?w=800&q=80",
    "https://images.unsplash.com/photo-1619603364904-c0498317e145?w=800&q=80",
  ],
};

// ── Editorial text overlay per hero slide (The Iconic "winter foundations" style) ──
const HERO_TEXT: Record<Tab, { line1: string; line2: string }[]> = {
  WOMEN: [
    { line1: "new",        line2: "arrivals"  },
    { line1: "summer",     line2: "edit"      },
    { line1: "effortless", line2: "everyday"  },
  ],
  MEN: [
    { line1: "essential",  line2: "pieces"    },
    { line1: "everyday",   line2: "staples"   },
    { line1: "clean",      line2: "minimal"   },
  ],
};

// ── 2×2 category tiles per tab ───────────────────────────────────────────
// Pexels CDN helper for tile images
const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop`;

const TILES: Record<Tab, { label: string; image: string; cat: string }[]> = {
  WOMEN: [
    {
      label: "New In",
      image: px(15758653),
      cat: "new-in",
    },
    {
      label: "Dresses",
      image: px(1008206),
      cat: "dresses",
    },
    {
      label: "Swim",
      image: px(8760433),
      cat: "swim",
    },
    {
      label: "Bottoms",
      image: px(7202826),
      cat: "bottoms",
    },
  ],
  MEN: [
    {
      label: "New In",
      image: px(5029685),
      cat: "new-in",
    },
    {
      label: "Bottoms",
      image: px(9464625),
      cat: "bottoms",
    },
    {
      label: "Tops",
      image: px(32778907),
      cat: "tops",
    },
    {
      label: "Shorts",
      image: px(18178103),
      cat: "shorts",
    },
  ],
};

const TABS: Tab[] = ["WOMEN", "MEN"];

export default function CustomerHome() {
  const [activeTab, setActiveTab] = useState<Tab>("WOMEN");
  const [heroIndex, setHeroIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Products for the "New In" slider — filtered to active tab's gender, newest 10
  const sliderProducts = useMemo(() => {
    const gender = activeTab === "WOMEN" ? "Women" : "Men";
    return products
      .filter((p) => p.category === gender)
      .slice(0, 10);
  }, [activeTab]);

  const images = HERO_IMAGES[activeTab];
  const totalImages = images.length;

  // Reset on tab change
  useEffect(() => {
    setHeroIndex(0);
  }, [activeTab]);

  // Auto-advance every 4 s (respects prefers-reduced-motion)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % totalImages);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab, prefersReducedMotion, totalImages]);

  const currentTiles = TILES[activeTab];

  return (
    // -mt-16 cancels layout pt-16; pb-20 gives tiles room to scroll above the nav bar; marginBottom cancels layout pb-32
    <div className="flex flex-col -mt-16 pb-20" style={{ marginBottom: "-8rem" }}>
      {/* ── Hero block ──────────────────────────────────────── */}
      <div className="relative bg-black overflow-hidden" style={{ height: 600 }}>
        {/* Swipeable hero strip — horizontally translating, no cross-fade flash */}
        <motion.div
          className="absolute inset-0 flex"
          style={{ width: `${totalImages * 100}%` }}
          animate={{ x: `-${heroIndex * (100 / totalImages)}%` }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: [0.32, 0.72, 0, 1],
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            const threshold = 50;
            if (info.offset.x < -threshold && heroIndex < totalImages - 1) {
              setHeroIndex((i) => i + 1);
            } else if (info.offset.x > threshold && heroIndex > 0) {
              setHeroIndex((i) => i - 1);
            }
          }}
        >
          {images.map((src, i) => (
            <div
              key={`${activeTab}-${i}`}
              className="relative shrink-0 h-full"
              style={{ width: `${100 / totalImages}%` }}
            >
              <Image
                src={src}
                alt={`${activeTab} fashion ${i + 1}`}
                fill
                className="object-cover object-top pointer-events-none select-none"
                priority={i === 0}
                draggable={false}
              />
            </div>
          ))}
        </motion.div>

        {/* Gradient overlay — top scrim for wordmark + bottom scrim for text/dots */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent via-40% to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />

        {/* ── Editorial text overlay — fades with each slide ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-text-${activeTab}-${heroIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute left-0 right-0 pointer-events-none px-5"
            style={{ bottom: 68 }}
          >
            <p
              className="text-white leading-none italic"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: 42 }}
            >
              {HERO_TEXT[activeTab][heroIndex].line1}
            </p>
            <p
              className="text-white leading-none italic pl-10"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: 42 }}
            >
              {HERO_TEXT[activeTab][heroIndex].line2}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── Wordmark centred top ───────────────────────────── */}
        <div className="absolute left-0 right-0 flex justify-center pointer-events-none" style={{ top: 48 }}>
          <p
            className="text-white leading-none uppercase"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: 44, letterSpacing: "-0.02em" }}
          >
            taketwo
          </p>
        </div>

        {/* ── Tabs centred below wordmark ─────────────────── */}
        <div className="absolute left-0 right-0 flex items-center justify-center gap-6" style={{ top: 104, height: 44 }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`min-h-[44px] px-1 flex items-center cursor-pointer text-[15px] font-bold tracking-[0.20em] transition-all ${
                activeTab === tab
                  ? "text-white border-b-2 border-white"
                  : "text-white/50"
              }`}
              style={{ fontFamily: "var(--font-nunito)", touchAction: "manipulation" }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Hero image dots — padded for 44px hit area */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className="p-3 cursor-pointer"
              aria-label={`Hero image ${i + 1}`}
              style={{ touchAction: "manipulation" }}
            >
              <div className={`rounded-full transition-all ${
                i === heroIndex ? "bg-white w-4 h-1.5" : "bg-white/40 w-1.5 h-1.5"
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* ── 2×2 Category tile grid ──────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="grid grid-cols-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {currentTiles.map((tile) => (
            <Link
              key={tile.cat}
              href={`/customer/shop?cat=${tile.cat}&gender=${activeTab.toLowerCase()}`}
              className="relative overflow-hidden"
              style={{ aspectRatio: "1 / 1" }}
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                className="object-cover"
                sizes="195px"
              />
              {/* Bottom gradient only — preserves image colours, keeps label readable */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
              {/* Label — bottom-left, hard style */}
              <div className="absolute bottom-0 left-0 p-3">
                <p
                  className="text-white text-[13px] font-bold uppercase tracking-wide leading-tight"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {tile.label}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── New In product slider ────────────────────────────── */}
      <ProductSlider
        title={`New in: ${activeTab === "WOMEN" ? "Women" : "Men"}`}
        products={sliderProducts}
        ctaHref={`/customer/shop?gender=${activeTab.toLowerCase()}`}
      />

      {/* ── Shop by brand ──────────────────────────────────── */}
      <ShopByBrand />

    </div>
  );
}
