"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, User, Grid2x2 } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Hide on the full-bleed OOTD splash — show everywhere else
  const hidden = pathname === "/customer";

  const links = [
    { href: "/customer/home", icon: Grid2x2, label: "Explore" },
    { href: "/customer/favorites", icon: Heart, label: "Saved" },
    { href: "/customer/cart", icon: ShoppingBag, label: "Cart", badge: totalItems },
    { href: "/customer/account", icon: User, label: "Account" },
  ];

  return (
    <div
      className="absolute bottom-8 left-1/2 w-[calc(100%-40px)] transition-all duration-300 ease-out"
      style={{
        transform: `translateX(-50%) translateY(${hidden ? "20px" : "0px"})`,
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <div className="bg-black/75 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[28px] px-2 py-2 flex items-center justify-around">
        {links.map(({ href, icon: Icon, label, badge }) => {
          const isActive =
            pathname === href ||
            (href !== "/customer/home" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-[20px] transition-colors"
            >
              <div className={`relative ${isActive ? "text-[#ED832B]" : "text-white/50"}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                {badge != null && badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#ED832B] rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] font-medium ${
                  isActive ? "text-[#ED832B]" : "text-white/40"
                }`}
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
