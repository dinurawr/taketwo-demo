import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { CategoryPills } from "@/components/customer/CategoryPills";
import { ProductCard } from "@/components/customer/ProductCard";
import { products } from "@/data/products";

export default function CustomerHome() {
  const featured = products[0];
  const gridProducts = products.slice(1, 9);

  return (
    <div className="flex flex-col bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-2 pb-4">
        <button className="w-9 h-9 flex items-center justify-center">
          <div className="flex flex-col gap-1">
            <span className="w-5 h-0.5 bg-[#111111] rounded-full" />
            <span className="w-3 h-0.5 bg-[#111111] rounded-full" />
          </div>
        </button>
        {/* Logo in header */}
        <Image src="/logo.png" alt="Take Two" width={80} height={47} />
        <Link href="/customer/search" className="w-9 h-9 flex items-center justify-center">
          <Search size={20} strokeWidth={1.5} className="text-[#111111]" />
        </Link>
      </div>

      {/* Hero card */}
      <div className="px-5 mb-5">
        <Link href={`/customer/product/${featured.id}`}>
          <div className="relative h-[420px] rounded-3xl overflow-hidden bg-[#859365]">
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <h2
                className="text-4xl font-bold text-white leading-none"
                style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.01em" }}
              >
                VALLEY
              </h2>
              <div className="h-0.5 w-16 bg-[#ED832B] mt-2 mb-4" />
              <div className="flex items-center justify-between">
                <p className="text-white/80 text-sm">{featured.name}</p>
                <div className="w-10 h-10 rounded-full bg-[#ED832B] flex items-center justify-center">
                  <span className="text-white text-lg font-bold">→</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Section header */}
      <div className="px-5 mb-3">
        <h2 className="text-2xl font-bold text-[#111111] leading-tight">
          Explore
          <br />
          <span className="text-[#4A89C2]">Your New Style</span>
        </h2>
      </div>

      {/* Category pills */}
      <div className="mb-4">
        <CategoryPills active="All" />
      </div>

      {/* Product grid */}
      <div className="px-5 grid grid-cols-2 gap-3">
        {gridProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View all */}
      <div className="px-5 mt-5 mb-4">
        <Link
          href="/customer/category/all"
          className="block w-full py-3 rounded-full border-2 border-[#859365] text-[#859365] text-sm font-semibold text-center hover:bg-[#859365] hover:text-white transition-colors"
        >
          View all products
        </Link>
      </div>
    </div>
  );
}
