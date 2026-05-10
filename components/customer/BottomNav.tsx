"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, User, Grid2x2 } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Always show immediately on short pages (not home/category)
    const alwaysShow =
      pathname !== "/customer/home" && !pathname.startsWith("/customer/category");
    if (alwaysShow) {
      setShown(true);
      return;
    }

    // Home & category: reveal after scrolling 60 px inside the phone frame
    setShown(false);
    const container = document.getElementById("scroll-container");
    if (!container) return;

    function onScroll() {
      setShown(container!.scrollTop > 60);
    }

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Never show on the OOTD splash
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
        transform: `translateX(-50%) translateY(${shown && !hidden ? "0px" : "20px"})`,
        opacity: shown && !hidden ? 1 : 0,
        pointerEvents: shown && !hidden ? "auto" : "none",
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
