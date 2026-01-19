/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-90': '#0F172A',
        'slate-80': '#1E293B',
        'slate-10': '#F1F5F9',
        'slate-800': '#1E293B',
        'slate-600': '#475569',
        'slate-300': '#CBD5E1',
        'green-500': '#22C55E',
        'yellow-500': '#EAB308',
        'blue-500': '#3B82F6',
        'green-100': '#DCFCE7',
        'yellow-100': '#FEF9C3',
        'blue-100': '#DBEAFE',
        'slate-50': '#F8FAFC',
      }
    },
  },
  plugins: [],
};
