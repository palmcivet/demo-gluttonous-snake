const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const base = require("./webpack.config.base");

const OUTPUT = path.join(__dirname, "build");
const STATIC = path.join(__dirname, "static");

module.exports = merge(base, {
	mode: "production",
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(STATIC, "index.html"),
			filename: "404.html",
			path: OUTPUT,
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
			chunkFilename: "css/[id].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.less/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: true,
						},
					},
					"css-loader",
					"less-loader",
				],
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif|mp3|eot|woff|woff2|ttf)([\\?]?.*)$/,
				loader: "file-loader",
				options: {
					name: "[hash:5].[ext]",
					publicPath: "./assets",
				},
			},
		],
	},
});
