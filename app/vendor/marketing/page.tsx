"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import { Check, ChevronDown, ArrowRight } from "lucide-react";

const VENDOR_BRAND = "valley";
const brandProducts = products.filter((p) => p.brand === VENDOR_BRAND);

// ── Types ─────────────────────────────────────────────────────────────────────
type AdType    = "splash" | "fyp" | "search";
type TargetKey = "age" | "city" | "brands" | "cartSize" | "spend";

// ── Config ────────────────────────────────────────────────────────────────────
const AD_CONFIG: Record<AdType, { label: string; tagline: string; desc: string; baseRate: number }> = {
  splash: {
    label:    "Splash Ad",
    tagline:  "Before they enter the app",
    desc:     "Full-screen ad shown as the app loads. Every single user sees it before the session begins.",
    baseRate: 2500,
  },
  fyp: {
    label:    "FYP Boost",
    tagline:  "In their For You Page (FYP)",
    desc:     "Your product appears as a sponsored card in shoppers' personalised feed. Native format, high engagement.",
    baseRate: 1200,
  },
  search: {
    label:    "Search Boost",
    tagline:  "Top of search results",
    desc:     "Pin your product above all organic results when shoppers search relevant terms.",
    baseRate: 600,
  },
};

const DURATION_OPTIONS = [
  { days: 3,  label: "3 days",  multiplier: 0.5  },
  { days: 7,  label: "7 days",  multiplier: 1    },
  { days: 14, label: "14 days", multiplier: 1.75 },
  { days: 30, label: "30 days", multiplier: 3.2  },
];

const REACH_OPTIONS = [
  { value: 1_000,  label: "1K",  multiplier: 1   },
  { value: 5_000,  label: "5K",  multiplier: 2.2 },
  { value: 10_000, label: "10K", multiplier: 4   },
  { value: 25_000, label: "25K", multiplier: 8.5 },
];

const TARGETING_CONFIG: Record<TargetKey, { label: string; options: string[]; perOption: number }> = {
  age:      { label: "Age group",       options: ["18–24", "25–34", "35–44", "45+"],                                    perOption: 0.08 },
  city:     { label: "City",            options: ["Colombo", "Kandy", "Galle", "Jaffna", "Negombo", "Kurunegala"],      perOption: 0.06 },
  brands:   { label: "Follows brands",  options: ["Valley", "Minimal", "Ceylon Co.", "Batik House", "Coast & Thread"],  perOption: 0.05 },
  cartSize: { label: "Avg. cart size",  options: ["Under ₨5K", "₨5K – ₨15K", "₨15K+"],                                  perOption: 0.12 },
  spend:    { label: "Lifetime spend",  options: ["Under ₨25K", "₨25K – ₨100K", "₨100K+"],                              perOption: 0.15 },
};

// ── Mock active campaigns ─────────────────────────────────────────────────────
const ACTIVE_CAMPAIGNS = [
  {
    id: "c1", type: "FYP Boost", product: "Valley Cream Overshirt",
    daysLeft: 3, spent: 2_100, budget: 3_600, totalDays: 7,
    targeting: ["Colombo", "Kandy", "25–34", "35–44"],
    analytics: {
      impressions: 3_240, reach: 2_810, clicks: 486, ctr: 15.0,
      conversions: 29, revenue: 324_500, roas: 154.5, cpc: 4.3,
      daily: [420, 580, 650, 720, 870, 0, 0],
    },
  },
  {
    id: "c2", type: "Search Boost", product: "Valley Beach Cover Up",
    daysLeft: 6, spent: 840, budget: 2_100, totalDays: 7,
    targeting: ["Colombo", "₨5K – ₨15K"],
    analytics: {
      impressions: 1_820, reach: 1_650, clicks: 218, ctr: 12.0,
      conversions: 14, revenue: 112_000, roas: 133.3, cpc: 3.9,
      daily: [1_820, 0, 0, 0, 0, 0, 0],
    },
  },
];

// ── Phone mockups ─────────────────────────────────────────────────────────────
function SplashMockup({ active }: { active: boolean }) {
  return (
    <div className={`w-14 h-24 rounded-xl relative overflow-hidden shrink-0 transition-colors ${active ? "bg-[#111111]" : "bg-[#1A1A1A]"} border border-white/10`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
          <div className="w-4 h-4 rounded-md bg-white/50" />
        </div>
        <div className="w-10 h-0.5 bg-white/25 rounded" />
        <div className="w-6 h-0.5 bg-white/15 rounded" />
      </div>
      <div className="absolute bottom-2.5 left-2 right-2">
        <div className="h-0.5 bg-white/15 rounded-full">
          <div className="h-full bg-white/50 rounded-full" style={{ width: "65%" }} />
        </div>
      </div>
      <div className="absolute top-1.5 right-1.5 bg-white/15 rounded px-1 py-0.5">
        <span className="text-[5px] text-white/80 font-medium tracking-wide">AD</span>
      </div>
    </div>
  );
}

function FYPMockup({ active }: { active: boolean }) {
  return (
    <div className={`w-14 h-24 rounded-xl border overflow-hidden shrink-0 transition-colors ${active ? "border-[#111111]" : "border-[#E8E8E4]"} bg-white`}>
      <div className="p-1.5 space-y-1">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-2 h-2 rounded-full bg-[#E8E8E4]" />
          <div className="h-1 w-6 bg-[#E8E8E4] rounded" />
        </div>
        <div className="h-3 bg-[#F0F0EC] rounded" />
        <div className={`h-7 rounded relative transition-colors ${active ? "bg-[#111111]" : "bg-[#333]"}`}>
          <div className="absolute top-0.5 right-0.5 bg-white/20 rounded px-0.5">
            <span className="text-[4px] text-white leading-none">Sponsored</span>
          </div>
          <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-white/30 rounded" />
        </div>
        <div className="h-3 bg-[#F0F0EC] rounded opacity-60" />
        <div className="h-2.5 bg-[#F0F0EC] rounded opacity-30" />
      </div>
    </div>
  );
}

function SearchMockup({ active }: { active: boolean }) {
  return (
    <div className={`w-14 h-24 rounded-xl border overflow-hidden shrink-0 transition-colors ${active ? "border-[#111111]" : "border-[#E8E8E4]"} bg-white`}>
      <div className="p-1.5">
        <div className="h-2.5 bg-[#F0F0EC] rounded-full mb-2 flex items-center px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C8C8C4]" />
        </div>
        <div className={`h-7 rounded mb-1.5 relative px-1 flex flex-col justify-center gap-0.5 transition-colors ${active ? "bg-[#111111]" : "bg-[#222]"}`}>
          <div className="flex items-center gap-0.5">
            <div className="bg-white/20 rounded px-0.5 shrink-0">
              <span className="text-[4px] text-white/80 leading-tight">Ad</span>
            </div>
            <div className="h-0.5 flex-1 bg-white/50 rounded" />
          </div>
          <div className="h-0.5 w-2/3 bg-white/30 rounded" />
        </div>
        <div className="space-y-1">
          <div className="h-4 bg-[#F0F0EC] rounded" />
          <div className="h-4 bg-[#F0F0EC] rounded opacity-50" />
          <div className="h-3 bg-[#F0F0EC] rounded opacity-25" />
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MarketingPage() {
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);
  const [selectedType,  setSelectedType]  = useState<AdType | null>(null);
  const [productId,     setProductId]     = useState(brandProducts[0]?.id ?? "");
  const [durationDays,  setDurationDays]  = useState(7);
  const [reachValue,    setReachValue]    = useState(5_000);
  const [targeting,     setTargeting]     = useState<Partial<Record<TargetKey, string[]>>>({});
  const [openSections,  setOpenSections]  = useState<TargetKey[]>([]);
  const [toast,         setToast]         = useState("");

  const adConf   = selectedType ? AD_CONFIG[selectedType] : null;
  const durMult  = DURATION_OPTIONS.find((d) => d.days === durationDays)?.multiplier ?? 1;
  const reachMult = REACH_OPTIONS.find((r) => r.value === reachValue)?.multiplier ?? 1;

  const targetingBreakdown = useMemo(() => {
    return (Object.entries(targeting) as [TargetKey, string[]][])
      .filter(([, sel]) => sel.length > 0)
      .map(([key, sel]) => ({
        label: TARGETING_CONFIG[key].label,
        mult:  sel.length * TARGETING_CONFIG[key].perOption,
        count: sel.length,
      }));
  }, [targeting]);

  const totalTargetingMult = targetingBreakdown.reduce((s, t) => s + t.mult, 0);
  const baseCost           = adConf ? Math.round(adConf.baseRate * durMult * reachMult) : 0;
  const targetingCost      = Math.round(baseCost * totalTargetingMult);
  const totalCost          = baseCost + targetingCost;

  function toggleTarget(key: TargetKey, option: string) {
    setTargeting((prev) => {
      const cur = prev[key] ?? [];
      return { ...prev, [key]: cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option] };
    });
  }

  function toggleSection(key: TargetKey) {
    setOpenSections((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  }

  function handleLaunch() {
    setToast("Campaign launched! You'll see impressions in Analytics within 24 hours.");
    setSelectedType(null);
    setTargeting({});
    setOpenSections([]);
    setTimeout(() => setToast(""), 5000);
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-[#0A0A0A]">Take Two </span><span className="bg-gradient-to-r from-[#16A34A] to-[#4ADE80] bg-clip-text text-transparent">Ads</span>
        </h1>
        <p className="text-xs tracking-wide text-[#9B9B98] mt-2">Reach more shoppers — on their feed, in search, and before they open the app.</p>
      </div>

      {/* Toast */}
      {toast && (
        <div className="flex items-center gap-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-4 py-3 mb-6">
          <Check size={13} className="text-[#16A34A] shrink-0" />
          <p className="text-sm font-medium text-[#111111]">{toast}</p>
        </div>
      )}

      {/* Running campaigns */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
          <p className="text-[11px] font-semibold text-[#111111] uppercase tracking-widest">
            Running <span className="text-[#16A34A]">{ACTIVE_CAMPAIGNS.length}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {ACTIVE_CAMPAIGNS.map((c) => {
            const pct      = Math.round((c.spent / c.budget) * 100);
            const isOpen   = expandedCampaign === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setExpandedCampaign(isOpen ? null : c.id)}
                className={`text-left bg-white rounded-xl border p-4 transition-all cursor-pointer w-full ${
                  isOpen ? "border-[#111111] ring-1 ring-[#111111]" : "border-[#E8E8E4] hover:border-[#9B9B98]"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-medium text-[#111111]">{c.product}</p>
                    <p className="text-[11px] text-[#16A34A] font-medium mt-0.5">{c.type}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-md shrink-0 ${
                    c.daysLeft <= 3 ? "text-[#DC2626] bg-[#FEF2F2]" : "text-[#16A34A] bg-[#F0FDF4]"
                  }`}>
                    {c.daysLeft}d left
                  </span>
                </div>
                <div className="h-1 bg-[#F0F0EC] rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#111111] rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between">
                  <p className="font-mono-num text-[10px] text-[#9B9B98]">₨ {c.spent.toLocaleString()} spent</p>
                  <p className="font-mono-num text-[10px] text-[#9B9B98]">₨ {c.budget.toLocaleString()} budget</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Campaign analytics panel */}
        {expandedCampaign && (() => {
          const c = ACTIVE_CAMPAIGNS.find((x) => x.id === expandedCampaign)!;
          const a = c.analytics;
          const daysPast = c.totalDays - c.daysLeft;
          const maxBar   = Math.max(...a.daily.filter((v) => v > 0), 1);
          const kpis = [
            { label: "Impressions",       value: a.impressions.toLocaleString(),       sub: null,             green: false },
            { label: "Reach",             value: a.reach.toLocaleString(),             sub: "unique people",  green: false },
            { label: "Clicks",            value: a.clicks.toLocaleString(),            sub: null,             green: false },
            { label: "CTR",               value: `${a.ctr.toFixed(1)}%`,               sub: "click-through",  green: false },
            { label: "Conversions",       value: a.conversions.toLocaleString(),       sub: "purchases",      green: false },
            { label: "Rev. Attributed",   value: `₨ ${a.revenue.toLocaleString()}`,    sub: null,             green: true  },
            { label: "ROAS",              value: `${a.roas.toFixed(1)}×`,              sub: "return on spend", green: true  },
            { label: "Cost per Click",    value: `₨ ${a.cpc.toFixed(1)}`,             sub: null,             green: false },
          ];
          return (
            <div className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden">
              {/* Panel header */}
              <div className="px-5 py-4 border-b border-[#F0F0EC] bg-[#FAFAF8] flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#111111]">{c.product}</p>
                  <p className="text-[11px] text-[#9B9B98] mt-0.5">
                    {c.type} · Day {daysPast} of {c.totalDays} · {c.targeting.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => setExpandedCampaign(null)}
                  className="w-7 h-7 rounded-lg bg-[#F0F0EC] flex items-center justify-center cursor-pointer hover:bg-[#E8E8E4] transition-colors"
                >
                  <ChevronDown size={13} className="text-[#9B9B98]" />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* KPI grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {kpis.map(({ label, value, sub, green }) => (
                    <div key={label} className="bg-[#FAFAF8] rounded-xl p-3 border border-[#F0F0EC]">
                      <p className="text-[10px] font-medium text-[#9B9B98] uppercase tracking-widest mb-1.5">{label}</p>
                      <p className={`font-mono-num text-base font-semibold ${green ? "text-[#16A34A]" : "text-[#111111]"}`}>{value}</p>
                      {sub && <p className="text-[10px] text-[#9B9B98] mt-0.5">{sub}</p>}
                    </div>
                  ))}
                </div>

                {/* Daily impressions bar chart */}
                <div>
                  <p className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest mb-3">Daily impressions</p>
                  <div className="flex items-end gap-1.5 h-16">
                    {a.daily.map((val, i) => {
                      const isPast = i < daysPast;
                      const height = isPast ? Math.round((val / maxBar) * 100) : 0;
                      const isFuture = i >= daysPast;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full rounded-sm relative flex items-end" style={{ height: "52px" }}>
                            {isFuture ? (
                              <div className="w-full h-full rounded-sm border border-dashed border-[#E8E8E4]" />
                            ) : (
                              <div
                                className="w-full rounded-sm bg-[#111111] transition-all"
                                style={{ height: `${height}%`, minHeight: "3px" }}
                              />
                            )}
                          </div>
                          <p className="text-[9px] text-[#9B9B98]">D{i + 1}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-[10px] text-[#9B9B98]">Campaign start</p>
                    <p className="text-[10px] text-[#9B9B98]">Day {c.totalDays}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Ad type picker */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-3">
          <p className="text-[11px] font-semibold text-[#111111] uppercase tracking-widest">Create a campaign</p>
          <p className="text-[11px] text-[#9B9B98]">Choose your ad type to get started</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["splash", "fyp", "search"] as AdType[]).map((key) => {
            const conf   = AD_CONFIG[key];
            const active = selectedType === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedType(active ? null : key)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  active
                    ? "border-[#111111] bg-white ring-1 ring-[#111111]"
                    : "border-[#E8E8E4] bg-white hover:border-[#9B9B98]"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  {key === "splash" && <SplashMockup active={active} />}
                  {key === "fyp"    && <FYPMockup    active={active} />}
                  {key === "search" && <SearchMockup active={active} />}
                  {active && (
                    <div className="w-5 h-5 rounded-full bg-[#111111] flex items-center justify-center shrink-0">
                      <Check size={11} className="text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm font-semibold text-[#111111]">{conf.label}</p>
                <p className="text-[11px] text-[#16A34A] font-medium mt-0.5 leading-snug">{conf.tagline}</p>
                <p className="font-mono-num text-[11px] text-[#16A34A] font-semibold mt-2.5">
                  From ₨ {conf.baseRate.toLocaleString()}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Config + calculator */}
      {selectedType && adConf && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 items-start">

          {/* Left: config panels */}
          <div className="space-y-3">

            {/* Description */}
            <div className="bg-[#FAFAF8] rounded-xl border border-[#E8E8E4] px-4 py-3">
              <p className="text-xs text-[#6B6B68] leading-relaxed">{adConf.desc}</p>
            </div>

            {/* Product */}
            <div className="bg-white rounded-xl border border-[#E8E8E4] p-5">
              <p className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest mb-3">Product</p>
              <div className="space-y-2">
                {brandProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProductId(p.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      productId === p.id
                        ? "border-[#111111] bg-[#FAFAF8]"
                        : "border-[#E8E8E4] bg-white hover:border-[#9B9B98]"
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center shrink-0 ${
                      productId === p.id ? "border-[#111111] bg-[#111111]" : "border-[#C8C8C4]"
                    }`}>
                      {productId === p.id && <Check size={9} className="text-white" />}
                    </div>
                    <span className="text-xs font-medium text-[#111111]">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white rounded-xl border border-[#E8E8E4] p-5">
              <p className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest mb-3">Duration</p>
              <div className="flex gap-2">
                {DURATION_OPTIONS.map(({ days, label }) => (
                  <button
                    key={days}
                    onClick={() => setDurationDays(days)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      durationDays === days
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-white text-[#6B6B68] border-[#E8E8E4] hover:border-[#9B9B98]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience size */}
            <div className="bg-white rounded-xl border border-[#E8E8E4] p-5">
              <p className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest mb-3">Audience size</p>
              <div className="flex gap-2">
                {REACH_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setReachValue(value)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      reachValue === value
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-white text-[#6B6B68] border-[#E8E8E4] hover:border-[#9B9B98]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Targeting */}
            <div className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#F0F0EC]">
                <p className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest">Targeting</p>
                <p className="text-[11px] text-[#9B9B98] mt-0.5">Narrow your audience. Each filter adds a small premium.</p>
              </div>
              <div className="divide-y divide-[#F0F0EC]">
                {(Object.keys(TARGETING_CONFIG) as TargetKey[]).map((key) => {
                  const conf     = TARGETING_CONFIG[key];
                  const selected = targeting[key] ?? [];
                  const isOpen   = openSections.includes(key);
                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggleSection(key)}
                        className="w-full flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-[#FAFAF8] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-[#111111]">{conf.label}</span>
                          {selected.length > 0 && (
                            <span className="text-[10px] font-semibold text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded-md">
                              {selected.length}
                            </span>
                          )}
                        </div>
                        <ChevronDown
                          size={14}
                          className={`text-[#9B9B98] transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 flex flex-wrap gap-1.5">
                          {conf.options.map((option) => {
                            const on = selected.includes(option);
                            return (
                              <button
                                key={option}
                                onClick={() => toggleTarget(key, option)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                                  on
                                    ? "bg-[#111111] text-white border-[#111111]"
                                    : "bg-white text-[#6B6B68] border-[#E8E8E4] hover:border-[#9B9B98]"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: cost calculator */}
          <div className="lg:sticky lg:top-6">
            <div className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden">
              <div className="px-5 py-4 bg-[#FAFAF8] border-b border-[#F0F0EC]">
                <p className="text-[11px] font-medium text-[#9B9B98] uppercase tracking-widest">Cost estimate</p>
              </div>
              <div className="p-5">
                {/* Campaign summary */}
                <div className="space-y-2 pb-4 border-b border-[#F0F0EC]">
                  <div className="flex justify-between">
                    <span className="text-xs text-[#9B9B98]">Type</span>
                    <span className="text-xs font-medium text-[#111111]">{adConf.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-[#9B9B98]">Duration</span>
                    <span className="text-xs font-medium text-[#111111]">{durationDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-[#9B9B98]">Audience</span>
                    <span className="text-xs font-medium text-[#111111]">{reachValue.toLocaleString()} people</span>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="space-y-2 pt-4 pb-4 border-b border-[#F0F0EC]">
                  <div className="flex justify-between">
                    <span className="text-xs text-[#9B9B98]">Base</span>
                    <span className="font-mono-num text-xs text-[#6B6B68]">₨ {baseCost.toLocaleString()}</span>
                  </div>
                  {targetingBreakdown.map((t) => (
                    <div key={t.label} className="flex justify-between">
                      <span className="text-xs text-[#9B9B98]">{t.label} ×{t.count}</span>
                      <span className="font-mono-num text-xs text-[#16A34A]">
                        + ₨ {Math.round(baseCost * t.mult).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {targetingBreakdown.length === 0 && (
                    <p className="text-[10px] text-[#C8C8C4]">No targeting selected</p>
                  )}
                </div>

                {/* Total */}
                <div className="pt-4 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-[#111111]">Total</span>
                    <span className="font-mono-num text-2xl font-semibold text-[#111111]">
                      ₨ {totalCost.toLocaleString()}
                    </span>
                  </div>
                  {targetingCost > 0 && (
                    <p className="text-[10px] text-[#9B9B98] mt-0.5 text-right">
                      incl. ₨ {targetingCost.toLocaleString()} targeting
                    </p>
                  )}
                </div>

                <button
                  onClick={handleLaunch}
                  className="w-full flex items-center justify-center gap-2 bg-[#111111] text-white text-sm font-semibold py-3 rounded-xl cursor-pointer hover:bg-[#333333] transition-colors"
                >
                  Launch Campaign <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
