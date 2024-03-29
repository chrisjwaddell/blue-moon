import {terser} from "rollup-plugin-terser"
import terserOptions from "./non-min"

export default [
	{
		input: "./src/blue-moon.js",
		output: [
			{
				file: "./dist/blue-moon.js",
				format: "umd",
				name: "BlueMoon",
			},
		],
		plugins: [terser(terserOptions)],
	},
]
