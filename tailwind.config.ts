import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    important: "#__next",
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1C4E4E',
                    light: '#2A6B6B',
                    dark: '#133838',
                },
                background: {
                    DEFAULT: '#FFFFFF',
                    secondary: '#F9F9F9',
                },
                text: {
                    DEFAULT: '#1A1A1A',
                    secondary: '#666666',
                },
                border: '#E5E5E5',
            },
        },
    },
    plugins: [],
};

export default config;