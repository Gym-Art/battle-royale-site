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
          green: '#ADD0B3',
          yellow: '#FDFD96',
          pink: '#FFD1DC',
        },
        surface: {
          black: '#050508',
          dark: '#0F0F14',
          muted: '#252540',
          card: '#12121A',
        },
        text: {
          primary: '#E8E8E8',
          secondary: '#D0D0E0',
          muted: '#C0C0D0',
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
        'glow-yellow': 'none',
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
