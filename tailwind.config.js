/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#b3e0ff',
          500: '#0099ff',
          600: '#0077cc',
          700: '#005599',
        },
        secondary: {
          50: '#f5f5f5',
          100: '#e9e9e9',
          500: '#666666',
          700: '#333333',
        }
      },
    },
  },
  plugins: [],
}
