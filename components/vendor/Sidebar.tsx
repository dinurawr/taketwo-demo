"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { BarChart2, Megaphone, ShoppingBag, Package, Users, MailWarning, ChevronLeft } from "lucide-react";
import { SELLER } from "@/data/seller-fixtures";

const NAV_ITEMS = [
  { href: "/vendor/analytics", icon: BarChart2,   label: "Analytics" },
  { href: "/vendor/marketing", icon: Megaphone,   label: "Marketing" },
  { href: "/vendor/orders",    icon: ShoppingBag, label: "Orders"    },
  { href: "/vendor/recovery",  icon: MailWarning, label: "Recovery"  },
  { href: "/vendor/products",  icon: Package,     label: "Products"  },
  { href: "/vendor/customers", icon: Users,       label: "Customers" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] shrink-0 bg-white border-r border-[#E8E8E8] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="pt-14 pb-5 w-full flex justify-center">
        <Image src="/logo.png" alt="Take Two" width={80} height={46} className="-translate-x-3" />
      </div>

      {/* Brand card */}
      <div className="px-4 pb-5">
        <div className="bg-gradient-to-br from-[#111111] via-[#0a2818] to-[#14532d] rounded-xl px-3 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="11" y="15.5" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="Georgia, serif" fill="white" letterSpacing="0.5">SS</text>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-white truncate leading-tight">
              {SELLER.name}
            </p>
            <p className="text-[10px] text-[#4ade80] mt-0.5">
              {SELLER.followerCount.toLocaleString()} followers
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-[#F0F0F0] mb-2" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-[#F2F2F2] text-[#0A0A0A]"
                  : "text-[#737373] hover:text-[#0A0A0A] hover:bg-[#F7F7F7]"
              }`}
            >
              <Icon size={15} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
              <span className="text-[13px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#F0F0F0]">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#0A0A0A] text-[12px] transition-colors px-3 py-2 rounded-lg hover:bg-[#F7F7F7]"
        >
          <ChevronLeft size={13} />
          <span>Back to storefront</span>
        </Link>
      </div>
    </aside>
  );
}
