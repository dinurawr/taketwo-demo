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
        sans:       ["var(--font-inter)",    "Arial", "sans-serif"],
        display:    ["var(--font-barlow)",   "Arial", "sans-serif"], // condensed impact headlines
        serif:      ["var(--font-cormorant)","Georgia", "serif"],    // decorative serif
        script:     ["var(--font-dancing)",  "cursive"],             // script — "Two"
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
