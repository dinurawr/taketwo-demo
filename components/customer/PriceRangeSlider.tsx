"use client";

import { useCallback } from "react";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
  step?: number;
}

function fmtLKR(n: number) {
  return "LKR " + n.toLocaleString("en-LK");
}

export function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
  step = 500,
}: PriceRangeSliderProps) {
  const [low, high] = value;

  const lowPct = ((low - min) / (max - min)) * 100;
  const highPct = ((high - min) / (max - min)) * 100;

  const handleLow = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Math.min(Number(e.target.value), high - step);
      onChange([v, high]);
    },
    [high, step, onChange]
  );

  const handleHigh = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Math.max(Number(e.target.value), low + step);
      onChange([low, v]);
    },
    [low, step, onChange]
  );

  return (
    <div className="px-5 py-6">
      {/* Current range label */}
      <p className="text-center text-[13px] font-semibold text-[#111] mb-6 tracking-wide">
        {fmtLKR(low)} &ndash; {fmtLKR(high)}
      </p>

      {/* Slider track container */}
      <div className="relative h-10 flex items-center">
        {/* Base track */}
        <div className="absolute left-0 right-0 h-[3px] bg-[#E5E5E5] rounded-full" />

        {/* Active range fill */}
        <div
          className="absolute h-[3px] bg-[#111111] rounded-full"
          style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
        />

        {/* Low thumb input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={handleLow}
          className="range-input absolute w-full"
          style={{ zIndex: lowPct > 90 ? 5 : 3 }}
        />

        {/* High thumb input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={handleHigh}
          className="range-input absolute w-full"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Min / Max labels */}
      <div className="flex justify-between mt-3">
        <span className="text-[11px] text-[#999]">{fmtLKR(min)}</span>
        <span className="text-[11px] text-[#999]">{fmtLKR(max)}</span>
      </div>
    </div>
  );
}
