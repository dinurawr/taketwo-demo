import Image from "next/image";
import { products } from "@/data/products";
import { getBrand } from "@/data/brands";
import { CheckCircle2 } from "lucide-react";

const VENDOR_BRAND = "serendib-style";

export default function VendorProductsPage() {
  const myProducts = products.filter((p) => p.brand === VENDOR_BRAND);
  const brand = getBrand(VENDOR_BRAND);

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-[#0A0A0A]">Take Two </span><span className="bg-gradient-to-r from-[#16A34A] to-[#4ADE80] bg-clip-text text-transparent">Catalog</span>
          </h1>
          <p className="text-xs tracking-wide text-[#9B9B98] mt-2">
            {brand?.name} · {myProducts.length} products
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#F0FDF4] text-[#16A34A] px-3 py-1.5 rounded-lg text-xs font-medium shrink-0">
          <CheckCircle2 size={13} strokeWidth={2} />
          Shopify Connected
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl overflow-hidden border border-[#E8E8E4]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F0F0EC] bg-[#FAFAF8]">
              {["Product", "Category", "Price", "Sizes", "Status"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product, i) => (
              <tr
                key={product.id}
                className={`hover:bg-[#FAFAF8] transition-colors ${i !== myProducts.length - 1 ? "border-b border-[#F0F0EC]" : ""}`}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F0F0EC] shrink-0">
                      <Image src={product.image} alt={product.name} width={40} height={40} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#111111]">{product.name}</p>
                      <p className="text-[10px] text-[#9B9B98] mt-0.5">★ {product.rating} ({product.reviewCount})</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-[11px] font-medium bg-[#F0F0EC] text-[#6B6B68] px-2 py-1 rounded-md">
                    {product.category}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <p className="font-mono-num text-xs font-semibold text-[#111111]">₨ {product.price.toLocaleString()}</p>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.map((s) => (
                      <span key={s} className="text-[10px] font-medium bg-[#F0F0EC] text-[#6B6B68] px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-[11px] font-medium px-2 py-1 rounded-md ${
                    product.inStock
                      ? "bg-[#F0FDF4] text-[#16A34A]"
                      : "bg-[#FEF2F2] text-[#DC2626]"
                  }`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 bg-[#FAFAF8] border-t border-[#F0F0EC]">
          <p className="text-[11px] text-[#9B9B98]">
            Synced automatically via Shopify webhook · Last sync: just now
          </p>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden bg-white rounded-xl border border-[#E8E8E4] overflow-hidden">
        {myProducts.map((product, i) => (
          <div
            key={product.id}
            className={`flex items-center gap-3 px-4 py-3.5 ${i !== myProducts.length - 1 ? "border-b border-[#F0F0EC]" : ""}`}
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F0F0EC] shrink-0">
              <Image src={product.image} alt={product.name} width={48} height={48} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-[#111111] truncate">{product.name}</p>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md shrink-0 ${
                  product.inStock ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#FEF2F2] text-[#DC2626]"
                }`}>
                  {product.inStock ? "In Stock" : "Out"}
                </span>
              </div>
              <p className="text-[10px] text-[#9B9B98] mt-0.5">★ {product.rating} · {product.category}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <p className="font-mono-num text-xs font-semibold text-[#111111]">₨ {product.price.toLocaleString()}</p>
                <div className="flex gap-1">
                  {product.sizes.map((s) => (
                    <span key={s} className="text-[9px] font-medium bg-[#F0F0EC] text-[#6B6B68] px-1 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="px-4 py-3 bg-[#FAFAF8] border-t border-[#F0F0EC]">
          <p className="text-[11px] text-[#9B9B98]">Synced via Shopify · Last sync: just now</p>
        </div>
      </div>
    </div>
  );
}
