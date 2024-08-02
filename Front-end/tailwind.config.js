/** @type {import('tailwindcss').Config} */
module.exports = {
  // Define the paths to all of your template files
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Extend the default theme
  theme: {
    extend: {
      // Extend colors
      colors: {
        primary: "#1DA1F2",
        secondary: "#14171A",
        accent: "#657786",
        "new-gray": "rgba(0, 106, 255, 0.05)",
        "new-blue": "rgb(0, 106, 255)",
        "blue-checked": "#D3E2FE",
        "light-gray": "#AAB8C2",
        "extra-light-gray": "#E1E8ED",
        "extra-extra-light-gray": "#F5F8FA",
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#B63E96",
        primaryDark: "#58E6D9",
      },
      // Extend spacing
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      // Extend font sizes
      fontSize: {
        xxs: "0.65rem",
      },
      // Extend other properties
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "inner-xl": "inset 0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      // Add custom fonts
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
};
