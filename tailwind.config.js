/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pos-src/index.html",
    "./pos-src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pos: {
          outer: '#1f2029',
          inner: '#17181f',
          accent: '#ff6e40',
          orange: '#ff5722',
        },
        espresso: {
          950: '#0B0806',
          900: '#140E0A',
          800: '#23170F',
          700: '#3A2415',
          600: '#523420',
        },
        parchment: {
          50: '#FAF6F0',
          100: '#F5EFE6',
          200: '#EAE0D0',
          300: '#DFCBB0',
        },
        gold: {
          300: '#F3D87D',
          400: '#E5A93C',
          500: '#D4AF37',
          600: '#B07D46',
        },
        sage: {
          400: '#849B54',
          500: '#6A7F3F',
          600: '#4E5E30',
          700: '#394522',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glass': '0 20px 50px rgba(11, 8, 6, 0.45), inset 0 1px 0 rgba(245, 239, 230, 0.12)',
        'gold-glow': '0 0 35px rgba(212, 175, 55, 0.28)',
        'parchment': '0 24px 48px -12px rgba(20, 14, 10, 0.55), 0 0 0 1px rgba(212, 175, 55, 0.22)',
      }
    },
  },
  plugins: [],
};
