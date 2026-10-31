// Brand "drops" — the homepage hero carousel. Each slide is one brand's drop, with the
// drop name set in a display face chosen to match that brand's personality (the font
// variables are registered in app/layout.tsx).
//
// Imagery is real campaign / lifestyle photography (not packshots), hotlinked from the
// public Shopify CDNs the catalogue already uses. To self-host: node scripts/self-host-images.mjs
//   ts → Taylor Stitch   ab → Anine Bing   fb → Frankies Bikinis   fr → FARM Rio
const ts = (f: string) => `https://cdn.shopify.com/s/files/1/0070/1922/files/${f}`;
const ab = (f: string) => `https://cdn.shopify.com/s/files/1/0150/1528/files/${f}`;
const fb = (f: string) => `https://cdn.shopify.com/s/files/1/0158/2548/files/${f}`;

export type DropType = {
  /** CSS font-family value, e.g. "var(--font-drop-anton)" */
  family: string;
  /** px, sized for the 390px phone frame */
  size: number;
  weight: number;
  italic?: boolean;
  uppercase?: boolean;
  /** em */
  tracking?: number;
  leading?: number;
};

export type Drop = {
  id: string;
  brandId: string;
  /** Drop name shown on the slide */
  name: string;
  /** Small kicker above the title */
  kicker: string;
  type: DropType;
  image: string;
  /** CSS object-position for the hero crop */
  focus?: string;
};

export type DropTab = "WOMEN" | "MEN";

export const DROPS: Record<DropTab, Drop[]> = {
  WOMEN: [
    {
      id: "nilo-still-life",
      brandId: "nilo",
      name: "Still Life",
      kicker: "Drop 07",
      // Fraunces italic — refined, considered
      type: { family: "var(--font-drop-fraunces)", size: 58, weight: 600, italic: true, tracking: -0.02, leading: 0.95 },
      // Anine Bing campaign — blue shirt on a Paris staircase
      image: ab("MOBILE_1_8d5f8f87-ee47-4397-8983-7e29a930d3e6.jpg"),
      focus: "50% 18%",
    },
    {
      id: "halcyon-high-summer",
      brandId: "halcyon",
      name: "High Summer",
      kicker: "Drop 12",
      // DM Serif Display italic — sun-soaked, glamorous
      type: { family: "var(--font-drop-dmserif)", size: 56, weight: 400, italic: true, tracking: -0.01, leading: 0.95 },
      // Frankies Bikinis campaign — striped bikini, sunset sea
      image: fb("Fall-27-Tile-4.jpg"),
      focus: "50% 22%",
    },
    {
      id: "ember-nocturne",
      brandId: "ember",
      name: "Nocturne",
      kicker: "Drop 04",
      // Anton — loud, condensed, statement
      type: { family: "var(--font-drop-anton)", size: 64, weight: 400, uppercase: true, tracking: 0.01, leading: 0.9 },
      // Anine Bing campaign — black strapless + leather bag
      image: ab("MOBILE_7_f9edf44d-f913-4283-8d66-fa9ca7dfaef4.jpg"),
      focus: "50% 12%",
    },
  ],
  MEN: [
    {
      id: "valley-golden-hour",
      brandId: "valley",
      name: "Golden Hour",
      kicker: "Drop 09",
      // Bricolage Grotesque — warm, characterful everyday sans
      type: { family: "var(--font-drop-bricolage)", size: 56, weight: 800, tracking: -0.04, leading: 0.92 },
      // Taylor Stitch campaign — indigo pullover, golden light by the water
      image: ts("Q226_the-baja-pullover-in-washed-indigo-terry_pdp_02.jpg"),
      focus: "50% 12%",
    },
    {
      id: "north-lane-off-grid",
      brandId: "north-lane",
      name: "Off-Grid",
      kicker: "Drop 03",
      // Space Grotesk — modern, technical, minimal
      type: { family: "var(--font-drop-space)", size: 56, weight: 700, tracking: -0.05, leading: 0.92 },
      // Taylor Stitch campaign — riding a gravel road through the trees
      image: ts("Q426_TheShoreShirt-SaddleCheckWool_PDP_003.jpg"),
      focus: "50% 14%",
    },
    {
      id: "ember-after-hours",
      brandId: "ember",
      name: "After Hours",
      kicker: "Drop 05",
      type: { family: "var(--font-drop-anton)", size: 60, weight: 400, uppercase: true, tracking: 0.01, leading: 0.9 },
      // Taylor Stitch campaign — moody window light
      image: ts("instock_m_q326_eastmoor-cardigan-oatmeal-wool_portrait_003.jpg"),
      focus: "50% 14%",
    },
  ],
};
