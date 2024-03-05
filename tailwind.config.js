/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Hind Guntur"],
        compressed: ["Oswald"],
      },
    },
  },
  plugins: [],
};
