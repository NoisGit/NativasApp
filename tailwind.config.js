/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nativas: {
          night: '#0D1015',
          'night-soft': '#10131A',
          'deep-blue': '#0A131C',
          royal: '#2F2EB0',
          turquoise: '#66DDDB',
          aqua: '#76F8F8',
          mist: '#CBD5E1',
          border: '#2C2F38'
        }
      }
    }
  },
  plugins: []
}
