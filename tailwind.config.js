/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js, jsx}"],
  theme: {
    extend: {
      colors: {
        'darkLamon': '#ffc800',
        'darkPanel': '#2a2930',
        'yellowText': '#f2c40e'
      },
      animation: {
        // 'hoverBounce': 'animation: hoverBounce 1s linear infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0.0, 0.9, 1)'
          },
          '50%': {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.0, 0.2, 1)'
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

