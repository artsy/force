// @ts-check

const path = require("path")
const WebpackManifestPlugin = require("webpack-manifest-plugin")
const { HashedModuleIdsPlugin } = require("webpack")
const { getCSSManifest } = require("../utils/getCSSManifest")
const TerserPlugin = require("terser-webpack-plugin")

const {
  BUILD_SERVER,
  DEBUG,
  NODE_ENV,
  isProduction,
} = require("../../src/lib/environment")

const buildCSS = isProduction && !BUILD_SERVER

exports.productionConfig = {
  parallelism: 75,
  mode: DEBUG ? "development" : NODE_ENV,
  devtool: "source-map",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      fileName: path.resolve(__dirname, "../../manifest.json"),
      basePath: "/assets/",
      seed: buildCSS ? getCSSManifest() : {},
    }),
  ],
  optimization: DEBUG
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
