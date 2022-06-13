// shared config (dev and prod)
const Dotenv = require("dotenv-webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: [resolve(__dirname, "../../src"), "node_modules"],
  },
  context: resolve(__dirname, "../../src"),
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.(scss|sass)$/,
      //   exclude: /\.module\.(scss|sass)$/,
      //   use: ["style-loader", "css-loader", "sass-loader"],
      // },
      // {
      //   test: /\.(scss|sass)$/,
      //   include: /\.module\.(scss|sass)$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "@teamsupercell/typings-for-css-modules-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: {
      //           localIdentName: "[local]_[hash:base64:5]", // [name]
      //         },
      //       },
      //     },
      //     "sass-loader",
      //   ],
      // },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html.ejs" }),
    new Dotenv(),
    new MiniCssExtractPlugin(),
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  performance: {
    hints: false,
  },
};
