/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    colors: {
      black: "#202427",
      red: "#e91e63",
      yellow: "#C8EF53",
      blue: "#4A46E9",
      white: "#ffffff",
    },
  },
  plugins: [],
};
