/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slidein: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(100%) ",
          },
        },
      },
      animation: {
        slidein: "slidein 1s ease-in-out ",
      },
    },
  },
  plugins: [],
  corePlugins: {
    animation: true,
    transform: true,
  },
};
