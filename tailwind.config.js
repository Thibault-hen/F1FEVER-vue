/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      backgroundColor: {
        'dark-1': '#1B1B1F',
        'dark-2': '#202127'
      }
    }
  },
  darkMode: 'class', // Enable dark mode using the .dark class
  plugins: []
}
