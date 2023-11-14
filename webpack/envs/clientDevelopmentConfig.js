// @ts-check

import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import LoadablePlugin from "@loadable/webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin"
import TimeFixPlugin from "time-fix-plugin"
import { WebpackManifestPlugin } from "webpack-manifest-plugin"
import path from "path"
import webpack from "webpack"
import { basePath, webpackEnv } from "../webpackEnv"
import { splitChunks } from "../bundleSplitting"
import { sharedPlugins } from "../sharedPlugins"
import { babelLoader, ejsLoader, mjsLoader, swcLoader } from "../sharedLoaders"

import {
  cache,
  devtool,
  experiments,
  externals,
  mode,
  resolve,
  stats,
} from "../sharedConfig"

console.log("\n[Force] Building client-side development code...\n")

if (webpackEnv.experimentalSWCCompiler) {
  console.log("[Force] Experimental SWC Compiler is enabled.\n")
}

export const clientDevelopmentConfig = () => {
  return {
    cache,
    devtool,
    entry: {
      "artsy-entry": [
        "webpack-hot-middleware/client?reload=true",
        path.resolve(process.cwd(), "src/client.tsx"),
      ],
    },
    experiments,
    externals,
    mode,
    module: {
      rules: [
        webpackEnv.experimentalSWCCompiler ? swcLoader : babelLoader,
        ejsLoader,
        mjsLoader,
      ],
    },
    optimization: {
      runtimeChunk: "single", // Extract webpack runtime code into it's own file
      splitChunks,

      // Webpack does extra algorithmic work to optimize the output for size and
      // load performance. These optimizations are performant for smaller codebases,
      // but can be costly in larger ones.
      removeAvailableModules: webpackEnv.isDevelopment,
      removeEmptyChunks: webpackEnv.isDevelopment,
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
      new CaseSensitivePathsPlugin(),
      new LoadablePlugin({
        filename: "loadable-stats.json",
        path: path.resolve(basePath, "public", "assets"),
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(basePath, "public", "html.ejs"),
        inject: false,
        template: path.resolve(basePath, "src/html.ejs"),
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
        fileName: path.resolve(basePath, "manifest.json"),
      }),
    ],
    resolve,
    stats,
  }
}

export default clientDevelopmentConfig()
