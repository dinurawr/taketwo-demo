"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Truck, RotateCcw, AlertCircle, Package } from "lucide-react";
import { orders } from "@/data/orders";

const newCount = orders.filter((o) => o.status === "new").length;
const returningCount = orders.filter((o) => o.status === "returning").length;
const pendingCount = orders.filter((o) => o.status === "pending_verdict").length;

const tabs = [
  { href: "/vendor/new-orders", icon: ShoppingBag, label: "New",      badge: newCount,       color: "#4A89C2" },
  { href: "/vendor/shipping",   icon: Truck,        label: "Shipping", badge: null,            color: "#859365" },
  { href: "/vendor/returning",  icon: RotateCcw,    label: "Returns",  badge: returningCount,  color: "#ED832B" },
  { href: "/vendor/pending",    icon: AlertCircle,  label: "Verdict",  badge: pendingCount,    color: "#ED832B" },
  { href: "/vendor/products",   icon: Package,      label: "Products", badge: null,            color: "#999999" },
];

export function VendorBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#111111] border-t border-white/10 safe-area-pb">
      <div className="flex items-center justify-around px-1 py-2">
        {tabs.map(({ href, icon: Icon, label, badge, color }) => {
          const isActive = pathname === href || pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-0.5 px-2 py-1 min-w-0 flex-1"
            >
              <div className="relative">
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  style={{ color: isActive ? color : "rgba(255,255,255,0.35)" }}
                />
                {badge != null && badge > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full text-[8px] font-bold text-white flex items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    {badge}
                  </span>
                )}
              </div>
              <span
                className="text-[9px] font-medium truncate"
                style={{ color: isActive ? color : "rgba(255,255,255,0.35)" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
