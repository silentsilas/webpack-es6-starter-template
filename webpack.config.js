// Imports
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const plugins = [
  new HtmlWebpackPlugin({
    template: './template/index.html',
    filename: 'index.html',
    hash: true,
    inject: false
  }),
  new CopyWebpackPlugin([{ from: "static" }]),
  new CleanWebpackPlugin()
];
if (process.env.NODE_ENV === 'production') {
  plugins.push(new MinifyPlugin());
}

// Webpack Configuration
const config = {
  // Entry
  entry: './_src/app/index.js',

  // Output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name]-[hash].min.js"
  },
  // Loaders
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      // SCSS Files
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                autoprefixer({
                  grid: true
                })
              ]
            }
          },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  // Plugins
  plugins: plugins,
  // OPTIONAL
  // Reload On File Change
  watch: process.env.NODE_ENV === 'production' ? false : true,
  // Development Tools (Map Errors To Source File)
  devtool: 'source-map',
};
// Exports
module.exports = config;
