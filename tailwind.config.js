/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMt";

export default withMT({
  content: ['.index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
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
  plugins: [],
});

