// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: {
    app: {
      import: "./index.tsx",
      // dependOn: "...", // если выносить части в отдельные entry
    },
  },
  output: {
    filename: "js/[name].[contenthash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  optimization: {
    splitChunks: { chunks: "all" }, // отделяем vendor
  },
  // devtool: "source-map", // map на проде - для отладки
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "../public", to: "./" }],
    }),
  ],
});
