"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  Compass,
  Sparkles,
  PersonStanding,
  Baby,
  Heart,
  ShoppingBag,
  User,
} from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const navLinks: NavLink[] = [
  { href: "/customer/home", label: "Explore", icon: Compass },
  { href: "/customer/category/all", label: "New Arrivals", icon: Sparkles },
  { href: "/customer/category/men", label: "Men", icon: PersonStanding },
  { href: "/customer/category/women", label: "Women", icon: PersonStanding },
  { href: "/customer/category/children", label: "Children", icon: Baby },
  { href: "/customer/favorites", label: "Saved", icon: Heart },
  { href: "/customer/orders", label: "Orders", icon: ShoppingBag },
  { href: "/customer/account", label: "Account", icon: User },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MenuDrawer({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — absolute so it stays inside the phone shell */}
          <motion.div
            key="backdrop"
            className="absolute inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer panel — absolute inside phone shell */}
          <motion.div
            key="drawer"
            className="absolute top-0 left-0 bottom-0 z-50 w-[280px] bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-black/5">
              <span className="text-base font-bold text-[#111111] tracking-tight">Menu</span>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5"
                aria-label="Close menu"
              >
                <X size={16} strokeWidth={2} className="text-[#111111]" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-[#111111] hover:bg-black/5 active:bg-black/10 transition-colors"
                >
                  <Icon size={18} strokeWidth={1.5} className="text-[#666666]" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
