
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#124E38',
        'primary-light': '#1A6D4F',
        'primary-dark': '#0A3325',
        'secondary': '#0F3460',
        'success': '#28A745',
        'warning': '#FFC107',
        'danger': '#DC3545',
        'info': '#17A2B8',
      }
    },
  },
  plugins: [],
}
