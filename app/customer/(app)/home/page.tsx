"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Tab = "WOMEN" | "MEN";

// ── Hero images (3 per tab, cycle every 4 s) ─────────────────────────────
const HERO_IMAGES: Record<Tab, string[]> = {
  WOMEN: [
    "/products/pexels-tima-miroshnichenko-7202792.jpg",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  ],
  MEN: [
    "/products/pexels-cottonbro-6626418.jpg",
    "/products/pexels-cottonbro-6616673.jpg",
    "/products/pexels-prayoon-sajeev-1486107-2897529.jpg",
  ],
};

// Bento layout: left (tall), topRight, bottomRight, bottom (full-width)
const TILES: Record<Tab, { label: string; image: string; cat: string; slot: "left" | "topRight" | "bottomRight" | "bottom" }[]> = {
  WOMEN: [
    { label: "New In",  image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=400&q=80", cat: "new-in",  slot: "left" },
    { label: "Dresses", image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=400&q=80", cat: "dresses", slot: "topRight" },
    { label: "Tops",    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80", cat: "tops",    slot: "bottomRight" },
    { label: "Swim",    image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=400&q=80", cat: "swim",    slot: "bottom" },
  ],
  MEN: [
    { label: "Rock Revival", image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80", cat: "rock-revival", slot: "left" },
    { label: "Tops",         image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80", cat: "tops",        slot: "topRight" },
    { label: "Shorts",       image: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&q=80", cat: "shorts",      slot: "bottomRight" },
    { label: "Bottoms",      image: "/products/pexels-ron-lach-9464625.jpg",                                   cat: "bottoms",     slot: "bottom" },
  ],
};

const TABS: Tab[] = ["WOMEN", "MEN"];

export default function CustomerHome() {
  const [activeTab, setActiveTab] = useState<Tab>("WOMEN");
  const [heroIndex, setHeroIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const images = HERO_IMAGES[activeTab];
  const totalImages = images.length;

  useEffect(() => {
    setHeroIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % totalImages);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab, prefersReducedMotion, totalImages]);

  const currentTiles = TILES[activeTab];
  const left        = currentTiles.find((t) => t.slot === "left")!;
  const topRight    = currentTiles.find((t) => t.slot === "topRight")!;
  const bottomRight = currentTiles.find((t) => t.slot === "bottomRight")!;
  const bottom      = currentTiles.find((t) => t.slot === "bottom")!;

  return (
    <div className="flex flex-col -mt-16 pb-20" style={{ marginBottom: "-8rem" }}>
      {/* ── Hero block ──────────────────────────────────────── */}
      <div className="relative bg-black overflow-hidden" style={{ height: 600 }}>
        {/* Swipeable translating strip */}
        <motion.div
          className="absolute inset-0 flex"
          style={{ width: `${totalImages * 100}%` }}
          animate={{ x: `-${heroIndex * (100 / totalImages)}%` }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.32, 0.72, 0, 1] }}
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

        {/* Gradient: top fade + strong bottom-left for asymmetric text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* ── Wordmark — bottom-left, large, asymmetric ─────── */}
        <div className="absolute left-5 bottom-16 pointer-events-none">
          <p
            className="text-white leading-none uppercase"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, fontSize: 52, letterSpacing: "-0.03em" }}
          >
            taketwo
          </p>
        </div>

        {/* ── Tabs — bottom-right, stacked vertically ─────── */}
        <div className="absolute right-5 bottom-14 flex flex-col items-end gap-3">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer text-[13px] font-bold tracking-[0.20em] transition-all ${
                activeTab === tab
                  ? "text-white border-b border-white pb-0.5"
                  : "text-white/40"
              }`}
              style={{ fontFamily: "var(--font-barlow)", touchAction: "manipulation", minHeight: 44 }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Hero dots — bottom-left below wordmark */}
        <div className="absolute bottom-5 left-5 flex gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className="p-2 cursor-pointer"
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

      {/* ── Bento tile grid ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Row 1: left tall (spans 2 rows) + right stacked (2 equal squares) */}
          <div className="grid grid-cols-2">
            {/* Left tall tile */}
            <Link
              href={`/customer/shop?cat=${left.cat}&gender=${activeTab.toLowerCase()}`}
              className="relative overflow-hidden"
              style={{ gridRow: "span 2", aspectRatio: "3/4" }}
            >
              <Image src={left.image} alt={left.label} fill className="object-cover" sizes="195px" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-0 left-0 p-3">
                <p className="text-white text-[13px] font-black uppercase tracking-wide leading-tight"
                   style={{ fontFamily: "var(--font-barlow)" }}>
                  {left.label}
                </p>
              </div>
            </Link>

            {/* Top-right square */}
            <Link
              href={`/customer/shop?cat=${topRight.cat}&gender=${activeTab.toLowerCase()}`}
              className="relative overflow-hidden"
              style={{ aspectRatio: "1/1" }}
            >
              <Image src={topRight.image} alt={topRight.label} fill className="object-cover" sizes="195px" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-0 left-0 p-2.5">
                <p className="text-white text-[12px] font-black uppercase tracking-wide"
                   style={{ fontFamily: "var(--font-barlow)" }}>
                  {topRight.label}
                </p>
              </div>
            </Link>

            {/* Bottom-right square */}
            <Link
              href={`/customer/shop?cat=${bottomRight.cat}&gender=${activeTab.toLowerCase()}`}
              className="relative overflow-hidden border-t border-white/10"
              style={{ aspectRatio: "1/1" }}
            >
              <Image src={bottomRight.image} alt={bottomRight.label} fill className="object-cover" sizes="195px" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-0 left-0 p-2.5">
                <p className="text-white text-[12px] font-black uppercase tracking-wide"
                   style={{ fontFamily: "var(--font-barlow)" }}>
                  {bottomRight.label}
                </p>
              </div>
            </Link>
          </div>

          {/* Row 2: full-width cinematic strip */}
          <Link
            href={`/customer/shop?cat=${bottom.cat}&gender=${activeTab.toLowerCase()}`}
            className="relative overflow-hidden block border-t border-white/10"
            style={{ aspectRatio: "16/6" }}
          >
            <Image src={bottom.image} alt={bottom.label} fill className="object-cover object-center" sizes="390px" />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 flex items-center px-5">
              <p className="text-white text-[15px] font-black uppercase tracking-widest"
                 style={{ fontFamily: "var(--font-barlow)" }}>
                {bottom.label} →
              </p>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
