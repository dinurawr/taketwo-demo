"use client";

import { useCart } from "@/lib/cart-store";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, Trash2, ExternalLink } from "lucide-react";
import { getBrand } from "@/data/brands";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  const grouped: Record<string, typeof items> = {};
  for (const item of items) {
    if (!grouped[item.brand]) grouped[item.brand] = [];
    grouped[item.brand].push(item);
  }

  const shippingEstimate = Object.keys(grouped).length * 350;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-5 text-center bg-white">
        <h2 className="text-lg font-bold text-[#111111] mb-2">Your bag is empty.</h2>
        <p className="text-sm text-[#666666] font-light mb-6">Add some pieces you love</p>
        <Link
          href="/customer/shop"
          className="px-8 py-3 bg-[#111111] text-white text-sm font-bold uppercase tracking-widest"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      <div className="flex items-center gap-3 px-5 pt-2 pb-4">
        <Link href="/customer">
          <ChevronLeft size={20} strokeWidth={1.5} className="text-[#111111]" />
        </Link>
        <h1 className="text-lg font-bold text-[#111111]">My Bag</h1>
        <span className="ml-auto text-sm text-[#666666]">{items.reduce((s, i) => s + i.quantity, 0)} items</span>
      </div>

      <div className="px-5 space-y-4">
        {Object.entries(grouped).map(([brandId, brandItems]) => {
          const brand = getBrand(brandId);
          const brandTotal = brandItems.reduce((s, i) => s + i.price * i.quantity, 0);
          return (
            <div key={brandId} className="bg-white rounded-2xl overflow-hidden border border-[#E8E8E8]">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#859365]">
                <span className="text-sm font-bold text-white">{brand?.name ?? brandId}</span>
                <span className="text-xs text-white/80">LKR {brandTotal.toLocaleString()}</span>
              </div>
              {brandItems.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3 p-3 border-b border-[#F8F8F6] last:border-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F0F3EC] shrink-0">
                    <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#111111] leading-tight line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-[#666666] mt-0.5">{item.size} · {item.color}</p>
                    <p className="text-sm font-bold text-[#4A89C2] mt-1">LKR {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button onClick={() => removeItem(item.productId, item.size, item.color)}>
                      <Trash2 size={14} className="text-[#999999]" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-[#F8F8F6] flex items-center justify-center"
                      >
                        <Minus size={10} className="text-[#111111]" />
                      </button>
                      <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-[#F8F8F6] flex items-center justify-center"
                      >
                        <Plus size={10} className="text-[#111111]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="px-3 pb-3">
                <button
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border-2 text-sm font-semibold transition-colors border-[#859365] text-[#859365] hover:bg-[#859365] hover:text-white"
                  onClick={() => alert(`Demo: Redirecting to ${brand?.name} checkout…`)}
                >
                  Checkout with {brand?.name}
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-5 mt-4 bg-[#F8F8F6] rounded-2xl p-4">
        <h3 className="text-sm font-bold text-[#111111] mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-[#666666]">
            <span>Subtotal</span>
            <span>LKR {totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[#666666]">
            <span>Shipping ({Object.keys(grouped).length} brand{Object.keys(grouped).length > 1 ? "s" : ""})</span>
            <span>LKR {shippingEstimate.toLocaleString()}</span>
          </div>
          <div className="h-px bg-[#E8E8E8] my-2" />
          <div className="flex justify-between font-bold text-[#111111] text-base">
            <span>Total</span>
            <span className="text-[#4A89C2]">LKR {(totalPrice + shippingEstimate).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <p className="mx-5 mt-3 text-[10px] text-[#999999] text-center">
        Items are fulfilled by individual brands. Each brand ships separately.
      </p>
    </div>
  );
}
