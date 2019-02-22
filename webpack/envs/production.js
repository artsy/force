// @ts-check

import CompressionWebpackPlugin from "compression-webpack-plugin"
import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import WebpackManifestPlugin from "webpack-manifest-plugin"
import path from "path"
import { HashedModuleIdsPlugin } from "webpack"
import { getCSSManifest } from "../utils/getCSSManifest"
import { NODE_ENV, isProduction, isCI } from "../../src/lib/environment"

const buildCSS = isProduction && !isCI

export const productionConfig = {
  mode: NODE_ENV,
  devtool: "source-map",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    // new CompressionWebpackPlugin({
    //   test: /(\.(js|ts)x?$)/,
    // }),
    new HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      fileName: path.resolve(__dirname, "../../manifest.json"),
      basePath: "/assets/",
      seed: buildCSS ? getCSSManifest() : {},
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            warnings: false,
          },
        },
      }),
    ],
  },
}
