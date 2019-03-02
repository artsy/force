// @ts-check

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const { NODE_ENV } = require("../../src/lib/environment")

const plugins = {
  bundleAnalyzer: new BundleAnalyzerPlugin(),
}

const debugConfig = {
  mode: NODE_ENV,
  devtool: false,
  stats: "normal",
  plugins: [plugins.bundleAnalyzer],
}

module.exports = {
  plugins,
  debugConfig,
}
