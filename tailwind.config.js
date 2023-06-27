/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "375px", //mobile
      md: "768px",
      lg: "1020px",
      xl: "1440px", //desktop
    },
    extend: {
      colors: {
        BrightBlue: "hsl(220, 98%, 61%)",

        // Light theme
        VeryLightGray: "hsl(0, 0, 98%)",
        VeryLightGrayishBlue: "hsl(236, 33%, 92%)",
        LightGrayishBlue: "hsl(233, 11%, 84%)",
        DarkGrayishBlue: "hsl(236, 9%, 61%)",
        VeryDarkGrayishBlue: "hsl(235, 19%, 35%)",

        //Dark Theme
        VeryDarkBlue: "hsl(235, 21%, 11%)",
        VeryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        LightGrayishBlue2: "hsl(234, 39%, 85%)",
        LightGrayishBlueHover: "hsl(236, 33%, 92%)",
        DarkGrayishBlue2: "hsl(234, 11%, 52%)",
        VeryDarkGrayishBlue2: "hsl(233, 14%, 35%)",
        VeryDarkGrayishBlue3: "hsl(237, 14%, 26%)",
      },
      fontFamily: {
        sans: ["Josefin Sans", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "46rem",
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover"],
    },
  },
  plugins: [],
};
