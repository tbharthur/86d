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
          'gold': '#F59E0B',
          'gold-light': '#FBBF24',
          'gold-dark': '#D97706',
          'navy': '#0F172A',
          'navy-light': '#1E293B',
          'cream': '#FAFAF9',
          'coral': '#F43F5E',
          'coral-light': '#FB7185',
          'mint': '#10B981',
          'mint-light': '#34D399',
          'purple': '#8B5CF6',
          'purple-light': '#A78BFA',
        }
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Outfit', 'system-ui', 'sans-serif'],
        'accent': ['Sora', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-coral': '0 0 20px rgba(244, 63, 94, 0.3)',
        'glow-mint': '0 0 20px rgba(16, 185, 129, 0.3)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
        'coral-gradient': 'linear-gradient(135deg, #F43F5E 0%, #FB7185 100%)',
        'mint-gradient': 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
