// @ts-check

import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import WebpackManifestPlugin from "webpack-manifest-plugin"
import CompressionWebpackPlugin from "compression-webpack-plugin"
import BrotliWebpackPlugin from "brotli-webpack-plugin"
import path from "path"
import { HashedModuleIdsPlugin } from "webpack"
import { getCSSManifest } from "../utils/getCSSManifest"

export const productionConfig = {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new CompressionWebpackPlugin({
      algorithm: "gzip",
      test: /(\.(js|ts)x?$)/,
      threshold: 10240,
      minRatio: 0.7,
    }),
    new BrotliWebpackPlugin({
      test: /(\.(js|ts)x?$)/,
      threshold: 10240,
      minRatio: 0.7,
    }),
    new HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      fileName: path.resolve(__dirname, "../../manifest.json"),
      basePath: "/assets/",
      seed: getCSSManifest(),
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
