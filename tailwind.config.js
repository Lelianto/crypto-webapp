/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/utils/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screen: {
      xs: '320px', // mobile
      sm: '576px', // mobile
      md: '768px', // tablet
      lg: '992px', // tablet
      xl: '1200px', // laptop
      '2xl': '1448px', // laptop
      '3xl': '1600px', // laptop
    },
    extend: {
      colors: () => ({
        'gray1': '#979797',
        'up': 'rgb(28, 203, 33)',
        'down': 'rgb(255, 90, 90)',
        'blue-light': '#DBEAFE',
        'blue-more': '#0A50E2'
      })
    },
  },
  plugins: [],
}
