/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      backgroundColor: {
        'dark-1': '#1B1B1F',
        'dark-2': '#202127',
        gold: 'rgba(236, 195, 117, 0.5)',
        silver: 'rgba(71, 94, 138, 0.4)',
        bronze: 'rgba(119, 78, 55, 0.4)'
      },
      colors: {
        'dark-1': '#1B1B1F',
        'dark-2': '#202127',
        gold: 'rgba(236, 195, 117, 0.5)',
        silver: 'rgba(71, 94, 138, 0.4)',
        bronze: 'rgba(119, 78, 55, 0.4)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideInLeft: {
          from: {
            transform: 'translate3d(-100%, 0, 0)'
          },
          to: {
            transform: 'translate3d(0, 0, 0)'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn ease 0.4s',
        slideDown: 'slideInDown 0.3s',
        slideLeft: 'slideInLeft 0.3s'
      }
    }
  },
  darkMode: 'class', // Enable dark mode using the .dark class
  plugins: [require('@headlessui/tailwindcss')]
}
