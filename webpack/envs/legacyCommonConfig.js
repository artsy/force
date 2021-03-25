// @ts-check

import LoadablePlugin from "@loadable/webpack-plugin"
import path from "path"
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
  jadeLoader,
  mjsLoader,
} from "./commonLoaders"
import { standardPlugins } from "./commonPlugins"

export const legacyCommonConfig = {
  devtool: standardDevtool,
  externals: clientExternals,
  mode: standardMode,
  module: {
    rules: [coffeeLoader, jadeLoader, babelLoader, mjsLoader],
  },
  optimization: {
    // Extract webpack runtime code into it's own file
    concatenateModules: env.webpackConcatenate,
    runtimeChunk: "single",
    splitChunks: {
      maxInitialRequests: Infinity,
      cacheGroups: {
        artsy: {
          test: /.*node_modules[\\/](@artsy)[\\/]/,
          name: "artsy",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        "arsty-common": {
          test: /.*src[\\/]/,
          name: "artsy-common",
          chunks: "all",
          minSize: 0,
          minChunks: 5,
          reuseExistingChunk: true,
          enforce: true,
        },
        "common-backbone": {
          test: /.*node_modules[\\/](backbone.*)[\\/]/,
          name: "common-backbone",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        "common-jquery": {
          test: /.*node_modules[\\/](jquery.*)[\\/]/,
          name: "common-jquery",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        "common-react": {
          test: /.*node_modules[\\/](react|react-dom)[\\/]/,
          name: "common-react",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        "common-utility": {
          test: /.*node_modules[\\/](lodash.*|moment.*)[\\/]/,
          name: "common-utility",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        commons: {
          test: /.*node_modules[\\/](?!(@artsy[\\/]|react[\\/]|react-dom[\\/]|backbone.*[\\/]|lodash.*[\\/]|moment.*[\\/]|jquery.*[\\/]))/,
          name: "common",
          chunks: "all",
          minSize: 0,
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(basePath, "public/assets"),
    publicPath: "/assets/",
  },
  plugins: [...standardPlugins, new LoadablePlugin()],
  resolve: standardResolve,
  stats: standardStats,
}
