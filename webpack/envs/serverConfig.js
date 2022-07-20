// @ts-check

import nodeExternals from "webpack-node-externals"
import path from "path"
import LimitChunkCountPlugin from "webpack/lib/optimize/LimitChunkCountPlugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { basePath, webpackEnv } from "../webpackEnv"
import { devtool, minimizer, mode, productionDevtool } from "../sharedConfig"
import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin"

console.log("[Force Server] Building server-side code...\n")

export const serverConfig = () => {
  return {
    devtool: webpackEnv.isDevelopment ? devtool : productionDevtool,
    entry: path.join(basePath, "src/index.js"),
    externals: [nodeExternals()],
    mode,
    module: {
      rules: [
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
      ],
    },
    node: {
      __dirname: true,
    },
    optimization: {
      minimize: webpackEnv.isProduction && !process.env.WEBPACK_FAST_PROD_BUILD,
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

      webpackEnv.isDevelopment &&
        new SimpleProgressWebpackPlugin({
          format: "minimal",
        }),

      process.env.WEBPACK_BUNDLE_REPORT &&
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          defaultSizes: "gzip",
        }),
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      modules: [path.resolve(basePath, "src"), "node_modules"],
    },
    target: "node",
  }
}

export default serverConfig()
