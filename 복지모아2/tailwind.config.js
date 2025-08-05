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
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'high-contrast': {
          bg: '#000000',
          text: '#ffffff',
          primary: '#ffff00',
          secondary: '#00ffff',
          border: '#ffffff',
        }
      },
      fontSize: {
        // 기본 크기
        'base-default': '1rem',
        'lg-default': '1.125rem',
        'xl-default': '1.25rem',
        '2xl-default': '1.5rem',
        '3xl-default': '1.875rem',
        '4xl-default': '2.25rem',
        
        // 확대1
        'base-large': '1.125rem',
        'lg-large': '1.25rem',
        'xl-large': '1.375rem',
        '2xl-large': '1.75rem',
        '3xl-large': '2.125rem',
        '4xl-large': '2.5rem',
        
        // 확대2
        'base-xl': '1.25rem',
        'lg-xl': '1.375rem',
        'xl-xl': '1.5rem',
        '2xl-xl': '2rem',
        '3xl-xl': '2.5rem',
        '4xl-xl': '3rem',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      }
    },
  },
  plugins: [],
}