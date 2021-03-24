// @ts-check

import { HashedModuleIdsPlugin } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import path from "path"
import webpack from "webpack"
import WebpackManifestPlugin from "webpack-manifest-plugin"
import { basePath, env } from "../utils/env"
import {
  clientExternals,
  standardDevtool,
  standardMode,
  standardResolve,
  standardStats,
} from "./commonEnv"
import {
  babelLoader,
  coffeeLoader,
  ejsLoader,
  jadeLoader,
  mjsLoader,
} from "./commonLoaders"
import { standardPlugins } from "./commonPlugins"
import { novoChunks } from "./novoCommonConfig"

export const novoDevelopmentConfig = {
  devtool: standardDevtool,
  entry: {
    "artsy-novo": [
      "webpack-hot-middleware/client?name=novo&reload=true",
      path.resolve(process.cwd(), "src/novo/src/client.tsx"),
    ],
  },
  externals: clientExternals,
  mode: standardMode,
  module: {
    rules: [coffeeLoader, jadeLoader, babelLoader, ejsLoader, mjsLoader],
  },
  name: "novo",
  optimization: {
    concatenateModules: env.webpackConcatenate,
    // Extract webpack runtime code into it's own file
    runtimeChunk: "single",
    splitChunks: novoChunks,
  },
  output: {
    filename: "novo-[name].js",
    path: path.resolve(basePath, "public/assets-novo"),
    publicPath: "/assets-novo/",
  },
  plugins: [
    ...standardPlugins,
    new webpack.HotModuleReplacementPlugin(),
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
      template: path.resolve(basePath, "src", "novo", "src", "index.ejs"),
    }),
  ],
  resolve: standardResolve,
  stats: standardStats,
}
