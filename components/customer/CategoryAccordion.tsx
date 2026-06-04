"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/customer/ProductCard";

type Gender = "men" | "women";

type Group = {
  key: string;        // categoryGroup key OR synthetic "swim"
  label: string;      // display label, uppercased
};

const MEN_GROUPS: Group[] = [
  { key: "new-in",  label: "New Arrivals" },
  { key: "tops",    label: "Tops" },
  { key: "bottoms", label: "Bottoms" },
  { key: "shorts",  label: "Shorts" },
];

const WOMEN_GROUPS: Group[] = [
  { key: "new-in",  label: "New Arrivals" },
  { key: "dresses", label: "Dresses" },
  { key: "tops",    label: "Tops" },
  { key: "bottoms", label: "Bottoms" },
  { key: "swim",    label: "Swim" }, // synthetic
];

function getProductsForGroup(gender: Gender, group: Group, query: string): Product[] {
  let list: Product[];

  if (group.key === "swim") {
    // Synthetic — rolls up all swim category products
    list = products.filter((p) => p.category === "Swim");
  } else {
    // Gender-filtered + categoryGroup match
    list = products.filter((p) => {
      if (p.categoryGroup !== group.key) return false;
      if (gender === "men")   return p.category === "Men";
      if (gender === "women") return p.category === "Women";
      return false;
    });
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  }

  return list;
}

function AccordionRow({
  group,
  gender,
  query,
  defaultOpen,
}: {
  group: Group;
  gender: Gender;
  query: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  const items = getProductsForGroup(gender, group, query);

  return (
    <div className="border-b border-[#111111]/15">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 cursor-pointer text-left"
        style={{ touchAction: "manipulation" }}
      >
        <span
          className="text-[14px] font-bold uppercase tracking-wide text-[#111111]"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          {group.label}
        </span>
        {open ? (
          <Minus size={16} className="text-[#111]" strokeWidth={2} />
        ) : (
          <Plus size={16} className="text-[#111]" strokeWidth={2} />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            {items.length > 0 ? (
              <>
                <div className="pb-3 -mx-4 px-4 flex gap-3 overflow-x-auto scrollbar-none">
                  {items.map((p) => (
                    <div key={p.id} className="w-[150px] shrink-0">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
                <Link
                  href={`/customer/shop?gender=${gender}&cat=${group.key}`}
                  className="block pb-4 text-[10px] uppercase tracking-widest text-[#666] hover:text-[#111]"
                >
                  View all →
                </Link>
              </>
            ) : (
              <p className="pb-4 text-[12px] text-[#999] italic">
                Nothing here yet.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CategoryAccordion({ gender, query }: { gender: Gender; query: string }) {
  const groups = gender === "men" ? MEN_GROUPS : WOMEN_GROUPS;

  return (
    <div className="px-4">
      {groups.map((group, i) => (
        <AccordionRow
          key={group.key}
          group={group}
          gender={gender}
          query={query}
          defaultOpen={i === 0}
        />
      ))}
    </div>
  );
}
