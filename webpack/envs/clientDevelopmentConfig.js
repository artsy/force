// @ts-check

import { HashedModuleIdsPlugin } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import WebpackManifestPlugin from "webpack-manifest-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import path from "path"
import webpack from "webpack"

import { basePath, env } from "../utils/env"
import { splitChunks } from "./splitChunks"
import { sharedPlugins } from "./sharedPlugins"

import {
  babelLoader,
  coffeeLoader,
  ejsLoader,
  jadeLoader,
  mjsLoader,
} from "./sharedLoaders"

import { externals, devtool, mode, resolve, stats } from "./sharedConfig"

export const clientDevelopmentConfig = () => ({
  devtool,
  entry: {
    "artsy-entry": [
      "webpack-hot-middleware/client?name=novo&reload=true",
      path.resolve(process.cwd(), "src/v2/client.tsx"),
    ],
  },
  externals,
  mode,
  module: {
    rules: [coffeeLoader, jadeLoader, babelLoader, ejsLoader, mjsLoader],
  },
  name: "novo",
  optimization: {
    concatenateModules: env.webpackConcatenate,
    runtimeChunk: "single", // Extract webpack runtime code into it's own file
    splitChunks,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(basePath, "public/assets"),
    publicPath: "/assets/",
  },
  plugins: [
    ...sharedPlugins(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      formatter: "codeframe",
      formatterOptions: "highlightCode",
      watch: ["./src/v2"],
    }),
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
      template: path.resolve(basePath, "src", "v2", "index.ejs"),
    }),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
  ],
  resolve,
  stats,
})
