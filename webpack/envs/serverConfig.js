// @ts-check

import nodeExternals from "webpack-node-externals"
import path from "path"
import { basePath, env } from "../utils/env"
import { minimizer } from "./sharedConfig"
import { jadeLoader } from "./sharedLoaders"
import LimitChunkCountPlugin from "webpack/lib/optimize/LimitChunkCountPlugin"

export const serverConfig = () => ({
  devtool: env.webpackDevtool || "source-map",
  entry: path.join(basePath, "src/index.js"),
  externals: [nodeExternals()],
  mode: env.webpackDebug ? "development" : env.nodeEnv,
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
      jadeLoader,
    ],
  },
  node: {
    __dirname: true,
  },
  optimization: {
    minimize: env.isProduction && !env.webpackDebug && !env.fastProductionBuild,
    minimizer,
  },
  output: {
    chunkFilename: "[name].bundle.js",
    filename: "server.dist.js",
    path: path.resolve(basePath),
  },
  plugins: [
    new LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".coffee"],
    modules: [path.resolve(basePath, "src"), "node_modules"],
  },
  target: "node",
})
