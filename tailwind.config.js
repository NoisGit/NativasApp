/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
      },
      boxShadow: {
        'nativas-glow': '0 0 40px rgba(102, 221, 219, 0.18)'
      },
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        marvel: ['Marvel', 'sans-serif'],
        mplus: ["'M PLUS 1 Code'", 'sans-serif']
      }
    }
  }
}
