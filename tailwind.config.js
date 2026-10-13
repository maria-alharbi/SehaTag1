/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#008F68', dark: '#006B50', tint: '#F0FAF6', soft: '#D9F2E9' },
        danger: { DEFAULT: '#D92D20', soft: '#FEF3F2', border: '#FECDCA' },
      },
      fontFamily: {
        sans: ['Cairo', 'system-ui', '-apple-system', 'Segoe UI', 'Tahoma', 'sans-serif'],
        urdu: ['"Noto Naskh Arabic"', 'Cairo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,60,45,.06), 0 8px 24px -12px rgba(0,60,45,.18)',
      },
    },
  },
  plugins: [],
}
