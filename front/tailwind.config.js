/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    borderOpacity: '1',
    extend: {
      colors: {
        primary: '#202f5b',
        secondary: '#0b00ea',
        black: '#000',
        gray: '#bec3cf',
        secondGray: '#B3B3B3',
        disabled: '#E4E4E4',
        white: '#fff',
        green: '#8fbb33',
        orange: '#ff7800',
        yellow: '#ffd60a',
        red: '#ff0000',
        bg: '#f1f4f9',
        content: '#fff',
        stroke: '#8b8b8b',
        gr: '#4f679b',
      },
    },
    screens: {
      md: { max: '1024px' },
      sm: { max: '768px' },
      xs: { max: '568px' },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
