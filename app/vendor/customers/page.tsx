"use client";

import { useState } from "react";
import { getVendorStats } from "@/data/vendor-stats";
import { MapPin, Star, Flame, RotateCcw, Users, TrendingUp, Repeat2, Zap } from "lucide-react";

const VENDOR_BRAND = "serendib-style";
const stats = getVendorStats(VENDOR_BRAND)!;

type SortKey = "lastPurchase" | "ltv" | "orderCount";

export default function CustomersPage() {
  const [sort, setSort] = useState<SortKey>("lastPurchase");

  const sorted = [...stats.customers].sort((a, b) => {
    if (sort === "ltv")        return b.ltv - a.ltv;
    if (sort === "orderCount") return b.orderCount - a.orderCount;
    return new Date(b.lastPurchase).getTime() - new Date(a.lastPurchase).getTime();
  });

  const repeatCount   = stats.customers.filter((c) => c.repeat).length;
  const frequentCount = stats.customers.filter((c) => c.frequentBuyer).length;
  const avgLtv        = Math.round(stats.customers.reduce((s, c) => s + c.ltv, 0) / stats.customers.length);

  const kpis = [
    { label: "Total Buyers",   value: stats.customers.length,           icon: Users    },
    { label: "Repeat Buyers",  value: repeatCount,                      icon: Repeat2  },
    { label: "Frequent (60d)", value: frequentCount,                    icon: Zap      },
    { label: "Avg. LTV",       value: `₨ ${avgLtv.toLocaleString()}`,      icon: TrendingUp },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-[#0A0A0A]">Take Two </span><span className="bg-gradient-to-r from-[#16A34A] to-[#4ADE80] bg-clip-text text-transparent">Customers</span>
        </h1>
        <p className="text-xs tracking-wide text-[#9B9B98] mt-2">
          {stats.customers.length} buyers · {repeatCount} repeat · {frequentCount} frequent
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {kpis.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-[#E8E8E4]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest leading-tight">{label}</p>
              <Icon size={14} className="text-[#9B9B98]" strokeWidth={1.5} />
            </div>
            <p className="font-mono-num text-xl font-semibold text-[#111111]">{value}</p>
          </div>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xs text-[#9B9B98] mr-1">Sort by:</span>
        {(
          [
            { key: "lastPurchase", label: "Most recent" },
            { key: "ltv",         label: "Highest LTV"  },
            { key: "orderCount",  label: "Most orders"  },
          ] as { key: SortKey; label: string }[]
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSort(key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              sort === key
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white text-[#6B6B68] border-[#E8E8E4] hover:border-[#9B9B98]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Customer list */}
      <div className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden">
        {/* Desktop header */}
        <div className="hidden md:grid grid-cols-[1fr_100px_60px_120px_150px] gap-x-4 px-5 py-3 border-b border-[#F0F0EC] bg-[#FAFAF8]">
          {["Customer", "Last Order", "Orders", "LTV", "Tags"].map((h) => (
            <p key={h} className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest">{h}</p>
          ))}
        </div>

        {sorted.map((customer, i) => (
          <div
            key={customer.id}
            className={`px-5 py-3.5 hover:bg-[#FAFAF8] transition-colors ${i !== sorted.length - 1 ? "border-b border-[#F0F0EC]" : ""}`}
          >
            {/* Desktop row */}
            <div className="hidden md:grid grid-cols-[1fr_100px_60px_120px_150px] gap-x-4 items-center">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#F0F0EC] flex items-center justify-center shrink-0 text-xs font-semibold text-[#6B6B68]">
                  {customer.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#111111] truncate">{customer.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={9} className="text-[#C8C8C4] shrink-0" />
                    <p className="text-[10px] text-[#9B9B98] truncate">{customer.location}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#6B6B68]">
                {new Date(customer.lastPurchase).toLocaleDateString("en-LK", { day: "numeric", month: "short" })}
              </p>

              <p className="font-mono-num text-sm font-semibold text-[#111111]">{customer.orderCount}</p>

              <p className="font-mono-num text-sm font-semibold text-[#111111]">
                ₨ {customer.ltv.toLocaleString()}
              </p>

              <div className="flex flex-wrap gap-1">
                {customer.repeat && (
                  <span className="flex items-center gap-0.5 text-[9px] font-medium text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded-md">
                    <Star size={8} className="fill-[#16A34A]" /> Repeat
                  </span>
                )}
                {customer.frequentBuyer && (
                  <span className="flex items-center gap-0.5 text-[9px] font-medium text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded-md">
                    <Flame size={8} /> 3 in 60d
                  </span>
                )}
                {customer.hasReturned && (
                  <span className="flex items-center gap-0.5 text-[9px] font-medium text-[#9B9B98] bg-[#F0F0EC] px-1.5 py-0.5 rounded-md">
                    <RotateCcw size={8} /> Returned
                  </span>
                )}
                {!customer.repeat && !customer.frequentBuyer && !customer.hasReturned && (
                  <span className="text-[9px] font-medium text-[#9B9B98] bg-[#F0F0EC] px-1.5 py-0.5 rounded-md">New</span>
                )}
              </div>
            </div>

            {/* Mobile card */}
            <div className="md:hidden">
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#F0F0EC] flex items-center justify-center text-xs font-semibold text-[#6B6B68]">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111111]">{customer.name}</p>
                    <div className="flex items-center gap-0.5">
                      <MapPin size={9} className="text-[#C8C8C4]" />
                      <p className="text-[10px] text-[#9B9B98]">{customer.location}</p>
                    </div>
                  </div>
                </div>
                <p className="font-mono-num text-sm font-semibold text-[#111111]">₨ {customer.ltv.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap pl-11">
                <span className="text-[10px] text-[#9B9B98]">
                  {customer.orderCount} order{customer.orderCount !== 1 ? "s" : ""} ·{" "}
                  {new Date(customer.lastPurchase).toLocaleDateString("en-LK", { day: "numeric", month: "short" })}
                </span>
                {customer.repeat && (
                  <span className="flex items-center gap-0.5 text-[9px] font-medium text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded-md">
                    <Star size={8} className="fill-[#16A34A]" /> Repeat
                  </span>
                )}
                {customer.frequentBuyer && (
                  <span className="flex items-center gap-0.5 text-[9px] font-medium text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded-md">
                    <Flame size={8} /> Frequent
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
