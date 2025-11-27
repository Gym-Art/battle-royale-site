import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#5CA05C',
          pink: '#C87890',
          magenta: '#A068A0',
          purple: '#8868A8',
        },
        surface: {
          black: '#050508',
          dark: '#0F0F14',
          muted: '#1A1A2E',
          card: '#12121A',
        },
        text: {
          primary: '#E8E8E8',
          secondary: '#B8B8CC',
          muted: '#8B8B9E',
          dark: '#050508',
        },
      }, 
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': 'none',
        'glow-green-lg': 'none',
        'glow-pink': 'none',
        'glow-pink-lg': 'none',
        'glow-magenta': 'none',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'flicker': {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
