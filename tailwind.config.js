/** @type {import('tailwindcss').Config} */

export default {
  content: ['.index.html', './src/**/*.{vue, js, ts, jsx, tsx}', "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#dbeafe"
        },
        orange: {
          100: "#ffedd5"
        },
        purple: {
          100: "#f3e8ff",
          400: "#c084fc"
        }
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};

