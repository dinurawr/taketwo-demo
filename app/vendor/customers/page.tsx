"use client";

import { useState } from "react";
import { getVendorStats } from "@/data/vendor-stats";
import { Star, MapPin, ShoppingBag, TrendingUp } from "lucide-react";

const VENDOR_BRAND = "valley";
const stats = getVendorStats(VENDOR_BRAND)!;

type SortKey = "lastPurchase" | "ltv" | "orderCount";

export default function CustomersPage() {
  const [sort, setSort] = useState<SortKey>("lastPurchase");

  const sorted = [...stats.customers].sort((a, b) => {
    if (sort === "ltv") return b.ltv - a.ltv;
    if (sort === "orderCount") return b.orderCount - a.orderCount;
    // lastPurchase — most recent first
    return new Date(b.lastPurchase).getTime() - new Date(a.lastPurchase).getTime();
  });

  const repeatCount = stats.customers.filter((c) => c.repeat).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111111]">Customers</h1>
        <p className="text-sm text-[#999999] mt-0.5">
          {stats.customers.length} buyers &middot;{" "}
          <span className="text-[#ED832B] font-semibold">{repeatCount} repeat</span>
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total Buyers",    value: stats.customers.length,       icon: ShoppingBag, color: "#4A89C2" },
          { label: "Repeat Buyers",   value: repeatCount,                  icon: Star,        color: "#ED832B" },
          { label: "Avg. LTV (LKR)",  value: Math.round(stats.customers.reduce((s, c) => s + c.ltv, 0) / stats.customers.length).toLocaleString(), icon: TrendingUp, color: "#859365" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-[#F0F0F0] text-center">
            <Icon size={16} style={{ color }} className="mx-auto mb-2" />
            <p className="text-lg font-bold text-[#111111]">{value}</p>
            <p className="text-[10px] text-[#999999] uppercase tracking-wide mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Sort controls */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-[#999999] mr-1">Sort by:</span>
        {(
          [
            { key: "lastPurchase", label: "Newest" },
            { key: "ltv",         label: "Highest LTV" },
            { key: "orderCount",  label: "Most Orders" },
          ] as { key: SortKey; label: string }[]
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSort(key)}
            className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
              sort === key
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white text-[#666666] border-[#E0E0E0] hover:border-[#999999]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Customer table */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_100px_60px_100px_80px] gap-x-3 px-4 py-2.5 border-b border-[#F8F8F8] bg-[#FAFAFA]">
          {["Customer", "Last Order", "Orders", "LTV", "Status"].map((h) => (
            <p key={h} className="text-[10px] font-bold uppercase tracking-wide text-[#999999]">
              {h}
            </p>
          ))}
        </div>

        {/* Rows */}
        {sorted.map((customer, i) => (
          <div
            key={customer.id}
            className={`grid grid-cols-[1fr_100px_60px_100px_80px] gap-x-3 px-4 py-3 items-center ${
              i !== sorted.length - 1 ? "border-b border-[#F8F8F8]" : ""
            }`}
          >
            {/* Name + location */}
            <div className="flex items-center gap-2 min-w-0">
              {customer.repeat && (
                <Star size={11} className="shrink-0 fill-[#ED832B] text-[#ED832B]" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#111111] truncate">
                  {customer.name}
                </p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <MapPin size={9} className="text-[#999999] shrink-0" />
                  <p className="text-[10px] text-[#999999] truncate">{customer.location}</p>
                </div>
              </div>
            </div>

            {/* Last purchase */}
            <p className="text-xs text-[#666666]">
              {new Date(customer.lastPurchase).toLocaleDateString("en-LK", {
                day: "numeric",
                month: "short",
              })}
            </p>

            {/* Order count */}
            <p className="text-xs font-semibold text-[#111111]">{customer.orderCount}</p>

            {/* LTV */}
            <p className="text-xs font-semibold text-[#111111]">
              {customer.ltv.toLocaleString()}
            </p>

            {/* Status badge */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${
                customer.repeat
                  ? "bg-[#FFF3E8] text-[#ED832B]"
                  : "bg-[#F0F3EC] text-[#859365]"
              }`}
            >
              {customer.repeat ? "Repeat" : "New"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
