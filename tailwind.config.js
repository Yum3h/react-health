/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Arial', 'sans-serif'],
      },
      animation: {
        'slide-in': 'slideIn 0.5s forwards',
        'slide-out': 'slideOut 0.5s forwards',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
    },
  },
  plugins: [],
}
