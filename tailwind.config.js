/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        'poppins-bold': ['poppins-bold', 'sans-serif'],
        'poppins-semibold': ['poppins-semibold', 'sans-serif'],
        'poppins-medium': ['poppins-medium', 'sans-serif'],
      },
      colors: {
        orange: {
          500: '#f97316',
          600: '#ea580c',
        },
        taupe: {
          DEFAULT: '#888888',
          light: '#999999',
          dark: '#777777',
        },
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.2', letterSpacing: '0' }],
        'display-base': ['3rem', { lineHeight: '1.2', letterSpacing: '0' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0' }],
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '0' }],
        'display-2xl': ['6rem', { lineHeight: '1.1', letterSpacing: '0' }],
        'display-2xl-new': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.2' }],
        'display-base': ['3rem', { lineHeight: '1.2' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1' }],
        'display-xl': ['4.5rem', { lineHeight: '1.1' }],
        'display-2xl': ['6rem', { lineHeight: '1.1' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
