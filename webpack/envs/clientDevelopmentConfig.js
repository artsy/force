// @ts-check

import HtmlWebpackPlugin from "html-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin"
import TimeFixPlugin from "time-fix-plugin"
import { WebpackManifestPlugin } from "webpack-manifest-plugin"
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

import {
  cache,
  devtool,
  experiments,
  externals,
  mode,
  resolve,
  stats,
} from "./sharedConfig"

export const clientDevelopmentConfig = () => ({
  cache,
  devtool,
  entry: {
    "artsy-entry": [
      "webpack-hot-middleware/client?name=novo&reload=true",
      path.resolve(process.cwd(), "src/v2/client.tsx"),
    ],
  },
  experiments,
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

    // Webpack does extra algorithmic work to optimize the output for size and
    // load performance. These optimizations are performant for smaller codebases,
    // but can be costly in larger ones.
    removeAvailableModules: env.isDevelopment,
    removeEmptyChunks: env.isDevelopment,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(basePath, "public/assets"),
    publicPath: "/assets/",
    pathinfo: false,
  },
  plugins: [
    ...sharedPlugins(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
      formatter: { type: "codeframe", options: { highlightCode: true } },
    }),
    new LoadablePlugin({
      filename: "loadable-novo-stats.json",
      path: path.resolve(basePath, "public", "assets"),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(basePath, "public", "index.ejs"),
      inject: false,
      template: path.resolve(basePath, "src", "v2", "index.ejs"),
    }),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new SimpleProgressWebpackPlugin({
      format: "minimal",
    }),
    new TimeFixPlugin(),
    new WebpackManifestPlugin({
      basePath: "/assets/",
      fileName: path.resolve(basePath, "manifest-novo.json"),
    }),
  ],
  resolve,
  stats,
})
