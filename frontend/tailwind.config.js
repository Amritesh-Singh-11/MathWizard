/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#090d16',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155'
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          900: '#164e63'
        },
        violet: {
          500: '#8b5cf6',
          600: '#7c3aed'
        }
      }
    },
  },
  plugins: [],
}
