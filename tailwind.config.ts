import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      brandBlue: "#4A3AFF",
      white: "#ffffff",
      gray: "#f1f1f1",
      red: "#ff0000",
      darkBlue: "#1F3060",
      lightGray: "#D4D4D4",
      lightBlue: "#6F6C90",
      labelBlue: "#170F49",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "url('/assets/bg.svg')",
      },
    },
  },
  plugins: [require("daisyui")],
  colors: {
    yellow: "#FCB223",
  },
};
export default config;
