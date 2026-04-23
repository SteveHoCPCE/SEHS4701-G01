/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00f5ff",
          blue: "#0080ff",
          purple: "#8b00ff",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 15px rgba(0, 245, 255, 0.5)",
        "neon-strong": "0 0 25px rgba(0, 245, 255, 0.8)",
      },
    },
  },
  plugins: [],
};
