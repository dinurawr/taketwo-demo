import Image from "next/image";
import Link from "next/link";

// Flat-lay fashion editorial — no model, clothes arranged on neutral background
const OUTFIT_IMAGE =
  "https://images.unsplash.com/photo-1739384879592-79903b12b2a6?w=900&q=85";

type Callout = {
  brand: string;
  item: string;
  color: string;
  productId: string;
  label: { top: string; left?: string; right?: string };
  lineStart: { x: number; y: number };
  lineEnd: { x: number; y: number };
};

const callouts: Callout[] = [
  {
    brand: "Nilo",
    item: "Ribbed Tee",
    color: "#4A89C2",
    productId: "nilo-ribbed-tee",
    label: { top: "6%", left: "3%" },
    lineStart: { x: 23, y: 13 },
    lineEnd: { x: 43, y: 28 },
  },
  {
    brand: "Ember",
    item: "Statement Jacket",
    color: "#ED832B",
    productId: "ember-red-jacket",
    label: { top: "10%", right: "3%" },
    lineStart: { x: 77, y: 17 },
    lineEnd: { x: 60, y: 36 },
  },
  {
    brand: "Valley",
    item: "Summer Shirt",
    color: "#859365",
    productId: "valley-summer-shirt",
    label: { top: "72%", left: "3%" },
    lineStart: { x: 22, y: 77 },
    lineEnd: { x: 44, y: 63 },
  },
  {
    brand: "Halcyon",
    item: "Wrap Top",
    color: "#C49A6C",
    productId: "halcyon-wrap-top",
    label: { top: "76%", right: "3%" },
    lineStart: { x: 78, y: 82 },
    lineEnd: { x: 56, y: 72 },
  },
];

export default function OOTDSplash() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F5F2EE]">

      {/* Flat-lay outfit photo */}
      <Image
        src={OUTFIT_IMAGE}
        alt="Today's outfit"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Soft vignette so labels pop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />

      {/* Techie straight arrows with sharp arrowheads */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <marker
            id="tip"
            markerWidth="5"
            markerHeight="5"
            refX="4"
            refY="2.5"
            orient="auto"
          >
            <polygon points="0 0.5, 4.5 2.5, 0 4.5" fill="white" />
          </marker>
          <marker
            id="tip-dark"
            markerWidth="5"
            markerHeight="5"
            refX="4"
            refY="2.5"
            orient="auto"
          >
            <polygon points="0 0.5, 4.5 2.5, 0 4.5" fill="rgba(0,0,0,0.7)" />
          </marker>
        </defs>
        {callouts.map((c, i) => (
          <g key={i}>
            {/* Hair-thin line from label to item */}
            <line
              x1={c.lineStart.x}
              y1={c.lineStart.y}
              x2={c.lineEnd.x}
              y2={c.lineEnd.y}
              stroke="white"
              strokeWidth="0.45"
              markerEnd="url(#tip)"
              vectorEffect="non-scaling-stroke"
            />
            {/* Tiny square tick at label origin */}
            <rect
              x={c.lineStart.x - 0.55}
              y={c.lineStart.y - 0.55}
              width="1.1"
              height="1.1"
              fill="white"
            />
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
          <div
            className="text-[16px] font-bold text-white leading-none"
            style={{
              fontFamily: "var(--font-dancing)",
              textShadow: "0 1px 6px rgba(0,0,0,0.55)",
            }}
          >
            {c.brand}
          </div>
          <div
            className="text-[8px] text-white/65 uppercase tracking-[0.12em] mt-0.5"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              textShadow: "0 1px 4px rgba(0,0,0,0.45)",
            }}
          >
            {c.item}
          </div>
        </Link>
      ))}

      {/* OOTD label — top centre */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <span
          className="text-[11px] text-white/60 uppercase tracking-[0.2em] font-medium"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          OOTD
        </span>
      </div>

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
