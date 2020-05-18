const path = require("path");

const here = uri => path.resolve(__dirname, here);

module.exports = {
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/i,
				use: "ts-loader",
				exclude: /node_modules/i,
			},
		],
	},
	resolve: {
		extensions: [
			"ts",
			"js",
			"tsx",
		].map(ext => `.${ext}`),
	},
	output: {
		filename: "index.js",
		path: here("dist"),
	},
};
