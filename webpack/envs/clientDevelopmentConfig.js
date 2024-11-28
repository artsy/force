const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const LoadablePlugin = require("@loadable/webpack-plugin").default
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh")
const { RspackManifestPlugin } = require("rspack-manifest-plugin")
const path = require("path")
const rspack = require("@rspack/core")
const { basePath, webpackEnv } = require("../webpackEnv")
const { splitChunks } = require("../bundleSplitting")
const { sharedPlugins } = require("../sharedPlugins")
const { babelLoader, ejsLoader, mjsLoader } = require("../sharedLoaders")

const {
  devtool,
  experiments,
  externals,
  mode,
  resolve,
  stats,
} = require("../sharedConfig")

console.log("\n[Force] Building client-side development code...\n")

/**
 *
 * @returns {import("@rspack/core").RspackOptions}
 */
const clientDevelopmentConfig = () => {
  return {
    cache: true,
    devtool,
    entry: {
      "artsy-entry": [
        "webpack-hot-middleware/client?reload=true",
        path.resolve(process.cwd(), "src/client.tsx"),
      ],
    },
    experiments,
    externals,
    mode,
    module: {
      rules: [babelLoader, ejsLoader, mjsLoader],
    },
    optimization: {
      runtimeChunk: "single", // Extract webpack runtime code into its own file
      splitChunks,

      // Webpack does extra algorithmic work to optimize the output for size and
      // load performance. These optimizations are performant for smaller codebases,
      // but can be costly in larger ones.
      removeAvailableModules: webpackEnv.isDevelopment,
      removeEmptyChunks: webpackEnv.isDevelopment,
    },
    output: {
      filename: "[name].js",
      path: path.resolve(basePath, "public/assets"),
      publicPath: "/assets/",
      pathinfo: false,
    },
    plugins: [
      ...sharedPlugins(),
      new rspack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
      new LoadablePlugin({
        filename: "loadable-stats.json",
        // path: path.resolve(basePath, "public", "assets"),
      }),
      new HtmlWebpackPlugin({
        filename: path.resolve(basePath, "public", "html.ejs"),
        template: path.resolve(basePath, "src/html.ejs"),
        // We need to inject runtime CDN url in via express
        inject: false,
        scriptLoading: "defer",
      }),
      new ReactRefreshPlugin({
        overlay: false,
      }),
      new rspack.ProgressPlugin(),
      new RspackManifestPlugin({
        basePath: "/assets/",
        fileName: path.resolve(basePath, "manifest.json"),
      }),
    ],
    resolve,
    stats,
  }
}

module.exports = clientDevelopmentConfig()
