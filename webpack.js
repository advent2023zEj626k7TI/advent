const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  target: 'es2022',
  experiments: {
    outputModule: true,
    topLevelAwait: true,
  },
  externalsType: 'import',
  externals: [
      (ctx, callback) => {
          // make @arcgis/ external
          if (ctx.request === "node:fs/promises") {
              // move to webgen/ namespace
              return callback(null, `.`);
          }
          return callback();
      },
  ],
  entry: path.resolve(__dirname, './src/index.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        exclude: /node_modules/,
        options: {
          target: "es2022",
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/templates/index.html"),
      scriptLoading: "module",
    })
  ],
  mode: "development",
  devServer: {
    port: 3000,
    hot: false,
  },
};