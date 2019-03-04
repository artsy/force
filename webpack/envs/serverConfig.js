// @ts-check

const path = require("path")
const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")
const { NODE_ENV, basePath } = require("../../src/lib/environment")
const { baseConfig } = require("./baseConfig")

exports.serverConfig = {
  mode: NODE_ENV,
  devtool: "source-map",
  target: "node",
  externals: [nodeExternals()],
  node: {
    __dirname: true,
  },
  entry: path.join(basePath, "src/index.js"),
  output: {
    filename: "server.dist.js",
    path: path.resolve(basePath),
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        include: [path.resolve(basePath, "node_modules/artsy-ezel-components")],
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
      ...baseConfig.module.rules,
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
}
