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
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#E8E8E8]">
      <div className="flex items-center justify-around px-1 pb-safe">
        {TABS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-0.5 px-2 py-2.5 min-w-0 flex-1"
            >
              <Icon
                size={19}
                strokeWidth={isActive ? 2 : 1.5}
                className={isActive ? "text-[#0A0A0A]" : "text-[#BBBBBB]"}
              />
              <span className={`text-[9px] font-medium truncate ${isActive ? "text-[#0A0A0A]" : "text-[#BBBBBB]"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
