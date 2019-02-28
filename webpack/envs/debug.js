import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

import { NODE_ENV } from "../../src/lib/environment"

export const plugins = {
  bundleAnalyzer: new BundleAnalyzerPlugin(),
}

export const debugConfig = {
  mode: NODE_ENV,
  devtool: false,
  stats: "normal",
  plugins: [plugins.bundleAnalyzer],
}
