"use client";

import { OrdersTable } from "@/components/vendor/OrdersTable";
import { getOrdersByStatus } from "@/data/orders";
import type { Order } from "@/data/orders";

export default function PendingVerdictPage() {
  const orders = getOrdersByStatus("pending_verdict");

  const handleApprove = (order: Order) => {
    alert(`Demo: Order ${order.id} â†’ return APPROVED. Customer will be refunded LKR ${order.total.toLocaleString()}.`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#111111]">Pending Verdict</h1>
        <p className="text-sm text-[#999999] mt-0.5">
          {orders.length} return{orders.length !== 1 ? "s" : ""} awaiting inspection decision
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
        {[
          { label: "Awaiting Decision", value: orders.length, color: "#ED832B" },
          { label: "Total Disputed", value: `LKR ${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, color: "#ED832B" },
          { label: "Avg. Decision Time", value: "2.4 days", color: "#999999" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-[#F0F0F0]">
            <p className="text-xs text-[#999999] uppercase tracking-wide mb-1">{label}</p>
            <p className="text-xl font-bold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Note box */}
      <div className="mb-4 bg-[#FFF6EF] border border-[#ED832B]/30 rounded-2xl p-4">
        <p className="text-xs font-semibold text-[#ED832B] uppercase tracking-wide mb-1">Inspection Guide</p>
        <p className="text-xs text-[#999999]">
          Items are inspected on arrival at the warehouse. If the return is due to a product defect, the customer is refunded and you will be notified to recover costs. If the return is customer-initiated (wrong size, change of mind), it will be restocked.
        </p>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden border border-[#F0F0F0]">
        <OrdersTable
          orders={orders}
          onAction={handleApprove}
          actionLabel="Approve Return"
          actionColor="#ED832B"
          showReturnReason
        />
      </div>
    </div>
  );
}
