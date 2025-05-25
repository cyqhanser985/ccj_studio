/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'; // Import the plugin

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
    },
  },
  plugins: [
    typography(), // Add the typography plugin
  ],
};