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
        primary: {
          DEFAULT: "#4169e1",
          darkblue: "#0a21c0",
          bg: "#FBFBFA",
          dark: "#121212",
          black: "#141619",
          orange: "#FF9412",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
