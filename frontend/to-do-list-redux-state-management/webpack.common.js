// import required dependencies
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const constants = require("./paths");

// export webpack configuration
module.exports = {
	entry: {
		index: [
			path.join(constants.SRC_DIR, "frontend", "js", "pages", "index.js"),
			path.join(constants.SRC_DIR, "frontend", "scss", "pages", "index.scss"),
		],
	},
	output: {
		filename: "scripts/[name].js",
		path: constants.DIST_DIR,
		publicPath: process.env.PUBLIC_PATH || "/",
		clean: true,
	},
	module: {
		rules: [
			{
				// use babel to transpile JavaScript code
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-proposal-class-properties"],
					},
				},
			},
			{
				// use handlebars to compile HTML templates
				test: /\.hbs$/,
				use: [
					{
						loader: "handlebars-loader",
					},
				],
			},
			{
				// use CSS and Sass loaders to compile CSS stylesheets
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					"css-loader",
					"sass-loader",
				],
			},
			{
				// use asset modules to handle text assets
				test: /\.(txt)$/,
				type: "asset/source",
			},
		],
	},
	// configure plugins
	plugins: [
		// extract CSS styles into separate files
		new MiniCssExtractPlugin({
			filename: "styles/[name].css",
		}),
		// clean the output directory before building
		new CleanWebpackPlugin(),
		// show progress during build process
		new webpack.ProgressPlugin(),
		// copy assets directory from one directory to another
		// new CopyWebpackPlugin({
		// 	patterns: [{ from: path.join(constants.SRC_DIR, "public"), to: "public" }],
		// }),
		// generate HTML file using *.hbs files as source
		new HtmlWebpackPlugin({
			title: "VanillaJS Reducer",
			template: path.join(constants.SRC_DIR, "pages", "index.hbs"),
			filename: path.join(constants.DIST_DIR, "index.html"),
			inject: false,
		}),
	],
};
