import { orders } from "@/data/orders";
import { products } from "@/data/products";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const VENDOR_BRAND = "valley";

const allOrders = orders.filter((o) => o.items.some((i) => i.brand === VENDOR_BRAND));
const completedOrders = allOrders.filter((o) => o.status === "completed");
const returningOrders = allOrders.filter((o) => o.status === "returning" || o.status === "pending_verdict");
const totalRevenue = completedOrders.reduce((s, o) => s + o.total, 0);
const returnRate = allOrders.length ? Math.round((returningOrders.length / allOrders.length) * 100) : 0;

const weeklyData = [
  { week: "W1 Apr", orders: 4, revenue: 62000 },
  { week: "W2 Apr", orders: 7, revenue: 98500 },
  { week: "W3 Apr", orders: 5, revenue: 71000 },
  { week: "W4 Apr", orders: 9, revenue: 134000 },
  { week: "W1 May", orders: 6, revenue: 89500 },
];

const maxRevenue = Math.max(...weeklyData.map((d) => d.revenue));

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111111]">Analytics</h1>
        <p className="text-sm text-[#999999] mt-0.5">Valley store performance overview</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Orders", value: allOrders.length, trend: "+23%", up: true },
          { label: "Revenue (completed)", value: `LKR ${totalRevenue.toLocaleString()}`, trend: "+18%", up: true },
          { label: "Return Rate", value: `${returnRate}%`, trend: "-2%", up: false },
          { label: "Products Listed", value: products.filter((p) => p.brand === VENDOR_BRAND).length, trend: "—", up: null },
        ].map(({ label, value, trend, up }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-[#F0F0F0]">
            <p className="text-xs text-[#999999] uppercase tracking-wide mb-2">{label}</p>
            <p className="text-xl font-bold text-[#4A89C2]">{value}</p>
            <div className="flex items-center gap-1 mt-1">
              {up === true && <TrendingUp size={12} className="text-[#859365]" />}
              {up === false && <TrendingDown size={12} className="text-[#ED832B]" />}
              {up === null && <Minus size={12} className="text-[#999999]" />}
              <span className={`text-[11px] font-medium ${up === true ? "text-[#859365]" : up === false ? "text-[#ED832B]" : "text-[#999999]"}`}>
                {trend} vs last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart (CSS bar chart) */}
      <div className="bg-white rounded-2xl p-5 mb-6 border border-[#F0F0F0]">
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

      {/* Top products */}
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
