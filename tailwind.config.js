/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981', // green for protein
          dark: '#059669',
        },
        amber: {
          DEFAULT: '#f59e0b', // carbs
        },
        blue: {
          DEFAULT: '#3b82f6', // fat
        },
        background: {
          DEFAULT: '#0a0a0a',
          card: '#1a1a1a',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a3a3a3',
        },
      },
    },
  },
  plugins: [],
};
