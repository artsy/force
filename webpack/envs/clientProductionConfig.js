// @ts-check

import { HashedModuleIdsPlugin } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import path from "path"
import WebpackManifestPlugin from "webpack-manifest-plugin"
import { basePath, env } from "../utils/env"
import {
  babelLoader,
  coffeeLoader,
  ejsLoader,
  jadeLoader,
  mjsLoader,
} from "./commonLoaders"
import {
  clientExternals,
  standardDevtool,
  standardMinimizer,
  standardMode,
  standardResolve,
  standardStats,
} from "./commonEnv"
import { standardPlugins } from "./commonPlugins"
import { clientChunks } from "./clientCommonConfig"

export const clientProductionConfig = {
  devtool: standardDevtool,
  entry: {
    "artsy-novo": [path.resolve(process.cwd(), "src/novo/src/client.tsx")],
  },
  externals: clientExternals,
  mode: standardMode,
  module: {
    rules: [coffeeLoader, jadeLoader, babelLoader, ejsLoader, mjsLoader],
  },
  optimization: {
    concatenateModules: env.webpackConcatenate,
    minimize: !env.webpackDebug,
    minimizer: standardMinimizer,
    // Extract webpack runtime code into it's own file
    runtimeChunk: "single",
    splitChunks: clientChunks,
  },
  output: {
    filename: "novo-[name].22820.[contenthash].js",
    path: path.resolve(basePath, "public/assets-novo"),
    publicPath: "/assets-novo/",
  },
  plugins: [
    ...standardPlugins,
    new LoadablePlugin({
      filename: "loadable-novo-stats.json",
      path: path.resolve(basePath, "public", "assets-novo"),
    }),
    new HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      basePath: "/assets-novo/",
      fileName: path.resolve(basePath, "manifest-novo.json"),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(basePath, "public", "index.ejs"),
      inject: false,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
      },
      template: path.resolve(basePath, "src", "novo", "src", "index.ejs"),
    }),
  ],
  resolve: standardResolve,
  stats: standardStats,
}
