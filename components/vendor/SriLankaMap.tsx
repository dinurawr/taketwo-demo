"use client";

import { useState } from "react";
import type { GeoSlice } from "@/data/vendor-stats";

interface Props {
  data: GeoSlice[];
}

// Simplified province shapes as rectangles + polygons arranged to roughly
// resemble Sri Lanka's geographic layout. Province centres are approximate.
// All coordinates are within a 200×300 viewBox.
const PROVINCES: {
  name: string;
  // polygon points string for SVG
  points: string;
  // label position
  lx: number;
  ly: number;
}[] = [
  // Northern — thin top strip
  {
    name: "Northern",
    points: "70,0 130,0 140,55 95,65 60,55",
    lx: 100,
    ly: 28,
  },
  // North Central — below northern, centre
  {
    name: "North Central",
    points: "60,55 95,65 140,55 145,115 55,115",
    lx: 100,
    ly: 88,
  },
  // North Western — left coast upper
  {
    name: "North Western",
    points: "10,60 60,55 55,115 20,130 5,100",
    lx: 32,
    ly: 92,
  },
  // Eastern — right coast
  {
    name: "Eastern",
    points: "140,55 185,70 190,150 155,165 145,115",
    lx: 162,
    ly: 112,
  },
  // Western — left coast lower (Colombo)
  {
    name: "Western",
    points: "20,130 55,115 60,160 45,175 15,160",
    lx: 37,
    ly: 148,
  },
  // Central — inland, middle
  {
    name: "Central",
    points: "55,115 145,115 150,165 100,185 50,165",
    lx: 100,
    ly: 150,
  },
  // Sabaragamuwa — below central-left
  {
    name: "Sabaragamuwa",
    points: "45,175 60,160 100,185 90,215 40,205",
    lx: 65,
    ly: 195,
  },
  // Uva — right inland lower
  {
    name: "Uva",
    points: "100,185 150,165 155,165 160,215 105,225",
    lx: 130,
    ly: 198,
  },
  // Southern — bottom coast
  {
    name: "Southern",
    points: "40,205 90,215 105,225 95,285 30,270 20,245",
    lx: 65,
    ly: 250,
  },
];

export function SriLankaMap({ data }: Props) {
  const [tooltip, setTooltip] = useState<{ name: string; orders: number } | null>(null);

  const maxOrders = Math.max(...data.map((d) => d.orderCount), 1);
  const getOrders = (name: string) =>
    data.find((d) => d.province === name)?.orderCount ?? 0;

  return (
    <div className="relative select-none">
      <svg
        viewBox="0 0 200 300"
        className="w-full"
        style={{ maxHeight: 240 }}
      >
        {PROVINCES.map(({ name, points, lx, ly }) => {
          const orders = getOrders(name);
          const intensity = maxOrders > 0 ? orders / maxOrders : 0;
          // Base fill: #859365 (green) at varying opacity
          const opacity = 0.15 + intensity * 0.75;

          return (
            <g key={name}>
              <polygon
                points={points}
                fill="#859365"
                fillOpacity={opacity}
                stroke="#ffffff"
                strokeWidth="1.5"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setTooltip({ name, orders })}
                onMouseLeave={() => setTooltip(null)}
              />
              {/* Province label — only show if big enough */}
              {orders > 0 && (
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  fontSize="7"
                  fill={intensity > 0.5 ? "#ffffff" : "#555555"}
                  fontWeight="600"
                  pointerEvents="none"
                >
                  {orders}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute top-2 right-2 bg-[#111111] text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none">
          <p className="text-white/60 font-normal">{tooltip.name}</p>
          <p>{tooltip.orders} orders</p>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 mt-2 justify-center">
        <div className="flex gap-0.5 items-center">
          {[0.15, 0.35, 0.55, 0.75, 0.9].map((op) => (
            <div
              key={op}
              className="w-4 h-2.5"
              style={{ backgroundColor: "#859365", opacity: op }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-[#999999] gap-6">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
