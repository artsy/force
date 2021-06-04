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
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "artsy",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](@artsy)[\\/]/,
        },
        "arsty-common": {
          chunks: "all",
          enforce: true,
          minChunks: 5,
          minSize: 0,
          name: "artsy-common",
          reuseExistingChunk: true,
          test: /.*src[\\/]/,
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
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "common-react",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](react|react-dom)[\\/]/,
        },
        "common-utility": {
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "common-utility",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](lodash.*|moment.*)[\\/]/,
        },
        commons: {
          chunks: "all",
          enforce: true,
          minChunks: 2,
          minSize: 0,
          name: "common",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](?!(@artsy[\\/]|react[\\/]|react-dom[\\/]|backbone.*[\\/]|lodash.*[\\/]|moment.*[\\/]|jquery.*[\\/]))/,
        },
      },
    },
  },
  output: {
    filename: "legacy-[name].js",
    path: path.resolve(basePath, "public/assets"),
    publicPath: "/assets/",
  },
  plugins: [...standardPlugins, new LoadablePlugin()],
  resolve: standardResolve,
  stats: standardStats,
}
