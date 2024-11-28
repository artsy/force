// @ts-check
const path = require("path")
const rspack = require("@rspack/core")
const LoadablePlugin = require("@loadable/webpack-plugin").default
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")
const { basePath } = require("../webpackEnv")
const { sharedPlugins } = require("../sharedPlugins")
const { splitChunks } = require("../bundleSplitting")
const { babelLoader, ejsLoader, mjsLoader } = require("../sharedLoaders")

const {
  externals,
  productionDevtool,
  minimizer,
  mode,
  resolve,
  stats,
} = require("../sharedConfig")

console.log("\n[Force] Building client-side production code...\n")

const clientProductionConfig = () => {
  return {
    devtool: productionDevtool,
    entry: {
      "artsy-entry": [path.resolve(process.cwd(), "src/client.tsx")],
    },
    externals,
    mode,
    module: {
      rules: [babelLoader, ejsLoader, mjsLoader],
    },
    optimization: {
      minimize: !process.env.WEBPACK_FAST_PROD_BUILD,
      minimizer,
      runtimeChunk: "single", // Extract webpack runtime code into its own file
      splitChunks,
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(basePath, "public/assets"),
      publicPath: "/assets/",
    },
    stats: process.env.RELATIVE_CI_KEY
      ? {
          assets: true,
          chunks: true,
          modules: true,
        }
      : stats,
    plugins: [
      ...sharedPlugins(),
      new LoadablePlugin({
        filename: "loadable-stats.json",
        // @ts-ignore
        path: path.resolve(basePath, "public", "assets"),
      }),
      new WebpackManifestPlugin({
        basePath: "/assets/",
        fileName: path.resolve(basePath, "manifest.json"),
      }),
      new rspack.HtmlRspackPlugin({
        filename: path.resolve(basePath, "public", "html.ejs"),
        template: path.resolve(basePath, "src/html.ejs"),
        // We need to inject runtime CDN url in via express
        inject: false,
        scriptLoading: "defer",
        minify: true,
      }),
      process.env.WEBPACK_BUNDLE_REPORT &&
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          defaultSizes: "gzip",
        }),
    ].filter(Boolean),
    resolve,
  }
}

module.exports = clientProductionConfig()
