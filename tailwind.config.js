const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#21618C',
          light: '#2E86C1',
        },
        brand: {
          navy: '#21618C',
          mint: '#76D7C4',
          yellow: '#F9B44F',
        },
        accent: {
          DEFAULT: '#F9B44F',
          bright: '#F8C471',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          muted: '#F1F5F9',
        },
        border: {
          DEFAULT: '#E2E8F0',
        },
      },
      boxShadow: {
        card: '0 20px 45px rgba(27, 58, 92, 0.08)',
      },    },
  },
  plugins: [],
};
