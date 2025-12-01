import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    important: "#__next", // MUI와 충돌 방지
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;