// @ts-check

const { RetryChunkLoadPlugin } = require("webpack-retry-chunk-load-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const LoadablePlugin = require("@loadable/webpack-plugin")
const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const webpack = require("webpack")
const WebpackManifestPlugin = require("webpack-manifest-plugin")
const { basePath, env } = require("../utils/env")
const {
  babelLoader,
  coffeeLoader,
  ejsLoader,
  jadeLoader,
  mjsLoader,
} = require("./commonLoaders")

export const novoProductionConfig = {
  devtool: env.webpackDevtool || "source-map",
  entry: {
    "artsy-novo": [path.resolve(process.cwd(), "src/novo/src/client.tsx")],
  },
  externals: {
    // Required because the cacheMiddleware include redis
    redis: "redis",
    // TODO: Needs research to determine if if this is still required
    request: "request",
  },
  mode: env.webpackDebug ? "development" : env.nodeEnv,
  module: {
    rules: [coffeeLoader, jadeLoader, babelLoader, ejsLoader, mjsLoader],
  },
  optimization: {
    concatenateModules: env.webpackConcatenate,
    minimize: !env.webpackDebug,
    minimizer: [
      new TerserPlugin({
        parallel: env.onCi ? env.webpackCiCpuLimit : true, // Only use 4 cpus (default) in CircleCI, by default it will try using 36 and OOM
      }),
    ],
    // Extract webpack runtime code into it's own file
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendors: false,
        "arsty-common": {
          chunks: "all",
          enforce: true,
          minChunks: 5,
          minSize: 0,
          name: "artsy-common",
          reuseExistingChunk: true,
          test: /.*src[\\/]/,
        },
        // "arsty-graphql-common": {
        //   chunks: "all",
        //   enforce: true,
        //   priority: 50,
        //   minChunks: 1,
        //   minSize: 0,
        //   name: "arsty-graphql-common",
        //   test: /.*src[\\/]v2[\\/]__generated__[\\/]/,
        // },
        artsy: {
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "artsy",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](@artsy)[\\/]/,
        },
        "common-react": {
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "common-react",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](react|react-dom)[\\/]/,
        },
        "common-utility": {
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "common-utility",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](lodash.*|luxon.*)[\\/]/,
        },
        commons: {
          chunks: "all",
          enforce: true,
          minChunks: 2,
          minSize: 0,
          name: "common",
          priority: 10,
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](?!(@artsy[\\/]|react[\\/]|react-dom[\\/]|backbone.*[\\/]|lodash.*[\\/]|moment.*[\\/]|luxon.*[\\/]|jquery.*[\\/]))/,
        },
      },
      maxInitialRequests: Infinity,
    },
  },
  output: {
    filename: "novo-[name].22820.[contenthash].js",
    path: path.resolve(basePath, "public/assets-novo"),
    publicPath: "/assets-novo/",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
    // Remove moment.js localization files
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    // Remove server-only modules from client bundles
    // TODO: Why would these end up in the client bundle?
    new webpack.IgnorePlugin({ resourceRegExp: /^graphql(\/.*)?$/ }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jade: "jade/runtime.js",
      waypoints: "jquery-waypoints/waypoints.js",
      "window.jQuery": "jquery",
    }),

    /**
     * If something goes wrong while loading a dynmic split chunk (import())
     * retry the fetch once per second up to `maxRetries`.
     *
     * NOTE: Since this plugin patches the native loading mechanism from webpack
     * we (may) need to revist once we upgrade to Webpack 5.
     */
    new RetryChunkLoadPlugin({
      cacheBust: `function() {
        return "cache-bust=" + Date.now();
      }`,
      maxRetries: 5,
    }),
    new LoadablePlugin({
      filename: "loadable-novo-stats.json",
      path: path.resolve(basePath, "public", "assets-novo"),
    }),
    new webpack.ids.HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      basePath: "/assets-novo/",
      fileName: path.resolve(basePath, "manifest-novo.json"),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(basePath, "public", "index.ejs"),
      inject: false,
      // minify: {
      //   collapseWhitespace: true,
      //   conservativeCollapse: true,
      //   removeComments: true,
      // },
      template: path.resolve(basePath, "src", "novo", "src", "index.ejs"),
    }),
  ],
  resolve: {
    alias: {
      "jquery.ui.widget": "blueimp-file-upload/js/vendor/jquery.ui.widget.js",

      react: require.resolve("react"),
      // The following packages need to be resolved to the host app (force) to get
      // around issues involving `yarn link` and multiple instances. A  similar
      // configuration has been setup for SSR in `src / index`, via `require - control`.
      "styled-components": require.resolve("styled-components"),
    },
    extensions: [
      ".mjs",
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
      ".jade",
      ".coffee",
    ],
    // Symlink issues should be fixed via `yarn--pnp`
    modules: [path.resolve(basePath, "src"), "node_modules"],
    symlinks: false,
  },
  stats: env.webpackStats || "normal",
}
