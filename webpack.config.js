const webpack = require("webpack");
const path = require("path");

const WebpackProgressBar = require("webpack-progress-bar");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

/**
 * Create an absolute URL to the given URI inside the current directory
 * @param {string} [uri = ""] - The URI to the desired file
 * @returns {string}
 */
const here = (uri = "") => path.resolve(__dirname, uri);

module.exports = {
	stats: "minimal", // For compatibility with friendly-errors-webpack-plugin
	mode: "production",
	entry: here("./src/index.ts"),
	devtool: "source-map",
	plugins: [
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // avoid bundling momentjs locales
		new WebpackProgressBar(),
		new FriendlyErrorsPlugin({}),
		new CompressionWebpackPlugin({
			test: /\.js$/i,
			exclude: /node_modules/i,
		}),
		// new BundleAnalyzerPlugin({}),
	],
	optimization: {
		usedExports: true,
		minimize: true,
		removeEmptyChunks: true,
		mergeDuplicateChunks: true,
		concatenateModules: true,
	},
	module: {
		rules: [
			{
				test: /(?!\.d)\.tsx?$/i,
				use: "ts-loader",
				include: here("src/"),
				exclude: [
					"node_modules/",
					"test/"
				].map(here),
			},
			{
				test: /\.d\.tsx?$/i,
				use: "null-loader",
				include: here("src/"),
				exclude: [
					"node_modules/",
					"test/"
				].map(here),
			},
		],
	},
	resolve: {
		extensions: ["ts", "js", "tsx"].map(ext => `.${ext}`),
	},
	output: {
		filename: "index.js",
		path: here("dist"),
		library: "validatueur",
		libraryTarget: "umd",
	},
};
