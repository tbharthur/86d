/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'clapbac': {
          'gold': '#D4A853',
          'gold-dark': '#B8923F',
          'navy': '#1E2A3A',
          'navy-light': '#2D3E50',
          'cream': '#FDF8F0',
          'danger': '#DC2626',
          'success': '#16A34A',
        }
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
        'body': ['system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
