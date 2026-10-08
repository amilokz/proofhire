/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts}',
    './lib/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(124, 58, 237, 0.25)',
        'card-lg': '0 24px 60px -20px rgba(124, 58, 237, 0.35)',
        pop: '0 18px 50px -16px rgba(124, 58, 237, 0.35)',
        glow: '0 8px 28px -8px rgba(139, 92, 246, 0.5)',
        'glow-lg': '0 14px 44px -10px rgba(139, 92, 246, 0.6)',
      },
    },
  },
  plugins: [],
};
