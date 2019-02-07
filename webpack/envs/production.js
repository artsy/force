// @ts-check

import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import WebpackManifestPlugin from "webpack-manifest-plugin"
import CompressionWebpackPlugin from "compression-webpack-plugin"
import BrotliWebpackPlugin from "brotli-webpack-plugin"
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
    new CompressionWebpackPlugin({
      test: /(\.(js|ts)x?$)/,
      algorithm: "gzip",
      filename: "[path].jgz[query]",
      deleteOriginalAssets: false,
    }),

    // TODO: Figure out a solution to Cloudfront Brotli support:
    // See: https://github.com/artsy/force/pull/3458#discussion_r254194047
    new BrotliWebpackPlugin({
      test: /(\.(js|ts)x?$)/,
      threshold: 10240,
      minRatio: 0.7,
    }),
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
