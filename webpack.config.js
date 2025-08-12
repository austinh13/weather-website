// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack'); // <--- add this line if you use webpack in config
const dotenv = require('dotenv').config();


module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,           // matches .css files
        use: ['style-loader', 'css-loader'],  // loads and injects CSS
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,  // matches image files
        type: 'asset/resource',            // emits files and returns URLs
        // Optional: customize output folder and names
        // generator: {
        //   filename: 'images/[hash][ext][query]'
        // }
      },
    ],
  },
};
