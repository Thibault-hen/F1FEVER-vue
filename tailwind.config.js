/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      backgroundColor: {
        'dark-1': '#080808',
        'dark-2': '#121418',
        'light-1': '#F9F7F7',
        gold: 'rgba(236, 195, 117, 0.5)',
        silver: 'rgba(71, 94, 138, 0.4)',
        bronze: 'rgba(119, 78, 55, 0.4)'
      },
      colors: {
        'dark-1': '#080808',
        'dark-2': '#121418',
        primary: '#ef4444',
        gold: 'rgba(236, 195, 117, 0.5)',
        silver: 'rgba(71, 94, 138, 0.4)',
        bronze: 'rgba(119, 78, 55, 0.4)'
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
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
        },
        slideInLeftFadeIn: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        }
      },
      animation: {
        fadeInDown: 'fadeInDown ease 0.4s',
        fadeIn: 'fadeIn ease 0.3s',
        slideDown: 'slideInDown 0.3s',
        slideLeft: 'slideInLeft 0.3s',
        slideInLeftFadeIn: 'slideInLeftFadeIn 0.3s ease-out'
      }
    }
  },
  darkMode: 'class', // Enable dark mode using the .dark class
  plugins: [require('@headlessui/tailwindcss')]
}
