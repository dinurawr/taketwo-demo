import Image from "next/image";
import { products } from "@/data/products";
import { getBrand } from "@/data/brands";
import { CheckCircle } from "lucide-react";

// Vendor view shows only "their" brand (Valley for demo)
const VENDOR_BRAND = "valley";

export default function VendorProductsPage() {
  const myProducts = products.filter((p) => p.brand === VENDOR_BRAND);
  const brand = getBrand(VENDOR_BRAND);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Product Catalog</h1>
          <p className="text-sm text-[#999999] mt-0.5">
            Synced from {brand?.name} Shopify store · {myProducts.length} products
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#F0F3EC] text-[#859365] px-3 py-1.5 rounded-full text-xs font-semibold">
          <CheckCircle size={13} />
          Shopify Connected
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden border border-[#F0F0F0]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F0F0F0]">
              {["Product", "Category", "Price", "Sizes", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-[#999999] uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product) => (
              <tr key={product.id} className="border-b border-[#F8F8F6] hover:bg-[#F8F8F6] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F0F3EC] shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111111] text-xs">{product.name}</p>
                      <p className="text-[10px] text-[#999999]">★ {product.rating} ({product.reviewCount})</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-[#F0F3EC] text-[#859365] px-2 py-0.5 rounded-full font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-xs font-bold text-[#4A89C2]">LKR {product.price.toLocaleString()}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.map((s) => (
                      <span key={s} className="text-[10px] bg-[#F0F0F0] text-[#111111] px-1.5 py-0.5 rounded font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${product.inStock ? "bg-[#F0F3EC] text-[#859365]" : "bg-red-50 text-red-500"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 bg-[#F8F8F6] border-t border-[#F0F0F0]">
          <p className="text-xs text-[#999999]">
            Products are automatically synced from your Shopify store via webhook. Last sync: just now.
          </p>
        </div>
      </div>
    </div>
  );
}
