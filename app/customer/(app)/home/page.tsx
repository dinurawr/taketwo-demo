"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { products } from "@/data/products";
import { getBrand } from "@/data/brands";
import { DROPS } from "@/data/drops";
import { ProductSlider } from "@/components/customer/ProductSlider";
import { ShopByBrand } from "@/components/customer/ShopByBrand";

type Tab = "WOMEN" | "MEN";

// Real brand photography (same Shopify CDNs as data/products.ts).
const ts = (f: string) => `https://cdn.shopify.com/s/files/1/0070/1922/files/${f}`;
const ab = (f: string) => `https://cdn.shopify.com/s/files/1/0150/1528/files/${f}`;
const fb = (f: string) => `https://cdn.shopify.com/s/files/1/0158/2548/files/${f}`;

// The hero carousel is the brand drops (data/drops.ts): one slide per drop, each with
// its own display font, a "New drop" kicker, and a link through to the brand.

// ── 2×2 category tiles per tab (ts/ab/fb helpers defined above) ──────────
const TILES: Record<Tab, { label: string; image: string; cat: string }[]> = {
  WOMEN: [
    {
      label: "New In",
      image: ab("MOBILE_4_e327e11b-93a8-46b1-bec0-ab209dc07536.jpg"),
      cat: "new-in",
    },
    {
      label: "Dresses",
      image: fb("DLC26-Tile1-StevieDress-Shopoholic.jpg"),
      cat: "dresses",
    },
    {
      label: "Swim",
      image: fb("Fall-27-Tile-2.jpg"),
      cat: "swim",
    },
    {
      label: "Trousers",
      image: ab("MOBILE_6_fd6af479-4e77-4f32-90cd-4b186819f3be.jpg"),
      cat: "trousers",
    },
  ],
  MEN: [
    {
      label: "New In",
      image: ts("instock_m_q326_regenerative-cotton-tee-saffron_portrait_002.jpg"),
      cat: "new-in",
    },
    {
      label: "Trousers",
      image: ts("Q326_the-emlen-pant-khaki-herringbone_pdp_compressed_03.jpg"),
      cat: "trousers",
    },
    {
      label: "Shirts",
      image: ts("Q326_the-jack-marsh-check-oxford_pdp_compressed_02.jpg"),
      cat: "shirts",
    },
    {
      label: "Shorts",
      image: ts("instock_m_q226_sunset-short_portrait_003.jpg"),
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

  const drops = DROPS[activeTab];
  const totalImages = drops.length;
  const drop = drops[heroIndex] ?? drops[0];
  const heroBrand = getBrand(drop.brandId);
  const dropPieces = useMemo(
    () => products.filter((p) => p.brand === drop.brandId).length,
    [drop.brandId]
  );

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
          {drops.map((d, i) => (
            <div
              key={`${activeTab}-${d.id}`}
              className="relative shrink-0 h-full"
              style={{ width: `${100 / totalImages}%` }}
            >
              <Image
                src={d.image}
                alt={`${getBrand(d.brandId)?.name ?? ""} — ${d.name}`}
                fill
                sizes="390px"
                className="object-cover pointer-events-none select-none"
                style={{ objectPosition: d.focus ?? "50% 15%" }}
                priority={i === 0}
                draggable={false}
              />
            </div>
          ))}
        </motion.div>

        {/* Gradient overlay — top scrim for wordmark + bottom scrim for text/dots */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent via-40% to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />

        {/* ── Drop overlay — kicker, drop name (in the brand's own face), CTA ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-drop-${activeTab}-${drop.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute left-0 right-0 pointer-events-none px-5"
            style={{ bottom: 52 }}
          >
            <p
              className="inline-flex items-center gap-2 text-white text-[10px] font-semibold uppercase tracking-[0.22em] mb-3"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              <span className="bg-white text-[#111] px-2 py-1 tracking-[0.18em]">New drop</span>
              <span className="text-white/85">
                {drop.kicker} · {dropPieces} pieces
              </span>
            </p>
            <h2
              className="text-white"
              style={{
                fontFamily: drop.type.family,
                fontSize: drop.type.size,
                fontWeight: drop.type.weight,
                fontStyle: drop.type.italic ? "italic" : "normal",
                textTransform: drop.type.uppercase ? "uppercase" : "none",
                letterSpacing: `${drop.type.tracking ?? 0}em`,
                lineHeight: drop.type.leading ?? 0.95,
                textShadow: "0 2px 18px rgba(0,0,0,0.28)",
              }}
            >
              {drop.name}
            </h2>
            {heroBrand && (
              <Link
                href={`/customer/brand/${heroBrand.id}`}
                className="pointer-events-auto inline-flex items-center gap-1.5 mt-3 text-white text-[11px] font-semibold uppercase tracking-[0.2em] border-b border-white/70 pb-0.5"
                style={{ fontFamily: "var(--font-nunito)", touchAction: "manipulation" }}
              >
                Shop the drop
                <span aria-hidden>→</span>
              </Link>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Selling brand logo — bottom-right, links to that brand's page ── */}
        <AnimatePresence mode="wait">
          {heroBrand && (
            <motion.div
              key={`hero-brand-${activeTab}-${drop.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute z-20"
              style={{ bottom: 72, right: 16 }}
            >
              <Link
                href={`/customer/brand/${heroBrand.id}`}
                className="relative block bg-white shadow-[0_4px_14px_rgba(0,0,0,0.3)]"
                style={{ width: 84, height: 36, touchAction: "manipulation" }}
                aria-label={`Shop ${heroBrand.name}`}
              >
                <Image
                  src={heroBrand.logoFile}
                  alt={heroBrand.name}
                  fill
                  className="object-contain p-1.5"
                  sizes="84px"
                />
              </Link>
            </motion.div>
          )}
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
          {drops.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setHeroIndex(i)}
              className="p-3 cursor-pointer"
              aria-label={`Drop ${i + 1}: ${d.name}`}
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
                style={{ objectPosition: "50% 22%" }}
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
