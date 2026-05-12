"use client";

import { useState } from "react";
import { orders } from "@/data/orders";
import { products } from "@/data/products";
import { getBrand } from "@/data/brands";
import { getVendorStats } from "@/data/vendor-stats";
import { SriLankaMap } from "@/components/vendor/SriLankaMap";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  ArrowRight,
  Info,
} from "lucide-react";

const VENDOR_BRAND = "valley";
const brand = getBrand(VENDOR_BRAND)!;
const stats = getVendorStats(VENDOR_BRAND)!;

const allOrders = orders.filter((o) => o.items.some((i) => i.brand === VENDOR_BRAND));
const completedOrders = allOrders.filter((o) => o.status === "completed");
const returningOrders = allOrders.filter(
  (o) => o.status === "returning" || o.status === "pending_verdict"
);
const totalRevenue = completedOrders.reduce((s, o) => s + o.total, 0);
const returnRate = allOrders.length
  ? Math.round((returningOrders.length / allOrders.length) * 100)
  : 0;

const weeklyData = [
  { week: "W1 Apr", orders: 4, revenue: 62000 },
  { week: "W2 Apr", orders: 7, revenue: 98500 },
  { week: "W3 Apr", orders: 5, revenue: 71000 },
  { week: "W4 Apr", orders: 9, revenue: 134000 },
  { week: "W1 May", orders: 6, revenue: 89500 },
];

const maxRevenue = Math.max(...weeklyData.map((d) => d.revenue));

// Conversion funnel: use best-performing product as representative
const topPerf = stats.productPerf[0];

export default function AnalyticsPage() {
  const [sizeProductId, setSizeProductId] = useState(stats.sizeAnalytics[0]?.productId);

  const activeSizeEntry = stats.sizeAnalytics.find((s) => s.productId === sizeProductId);
  const maxSizeSold = activeSizeEntry
    ? Math.max(...activeSizeEntry.breakdown.map((b) => b.sold))
    : 1;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]">Analytics</h1>
        <p className="text-sm text-[#999999] mt-0.5">Valley store performance overview</p>
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders",          value: allOrders.length,                           trend: "+23%", up: true  },
          { label: "Revenue (completed)",    value: `LKR ${totalRevenue.toLocaleString()}`,     trend: "+18%", up: true  },
          { label: "Return Rate",            value: `${returnRate}%`,                           trend: "-2%",  up: false },
          { label: "Followers",              value: brand.followerCount.toLocaleString(),        trend: "+47 this month", up: true },
        ].map(({ label, value, trend, up }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-[#F0F0F0]">
            <p className="text-xs text-[#999999] uppercase tracking-wide mb-2">{label}</p>
            <p className="text-xl font-bold text-[#4A89C2]">{value}</p>
            <div className="flex items-center gap-1 mt-1">
              {up === true  && <TrendingUp  size={12} className="text-[#859365]" />}
              {up === false && <TrendingDown size={12} className="text-[#ED832B]" />}
              {up === null  && <Minus        size={12} className="text-[#999999]" />}
              <span
                className={`text-[11px] font-medium ${
                  up === true ? "text-[#859365]" : up === false ? "text-[#ED832B]" : "text-[#999999]"
                }`}
              >
                {trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Row 2: Weekly Revenue + Conversion Funnel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
          <h2 className="text-sm font-bold text-[#111111] mb-1">Weekly Revenue</h2>
          <p className="text-xs text-[#999999] mb-5">Last 5 weeks</p>
          <div className="flex items-end gap-3 h-32">
            {weeklyData.map((d) => (
              <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
                <p className="text-[9px] font-semibold text-[#4A89C2]">
                  {(d.revenue / 1000).toFixed(0)}k
                </p>
                <div
                  className="w-full rounded-t-lg bg-[#859365] transition-all"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                />
                <p className="text-[9px] text-[#999999] text-center">{d.week}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
          <h2 className="text-sm font-bold text-[#111111] mb-1">Conversion Funnel</h2>
          <p className="text-xs text-[#999999] mb-4">Views → Cart → Purchase</p>
          <div className="space-y-3">
            {[
              { label: "Views",         value: topPerf.views,         pct: 100,  color: "#4A89C2" },
              { label: "Added to Cart", value: topPerf.addedToCart,   pct: Math.round((topPerf.addedToCart / topPerf.views) * 100), color: "#859365" },
              { label: "Purchased",     value: topPerf.purchased,     pct: Math.round((topPerf.purchased / topPerf.views) * 100),   color: "#ED832B" },
            ].map(({ label, value, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-[#111111]">{label}</span>
                  <span className="text-xs text-[#999999]">
                    {value.toLocaleString()} <span className="text-[10px]">({pct}%)</span>
                  </span>
                </div>
                <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-[#F8F8F8] flex items-center gap-1.5">
            <Info size={11} className="text-[#999999]" />
            <p className="text-[11px] text-[#666666]">
              Your conv. rate{" "}
              <span className="font-bold text-[#859365]">{stats.conversionRate}%</span>{" "}
              vs Take Two avg{" "}
              <span className="font-semibold text-[#999999]">
                {stats.platformAvgConversion}%
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Row 3: Sri Lanka Map + AOV Card ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sri Lanka Buyer Map */}
        <div className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
          <h2 className="text-sm font-bold text-[#111111] mb-1">Buyer Geography</h2>
          <p className="text-xs text-[#999999] mb-4">Orders by province</p>
          <SriLankaMap data={stats.geoDistribution} />
        </div>

        {/* AOV vs Platform + Followers + Products KPIs */}
        <div className="flex flex-col gap-4">
          {/* AOV comparison */}
          <div className="bg-white rounded-2xl p-5 border border-[#F0F0F0] flex-1">
            <h2 className="text-sm font-bold text-[#111111] mb-1">Avg. Order Value</h2>
            <p className="text-xs text-[#999999] mb-4">Your AOV vs platform average</p>
            <div className="flex items-end gap-6">
              <div>
                <p className="text-2xl font-bold text-[#4A89C2]">
                  LKR {stats.aov.toLocaleString()}
                </p>
                <p className="text-xs text-[#999999] mt-0.5">Your store</p>
              </div>
              <ArrowRight size={16} className="text-[#CCCCCC] mb-3" />
              <div>
                <p className="text-2xl font-bold text-[#CCCCCC]">
                  LKR {stats.platformAvgAov.toLocaleString()}
                </p>
                <p className="text-xs text-[#999999] mt-0.5">Platform avg</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <TrendingUp size={13} className="text-[#859365]" />
              <p className="text-[11px] text-[#859365] font-semibold">
                +{Math.round(((stats.aov - stats.platformAvgAov) / stats.platformAvgAov) * 100)}%{" "}
                above average
              </p>
            </div>
          </div>

          {/* Follower mini-card */}
          <div className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F0EBE3] flex items-center justify-center">
                <Users size={16} className="text-[#ED832B]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#111111]">
                  {brand.followerCount.toLocaleString()}
                </p>
                <p className="text-xs text-[#999999]">brand followers</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs font-bold text-[#859365]">+47</p>
                <p className="text-[10px] text-[#999999]">this month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Size Analytics ── */}
      <div className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-[#111111]">Size Analytics</h2>
            <p className="text-xs text-[#999999] mt-0.5">Sales by size + avg customer height</p>
          </div>
          {/* Product selector */}
          <select
            value={sizeProductId}
            onChange={(e) => setSizeProductId(e.target.value)}
            className="text-xs border border-[#F0F0F0] rounded-lg px-2 py-1.5 text-[#111111] bg-white focus:outline-none focus:ring-1 focus:ring-[#859365]"
          >
            {stats.sizeAnalytics.map((s) => {
              const p = products.find((pr) => pr.id === s.productId);
              return (
                <option key={s.productId} value={s.productId}>
                  {p?.name ?? s.productId}
                </option>
              );
            })}
          </select>
        </div>

        {activeSizeEntry ? (
          <div className="space-y-3">
            {activeSizeEntry.breakdown.map(({ size, sold, avgHeightCm }) => (
              <div key={size} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg border border-[#E0E0E0] flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#111111]">{size}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-[#111111]">{sold} sold</span>
                    <span className="text-[#999999]">
                      avg {Math.round(avgHeightCm / 2.54 * 10) / 10}″ ({avgHeightCm} cm)
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#859365] rounded-full transition-all"
                      style={{ width: `${(sold / maxSizeSold) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#999999]">No data available.</p>
        )}
      </div>

      {/* ── Top Products ── */}
      <div className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
        <h2 className="text-sm font-bold text-[#111111] mb-4">Top Products</h2>
        <div className="space-y-3">
          {products
            .filter((p) => p.brand === VENDOR_BRAND)
            .sort((a, b) => b.reviewCount - a.reviewCount)
            .map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#999999] w-4">#{i + 1}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-[#111111]">{p.name}</p>
                  <div className="h-1.5 bg-[#F0F0F0] rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-[#859365] rounded-full"
                      style={{ width: `${(p.reviewCount / 50) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-[#999999]">{p.reviewCount} reviews</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
