"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HERO = "/products/pexels-tima-miroshnichenko-7202792.jpg";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/customer/home"), 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Link href="/customer/home" className="block relative" style={{ height: "844px" }}>
      {/* Full-bleed hero image */}
      <Image
        src={HERO}
        alt="Take Two — Sri Lanka Fashion"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient overlay — stronger at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Bottom copy block */}
      <div className="absolute bottom-0 left-0 right-0 px-7 pb-16">
        {/* Wordmark */}
        <p
          className="text-white/70 text-[11px] uppercase tracking-[0.3em] font-bold mb-4"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          TAKE TWO
        </p>

        {/* Tagline */}
        <p className="text-white text-[22px] font-light leading-snug">
          Sri Lanka&apos;s first collaborative online fashion platform.
        </p>

        {/* Subtle tap hint */}
        <p className="text-white/40 text-[11px] mt-5 tracking-wide">
          Tap anywhere to continue
        </p>
      </div>
    </Link>
  );
}
