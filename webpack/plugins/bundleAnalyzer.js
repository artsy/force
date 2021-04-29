// @ts-check

import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import merge from "webpack-merge"
import { env } from "../utils/env"

export function bundleAnalyzer(config) {
  if (!env.enableWebpackAnalyze) {
    return config
  }

  return merge.smart(config, {
    stats: "normal",
    optimization: {
      concatenateModules: false,
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        defaultSizes: "gzip",
      }),
    ],
  })
}
