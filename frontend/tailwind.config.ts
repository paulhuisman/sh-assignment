import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Main colours
        "schiphol-blue": "#141251",
        "afternoon-blue": "#1b60db",
        "seebuyfly-yellow": "#f9c900",

        // Secondary colours
        "morning-pink": "#aa3191",
        "lightmorning-pink": "#ff8fb2",
        "lightmorning-blue": "#94b0ea",
        "dusk-green": "#027e9b",
        "dusk-blue": "#25d7f4",
        "evening-pink": "#6552a8",
        "evening-lilac": "#d285d6",

        // Greys
        black: "#000000",
        "grey-storm": "#706a8a",
        "grey-overcast": "#9491aa",
        "grey-broken": "#bfbdcc",
        "grey-scattered": "#eae9ee",
        "grey-few": "#f2f1f4",
        white: "#ffffff",

        // Signal colours
        "dark-red": "#d0021b",
        green: "#128a0b",
        "light-blue": "#eef6ff",
        "light-green": "#d0e8cf",
        "light-yellow": "#fdfbda",
      },
      fontFamily: {
        "neue-frutiger": ["NeueFrutigerWorld-Regular", "sans-serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
