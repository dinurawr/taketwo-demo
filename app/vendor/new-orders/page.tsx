"use client";

import { OrdersTable } from "@/components/vendor/OrdersTable";
import { getOrdersByStatus } from "@/data/orders";
import type { Order } from "@/data/orders";

export default function NewOrdersPage() {
  const orders = getOrdersByStatus("new");

  const handleAction = (order: Order, _action: string) => {
    alert(`Demo: Order ${order.id} â†’ marked as "Dispatched". It will move to Shipping.`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#111111]">New Orders</h1>
        <p className="text-sm text-[#999999] mt-0.5">
          {orders.length} order{orders.length !== 1 ? "s" : ""} waiting to be dispatched
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
        {[
          { label: "Awaiting Dispatch", value: orders.length, color: "#4A89C2" },
          { label: "Total Value", value: `LKR ${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, color: "#859365" },
          { label: "Avg. Order Value", value: orders.length ? `LKR ${Math.round(orders.reduce((s, o) => s + o.total, 0) / orders.length).toLocaleString()}` : "â€”", color: "#999999" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-[#F0F0F0]">
            <p className="text-xs text-[#999999] uppercase tracking-wide mb-1">{label}</p>
            <p className="text-xl font-bold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden border border-[#F0F0F0]">
        <OrdersTable
          orders={orders}
          onAction={handleAction}
          actionLabel="Mark Dispatched"
          actionColor="#4A89C2"
        />
      </div>
    </div>
  );
}
