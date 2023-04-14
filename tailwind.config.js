/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				cerise: {
					50: "#fcf3fa",
					100: "#fbe8f7",
					200: "#f9d1f0",
					300: "#f5ace2",
					400: "#ee78cd",
					500: "#e450b6",
					600: "#d53a9d",
					700: "#b6207b",
					800: "#971d66",
					900: "#7e1d57",
					950: "#4d0a32",
				},
				gray: {
					50: "#f7f7f7",
					100: "#e3e3e3",
					200: "#c8c8c8",
					300: "#a4a4a4",
					400: "#818181",
					500: "#666666",
					600: "#515151",
					700: "#434343",
					800: "#383838",
					900: "#313131",
					950: "#111111",
				},
				slate: {
					1000: "#0a0f1c",
				},
			},
			screens: {
				"3xl": "1836px",
				"4xl": "2222px",
			},
		},
	},
	plugins: [],
};
