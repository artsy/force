// @ts-check
import path from "path"

import HtmlWebpackPlugin from "html-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import { WebpackManifestPlugin } from "webpack-manifest-plugin"

import { basePath, env } from "../utils/env"
import { sharedPlugins } from "./sharedPlugins"
import { splitChunks } from "./splitChunks"

import { babelLoader, ejsLoader, mjsLoader } from "./sharedLoaders"

import {
  externals,
  productionDevtool,
  minimizer,
  mode,
  resolve,
  stats,
} from "./sharedConfig"

export const clientProductionConfig = () => ({
  devtool: productionDevtool,
  entry: {
    "artsy-entry": [path.resolve(process.cwd(), "src/v2/client.tsx")],
  },
  externals,
  mode,
  module: {
    rules: [babelLoader, ejsLoader, mjsLoader],
  },
  optimization: {
    concatenateModules: env.webpackConcatenate,
    minimize: !env.webpackDebug && !env.fastProductionBuild,
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
      filename: path.resolve(basePath, "public", "index.ejs"),
      inject: false,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
      },
      template: path.resolve(basePath, "src", "v2", "index.ejs"),
    }),
  ],
  resolve,
  stats,
})
