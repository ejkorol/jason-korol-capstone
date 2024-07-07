import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#212121",
            foreground: "#fafafa",
            primary: {
              DEFAULT: "#3498DB",
              foreground: "#fafafa",
            },
            secondary: {
              DEFAULT: "#F7DC6F",
              foreground: "#000000",
            },
            default: {
              50: '#F4F5F7',
              100: '#3B3F4E',
              200: '#525668',
              300: '#696F83',
              400: '#7F869D',
              500: '#959EB7',
              600: '#ABB6D1',
              700: '#C1CEDC',
              800: '#D8E6F6',
              900: '#EFF0FF',
              DEFAULT: "#3B3F4E"
            },
            focus: "#3498DB",
          }
        },
        light: {
          colors: {
            background: "#fafafa",
            foreground: "#212121",
            primary: {
              50: '#f5f5f5',
              100: '#212121',
              200: '#424242',
              300: '#616161',
              400: '#757575',
              500: '#9e9e9e',
              600: '#bdbdbd',
              700: '#e0e0e0',
              800: '#eeeeee',
              900: '#ffffff',
              DEFAULT: "#212121",
              foreground: "#fafafa",
            },
            secondary: {
              DEFAULT: "#212121",
              foreground: "#fafafa",
            },
            default: {
              100: '#F4F4F5',
              DEFAULT: "#F4F4F5"
            },
          }
        }
      }
    })
  ]
};
export default config;
