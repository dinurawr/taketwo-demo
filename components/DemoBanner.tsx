"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DemoBanner() {
  const pathname = usePathname();
  const isCustomer = pathname.startsWith("/customer");
  const isVendor = pathname.startsWith("/vendor");

  return (
    <>
      {/* Mobile: full-width bar at very top */}
      {(isVendor || isCustomer) && (
        <div className={`md:hidden h-12 flex items-center justify-center gap-2 ${
          isCustomer
            ? "fixed top-0 left-0 right-0 z-[100]"
            : "bg-white border-b border-[#E8E8E4]"
        }`}>
          <Link href="/customer" className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${isCustomer ? "text-[#111111]" : "text-[#9B9B98] hover:text-[#111111]"}`}>
            🛍️ Customer
          </Link>
          <span className="text-[#C8C8C4]">|</span>
          <Link href="/vendor" className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${isVendor ? "text-[#111111]" : "text-[#9B9B98] hover:text-[#111111]"}`}>
            📦 Vendor
          </Link>
        </div>
      )}
      {/* Desktop: floating pill */}
      <div className="hidden md:flex fixed top-3 left-3 z-[100] bg-black/20 backdrop-blur-md rounded-full p-0.5 shadow-lg">
        <Link href="/customer" className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${isCustomer ? "bg-white text-[#859365]" : "text-white/70 hover:text-white"}`}>
          🛍️ Customer
        </Link>
        <Link href="/vendor" className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${isVendor ? "bg-white text-[#859365]" : "text-white/70 hover:text-white"}`}>
          📦 Vendor
        </Link>
      </div>
    </>
  );
}
