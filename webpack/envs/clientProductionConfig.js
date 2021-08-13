// @ts-check

import { HashedModuleIdsPlugin } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import path from "path"
import WebpackManifestPlugin from "webpack-manifest-plugin"
import { basePath, env } from "../utils/env"
import {
  babelLoaderWithLodash,
  coffeeLoader,
  ejsLoader,
  jadeLoader,
  mjsLoader,
} from "./commonLoaders"
import {
  clientExternals,
  productionDevtool,
  standardMinimizer,
  standardMode,
  standardResolve,
  standardStats,
} from "./commonEnv"
import { standardPlugins } from "./commonPlugins"
import { clientPlugins } from "./clientPlugins"
import { clientChunks } from "./clientCommonConfig"

export const clientProductionConfig = {
  devtool: productionDevtool,
  entry: {
    "artsy-entry": [path.resolve(process.cwd(), "src/v2/client.tsx")],
  },
  externals: clientExternals,
  mode: standardMode,
  module: {
    rules: [
      coffeeLoader,
      jadeLoader,
      babelLoaderWithLodash,
      ejsLoader,
      mjsLoader,
    ],
  },
  optimization: {
    concatenateModules: env.webpackConcatenate,
    minimize: !env.webpackDebug && !env.fastProductionBuild,
    minimizer: standardMinimizer,
    // Extract webpack runtime code into it's own file
    runtimeChunk: "single",
    splitChunks: clientChunks,
    moduleIds: "hashed",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(basePath, "public/assets"),
    publicPath: "/assets/",
  },
  plugins: [
    ...standardPlugins,
    ...clientPlugins,
    new LoadablePlugin({
      filename: "loadable-novo-stats.json",
      path: path.resolve(basePath, "public", "assets"),
    }),
    new HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      basePath: "/assets/",
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
      template: path.resolve(basePath, "src", "v2", "index.ejs"),
    }),
  ],
  resolve: standardResolve,
  stats: standardStats,
}
