import { type Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#51cf66',
        danger: '#ff6b6b',
        warning: '#ffc107',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config;
