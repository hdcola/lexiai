/** @type {import('tailwindcss').Config} */

export default {
  content: ['.index.html', './src/**/*.{vue, js, ts, jsx, tsx}', "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        purple: {
          75: "#F1EAF8",
        },
        yellow: {
          50: "#fff9e7"
        }
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};

