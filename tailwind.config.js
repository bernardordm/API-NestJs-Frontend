/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2', // Azul
        secondary: '#14171A', // Cinza escuro
        accent: '#657786', // Cinza claro
        background: '#f8f9fa', // Cinza de fundo
        white: '#ffffff',
      },
    },
  },
  plugins: [forms],
}