"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronDown, Heart, Star } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-store";
import { useFavorites } from "@/lib/favorites-store";
import { getProduct, getProductsByCategory, getShortName } from "@/data/products";
import { getBrand } from "@/data/brands";
import { getProductReviews } from "@/data/reviews";
import { use } from "react";
import { ProductCard } from "@/components/customer/ProductCard";
import { ProductDetailSkeleton } from "@/components/customer/ProductDetailSkeleton";

// ── Accordion item ────────────────────────────────────────────────────────
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[#E8E8E8]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer min-h-[44px]"
        style={{ touchAction: "manipulation" }}
      >
        <span
          className="text-[11px] font-bold tracking-[0.18em] text-[#111111] uppercase"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          {title}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={`text-[#999999] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4 text-sm text-[#666666] leading-relaxed font-light">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProduct(id);
  const brand = product ? getBrand(product.brand) : null;
  const reviews = product ? getProductReviews(product.id) : [];
  const { addItem } = useCart();
  const { isFavorite, toggle } = useFavorites();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[1] ?? "");
  const [selectedColor, setSelectedColor] = useState(0);
  const [added, setAdded] = useState(false);

  // Skeleton overlay until the hero image is loaded. Reset on every product id
  // change so navigating between products re-shows the skeleton.
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    setHeroReady(false);
  }, [id]);

  const reviewsRef = useRef<HTMLDivElement>(null);

  const scrollToReviews = useCallback(() => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!product || !brand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#666666]">Product not found</p>
      </div>
    );
  }

  const fav = isFavorite(product.id);
  const shortName = getShortName(product);

  // Related products (same category, excluding current)
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      brandName: brand.name,
      price: product.price,
      size: selectedSize,
      color: product.colors[selectedColor]?.name ?? "",
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative flex flex-col bg-white">
      {/* Skeleton overlay — fades out once the hero image is ready */}
      <AnimatePresence>
        {!heroReady && (
          <motion.div
            key="product-skeleton"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "easeIn" }}
            className="absolute inset-0 z-30"
            style={{ willChange: "opacity" }}
          >
            <ProductDetailSkeleton brandColor={brand.color} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Vertical image stack ──────────────────────────── */}
      <div
        className="relative overflow-y-auto snap-y snap-mandatory bg-[#F0F3EC]"
        style={{ height: 440 }}
      >
        {product.images.map((img, i) => (
          <div key={i} className="snap-start relative shrink-0" style={{ height: 440 }}>
            <Image
              src={img}
              alt={`${product.name} — view ${i + 1}`}
              fill
              className="object-cover object-top"
              priority={i === 0}
              onLoad={i === 0 ? () => setHeroReady(true) : undefined}
            />
          </div>
        ))}

        {/* Back button — min 44px touch target */}
        <Link
          href="/customer/home"
          className="absolute top-4 left-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm z-10"
          style={{ touchAction: "manipulation" }}
        >
          <ChevronLeft size={18} className="text-[#111111]" />
        </Link>

        {/* Favourite button — min 44px touch target */}
        <button
          onClick={() => toggle(product.id)}
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm z-10 cursor-pointer"
          style={{ touchAction: "manipulation" }}
        >
          <Heart
            size={16}
            className={fav ? "fill-[#ED832B] text-[#ED832B]" : "text-[#666666]"}
            strokeWidth={fav ? 0 : 1.5}
          />
        </button>

        {/* Vertical page dots */}
        {product.images.length > 1 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
            {product.images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full ${i === 0 ? "bg-[#111111] h-4" : "bg-black/20 h-1.5"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Content panel ─────────────────────────────────── */}
      <div className="relative -mt-6 bg-white rounded-t-[28px] pt-5 px-5">
        {/* Brand + Name + Price */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10px] text-[#859365] font-bold uppercase tracking-widest mb-1">
              {brand.name}
            </p>
            <h1 className="text-xl font-bold text-[#111111] leading-tight">{shortName}</h1>
          </div>
          <p className="text-lg font-bold text-[#111111] mt-1 shrink-0">
            LKR {product.price.toLocaleString()}
          </p>
        </div>

        {/* Clickable rating → scrolls to reviews */}
        <button
          onClick={scrollToReviews}
          className="flex items-center gap-1.5 mb-5 cursor-pointer min-h-[44px]"
          style={{ touchAction: "manipulation" }}
        >
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={12}
                className={
                  s <= Math.round(product.rating)
                    ? "fill-[#ED832B] text-[#ED832B]"
                    : "text-[#ED832B]"
                }
                strokeWidth={s <= Math.round(product.rating) ? 0 : 1.5}
              />
            ))}
          </div>
          <span className="text-xs text-[#4A89C2] underline underline-offset-2">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </button>

        {/* Sizes — square buttons */}
        <div className="mb-5">
          <p className="text-[10px] font-bold text-[#111111] uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-barlow)" }}>
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 text-sm font-semibold transition-all border cursor-pointer ${
                  selectedSize === size
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#111111] border-[#E8E8E8]"
                }`}
                style={{ touchAction: "manipulation" }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <p className="text-[10px] font-bold text-[#111111] uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-barlow)" }}>
            Colour
          </p>
          <div className="flex gap-2.5">
            {product.colors.map((color, i) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(i)}
                className={`w-11 h-11 rounded-full border-2 transition-all cursor-pointer ${
                  selectedColor === i ? "border-[#111111] scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: color.hex, touchAction: "manipulation" }}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>

        {/* ── 4 Accordions ──────────────────────────────────── */}
        <div className="mb-6">
          <Accordion title="Description">
            <p className="mb-2">{product.description}</p>
            <p className="text-[#999999]">Fabric: 100% premium cotton blend · Machine wash cold</p>
            <p className="text-[#999999] mt-1">Made in Sri Lanka</p>
          </Accordion>

          <Accordion title="Size Guide">
            <p>We recommend sizing up if you are between sizes. Our model is wearing size M.</p>
            <div className="mt-3 text-[11px] text-[#999999] space-y-1">
              <div className="flex justify-between border-b border-[#F0F0F0] pb-1"><span>XS</span><span>UK 6–8 · US 2–4</span></div>
              <div className="flex justify-between border-b border-[#F0F0F0] pb-1"><span>S</span><span>UK 8–10 · US 4–6</span></div>
              <div className="flex justify-between border-b border-[#F0F0F0] pb-1"><span>M</span><span>UK 10–12 · US 6–8</span></div>
              <div className="flex justify-between border-b border-[#F0F0F0] pb-1"><span>L</span><span>UK 12–14 · US 8–10</span></div>
              <div className="flex justify-between"><span>XL</span><span>UK 14–16 · US 10–12</span></div>
            </div>
          </Accordion>

          <Accordion title="Delivery">
            <p>Standard delivery: 3–5 working days · LKR 350</p>
            <p className="mt-1">Express delivery: 1–2 working days · LKR 750</p>
            <p className="mt-1 text-[#999999]">Free standard delivery on orders over LKR 5,000.</p>
          </Accordion>

          <Accordion title="Returns">
            <p>Free returns within 14 days of delivery. Item must be unworn with original tags attached.</p>
            <p className="mt-1 text-[#999999]">Items marked Final Sale cannot be returned.</p>
          </Accordion>

          {/* Close border */}
          <div className="border-t border-[#E8E8E8]" />
        </div>

        {/* ── Reviews ───────────────────────────────────────── */}
        {reviews.length > 0 && (
          <div className="mb-6" ref={reviewsRef}>
            <p
              className="text-[11px] font-bold text-[#111111] uppercase tracking-[0.18em] mb-4"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Reviews
            </p>
            <div className="space-y-3">
              {reviews.slice(0, 3).map((r) => (
                <div key={r.id} className="bg-[#F8F8F6] p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#859365] flex items-center justify-center text-white text-[9px] font-bold">
                        {r.authorName[0]}
                      </div>
                      <span className="text-xs font-semibold text-[#111111]">{r.authorName}</span>
                      {r.authorHeight && (
                        <span className="text-[10px] text-[#666666]">{r.authorHeight}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={9}
                          className={s <= r.rating ? "fill-[#ED832B] text-[#ED832B]" : "text-[#E8E8E8]"}
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#666666] leading-relaxed font-light">{r.comment}</p>
                  <span
                    className={`mt-1.5 inline-block text-[10px] px-2 py-0.5 font-semibold ${
                      r.fitFeedback === "True to Size"
                        ? "bg-green-100 text-green-700"
                        : r.fitFeedback === "Runs Small"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {r.fitFeedback}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── You May Also Like ─────────────────────────────── */}
        {related.length > 0 && (
          <div className="mb-6">
            <p
              className="text-[11px] font-bold text-[#111111] uppercase tracking-[0.18em] mb-4"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              You May Also Like
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 phone-scroll">
              {related.map((p) => (
                <div key={p.id} className="shrink-0 w-36">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Full-width ADD TO CART bar ────────────────────── */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all ${
          added ? "bg-[#859365] text-white" : "bg-[#111111] text-white"
        }`}
        style={{ fontFamily: "var(--font-barlow)" }}
      >
        {added ? "✓ ADDED TO CART" : "ADD TO CART"}
      </button>

      {/* Space for bottom nav */}
      <div className="h-16" />
    </div>
  );
}
