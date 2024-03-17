/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        subTitle: "32px",
      },
      fontFamily: {
        body: ["Hind Guntur"],
        compressed: ["Oswald"],
      },
      backgroundImage: {
        popularSectionBg: "url(./public/cinema.jpg)",
      },
      colors: {
        black: "#1c1c1c",
        white: "#f4f4f4",
        accent: "#fee715",
        blueNight: "#032440",
      },
    },
  },
  plugins: [],
};
