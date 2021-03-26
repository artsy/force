// @ts-check

import { HashedModuleIdsPlugin } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import WebpackManifestPlugin from "webpack-manifest-plugin"
import path from "path"
import webpack from "webpack"
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
import { clientChunks } from "./clientCommonConfig"

export const clientDevelopmentConfig = {
  devtool: standardDevtool,
  entry: {
    "artsy-novo": [
      "webpack-hot-middleware/client?name=novo&reload=true",
      path.resolve(process.cwd(), "src/v2/client.tsx"),
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
    splitChunks: clientChunks,
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
      path: path.resolve(basePath, "public/assets-novo"),
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
      compilationSuccessInfo: {
        messages: [`[Force] Listening on http://localhost:${env.port} \n`],
        notes: [""],
      },
    }),
    new HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      basePath: "/assets-novo/",
      fileName: path.resolve(basePath, "manifest-novo.json"),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(basePath, "src/v2/index.ejs"),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  resolve: standardResolve,
  stats: standardStats,
}
