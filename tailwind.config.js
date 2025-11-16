/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playwright: ["Playwright CZ", "sans-serif"],
        stack: ["Stack Sans Notch", "sans-serif"],
      },
    },
  },
  plugins: [],
};
