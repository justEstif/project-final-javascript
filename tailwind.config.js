/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "netflix-background": 'url("/bg-1.jpg")',
      },
      fontFamily: {
        serif: ["Bebas Neue", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
