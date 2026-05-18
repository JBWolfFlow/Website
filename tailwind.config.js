/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EEF3FF',
          100: '#D9E4FF',
          200: '#B5C9FF',
          300: '#85A4FF',
          400: '#527CFF',
          500: '#1E5BFF',
          600: '#1546D6',
          700: '#0F35A8',
          800: '#0B2A6B',
          900: '#070D33',
          950: '#050F33',
        },
        accent: {
          50:  '#FFF5E6',
          100: '#FFE5BF',
          200: '#FFCC85',
          300: '#FFB04A',
          400: '#FF9A2E',
          500: '#FF8A1E',
          600: '#E66F00',
          700: '#B85800',
          800: '#8A4200',
          900: '#5C2D00',
        },
        neutral: {
          50:  '#F7F9FC',
          100: '#EEF1F6',
          200: '#DDE3EC',
          300: '#C2CBD8',
          400: '#9AA5B6',
          500: '#6B7686',
          600: '#4B5567',
          700: '#343D4F',
          800: '#1F2738',
          900: '#0F1524',
          950: '#070B17',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'primary': '0 10px 25px -5px rgba(30, 91, 255, 0.3)',
        'accent': '0 10px 25px -5px rgba(255, 138, 30, 0.3)',
      },
    },
  },
  plugins: [],
}