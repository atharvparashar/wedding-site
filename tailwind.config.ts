import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0c",
        charcoal: "#151517",
        darkbrown: "#101011",
        gold: "#d6b36a",
        cream: "#f7f3eb",
      },
      fontFamily: { display: ["var(--font-cormorant)", "serif"], sans: ["var(--font-manrope)", "sans-serif"] },
      boxShadow: { gold: "0 0 40px rgba(214, 179, 106, .18)" },
    },
  },
  plugins: [],
};

export default config;
