// @ts-check

import LoadablePlugin from "@loadable/webpack-plugin"
import path from "path"

import { basePath, env } from "../utils/env"
import { sharedPlugins } from "./sharedPlugins"

import { externals, devtool, mode, resolve, stats } from "./sharedConfig"

import {
  babelLoader,
  coffeeLoader,
  jadeLoader,
  mjsLoader,
} from "./sharedLoaders"

export const legacySharedConfig = () => ({
  devtool,
  externals,
  mode,
  module: {
    rules: [coffeeLoader, jadeLoader, babelLoader, mjsLoader],
  },
  optimization: {
    concatenateModules: env.webpackConcatenate,
    runtimeChunk: {
      name: "legacy-runtime", // Extract webpack runtime code into it's own file
    },
    splitChunks: {
      maxInitialRequests: Infinity,
      cacheGroups: {
        artsy: {
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "legacy-artsy",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](@artsy)[\\/]/,
        },
        "arsty-common": {
          chunks: "all",
          enforce: true,
          minChunks: 5,
          minSize: 0,
          name: "legacy-artsy-common",
          reuseExistingChunk: true,
          test: /.*src[\\/]/,
        },
        "common-backbone": {
          test: /.*node_modules[\\/](backbone.*)[\\/]/,
          name: "legacy-common-backbone",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        "common-jquery": {
          test: /.*node_modules[\\/](jquery.*)[\\/]/,
          name: "legacy-common-jquery",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        "common-react": {
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "legacy-common-react",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](react|react-dom)[\\/]/,
        },
        "common-utility": {
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "legacy-common-utility",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](lodash.*|moment.*)[\\/]/,
        },
        commons: {
          chunks: "all",
          enforce: true,
          minChunks: 2,
          minSize: 0,
          name: "legacy-common",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](?!(@artsy[\\/]|react[\\/]|react-dom[\\/]|backbone.*[\\/]|lodash.*[\\/]|moment.*[\\/]|jquery.*[\\/]))/,
        },
      },
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(basePath, "public/assets"),
    publicPath: "/assets/",
  },
  plugins: [...sharedPlugins(), new LoadablePlugin()],
  resolve,
  stats,
})
