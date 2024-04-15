/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {fontFamily: {
      yeseva: ["Yeseva One", "sans-serif"],
    }},
  },
  plugins: [],
}

