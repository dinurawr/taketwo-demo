import Image from "next/image";
import Link from "next/link";

// 7 verified product images repurposed as lifestyle shots for the bento grid
const BENTO = [
  { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80", alt: "Linen co-ord" },
  { src: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80", alt: "Sundress" },
  { src: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80", alt: "Summer shirt" },
  { src: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80", alt: "Ribbed tee" },
  { src: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80", alt: "Trench coat" },
  { src: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80", alt: "Statement jacket" },
  { src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", alt: "Graphic tee" },
];

export default function Splash() {
  return (
    <div className="flex flex-col min-h-full bg-white pb-8">

      {/* ── Bento masonry grid ─────────────────────────────── */}
      <div
        className="px-3 pt-3"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "140px 100px 100px",
          gap: 6,
        }}
      >
        {/* Tall left cell — rows 1-2 */}
        <div style={{ gridColumn: "1", gridRow: "1 / 3" }} className="relative rounded-[16px] overflow-hidden">
          <Image src={BENTO[0].src} alt={BENTO[0].alt} fill className="object-cover" sizes="120px" priority />
        </div>

        {/* Top centre */}
        <div style={{ gridColumn: "2", gridRow: "1" }} className="relative rounded-[16px] overflow-hidden">
          <Image src={BENTO[1].src} alt={BENTO[1].alt} fill className="object-cover" sizes="120px" priority />
        </div>

        {/* Tall right cell — rows 1-2 */}
        <div style={{ gridColumn: "3", gridRow: "1 / 3" }} className="relative rounded-[16px] overflow-hidden">
          <Image src={BENTO[2].src} alt={BENTO[2].alt} fill className="object-cover" sizes="120px" priority />
        </div>

        {/* Centre middle */}
        <div style={{ gridColumn: "2", gridRow: "2" }} className="relative rounded-[16px] overflow-hidden">
          <Image src={BENTO[3].src} alt={BENTO[3].alt} fill className="object-cover" sizes="120px" />
        </div>

        {/* Wide bottom-left — cols 1-2 */}
        <div style={{ gridColumn: "1 / 3", gridRow: "3" }} className="relative rounded-[16px] overflow-hidden">
          <Image src={BENTO[4].src} alt={BENTO[4].alt} fill className="object-cover" sizes="240px" />
        </div>

        {/* Bottom right */}
        <div style={{ gridColumn: "3", gridRow: "3" }} className="relative rounded-[16px] overflow-hidden">
          <Image src={BENTO[5].src} alt={BENTO[5].alt} fill className="object-cover" sizes="120px" />
        </div>
      </div>

      {/* ── Hero typography ────────────────────────────────── */}
      <div className="px-6 pt-7 pb-2">
        <p
          className="text-[13px] text-[#859365] font-semibold uppercase tracking-[0.18em] mb-2"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          Sri Lanka&apos;s Fashion Platform
        </p>

        <h1 className="leading-tight">
          <span
            className="block text-[38px] text-[#111111]"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 600 }}
          >
            Discover the
          </span>
          <span
            className="block text-[44px] text-[#111111] leading-none"
            style={{ fontFamily: "var(--font-barlow)", fontWeight: 900, letterSpacing: "0.01em" }}
          >
            ART
          </span>
          <span
            className="block text-[38px] text-[#111111] leading-tight"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 600 }}
          >
            of Style
          </span>
        </h1>

        <p className="text-sm text-[#666666] mt-3 leading-relaxed">
          Discover independent Sri Lankan brands — curated in one place.
        </p>
      </div>

      {/* ── CTA ────────────────────────────────────────────── */}
      <div className="px-6 pt-5">
        <Link
          href="/customer/home"
          className="w-full flex items-center justify-center gap-2 bg-[#859365] text-white rounded-full py-3.5 text-sm font-semibold shadow-md"
        >
          Get Started
          <span className="text-base">→</span>
        </Link>
      </div>

      {/* ── 7th photo strip below CTA ─────────────────────── */}
      <div className="px-3 pt-5">
        <div className="relative h-24 rounded-[16px] overflow-hidden">
          <Image
            src={BENTO[6].src}
            alt={BENTO[6].alt}
            fill
            className="object-cover object-center"
            sizes="360px"
          />
          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
            <span
              className="text-white text-[11px] uppercase tracking-[0.22em] font-semibold"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              New Arrivals Every Week
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
