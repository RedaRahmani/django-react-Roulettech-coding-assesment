/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-green':'rgb(241, 245, 241);'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}