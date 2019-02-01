// @ts-check

import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import WebpackManifestPlugin from "webpack-manifest-plugin"
import CleanWebpackPlugin from "clean-webpack-plugin"
import { HashedModuleIdsPlugin } from "webpack"

import {
  basePath,
  ENABLE_EXPERIMENTAL_ASSET_BUNDLING,
} from "../utils/environment"

let hashedOutput = {}
if (ENABLE_EXPERIMENTAL_ASSET_BUNDLING) {
  hashedOutput = {
    output: {
      filename: "[name].[contenthash].js",
    },
  }
}

export const productionConfig = {
  mode: "production",
  devtool: "source-map",
  // FIXME: Once we remove experimental flag we can define this inline
  ...hashedOutput,
  plugins: [
    new CleanWebpackPlugin(["public/assets"], { root: basePath }),
    new HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      fileName: "test-manifest.json",
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          // TODO: Enable when we get sourcemaps running
          // mangle: true,
          compress: {
            warnings: false,
          },
        },
      }),
    ],
  },
}
