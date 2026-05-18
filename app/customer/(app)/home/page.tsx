"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Tab = "WOMEN" | "MEN";

// ── Hero images (3 per tab, cycle every 4 s) ─────────────────────────────
const HERO_IMAGES: Record<Tab, string[]> = {
  WOMEN: [
    "/products/pexels-tima-miroshnichenko-7202792.jpg",   // three women blazers editorial
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  ],
  MEN: [
    "/products/pexels-cottonbro-6626418.jpg",              // man in cream overshirt studio
    "/products/pexels-cottonbro-6616673.jpg",              // two men in linen overshirts
    "/products/pexels-prayoon-sajeev-1486107-2897529.jpg", // black ribbed turtleneck
  ],
};

// ── 2×2 category tiles per tab ───────────────────────────────────────────
const TILES: Record<Tab, { label: string; image: string; cat: string }[]> = {
  WOMEN: [
    {
      label: "New In",
      image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=400&q=80",
      cat: "new-in",
    },
    {
      label: "Dresses",
      image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=400&q=80",
      cat: "dresses",
    },
    {
      label: "Swim",
      image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=400&q=80",
      cat: "swim",
    },
    {
      label: "Bottoms",
      image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400&q=80",
      cat: "bottoms",
    },
  ],
  MEN: [
    {
      label: "Rock Revival by Jaded",
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80",
      cat: "rock-revival",
    },
    {
      label: "Bottoms",
      image: "/products/pexels-ron-lach-9464625.jpg",
      cat: "bottoms",
    },
    {
      label: "Tops",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
      cat: "tops",
    },
    {
      label: "Shorts",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&q=80",
      cat: "shorts",
    },
  ],
};

const TABS: Tab[] = ["WOMEN", "MEN"];

export default function CustomerHome() {
  const [activeTab, setActiveTab] = useState<Tab>("WOMEN");
  const [heroIndex, setHeroIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

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

        {/* Gradient overlay top + bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40 pointer-events-none" />

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
              style={{ fontFamily: "var(--font-barlow)", touchAction: "manipulation" }}
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
              {/* Dark overlay for legibility */}
              <div className="absolute inset-0 bg-black/35" />
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

    </div>
  );
}
