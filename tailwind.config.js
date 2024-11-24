/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "satoshi-bold": ["Satoshi-Bold", "sans-serif"],
        "satoshi-regular": ["Satoshi-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
