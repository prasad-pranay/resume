import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-8px)",
          },
        },

        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(3px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        float: "float 4s ease-in-out infinite",
        fadeIn: "fadeIn 300ms ease-out",
      },
    },
  },

  plugins: [],
};

export default config;