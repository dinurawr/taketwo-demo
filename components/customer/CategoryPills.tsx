"use client";

import Link from "next/link";

const categories = ["All", "Men", "Women", "Children"];

export function CategoryPills({ active }: { active?: string }) {
  const current = active ?? "All";

  return (
    <div className="flex gap-2 px-5 overflow-x-auto pb-1 phone-scroll">
      {categories.map((cat) => {
        const isActive = current === cat;
        const href =
          cat === "All" ? "/customer" : `/customer/category/${cat.toLowerCase()}`;
        return (
          <Link
            key={cat}
            href={href}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              isActive
                ? "bg-[#859365] text-white"
                : "bg-white text-[#111111] border border-[#E8E8E8]"
            }`}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}
