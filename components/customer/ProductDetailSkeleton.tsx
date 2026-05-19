"use client";

/**
 * Layout-matched skeleton for the product detail page.
 * Blocks mirror the real page's hero, brand bar, title, price, swatches,
 * size row, and CTA. Shimmer is a subtle 1.4s diagonal sweep (see globals.css).
 */
export function ProductDetailSkeleton({ brandColor }: { brandColor?: string }) {
  const baseBlock = "shimmer bg-[#EFEFEF]";

  return (
    <div className="absolute inset-0 bg-white z-30 overflow-hidden">
      {/* Hero placeholder — matches aspect-[3/4] of real image */}
      <div
        className={`${baseBlock} relative w-full`}
        style={{
          aspectRatio: "3 / 4",
          backgroundColor: brandColor
            ? `color-mix(in oklab, ${brandColor} 6%, #EFEFEF)`
            : undefined,
        }}
      />

      {/* Info panel — matches the rounded-t panel of the real page */}
      <div className="relative -mt-7 bg-white rounded-t-[28px] px-5 pt-6 pb-6">
        {/* Brand label */}
        <div className={`${baseBlock} h-3 w-24 rounded`} />

        {/* Title */}
        <div className={`${baseBlock} h-6 w-2/3 rounded mt-3`} />
        <div className={`${baseBlock} h-6 w-1/2 rounded mt-2`} />

        {/* Price */}
        <div className={`${baseBlock} h-5 w-24 rounded mt-4`} />

        {/* Colour-dot row */}
        <div className="flex items-center gap-2 mt-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`${baseBlock} w-7 h-7 rounded-full`} />
          ))}
        </div>

        {/* Size-button row */}
        <div className="flex items-center gap-2 mt-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`${baseBlock} h-10 flex-1 rounded`} />
          ))}
        </div>

        {/* CTA */}
        <div className={`${baseBlock} h-12 w-full rounded-full mt-6`} />

        {/* Accordion hints */}
        <div className="mt-6 space-y-3">
          <div className={`${baseBlock} h-3 w-32 rounded`} />
          <div className={`${baseBlock} h-3 w-28 rounded`} />
          <div className={`${baseBlock} h-3 w-36 rounded`} />
        </div>
      </div>
    </div>
  );
}
