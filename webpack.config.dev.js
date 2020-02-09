const path = require("path");
const merge = require("webpack-merge");

const ENTRY = path.join(__dirname, "source");
const OUTPUT = path.join(__dirname, "build");
const STATIC = path.join(__dirname, "static");

module.exports = merge(common, {
	mode: "development",
	entry: path.join(ENTRY, "index.jsx"),
	devtool: "source-map",
	output: {
		filename: "index.bundle.js",
		path: path.join(OUTPUT, "build"),
	},
	resolve: {
		extensions: [".js", ".jsx"],
		modules: [ENTRY, "node_modules"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(STATIC, "index.html"),
			path: OUTPUT,
			filename: "index.bundle.html",
		}),
	],
	devServer: {
		port: 8081,
		open: "Firefox",
		contentBase: path.join(STATIC),
		historyApiFallback: true,
		proxy: {
			"/": "http://localhost:8081/index.bundle.html",
		},
	},
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
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
				],
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif|mp3|eot|woff|woff2|ttf)([\\?]?.*)$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
					publicPath: "./assets",
				},
			},
		],
	},
});
