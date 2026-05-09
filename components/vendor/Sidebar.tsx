"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  ShoppingBag,
  Truck,
  RotateCcw,
  AlertCircle,
  Package,
  BarChart2,
  Home,
} from "lucide-react";
import { orders } from "@/data/orders";

const newCount = orders.filter((o) => o.status === "new").length;
const shippingCount = orders.filter((o) => o.status === "shipping").length;
const returningCount = orders.filter((o) => o.status === "returning").length;
const pendingCount = orders.filter((o) => o.status === "pending_verdict").length;

const navItems = [
  { href: "/vendor/new-orders", icon: ShoppingBag, label: "New Orders",     badge: newCount,      color: "#4A89C2" },
  { href: "/vendor/shipping",   icon: Truck,        label: "Shipping",       badge: shippingCount, color: "#859365" },
  { href: "/vendor/returning",  icon: RotateCcw,    label: "Returning",      badge: returningCount,color: "#ED832B" },
  { href: "/vendor/pending",    icon: AlertCircle,  label: "Pending Verdict",badge: pendingCount,  color: "#ED832B" },
  { href: "/vendor/products",   icon: Package,      label: "Products",       badge: null,          color: "#999999" },
  { href: "/vendor/analytics",  icon: BarChart2,    label: "Analytics",      badge: null,          color: "#999999" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-[#111111] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Image src="/logo.png" alt="Take Two" width={100} height={58} className="brightness-0 invert opacity-90" />
        <p className="text-white/40 text-xs mt-1">Vendor Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label, badge, color }) => {
          const isActive = pathname === href || pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <Icon
                size={16}
                strokeWidth={1.5}
                style={{ color: isActive ? color : "rgba(255,255,255,0.4)" }}
              />
              <span
                className={`text-sm font-medium flex-1 ${
                  isActive ? "text-white" : "text-white/50"
                }`}
              >
                {label}
              </span>
              {badge != null && badge > 0 && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: color }}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-6 py-4 border-t border-white/10">
        <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-xs transition-colors">
          <Home size={13} />
          <span>Back to home</span>
        </Link>
      </div>
    </aside>
  );
}
