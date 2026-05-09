import { CategoryPills } from "@/components/customer/CategoryPills";
import { ProductCard } from "@/components/customer/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const label = cat.charAt(0).toUpperCase() + cat.slice(1);
  const filtered =
    cat === "all"
      ? products
      : products.filter((p) => p.category.toLowerCase() === cat.toLowerCase());

  return (
    <div className="flex flex-col bg-white">
      <div className="flex items-center gap-3 px-5 pt-2 pb-4">
        <Link href="/customer" className="w-8 h-8 flex items-center justify-center">
          <ChevronLeft size={20} strokeWidth={1.5} className="text-[#111111]" />
        </Link>
        <h1 className="text-lg font-bold text-[#111111]">
          {cat === "all" ? "All Products" : label}
        </h1>
        <span className="ml-auto text-sm text-[#666666]">{filtered.length} items</span>
      </div>

      <div className="mb-4">
        <CategoryPills active={cat === "all" ? "All" : label} />
      </div>

      <div className="px-5 grid grid-cols-2 gap-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#999999]">
          <p className="text-4xl mb-4">👗</p>
          <p className="font-medium text-[#111111]">No products in this category yet</p>
        </div>
      )}
    </div>
  );
}
