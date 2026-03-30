/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'rm-dark': '#24282f',
        'rm-green': '#97ce4c',
        'rm-blue': '#00b5cc',
      },
    },
  },
  plugins: [],
}