// webpack.config.js
// Import dependencies
const path = require('path');
// Handles css files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Spits out an index.html file in the build
const HtmlWebPackPlugin = require('html-webpack-plugin');
// Configure webpack
const config = {
  // Entry point will be in the src folder, file will be named index.js
  entry: './src/index.js',
  // Send the files to the build folder, create one if it isn't present
    output: {
        path: path.resolve(__dirname,'build'),
        filename: 'bundle.js',
    },
  module: {
    rules: [
      {
        // For .js or .jsx files use babel-loader. Exclude node modules
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        // for .css files use css-loader. If that doesn't work use style-loader
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }
    ]
  },
  plugins: [
    // Take the index.html file as a template and create a new one in the build folder
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin(),
  ],
  target: 'node'
};
// export the config onbject
module.exports = config;