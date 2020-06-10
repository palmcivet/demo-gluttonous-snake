const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.config.base");
const OUTPUT = path.join(__dirname, "build");

module.exports = merge(base, {
	mode: "development",
	devServer: {
		port: 8081,
		open: "Firefox",
		contentBase: OUTPUT,
		historyApiFallback: true,
		proxy: {
			"/": "http://localhost:8081/index.html",
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
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader",
			},
			{
				test: /\.less/,
				loader: "style-loader!css-loader!less-loader",
			},
		],
	},
});
