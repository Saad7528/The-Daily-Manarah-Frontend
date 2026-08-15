import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-hind)", "var(--font-outfit)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-noto-serif)", "var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem", // 4px
        sm: "0.125rem",     // 2px
        md: "0.375rem",     // 6px
        lg: "0.5rem",       // 8px (MAX card rounded)
        xl: "0.5rem",       // Clamped to 8px max
        "2xl": "0.5rem",    // Clamped to 8px max
        "3xl": "0.5rem",    // Clamped to 8px max
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

