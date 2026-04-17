import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/**/*.{ts,tsx}",
		"../../packages/ui/**/*.{ts,tsx}", // 👈 CRITICAL
	],
	theme: {
		extend: {},
	},
	plugins: [],
};

export default config;
