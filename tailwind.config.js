/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fade: {
          "0%": { opacity: '1' },
          "50%": { opacity: "0.3" },
          "100%": { opacity: '1' },
        }
      },
      animation: {
        fade: 'fade 1.5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

