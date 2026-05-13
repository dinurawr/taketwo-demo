"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, AlertTriangle, AlertCircle, LayoutDashboard, Tag, RotateCcw } from "lucide-react";
import {
  DAILY_REVENUE,
  CITY_DISTRIBUTION,
  PRODUCT_PERFORMANCE,
  SELLER_PRODUCTS,
  RETURN_REASONS,
  RETURNS_BY_SIZE,
  RETURNS_BY_CITY,
  PER_PRODUCT_RETURNS,
  getKPIs,
} from "@/data/seller-fixtures";

// ─── helpers ──────────────────────────────────────────────────────────────────
type Period = "7d" | "30d" | "90d";
const fmt = (n: number) => "₨ " + n.toLocaleString("en-LK");

function Rs({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={className}>
      <span className="text-[10px] font-medium align-baseline mr-0.5">₨</span>
      {value.toLocaleString("en-LK")}
    </span>
  );
}

// ─── tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "products", label: "Products", icon: Tag             },
  { key: "returns",  label: "Returns",  icon: RotateCcw       },
] as const;
type Tab = typeof TABS[number]["key"];

// ─── Recharts tooltip ─────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label, suffix = "" }: {
  active?: boolean; payload?: { value: number }[]; label?: string; suffix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111111] text-white text-xs rounded-lg px-3 py-2 shadow-xl pointer-events-none">
      <p className="text-[#888888] mb-0.5">{label}</p>
      <p className="font-mono-num font-semibold">
        {suffix ? `${payload[0].value.toFixed(1)}${suffix}` : `₨ ${payload[0].value.toLocaleString("en-LK")}`}
      </p>
    </div>
  );
}

// ─── trend indicator ─────────────────────────────────────────────────────────
function Trend({ pct }: { pct: number }) {
  const up = pct >= 0;
  return (
    <span className={`flex items-center gap-0.5 text-[11px] font-medium ${up ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
      {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      {Math.abs(pct).toFixed(1)}%
    </span>
  );
}

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────
function OverviewTab() {
  const [period, setPeriod] = useState<Period>("30d");
  const kpis = useMemo(() => getKPIs(period === "7d" ? 7 : period === "30d" ? 30 : 90), [period]);

  const chartData = useMemo(() => {
    const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
    const slice = DAILY_REVENUE.slice(90 - days);
    if (period === "30d") {
      return Array.from({ length: 4 }, (_, w) => ({
        label: `Wk ${w + 1}`,
        revenue: slice.slice(w * 7, (w + 1) * 7).reduce((s, d) => s + d.revenue, 0),
      }));
    }
    if (period === "90d") {
      const months: Record<string, number> = {};
      for (const d of slice) {
        const k = new Date(d.date).toLocaleDateString("en-LK", { month: "short" });
        months[k] = (months[k] ?? 0) + d.revenue;
      }
      return Object.entries(months).map(([label, revenue]) => ({ label, revenue }));
    }
    return slice.map((d) => ({
      label: new Date(d.date).toLocaleDateString("en-LK", { weekday: "short" }),
      revenue: d.revenue,
    }));
  }, [period]);

  const bestsellers = useMemo(() =>
    [...PRODUCT_PERFORMANCE]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((p) => ({ ...p, product: SELLER_PRODUCTS.find((s) => s.id === p.id) })),
    []
  );

  const KPI_DEFS = [
    { key: "revenue" as const,    label: "Revenue",         format: (v: number) => fmt(v) },
    { key: "orders" as const,     label: "Orders",          format: (v: number) => v.toLocaleString() },
    { key: "aov" as const,        label: "Avg. Order",      format: (v: number) => fmt(v) },
    { key: "conversion" as const, label: "Conversion",      format: (v: number) => v.toFixed(1) + "%" },
    { key: "views" as const,      label: "Views",           format: (v: number) => v.toLocaleString() },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#9B9B98]">Updated just now</p>
        <div className="flex items-center gap-1 bg-[#F0F0EC] rounded-lg p-1">
          {(["7d", "30d", "90d"] as Period[]).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                period === p ? "bg-white text-[#111111] shadow-sm" : "text-[#6B6B68] hover:text-[#111111]"
              }`}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {KPI_DEFS.map(({ key, label, format }) => (
          <div key={key} className="bg-white rounded-xl p-4 border border-[#E8E8E4]">
            <p className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest mb-2 leading-tight">{label}</p>
            {(() => {
              const val = format(kpis[key].value);
              const isCurrency = val.startsWith("₨");
              return (
                <p className="font-mono-num text-sm md:text-lg font-semibold text-[#111111] leading-none mb-2 truncate">
                  {isCurrency
                    ? <Rs value={kpis[key].value} />
                    : val}
                </p>
              );
            })()}
            <Trend pct={kpis[key].pct} />
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl border border-[#E8E8E4] p-5">
        <h2 className="text-sm font-semibold text-[#111111] mb-5">Revenue</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16A34A" stopOpacity={0.16} />
                <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#F0F0EC" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9B9B98", fontFamily: "inherit" }} axisLine={false} tickLine={false} dy={6} />
            <YAxis tick={{ fontSize: 11, fill: "#9B9B98", fontFamily: "inherit" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₨${(v / 1000).toFixed(0)}k`} width={52} />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#E8E8E4", strokeWidth: 1 }} />
            <Area type="monotone" dataKey="revenue" stroke="#16A34A" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: "#16A34A", strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* City + bestsellers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-[#E8E8E4] p-5">
          <h2 className="text-sm font-semibold text-[#111111] mb-4">Sales by city</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CITY_DISTRIBUTION} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }} barSize={9}>
              <XAxis type="number" tick={{ fontSize: 11, fill: "#9B9B98", fontFamily: "inherit" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₨${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="city" tick={{ fontSize: 12, fill: "#6B6B68", fontFamily: "inherit" }} axisLine={false} tickLine={false} width={62} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "#F7F6F3" }} />
              <Bar dataKey="revenue" fill="#16A34A" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-[#E8E8E4] p-5">
          <h2 className="text-sm font-semibold text-[#111111] mb-4">Top products</h2>
          <div className="space-y-3.5">
            {bestsellers.map((p, rank) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="font-mono-num text-[11px] text-[#C8C8C4] w-4 shrink-0">{rank + 1}</span>
                <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#F0F0EC] shrink-0">
                  {p.product && <Image src={p.product.image} alt={p.product.name} width={36} height={36} className="object-cover w-full h-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#111111] truncate">{p.product?.name ?? p.id}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="font-mono-num text-[10px] text-[#9B9B98]">{p.orders.toLocaleString()} units</p>
                    {p.product?.isLowStock && (
                      <span className="text-[9px] font-medium text-[#DC2626] bg-[#FEF2F2] px-1.5 py-0.5 rounded-md">Low stock</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0 space-y-0.5">
                  <Rs value={p.revenue} className="font-mono-num text-xs font-semibold text-[#111111]" />
                  <Trend pct={p.trend} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCTS TAB ─────────────────────────────────────────────────────────────
function ProductsTab() {
  type SortKey = "views" | "orders" | "revenue" | "conversionRate";
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() =>
    [...PRODUCT_PERFORMANCE].sort((a, b) => {
      const diff = a[sortKey] - b[sortKey];
      return sortDir === "desc" ? -diff : diff;
    }), [sortKey, sortDir]
  );

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSortKey(key); setSortDir("desc"); }
  }

  function SortBtn({ k, label }: { k: SortKey; label: string }) {
    return (
      <button onClick={() => handleSort(k)}
        className={`flex items-center gap-1 text-[11px] font-medium uppercase tracking-widest transition-colors cursor-pointer ${
          sortKey === k ? "text-[#111111]" : "text-[#9B9B98] hover:text-[#6B6B68]"
        }`}>
        {label}{sortKey === k && <span className="text-[9px]">{sortDir === "desc" ? "↓" : "↑"}</span>}
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden">
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
          <thead>
            <tr className="border-b border-[#F0F0EC] bg-[#FAFAF8]">
              <th className="px-4 py-3 text-left text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest">Product</th>
              <th className="px-4 py-3 text-left"><SortBtn k="views" label="Views" /></th>
              <th className="px-4 py-3 text-left text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest">Cart %</th>
              <th className="px-4 py-3 text-left"><SortBtn k="conversionRate" label="Conv." /></th>
              <th className="px-4 py-3 text-left"><SortBtn k="orders" label="Orders" /></th>
              <th className="px-4 py-3 text-left text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest">Return %</th>
              <th className="px-4 py-3 text-left"><SortBtn k="revenue" label="Revenue" /></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => {
              const product = SELLER_PRODUCTS.find((s) => s.id === p.id);
              const returnColor =
                p.returnRate >= 20 ? "text-[#DC2626]" :
                p.returnRate >= 10 ? "text-[#D97706]" :
                                     "text-[#16A34A]";
              const trendUp = p.trend >= 0;
              return (
                <tr key={p.id} className={`hover:bg-[#FAFAF8] transition-colors ${i !== sorted.length - 1 ? "border-b border-[#F0F0EC]" : ""}`}>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#F0F0EC] shrink-0">
                        {product && <Image src={product.image} alt={product.name} width={32} height={32} className="object-cover w-full h-full" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#111111] truncate max-w-[120px]">{product?.name ?? p.id}</p>
                        <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                          {product?.isLowStock && (
                            <span className="flex items-center gap-0.5 text-[9px] font-medium text-[#DC2626] bg-[#FEF2F2] px-1.5 py-0.5 rounded-md">
                              <AlertCircle size={8} /> Low stock
                            </span>
                          )}
                          {product?.isStalled && (
                            <span title={`${p.views.toLocaleString()} views but only ${p.orders} sales — consider updating your photos or adjusting the price`}
                              className="flex items-center gap-0.5 text-[9px] font-medium text-[#B0863A] bg-[#FAF3E8] px-1.5 py-0.5 rounded-md cursor-help">
                              <AlertTriangle size={8} /> Stalled
                            </span>
                          )}
                          {product?.isHighReturn && (
                            <span className="text-[9px] font-medium text-[#DC2626] bg-[#FEF2F2] px-1.5 py-0.5 rounded-md">↩ High returns</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-left font-mono-num text-xs text-[#6B6B68]">{p.views.toLocaleString()}</td>
                  <td className={`px-4 py-3.5 text-left font-mono-num text-xs font-semibold ${
                    p.addToCartRate >= 20 ? "text-[#16A34A]" : p.addToCartRate >= 10 ? "text-[#D97706]" : "text-[#DC2626]"
                  }`}>{p.addToCartRate.toFixed(1)}%</td>
                  <td className={`px-4 py-3.5 text-left font-mono-num text-xs font-semibold ${
                    p.conversionRate >= 7 ? "text-[#16A34A]" : p.conversionRate >= 3 ? "text-[#D97706]" : "text-[#DC2626]"
                  }`}>{p.conversionRate.toFixed(1)}%</td>
                  <td className="px-4 py-3.5 text-left font-mono-num text-xs font-semibold text-[#111111]">{p.orders.toLocaleString()}</td>
                  <td className={`px-4 py-3.5 text-left font-mono-num text-xs font-semibold ${returnColor}`}>
                    {p.returnRate.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3.5 text-left">
                    <Rs value={p.revenue} className="font-mono-num text-xs font-semibold text-[#111111]" />
                    <p className={`font-mono-num text-[10px] font-medium mt-0.5 ${trendUp ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
                      {trendUp ? "↑" : "↓"}{Math.abs(p.trend)}%
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

// ─── RETURNS TAB ──────────────────────────────────────────────────────────────
function ReturnsTab() {
  const [paused, setPaused] = useState<Set<string>>(new Set());

  function togglePause(id: string) {
    setPaused((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="bg-white rounded-xl border border-[#E8E8E4] p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-xs font-medium text-[#9B9B98] uppercase tracking-widest mb-1">Your return rate</p>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-mono-num text-3xl font-semibold text-[#111111]">18.2%</span>
            <span className="text-sm text-[#16A34A] font-medium">✔ 5.8% below category average</span>
          </div>
        </div>
        <div className="sm:text-right shrink-0 border-t sm:border-t-0 sm:border-l border-[#E8E8E4] sm:pl-6 pt-3 sm:pt-0">
          <p className="text-xs text-[#9B9B98]">Category average</p>
          <p className="font-mono-num text-2xl font-semibold text-[#9B9B98] mt-0.5">24.0%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Reasons bar */}
        <div className="bg-white rounded-xl border border-[#E8E8E4] p-5">
          <h2 className="text-sm font-semibold text-[#111111] mb-4">Return reasons</h2>
          <div className="space-y-3.5">
            {RETURN_REASONS.map((r) => (
              <div key={r.reason}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#6B6B68]">{r.reason}</span>
                  <span className="font-mono-num text-xs font-semibold text-[#111111]">{r.pct}%</span>
                </div>
                <div className="h-1.5 bg-[#F0F0EC] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-[#16A34A] transition-all" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By size */}
        <div className="bg-white rounded-xl border border-[#E8E8E4] p-5">
          <h2 className="text-sm font-semibold text-[#111111] mb-4">Return rate by size</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={RETURNS_BY_SIZE} barSize={28}>
              <CartesianGrid vertical={false} stroke="#F0F0EC" />
              <XAxis dataKey="size" tick={{ fontSize: 12, fill: "#6B6B68", fontFamily: "inherit" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9B9B98", fontFamily: "inherit" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} width={30} />
              <Tooltip content={<ChartTooltip suffix="%" />} cursor={{ fill: "#F7F6F3" }} />
              <Bar dataKey="returnRate" fill="#16A34A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per-product table */}
      <div className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F0F0EC]">
          <h2 className="text-sm font-semibold text-[#111111]">Return rate by product</h2>
          <p className="text-xs text-[#9B9B98] mt-0.5">Pause a listing to temporarily hide it from the marketplace</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-[#F0F0EC] bg-[#FAFAF8]">
                {["Product", "Return rate", "Top reason", "Returns", ""].map((h, i) => (
                  <th key={i} className="px-5 py-3 text-left text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PER_PRODUCT_RETURNS.map((p, i) => {
                const isPaused = paused.has(p.id);
                const product = SELLER_PRODUCTS.find((s) => s.id === p.id);
                return (
                  <tr key={p.id} className={`hover:bg-[#FAFAF8] transition-colors ${i !== PER_PRODUCT_RETURNS.length - 1 ? "border-b border-[#F0F0EC]" : ""}`}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#F0F0EC] shrink-0">
                          {product && <Image src={product.image} alt={p.name} width={32} height={32} className="object-cover w-full h-full" />}
                        </div>
                        <div>
                          <p className={`text-xs font-medium ${isPaused ? "text-[#9B9B98]" : "text-[#111111]"}`}>{p.name}</p>
                          {isPaused && <span className="text-[9px] text-[#9B9B98] bg-[#F0F0EC] px-1.5 py-0.5 rounded-md">Paused</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`font-mono-num text-xs font-semibold ${p.returnRate >= 25 ? "text-[#DC2626]" : "text-[#111111]"}`}>
                        {p.returnRate}%
                      </span>
                      {p.returnRate >= 25 && <span className="ml-1.5 text-[9px] text-[#DC2626]">↑ High</span>}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-[#6B6B68]">{p.topReason}</td>
                    <td className="px-5 py-3.5 font-mono-num text-xs text-[#6B6B68]">{p.returns}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => togglePause(p.id)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isPaused
                            ? "bg-[#F2F2F2] text-[#0A0A0A] border-[#E8E8E8] hover:border-[#0A0A0A]"
                            : "bg-white text-[#6B6B68] border-[#E8E8E4] hover:border-[#9B9B98]"
                        }`}>
                        {isPaused ? "Resume" : "Pause listing"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* By city */}
      <div className="bg-white rounded-xl border border-[#E8E8E4] p-5">
        <h2 className="text-sm font-semibold text-[#111111] mb-4">Return rate by city</h2>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={RETURNS_BY_CITY} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }} barSize={9}>
            <XAxis type="number" tick={{ fontSize: 11, fill: "#9B9B98", fontFamily: "inherit" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="city" tick={{ fontSize: 12, fill: "#6B6B68", fontFamily: "inherit" }} axisLine={false} tickLine={false} width={62} />
            <Tooltip content={<ChartTooltip suffix="%" />} cursor={{ fill: "#F7F6F3" }} />
            <Bar dataKey="returnRate" fill="#16A34A" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const TAB_META: Record<Tab, { title: string; description: string }> = {
  overview: { title: "Overview", description: "Your store at a glance — revenue, orders, and top performers." },
  products: { title: "Products", description: "Full performance breakdown across all 25 SKUs." },
  returns:  { title: "Returns",  description: "Understand why customers return and which products to watch." },
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const meta = TAB_META[activeTab];

  return (
    <div className="flex flex-col min-h-full">
      {/* Tab bar */}
      <div className="bg-white border-b border-[#E8E8E4]">
        <div className="flex items-center px-6 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-1.5 px-1 py-3.5 text-[11px] font-medium mr-5 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.key ? "text-[#111111]" : "text-[#9B9B98] hover:text-[#6B6B68]"
              }`}
            >
              <tab.icon size={12} strokeWidth={activeTab === tab.key ? 2 : 1.5} />
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0A0A0A] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="px-6 md:px-8 pt-6 pb-1">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-[#0A0A0A]">Take Two </span><span className="bg-gradient-to-r from-[#16A34A] to-[#4ADE80] bg-clip-text text-transparent">Analytics</span>
        </h1>
        <p className="text-xs tracking-wide text-[#9B9B98] mt-2">{meta.description}</p>
      </div>

      {/* Tab content */}
      <div className="flex-1 px-6 md:px-8 py-6">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "returns"  && <ReturnsTab />}
      </div>
    </div>
  );
}
