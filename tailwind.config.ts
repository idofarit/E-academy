import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#287EE0",
        secondary: "#29B6E0",
        "btn-primary": "#C9DB06",
        "btn-secondary": "#61C7F2",
        "form-btn-active": "#273297",
        "text-clr": "#F0F2F2",
      },
    },
  },
  plugins: [],
};
export default config;
