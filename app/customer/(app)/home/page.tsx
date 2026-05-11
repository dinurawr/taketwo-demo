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
    "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80",   // bikini editorial
    "https://images.unsplash.com/photo-1561677978-583a6c9b4b28?w=800&q=80",    // swimwear model
    "https://images.unsplash.com/photo-1602752079071-f5d7f1ebb5d0?w=800&q=80", // beach fashion
  ],
};

// ── 2×2 category tiles per tab ───────────────────────────────────────────
const TILES: Record<Tab, { label: string; image: string; cat: string }[]> = {
  WOMEN: [
    {
      // Different from hero[0] (pexels-tima blazer) — trench coat editorial
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
      // Different from hero[1] (pexels-cottonbro-6616673 duo shot) — graphic tee
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
  SWIM: [
    {
      label: "Bikinis",
      image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=400&q=80",
      cat: "bikinis",
    },
    {
      label: "Beach Cover Ups",
      image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80",
      cat: "beach-cover-up",
    },
    {
      label: "Beach Dresses",
      image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=400&q=80",
      cat: "beach-dresses",
    },
    {
      // Different from hero[1] (photo-1507525428034 beach) — aerial coast shot
      label: "Shop All",
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80",
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
    // -mt-16 cancels layout pt-16; pb-20 gives tiles room to scroll above the nav bar; marginBottom cancels layout pb-32
    <div className="flex flex-col bg-black -mt-16 pb-20" style={{ marginBottom: "-8rem" }}>
      {/* ── Hero block ──────────────────────────────────────── */}
      <div className="relative" style={{ height: 600 }}>
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

        {/* ── Tab row + wordmark — below dynamic island ───── */}
        {/* top-[52px]: clears the 44px status bar + 8px breathing room */}
        <div className="absolute left-0 right-0 flex items-center justify-between px-4" style={{ top: 52, height: 44 }}>
          {/* Left: all 3 tabs in a row */}
          <div className="flex items-center gap-3">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`min-h-[44px] px-1 flex items-center cursor-pointer text-[14px] font-bold tracking-[0.18em] transition-all ${
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

          {/* Right: taketwo wordmark — large Barlow Condensed 900 */}
          <p
            className="text-white leading-none uppercase"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: 40, letterSpacing: "-0.02em" }}
          >
            taketwo
          </p>
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
