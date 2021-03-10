// @ts-check

const nodeExternals = require("webpack-node-externals")
const path = require("path")
const webpack = require("webpack")
const TerserPlugin = require("terser-webpack-plugin")
const { basePath, env } = require("../utils/env")

export const serverConfig = {
  devtool: "source-map",
  entry: path.join(basePath, "src/index.js"),
  externals: [nodeExternals()],
  output: {
    chunkFilename: "[name].bundle.js",
    filename: "server.dist.js",
    path: path.resolve(basePath),
  },
  mode: env.nodeEnv,
  module: {
    rules: [
      {
        include: [
          path.resolve(basePath, "src"),
          path.resolve(basePath, "node_modules/artsy-ezel-components"),
        ],
        test: /\.coffee$/,
        use: ["coffee-loader"],
      },
      {
        include: path.resolve(basePath, "src"),
        test: /(\.(js|ts)x?$)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [["@babel/plugin-transform-modules-commonjs"]],
            },
          },
        ],
      },
      {
        include: path.resolve(basePath, "src"),
        test: /\.(jade|pug)$/,
        use: [
          {
            loader: "pug-loader",
            options: {
              doctype: "html",
              root: __dirname,
            },
          },
        ],
      },
    ],
  },
  node: {
    __dirname: true,
  },
  optimization: {
    minimize: env.isProduction && !env.webpackDebug,
    minimizer: [
      new TerserPlugin({
        parallel: env.onCi ? env.webpackCiCpuLimit : true, // Only use 4 cpus (default) in CircleCI, by default it will try using 36 and OOM
      }),
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".coffee"],
    modules: [path.resolve(basePath, "src"), "node_modules"],
  },
  stats: env.webpackStats || "normal",
  target: "node",
}
