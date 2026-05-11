"use client";

import Link from "next/link";
import { Sparkles, User, Heart, Baby } from "lucide-react";

const categories = [
  { label: "All",      Icon: Sparkles, href: "/customer/home" },
  { label: "Men",      Icon: User,     href: "/customer/category/men" },
  { label: "Women",    Icon: Heart,    href: "/customer/category/women" },
  { label: "Children", Icon: Baby,     href: "/customer/category/children" },
];

export function CategoryPills({ active }: { active?: string }) {
  const current = (active ?? "All").toLowerCase();

  return (
    <div className="flex gap-2 px-5 overflow-x-auto pb-1 phone-scroll">
      {categories.map(({ label, Icon, href }) => {
        const isActive = current === label.toLowerCase();
        const isAll    = label === "All";

        return (
          <Link
            key={label}
            href={href}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              isActive
                ? isAll
                  ? "bg-[#111111] text-white"
                  : "bg-[#4A89C2] text-white"
                : "bg-white text-[#111111] border border-black/10 shadow-sm"
            }`}
          >
            <Icon size={13} strokeWidth={isActive ? 2.5 : 1.5} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
