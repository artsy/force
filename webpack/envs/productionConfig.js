// @ts-check

const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const WebpackManifestPlugin = require("webpack-manifest-plugin")
const { HashedModuleIdsPlugin } = require("webpack")
const { getCSSManifest } = require("../utils/getCSSManifest")

const {
  BUILD_SERVER,
  NODE_ENV,
  isProduction,
} = require("../../src/lib/environment")

const buildCSS = isProduction && !BUILD_SERVER

exports.productionConfig = {
  mode: NODE_ENV,
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
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true,
      //   uglifyOptions: {
      //     compress: {
      //       warnings: false,
      //     },
      //   },
      // }),
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
}
