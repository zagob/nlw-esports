/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        galaxy: "url(/backgroundGalaxy.png)",
        "nlw-gradient":
          "linear-gradient(89.86deg, #9572fc 18.80%, #43e7ad 63.94%, #e1d55d 90.57%)",
        "game-gradient":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.88%)",
      },
    },
  },
  plugins: [],
};
