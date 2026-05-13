"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Megaphone, ShoppingBag, Package, Users } from "lucide-react";

const TABS = [
  { href: "/vendor/analytics", icon: BarChart2,   label: "Analytics" },
  { href: "/vendor/marketing", icon: Megaphone,   label: "Marketing" },
  { href: "/vendor/orders",    icon: ShoppingBag, label: "Orders"    },
  { href: "/vendor/products",  icon: Package,     label: "Products"  },
  { href: "/vendor/customers", icon: Users,       label: "Customers" },
];

export function VendorBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed top-24 left-0 right-0 z-20 md:hidden bg-white border-b border-[#E8E8E8]">
      <div className="flex items-center overflow-x-auto scrollbar-none">
        {TABS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="relative flex items-center gap-1.5 px-4 py-3 whitespace-nowrap shrink-0"
            >
              <Icon
                size={14}
                strokeWidth={isActive ? 2 : 1.5}
                className={isActive ? "text-[#0A0A0A]" : "text-[#BBBBBB]"}
              />
              <span className={`text-[12px] font-medium ${isActive ? "text-[#0A0A0A]" : "text-[#BBBBBB]"}`}>
                {label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0A0A0A] rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
