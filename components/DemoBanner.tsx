"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DemoBanner() {
  const pathname = usePathname();
  const isCustomer = pathname.startsWith("/customer");
  const isVendor = pathname.startsWith("/vendor");

  return (
    <div className="fixed top-3 left-3 z-[100] flex bg-black/20 backdrop-blur-md rounded-full p-0.5 shadow-lg">
      <Link
        href="/customer"
        className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
          isCustomer ? "bg-white text-[#859365]" : "text-white/70 hover:text-white"
        }`}
      >
        🛍️ Customer
      </Link>
      <Link
        href="/vendor"
        className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
          isVendor ? "bg-white text-[#859365]" : "text-white/70 hover:text-white"
        }`}
      >
        📦 Vendor
      </Link>
    </div>
  );
}
