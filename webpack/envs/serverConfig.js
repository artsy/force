// @ts-check

const nodeExternals = require("webpack-node-externals")
const path = require("path")
const webpack = require("webpack")
const { removeEmpty } = require("webpack-config-utils")
const { basePath, env } = require("../utils/env")

export const serverConfig = {
  mode: env.nodeEnv,
  devtool: "source-map",
  target: "node",
  externals: [nodeExternals()],
  node: {
    __dirname: true,
  },
  entry: path.join(basePath, "src/index.js"),
  output: {
    filename: "server.dist.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(basePath),
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        include: [
          path.resolve(basePath, "src"),
          path.resolve(basePath, "node_modules/artsy-ezel-components"),
        ],
        use: ["coffee-loader"],
      },
      {
        test: /(\.(js|ts)x?$)/,
        include: path.resolve(basePath, "src"),
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
        test: /\.(jade|pug)$/,
        include: path.resolve(basePath, "src"),
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
  plugins: removeEmpty([
    env.enableWebpackAnalyze
      ? undefined
      : new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        }),
  ]),
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".coffee"],
    modules: [path.resolve(basePath, "src"), "node_modules"],
  },
}
