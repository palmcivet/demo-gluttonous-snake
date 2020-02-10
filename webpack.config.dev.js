const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ENTRY = path.join(__dirname, "source");
const OUTPUT = path.join(__dirname, "build");
const STATIC = path.join(__dirname, "static");

module.exports = {
	mode: "development",
	entry: path.join(ENTRY, "index.tsx"),
	output: {
		path: OUTPUT,
		filename: "js/index.js",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		modules: [ENTRY, "node_modules"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(STATIC, "index.html"),
			filename: "index.html",
			path: OUTPUT,
		}),
	],
	devServer: {
		port: 8081,
		open: "Firefox",
		contentBase: OUTPUT,
		historyApiFallback: true,
		proxy: {
			"/": "http://localhost:8081/index.bundle.html",
		},
	},
	module: {
		rules: [
			{
				test: /\.[j|t]s[x]?$/,
				exclude: /node_modules/,
				use: "awesome-typescript-loader",
			},
			{
				test: /\.less/,
				loader: "style-loader!css-loader!less-loader",
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader",
			},
		],
	},
};
