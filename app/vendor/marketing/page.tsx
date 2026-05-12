"use client";

import { useState } from "react";
import { products } from "@/data/products";
import {
  drops,
  ambassadorRequests,
  activeBoosts,
  type AmbassadorRequest,
} from "@/data/marketing-fixtures";
import {
  Zap,
  Tag,
  Calendar,
  Users,
  Check,
  X,
  ChevronRight,
  Flame,
} from "lucide-react";

const VENDOR_BRAND = "valley";
const brandProducts = products.filter((p) => p.brand === VENDOR_BRAND);

type Tab = "boost" | "sale" | "drops" | "ambassadors";

// ── Boost Tab ────────────────────────────────────────────────────────────────
function BoostTab() {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(brandProducts[0]?.id ?? "");
  const [placement, setPlacement] = useState("Home Hero");
  const [duration, setDuration] = useState("7");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log("Boost submitted:", { selectedProduct, placement, duration });
    setSubmitted(true);
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-4">
      {submitted && (
        <div className="flex items-center gap-2 bg-[#F0F3EC] border border-[#859365]/30 rounded-xl px-4 py-3">
          <Check size={14} className="text-[#859365]" />
          <p className="text-sm font-medium text-[#859365]">Boost request submitted!</p>
        </div>
      )}

      {/* Active boost */}
      {activeBoosts.map((boost) => (
        <div
          key={boost.id}
          className="bg-white rounded-2xl p-4 border border-[#F0F0F0] flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-[#FFF3E8] flex items-center justify-center shrink-0">
            <Flame size={18} className="text-[#ED832B]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#111111] truncate">{boost.productName}</p>
            <p className="text-xs text-[#999999] mt-0.5">
              {boost.placement} &middot; expires {new Date(boost.expiresAt).toLocaleDateString("en-LK", { day: "numeric", month: "short" })}
            </p>
          </div>
          <span className="text-[10px] font-bold bg-[#FFF3E8] text-[#ED832B] px-2 py-0.5 rounded-full shrink-0">
            {boost.daysRemaining}d left
          </span>
        </div>
      ))}

      {/* Boost form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-between bg-white rounded-2xl p-4 border border-[#F0F0F0] hover:border-[#ED832B]/40 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FFF3E8] flex items-center justify-center">
              <Zap size={14} className="text-[#ED832B]" />
            </div>
            <p className="text-sm font-semibold text-[#111111]">Boost a Product</p>
          </div>
          <ChevronRight size={16} className="text-[#999999]" />
        </button>
      ) : (
        <div className="bg-white rounded-2xl p-5 border border-[#ED832B]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111]">New Boost</h3>
            <button onClick={() => setShowForm(false)} className="cursor-pointer">
              <X size={16} className="text-[#999999]" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-wide text-[#999999] font-semibold block mb-1.5">
                Product
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full border border-[#E0E0E0] rounded-xl px-3 py-2.5 text-sm text-[#111111] bg-white focus:outline-none focus:ring-2 focus:ring-[#ED832B]/30"
              >
                {brandProducts.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wide text-[#999999] font-semibold block mb-1.5">
                Placement
              </label>
              <div className="flex gap-2">
                {["Home Hero", "2×2 Tile", "Shop Top"].map((pl) => (
                  <button
                    key={pl}
                    onClick={() => setPlacement(pl)}
                    className={`flex-1 text-xs font-semibold py-2 rounded-xl border transition-all cursor-pointer ${
                      placement === pl
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-white text-[#666666] border-[#E0E0E0]"
                    }`}
                  >
                    {pl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wide text-[#999999] font-semibold block mb-1.5">
                Duration
              </label>
              <div className="flex gap-2">
                {["3", "7", "14"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`flex-1 text-xs font-semibold py-2 rounded-xl border transition-all cursor-pointer ${
                      duration === d
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-white text-[#666666] border-[#E0E0E0]"
                    }`}
                  >
                    {d} days
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#ED832B] text-white text-sm font-bold py-3 rounded-xl cursor-pointer hover:bg-[#d6751f] transition-colors"
          >
            Submit Boost Request
          </button>
        </div>
      )}
    </div>
  );
}

// ── Sale Tab ─────────────────────────────────────────────────────────────────
function SaleTab() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [discount, setDiscount] = useState("15");

  const toggleProduct = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleSubmit = () => {
    console.log("Sale submitted:", { selected, discount });
    setSubmitted(true);
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-4">
      {submitted && (
        <div className="flex items-center gap-2 bg-[#F0F3EC] border border-[#859365]/30 rounded-xl px-4 py-3">
          <Check size={14} className="text-[#859365]" />
          <p className="text-sm font-medium text-[#859365]">Flash sale scheduled!</p>
        </div>
      )}

      {!showForm ? (
        <>
          {/* Empty state */}
          <div className="bg-[#FAFAFA] rounded-2xl p-6 text-center border border-dashed border-[#E0E0E0]">
            <Tag size={24} className="text-[#CCCCCC] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#999999]">No active sales</p>
            <p className="text-xs text-[#BBBBBB] mt-1">Run a flash sale to drive conversions</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="w-full flex items-center justify-between bg-white rounded-2xl p-4 border border-[#F0F0F0] hover:border-[#4A89C2]/40 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EBF2FA] flex items-center justify-center">
                <Tag size={14} className="text-[#4A89C2]" />
              </div>
              <p className="text-sm font-semibold text-[#111111]">Run a Flash Sale</p>
            </div>
            <ChevronRight size={16} className="text-[#999999]" />
          </button>
        </>
      ) : (
        <div className="bg-white rounded-2xl p-5 border border-[#4A89C2]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111]">New Flash Sale</h3>
            <button onClick={() => setShowForm(false)} className="cursor-pointer">
              <X size={16} className="text-[#999999]" />
            </button>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wide text-[#999999] font-semibold block mb-2">
              Discount %
            </label>
            <div className="flex gap-2">
              {["10", "15", "20", "30"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDiscount(d)}
                  className={`flex-1 text-xs font-semibold py-2 rounded-xl border transition-all cursor-pointer ${
                    discount === d
                      ? "bg-[#4A89C2] text-white border-[#4A89C2]"
                      : "bg-white text-[#666666] border-[#E0E0E0]"
                  }`}
                >
                  {d}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wide text-[#999999] font-semibold block mb-2">
              Products
            </label>
            <div className="space-y-2">
              {brandProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => toggleProduct(p.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selected.includes(p.id)
                      ? "border-[#4A89C2] bg-[#EBF2FA]"
                      : "border-[#E0E0E0] bg-white"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                      selected.includes(p.id) ? "border-[#4A89C2] bg-[#4A89C2]" : "border-[#CCCCCC]"
                    }`}
                  >
                    {selected.includes(p.id) && <Check size={10} className="text-white" />}
                  </div>
                  <span className="text-xs font-medium text-[#111111]">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className="w-full bg-[#4A89C2] text-white text-sm font-bold py-3 rounded-xl cursor-pointer hover:bg-[#3a78b1] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Schedule Sale
          </button>
        </div>
      )}
    </div>
  );
}

// ── Drops Tab ────────────────────────────────────────────────────────────────
function DropsTab() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const allDrops = drops;

  const handleSubmit = () => {
    console.log("Drop scheduled");
    setSubmitted(true);
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-4">
      {submitted && (
        <div className="flex items-center gap-2 bg-[#F0F3EC] border border-[#859365]/30 rounded-xl px-4 py-3">
          <Check size={14} className="text-[#859365]" />
          <p className="text-sm font-medium text-[#859365]">Drop scheduled!</p>
        </div>
      )}

      {allDrops.map((drop) => (
        <div
          key={drop.id}
          className="bg-white rounded-2xl p-4 border border-[#F0F0F0] flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F0F3EC] flex items-center justify-center shrink-0 text-center">
            <div>
              <p className="text-[10px] font-bold text-[#859365] leading-none">
                {new Date(drop.date).toLocaleDateString("en-LK", { day: "numeric" })}
              </p>
              <p className="text-[8px] text-[#859365] uppercase">
                {new Date(drop.date).toLocaleDateString("en-LK", { month: "short" })}
              </p>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#111111] truncate">{drop.name}</p>
            <p className="text-xs text-[#999999] mt-0.5">{drop.products.length} product(s)</p>
          </div>
          <span className="text-[10px] font-bold bg-[#F0F3EC] text-[#859365] px-2 py-0.5 rounded-full shrink-0 uppercase">
            {drop.status}
          </span>
        </div>
      ))}

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-between bg-white rounded-2xl p-4 border border-[#F0F0F0] hover:border-[#859365]/40 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F0F3EC] flex items-center justify-center">
              <Calendar size={14} className="text-[#859365]" />
            </div>
            <p className="text-sm font-semibold text-[#111111]">Schedule a Drop</p>
          </div>
          <ChevronRight size={16} className="text-[#999999]" />
        </button>
      ) : (
        <div className="bg-white rounded-2xl p-5 border border-[#859365]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#111111]">New Drop</h3>
            <button onClick={() => setShowForm(false)} className="cursor-pointer">
              <X size={16} className="text-[#999999]" />
            </button>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wide text-[#999999] font-semibold block mb-1.5">Drop name</label>
            <input
              type="text"
              placeholder="e.g. Summer Edit 2026"
              className="w-full border border-[#E0E0E0] rounded-xl px-3 py-2.5 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#859365]/30"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wide text-[#999999] font-semibold block mb-1.5">Drop date</label>
            <input
              type="date"
              className="w-full border border-[#E0E0E0] rounded-xl px-3 py-2.5 text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#859365]/30"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wide text-[#999999] font-semibold block mb-1.5">Product</label>
            <select className="w-full border border-[#E0E0E0] rounded-xl px-3 py-2.5 text-sm text-[#111111] bg-white focus:outline-none focus:ring-2 focus:ring-[#859365]/30">
              {brandProducts.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#859365] text-white text-sm font-bold py-3 rounded-xl cursor-pointer hover:bg-[#728055] transition-colors"
          >
            Schedule Drop
          </button>
        </div>
      )}
    </div>
  );
}

// ── Ambassadors Tab ──────────────────────────────────────────────────────────
function AmbassadorsTab() {
  const [requests, setRequests] = useState<AmbassadorRequest[]>(ambassadorRequests);

  const handleDecision = (id: string, decision: "approved" | "declined") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: decision } : r))
    );
  };

  const pending = requests.filter((r) => r.status === "pending");
  const resolved = requests.filter((r) => r.status !== "pending");

  return (
    <div className="space-y-4">
      {pending.length === 0 && resolved.length === 0 && (
        <div className="bg-[#FAFAFA] rounded-2xl p-6 text-center border border-dashed border-[#E0E0E0]">
          <Users size={24} className="text-[#CCCCCC] mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#999999]">No ambassador requests</p>
        </div>
      )}

      {pending.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#999999] font-semibold mb-3">
            Pending ({pending.length})
          </p>
          <div className="space-y-3">
            {pending.map((req) => (
              <div key={req.id} className="bg-white rounded-2xl p-4 border border-[#F0F0F0]">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: "#859365" }}
                  >
                    {req.avatarInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#111111]">{req.name}</p>
                    <p className="text-xs text-[#999999]">
                      {req.handle} &middot; {(req.followerCount / 1000).toFixed(1)}K followers &middot; {req.platform}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#666666] mb-3">
                  Wants to feature:{" "}
                  <span className="font-semibold text-[#111111]">{req.productName}</span>
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(req.id, "approved")}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#F0F3EC] text-[#859365] text-xs font-bold py-2.5 rounded-xl cursor-pointer hover:bg-[#E0EBD6] transition-colors"
                  >
                    <Check size={13} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(req.id, "declined")}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#FFF5F5] text-[#CC4444] text-xs font-bold py-2.5 rounded-xl cursor-pointer hover:bg-[#FFE8E8] transition-colors"
                  >
                    <X size={13} />
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resolved.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#999999] font-semibold mb-3">
            Resolved
          </p>
          <div className="space-y-2">
            {resolved.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-xl p-3 border border-[#F0F0F0] flex items-center gap-3 opacity-60"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: "#999999" }}
                >
                  {req.avatarInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#111111] truncate">{req.name}</p>
                  <p className="text-[10px] text-[#999999] truncate">{req.handle}</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    req.status === "approved"
                      ? "bg-[#F0F3EC] text-[#859365]"
                      : "bg-[#FFF5F5] text-[#CC4444]"
                  }`}
                >
                  {req.status === "approved" ? "Approved" : "Declined"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const TABS: { key: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
  { key: "boost",       label: "Boost",       icon: Zap,      badge: activeBoosts.length },
  { key: "sale",        label: "Sale",         icon: Tag },
  { key: "drops",       label: "Drops",        icon: Calendar, badge: drops.length },
  { key: "ambassadors", label: "Ambassadors",  icon: Users,    badge: ambassadorRequests.filter((r) => r.status === "pending").length },
];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("boost");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111111]">Marketing</h1>
        <p className="text-sm text-[#999999] mt-0.5">Grow your Valley brand</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 bg-[#F5F5F5] rounded-xl p-1">
        {TABS.map(({ key, label, icon: Icon, badge }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all relative cursor-pointer ${
              activeTab === key
                ? "bg-white text-[#111111] shadow-sm"
                : "text-[#999999] hover:text-[#666666]"
            }`}
          >
            <Icon size={13} />
            {label}
            {badge != null && badge > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#ED832B] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "boost"       && <BoostTab />}
      {activeTab === "sale"        && <SaleTab />}
      {activeTab === "drops"       && <DropsTab />}
      {activeTab === "ambassadors" && <AmbassadorsTab />}
    </div>
  );
}
