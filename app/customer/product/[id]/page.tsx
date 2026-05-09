"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Heart, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { useFavorites } from "@/lib/favorites-store";
import { getProduct } from "@/data/products";
import { getBrand } from "@/data/brands";
import { getProductReviews } from "@/data/reviews";
import { use } from "react";

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
  const [imgIndex, setImgIndex] = useState(0);

  if (!product || !brand) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#666666]">Product not found</p>
      </div>
    );
  }

  const fav = isFavorite(product.id);
  const currentImg = product.images[imgIndex] ?? product.image;

  const handleAddToBag = () => {
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
    <div className="flex flex-col bg-white">
      {/* Product Image */}
      <div className="relative h-[360px] bg-[#F0F3EC]">
        <Image
          src={currentImg}
          alt={product.name}
          fill
          className="object-cover object-top"
          priority
        />
        <Link
          href="/customer"
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm"
        >
          <ChevronLeft size={18} className="text-[#111111]" />
        </Link>
        <button
          onClick={() => toggle(product.id)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm"
        >
          <Heart
            size={16}
            className={fav ? "fill-[#ED832B] text-[#ED832B]" : "text-[#666666]"}
            strokeWidth={fav ? 0 : 1.5}
          />
        </button>
        {product.images.length > 1 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`w-1.5 rounded-full transition-all ${
                  i === imgIndex ? "bg-[#ED832B] h-4" : "bg-white/70 h-1.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content panel */}
      <div className="relative -mt-6 bg-white rounded-t-[32px] pt-5 px-5 flex-1">
        {/* Brand + Name + Price */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-[#859365] font-bold uppercase tracking-wide mb-1">
              {brand.name}
            </p>
            <h1 className="text-xl font-bold text-[#111111] leading-tight">{product.name}</h1>
          </div>
          <p className="text-lg font-bold text-[#4A89C2] mt-1 shrink-0">
            LKR {product.price.toLocaleString()}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
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
          <span className="text-xs text-[#666666]">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-[#666666] leading-relaxed mb-5">{product.description}</p>

        {/* Sizes */}
        <div className="mb-5">
          <p className="text-sm font-bold text-[#111111] mb-2">Sizes</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition-all border-2 ${
                  selectedSize === size
                    ? "bg-[#859365] text-white border-[#859365]"
                    : "bg-white text-[#111111] border-[#E8E8E8]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <p className="text-sm font-bold text-[#111111] mb-2">Color</p>
          <div className="flex gap-2.5">
            {product.colors.map((color, i) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(i)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === i ? "border-[#859365] scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-bold text-[#111111] mb-2">Reviews</p>
            <div className="space-y-3">
              {reviews.slice(0, 2).map((r) => (
                <div key={r.id} className="bg-[#F8F8F6] rounded-2xl p-3">
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
                  <p className="text-xs text-[#666666] leading-relaxed">{r.comment}</p>
                  <span
                    className={`mt-1.5 inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold ${
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
      </div>

      {/* Add to Bag */}
      <div className="px-5 pb-6 bg-white">
        <button
          onClick={handleAddToBag}
          className={`w-full py-4 rounded-full text-base font-bold tracking-wide transition-all ${
            added
              ? "bg-[#859365] text-white"
              : "bg-[#111111] text-white hover:bg-[#333]"
          }`}
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          {added ? "✓ ADDED TO BAG" : "+ ADD TO BAG"}
        </button>
      </div>
    </div>
  );
}
