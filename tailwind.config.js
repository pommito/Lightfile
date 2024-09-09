/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'conic-gradient(at bottom right, #1e40af, #1e3a8a, #111827)',
      },
    },
    plugins: [],
  },
};
