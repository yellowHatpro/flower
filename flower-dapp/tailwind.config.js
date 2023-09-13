/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'catppuccin_blue0': '#313244',
        'catppuccin_blue1': '#1D1D2D',
        'catppuccin_blue2': '#171725',
        'catppuccin_blue3': '#151623',
        'catppuccin_blue4': '#11111C',
        'catppuccin_blue5': '#10111D',
      }
    },
  },
  plugins: [require("daisyui")],
}
