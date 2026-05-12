"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Never show on the splash screen
  if (pathname === "/customer") return null;

  const links = [
    { href: "/customer/home", icon: Home, label: "Home" },
    { href: "/customer/shop", icon: ShoppingBag, label: "Shop" },
    { href: "/customer/favorites", icon: Heart, label: "Saved" },
    { href: "/customer/cart", icon: ShoppingCart, label: "Bag", badge: totalItems },
    { href: "/customer/account", icon: User, label: "Profile" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-black/5 flex items-center justify-around px-1">
      {links.map(({ href, icon: Icon, label, badge }) => {
        const isActive =
          pathname === href ||
          (href !== "/customer/home" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 flex-1"
          >
            <div className={`relative ${isActive ? "text-[#111111]" : "text-[#AAAAAA]"}`}>
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              {badge != null && badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#111111] rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                  {badge > 9 ? "9+" : badge}
                </span>
              )}
            </div>
            <span
              className={`text-[9px] font-medium ${
                isActive ? "text-[#111111]" : "text-[#AAAAAA]"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
