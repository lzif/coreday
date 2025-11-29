/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      // You can add M3 color mappings here if you really need to use them in Tailwind classes
      // But standard practice is to use the CSS variables directly or m3-svelte components.
    },
  },
  plugins: [],
}
