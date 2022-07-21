// @ts-check
import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { WebpackManifestPlugin } from "webpack-manifest-plugin"
import { basePath, webpackEnv } from "../webpackEnv"
import { sharedPlugins } from "../sharedPlugins"
import { splitChunks } from "../bundleSplitting"

import { babelLoader, ejsLoader, mjsLoader } from "../sharedLoaders"

import {
  externals,
  productionDevtool,
  minimizer,
  mode,
  resolve,
  stats,
} from "../sharedConfig"

console.log("\n[Force] Building client-side production code...\n")

const clientProductionConfig = () => {
  return {
    devtool: productionDevtool,
    entry: {
      "artsy-entry": [path.resolve(process.cwd(), "src/client.tsx")],
    },
    externals,
    mode,
    module: {
      rules: [babelLoader, ejsLoader, mjsLoader],
    },
    optimization: {
      minimize: !process.env.WEBPACK_FAST_PROD_BUILD,
      minimizer,
      runtimeChunk: "single", // Extract webpack runtime code into it's own file
      splitChunks,
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(basePath, "public/assets"),
      publicPath: "/assets/",
    },
    plugins: [
      ...sharedPlugins(),
      new LoadablePlugin({
        filename: "loadable-stats.json",
        path: path.resolve(basePath, "public", "assets"),
      }),
      new WebpackManifestPlugin({
        basePath: "/assets/",
        fileName: path.resolve(basePath, "manifest.json"),
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(basePath, "public", "html.ejs"),
        inject: false,
        minify: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeComments: true,
        },
        template: path.resolve(basePath, "src/html.ejs"),
      }),

      process.env.WEBPACK_BUNDLE_REPORT &&
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          defaultSizes: "gzip",
        }),
    ].filter(Boolean),
    resolve,
    stats,
  }
}

export default clientProductionConfig()
