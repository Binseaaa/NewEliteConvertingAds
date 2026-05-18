/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black:      '#080808',
        'off-black':'#101010',
        card:       '#141414',
        white:      '#f5f5f0',
        muted:      'rgba(245,245,240,0.45)',
        accent:     '#c8f53a',
        accent2:    '#3affa3',
        'accent-glow': 'rgba(200,245,58,0.18)',
        border:     'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body:    ['"DM Sans"',    'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%':     { opacity: '1',   transform: 'scale(1.06)' },
        },
        dotPulse: {
          '0%,100%': { opacity: '1',   transform: 'scale(1)' },
          '50%':     { opacity: '0.5', transform: 'scale(0.8)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 6s ease-in-out infinite',
        dotPulse:  'dotPulse 2s infinite',
        ticker:    'ticker 18s linear infinite',
        fadeInUp:  'fadeInUp 1s ease-out',
      },
    },
  },
  plugins: [],
};
