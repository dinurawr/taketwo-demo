"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DemoBanner() {
  const pathname = usePathname();
  const isCustomer = pathname.startsWith("/customer");
  const isVendor = pathname.startsWith("/vendor");

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 py-1.5 bg-[#859365] text-white text-xs">
      <span className="font-medium tracking-widest uppercase opacity-80">Demo</span>
      <div className="flex items-center gap-1 bg-black/20 rounded-full p-0.5">
        <Link
          href="/customer"
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            isCustomer ? "bg-white text-[#859365] font-semibold" : "text-white/80 hover:text-white"
          }`}
        >
          🛍️ Customer
        </Link>
        <Link
          href="/vendor"
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            isVendor ? "bg-white text-[#859365] font-semibold" : "text-white/80 hover:text-white"
          }`}
        >
          📦 Vendor
        </Link>
      </div>
      <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity">
        ← Home
      </Link>
    </div>
  );
}
