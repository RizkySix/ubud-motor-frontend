/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js}'
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        gray: {
          "100": "#262626",
          "200": "#1e1e1e",
        },
        darkslategray: "#434343",
        deepskyblue: "#65aef2",
        gainsboro: "#d9d9d9",
        dimgray: "#5e5e5e",
        black: "#000",
        whitesmoke: "#f3f3f3",
        aliceblue: "#e9f3f6",
      },
      spacing: {},
      fontFamily: {
        inika: "Inika",
        inter: "Inter",
      },
      borderRadius: {
        "23xl": "42px",
        lg: "18px",
      },
    },
    fontSize: {
      "45xl": "64px",
      base: "16px",
      "xl": "20px",
      "5xl": "24px",
      "17xl": "36px",
      xs: "12px",
      "13xl": "32px",
      inherit: "inherit",
    },
  },
  plugins: [],
}

