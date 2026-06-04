import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // TakeTwo brand palette
        green:   "#859365",  // primary — "Take" green
        blue:    "#4A89C2",  // text / secondary — "Two" blue
        orange:  "#ED832B",  // accent / CTA
        ink:     "#111111",  // strong headlines
        muted:   "#666666",
        "muted-light": "#999999",
        "off-white": "#F8F8F6",
      },
      fontFamily: {
        // Three-family type system:
        //   Geist          → all functional UI
        //   Bodoni Moda    → editorial serif (The Iconic Canela-inspired)
        //   Barlow Condens → TAKETWO wordmark + impact display labels
        sans:    ["var(--font-geist)",    "Arial", "sans-serif"],
        display: ["var(--font-barlow)",   "Arial", "sans-serif"],
        serif:   ["var(--font-bodoni)",   "Georgia", "serif"],
        script:  ["var(--font-bodoni)",   "Georgia", "serif"], // legacy alias
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
