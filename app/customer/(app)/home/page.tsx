"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Tab = "WOMEN" | "MEN" | "SWIM";

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
  SWIM: [
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "https://images.unsplash.com/photo-1506953823976-52e1e7dc8f2b?w=800&q=80",
  ],
};

// ── 2×2 category tiles per tab ───────────────────────────────────────────
const TILES: Record<Tab, { label: string; image: string; cat: string }[]> = {
  WOMEN: [
    {
      label: "New In",
      image: "/products/pexels-tima-miroshnichenko-7202792.jpg",
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
      cat: "bikinis",
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
      image: "/products/pexels-cottonbro-6616673.jpg",
      cat: "tops",
    },
    {
      label: "Shorts",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&q=80",
      cat: "shorts",
    },
  ],
  SWIM: [
    {
      label: "Bikinis",
      image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=400&q=80",
      cat: "bikinis",
    },
    {
      label: "Beach Cover Ups",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
      cat: "beach-cover-up",
    },
    {
      label: "Beach Dresses",
      image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=400&q=80",
      cat: "beach-dresses",
    },
    {
      label: "Shop All",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
      cat: "all",
    },
  ],
};

const TABS: Tab[] = ["WOMEN", "MEN", "SWIM"];

export default function CustomerHome() {
  const [activeTab, setActiveTab] = useState<Tab>("WOMEN");
  const [heroIndex, setHeroIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Cycle hero image every 4 s (skip if user prefers reduced motion)
  useEffect(() => {
    setHeroIndex(0); // reset on tab change
  }, [activeTab]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES[activeTab].length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab, prefersReducedMotion]);

  const currentHero = HERO_IMAGES[activeTab][heroIndex];
  const currentTiles = TILES[activeTab];

  return (
    <div className="flex flex-col bg-black" style={{ minHeight: "100%" }}>
      {/* ── Hero block ──────────────────────────────────────── */}
      <div className="relative" style={{ height: "62vh", minHeight: 340 }}>
        {/* Hero image with cross-fade (skipped when prefers-reduced-motion) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${heroIndex}`}
            className="absolute inset-0"
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeInOut" }}
          >
            <Image
              src={currentHero}
              alt={`${activeTab} fashion`}
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay top + bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40 pointer-events-none" />

        {/* ── Tab row + wordmark ───────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-2">
          {/* Left tabs — min-h-[44px] ensures WCAG touch target */}
          <div className="flex items-center gap-2">
            {TABS.slice(0, 2).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`min-h-[44px] px-2 flex items-center cursor-pointer text-[11px] font-bold tracking-[0.18em] transition-all ${
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

          {/* Centre wordmark */}
          <p
            className="text-white text-[15px] font-bold tracking-tight absolute left-1/2 -translate-x-1/2 top-0 flex items-center"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, height: 44 }}
          >
            taketwo
          </p>

          {/* Right tab */}
          <button
            onClick={() => setActiveTab("SWIM")}
            className={`min-h-[44px] px-2 flex items-center cursor-pointer text-[11px] font-bold tracking-[0.18em] transition-all ${
              activeTab === "SWIM"
                ? "text-white border-b-2 border-white"
                : "text-white/50"
            }`}
            style={{ fontFamily: "var(--font-barlow)", touchAction: "manipulation" }}
          >
            SWIM
          </button>
        </div>

        {/* Hero image dots — padded for 44px hit area */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
          {HERO_IMAGES[activeTab].map((_, i) => (
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
          style={{ flex: 1 }}
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
                  className="text-white text-[11px] font-bold uppercase tracking-wide leading-tight"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {tile.label}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom padding for fixed nav */}
      <div className="h-16" />
    </div>
  );
}
