"use client";

import { OrdersTable } from "@/components/vendor/OrdersTable";
import { getOrdersByStatus } from "@/data/orders";
import type { Order } from "@/data/orders";

export default function ReturningPage() {
  const orders = getOrdersByStatus("returning");

  const handleAction = (order: Order) => {
    alert(`Demo: Order ${order.id} → package received. Moving to "Pending Verdict" for inspection.`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111111]">Currently Returning</h1>
        <p className="text-sm text-[#999999] mt-0.5">
          {orders.length} return{orders.length !== 1 ? "s" : ""} in transit back to warehouse
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Returns In Transit", value: orders.length, color: "#ED832B" },
          { label: "Value at Risk", value: `LKR ${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, color: "#ED832B" },
          { label: "Most Common Reason", value: "Sizing", color: "#999999" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-[#F0F0F0]">
            <p className="text-xs text-[#999999] uppercase tracking-wide mb-1">{label}</p>
            <p className="text-xl font-bold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl overflow-hidden border border-[#F0F0F0]">
        <OrdersTable
          orders={orders}
          onAction={handleAction}
          actionLabel="Package Received"
          actionColor="#ED832B"
          showReturnReason
        />
      </div>
    </div>
  );
}
