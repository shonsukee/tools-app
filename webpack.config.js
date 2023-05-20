const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: path.join(__dirname, "src", "index.js"),
  },
  output: {
    path: path.join(__dirname, "out"),
    filename: "main.js",
    hashFunction: "xxhash64",
  },
  devtool: "cheap-module-eval-source-map",
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
