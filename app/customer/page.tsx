import Image from "next/image";
import Link from "next/link";

const OUTFIT_IMAGE =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85";

type Callout = {
  brand: string;
  item: string;
  color: string;
  productId: string;
  label: { top: string; left?: string; right?: string };
  start: { x: number; y: number };
  end: { x: number; y: number };
  ctrl: { x: number; y: number };
};

const callouts: Callout[] = [
  {
    brand: "Nilo",
    item: "Ribbed Tee",
    color: "#4A89C2",
    productId: "nilo-ribbed-tee",
    label: { top: "7%", left: "4%" },
    start: { x: 20, y: 12 },
    end: { x: 47, y: 28 },
    ctrl: { x: 26, y: 22 },
  },
  {
    brand: "Ember",
    item: "Statement Jacket",
    color: "#ED832B",
    productId: "ember-red-jacket",
    label: { top: "10%", right: "4%" },
    start: { x: 80, y: 15 },
    end: { x: 64, y: 48 },
    ctrl: { x: 82, y: 35 },
  },
  {
    brand: "Valley",
    item: "Knit Polo",
    color: "#859365",
    productId: "valley-knit-polo",
    label: { top: "75%", left: "4%" },
    start: { x: 22, y: 78 },
    end: { x: 48, y: 62 },
    ctrl: { x: 26, y: 70 },
  },
  {
    brand: "Halcyon",
    item: "Wrap Top",
    color: "#C49A6C",
    productId: "halcyon-wrap-top",
    label: { top: "80%", right: "4%" },
    start: { x: 78, y: 82 },
    end: { x: 52, y: 88 },
    ctrl: { x: 72, y: 90 },
  },
];

export default function OOTDSplash() {
  return (
    /* h-full fills the PhoneFrame's scrollable area exactly — no scroll, full bleed */
    <div className="relative h-full w-full overflow-hidden bg-black">

      {/* Full-bleed outfit photo */}
      <Image
        src={OUTFIT_IMAGE}
        alt="Today's outfit"
        fill
        className="object-cover object-top"
        priority
      />

      {/* Subtle gradient so labels are readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* SVG curved arrows */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {callouts.map((c, i) => (
          <g key={i}>
            <path
              d={`M ${c.start.x} ${c.start.y} Q ${c.ctrl.x} ${c.ctrl.y} ${c.end.x} ${c.end.y}`}
              fill="none"
              stroke="white"
              strokeWidth="0.35"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={c.end.x} cy={c.end.y} r="0.6" fill="white" />
          </g>
        ))}
      </svg>

      {/* Callout labels */}
      {callouts.map((c) => (
        <Link
          key={c.productId}
          href={`/customer/product/${c.productId}`}
          className="absolute"
          style={{ top: c.label.top, left: c.label.left, right: c.label.right }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: c.color }}
            />
            <span
              className="text-[17px] font-bold text-white leading-none"
              style={{
                fontFamily: "var(--font-dancing)",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              {c.brand}
            </span>
          </div>
          <span
            className="block text-[9px] text-white/70 italic mt-0.5 ml-3"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {c.item}
          </span>
        </Link>
      ))}

      {/* Enter arrow — bottom centre */}
      <Link
        href="/customer/home"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
        style={{ cursor: "default" }}
      >
        <span className="text-[#111111] text-xl font-bold" style={{ lineHeight: 1 }}>
          →
        </span>
      </Link>
    </div>
  );
}
