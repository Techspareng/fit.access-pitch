/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            500: '#4f46e5',
            600: '#4338ca',
            400: '#818cf8'
          }
        }
      }
    },
    plugins: [
      require('@tailwindcss/forms')
    ],
  }