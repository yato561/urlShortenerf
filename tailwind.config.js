/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1DB954",
        darkBg: "#0D1117",
        darkCard: "#161B22",
        sidebar: "#0f0f0f",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0px 0px 12px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

