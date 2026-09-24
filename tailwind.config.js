/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F6F5F2',
        'paper-elevated': '#FFFFFF',
        'paper-subtle': '#EEECE6',
        charcoal: {
          900: '#121316',
          800: '#1C1E22',
          700: '#2A2D34',
          600: '#444852',
          400: '#737887',
          300: '#A2A7B5',
          100: '#E4E6EB'
        },
        engineering: {
          amber: '#C86414',
          copper: '#B85D19',
          slate: '#3A4556',
          steel: '#7A889B'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif']
      }
    }
  },
  plugins: [],
}
