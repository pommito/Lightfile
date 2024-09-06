/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to top right, #1e3a8a, #1e3a8a, #172554)',
      },
    },
    plugins: [],
  },
};
