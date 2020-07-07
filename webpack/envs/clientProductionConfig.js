// @ts-check

const path = require("path")
const WebpackManifestPlugin = require("webpack-manifest-plugin")
const { HashedModuleIdsPlugin } = require("webpack")
const { getCSSManifest } = require("../utils/getCSSManifest")
const TerserPlugin = require("terser-webpack-plugin")
const { basePath, env } = require("../utils/env")

export const clientProductionConfig = {
  parallelism: 75,
  mode: env.webpackDebug ? "development" : env.nodeEnv,
  devtool: "source-map",
  output: {
    filename: "[name].22820.[contenthash].js",
    // NOTE: On the client, we're setting `publicPath` during runtime in order to
    // ensure that dynamically loaded split chunks are being pulled from CDN.
    // @see: https://github.com/artsy/force/blob/master/src/desktop/lib/global_client_setup.tsx#L7
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      fileName: path.resolve(basePath, "manifest.json"),
      basePath: "/assets/",
      seed: env.isProduction ? getCSSManifest() : {},
    }),
  ],
  optimization: env.webpackDebug
    ? {}
    : {
        minimizer: [
          new TerserPlugin({
            cache: false,
            parallel: false,
            sourceMap: true, // Must be set to true if using source-maps in production
          }),
        ],
      },
}
