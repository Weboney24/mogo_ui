/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        DMSans: ["DMSans", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#33325e",
        secondary: "#6aac43",
        light_gray: "#f7f7f7f",
      },
      screens: {
        largeMonitor: "1583px",
        smallLaptop: "1349px",
      },
    },
  },
  plugins: [],
};
