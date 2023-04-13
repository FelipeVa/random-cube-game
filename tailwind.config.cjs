/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /grid-(cols|rows)-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
