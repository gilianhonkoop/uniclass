/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        dark: {
          superlight: "#424242",
          extralight: "#333333",
          light: "#262626",
          DEFAULT: "#121212",
        },
        cgreen: {
          other: "#0cec09",
          DEFAULT: "#58b587",
        },
        red: {
          DEFAULT: "#E14169",
        },
        primary: {
          50: "#aabbf2",
          100: "#7f96e3",
          200: "#5475e4",
          DEFAULT: "#4169e1",
          dark: "#4a54bf",
        },
        secondary: {
          DEFAULT: "#E141B9",
        },
        background: {
          DEFAULT: "#f5f8ff",
          grey: "#ececf0",
        },
        gradient: {
          blue: "rgba(122, 167, 255, 0.32)",
          pink: "rgba(225, 65, 185, 0.32)",
          middle: "rgba(245, 246, 247, 1)",
        },
        test: {
          primary: "#0a21c0",
          secondary: "#050a44",
          darkgrey: "#2c2e3a",
          bg: "#FBFBFA",
          black: "#141619",
          lightgrey: "#f8f4fc",
        },

        test2: {
          bg: "#FDFDF6",
          black: "#1A1907",
          orange: "#FF9412",
          bg2: "#FBFBFA",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
