const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ENTRY = path.join(__dirname, "source");
const OUTPUT = path.join(__dirname, "build");
const STATIC = path.join(__dirname, "static");

module.exports = {
	entry: path.join(ENTRY, "index.jsx"),
	output: {
		path: OUTPUT,
		filename: "js/index.js",
	},
	resolve: {
		extensions: [".js", ".jsx"],
		modules: [ENTRY, "node_modules"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(STATIC, "index.html"),
			filename: "index.html",
			path: OUTPUT,
		}),
	],
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/env", { modules: false }], "@babel/react"],
						plugins: [
							"@babel/plugin-proposal-class-properties",
							"react-hot-loader/babel",
						],
					},
				},
			},
			{
				test: /\.css/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
					{
						loader: "less-loader",
					},
				],
			},
		],
	},
};
