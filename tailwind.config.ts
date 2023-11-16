import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#EC6090",
          secondary: "#B059D5",
          accent: "#B059D5",
          neutral: "#353738",
          "neutral-light": "#AFAFAF",
          "base-100": "#1F2122",
          "--rounded-box": "0.5rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          // "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          // "--border-btn": "1px", // border width of buttons
          // "--tab-border": "1px", // border width of tabs
          // "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
      "light",
    ],
  },
}
export default config
