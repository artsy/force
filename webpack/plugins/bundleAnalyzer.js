// @ts-check

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const merge = require("webpack-merge")
const { env } = require("../utils/env")

export function bundleAnalyzer(config) {
  if (!env.enableWebpackAnalyze) {
    return config
  }

  return merge.smart(config, {
    devtool: false,
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
