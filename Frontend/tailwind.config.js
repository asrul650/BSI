/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#F0F6FF',
          100: '#E0EDFE',
          200: '#BAdafD',
          500: '#1D63ED',
          600: '#154DC0',
          800: '#1E293B',
          900: '#0F172A',
        },
        uiiNavy: '#0F264A',
        uiiDark: '#131F37',
        uiiBlue: '#2563EB',
        canvasBg: '#F8FAFC',
      },
      boxShadow: {
        'soft-card': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'elevated': '0 12px 32px -4px rgba(15, 38, 74, 0.08), 0 4px 12px -2px rgba(15, 38, 74, 0.04)',
      }
    },
  },
  plugins: [],
}

