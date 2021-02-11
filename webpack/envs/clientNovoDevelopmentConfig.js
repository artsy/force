// @ts-check

const { HashedModuleIdsPlugin } = require("webpack")
const { RetryChunkLoadPlugin } = require("webpack-retry-chunk-load-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const LoadablePlugin = require("@loadable/webpack-plugin")
const path = require("path")
const webpack = require("webpack")
const WebpackManifestPlugin = require("webpack-manifest-plugin")
const { basePath, env } = require("../utils/env")

export const clientNovoDevelopmentConfig = {
  devtool: "source-map",
  entry: {
    "artsy-novo": [
      "webpack-hot-middleware/client?name=novo&reload=true",
      path.resolve(process.cwd(), "src/novo/src/client.tsx"),
    ],
  },
  externals: {
    redis: "redis",
    request: "request",
  },
  mode: env.webpackDebug ? "development" : env.nodeEnv,
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        include: path.resolve(basePath, "src"),
        test: /\.coffee$/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: ".cache",
            },
          },
          "coffee-loader",
        ],
      },
      {
        include: path.resolve(basePath, "src"),
        test: /\.(jade|pug)$/,
        use: [
          {
            loader: "pug-loader",
            options: {
              doctype: "html",
              root: __dirname,
            },
          },
        ],
      },
      {
        exclude: /(node_modules)/,
        include: path.resolve(basePath, "src"),
        test: /(\.(js|ts)x?$)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory:
                !env.onCi && path.join(basePath, ".cache", "babel/force"),
            },
          },
        ],
      },
      {
        test: /\.mjs$/,
        type: "javascript/auto",
        use: [],
      },
      // https://github.com/bazilio91/ejs-compiled-loader/issues/46
      {
        test: /\.ejs$/,
        use: {
          loader: "ejs-compiled-loader",
          options: {
            htmlmin: true,
            htmlminOptions: {
              removeComments: true,
            },
          },
        },
      },
    ],
  },
  name: "novo",
  optimization: {
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
        artsy: {
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "artsy",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](@artsy)[\\/]/,
        },
        "common-backbone": {
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "common-backbone",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](backbone.*)[\\/]/,
        },
        "common-jquery": {
          chunks: "all",
          enforce: true,
          minChunks: 1,
          minSize: 0,
          name: "common-jquery",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](jquery.*)[\\/]/,
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
          test: /.*node_modules[\\/](lodash.*|moment.*)[\\/]/,
        },
        commons: {
          chunks: "all",
          enforce: true,
          minChunks: 2,
          minSize: 0,
          name: "common",
          reuseExistingChunk: true,
          test: /.*node_modules[\\/](?!(@artsy[\\/]|react[\\/]|react-dom[\\/]|backbone.*[\\/]|lodash.*[\\/]|moment.*[\\/]|jquery.*[\\/]))/,
        },
      },
      maxInitialRequests: Infinity,
    },
  },
  output: {
    filename: "novo-[name].js",
    path: path.resolve(basePath, "public/assets-novo"),
    publicPath: "/assets-novo/",
  },
  parallelism: 100,
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env.nodeEnv),
      },
    }),
    // Remove moment.js localization files
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Remove server-only modules from client bundles
    // Remove server side of relay network layer.
    new webpack.IgnorePlugin(/^react-relay-network-modern-ssr\/node8\/server/),
    // No matter what, we don't want the graphql-js package in client
    // bundles. This /may/ lead to a broken build when e.g. a reaction
    // module that's used on the client side imports something from
    // graphql-js, but that's better than silently including this.
    new webpack.IgnorePlugin(/^graphql(\/.*)?$/),
    new webpack.NamedModulesPlugin(),
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
    new HashedModuleIdsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackManifestPlugin({
      basePath: "/assets-novo/",
      fileName: path.resolve(basePath, "manifest-novo.json"),
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(basePath, "public", "index.ejs"),
      inject: false,
      template: path.resolve(basePath, "src", "novo", "src", "index.ejs"),
    }),
  ],
  resolve: {
    alias: {
      "jquery.ui.widget": "blueimp-file-upload/js/vendor/jquery.ui.widget.js",
      react: require.resolve("react"),
      // The following packages need to be resolved to the host app (force) to get
      // around issues involving `yarn link` and multiple instances. A  similar
      // configuration has been setup for SSR in `src/index`, via `require-control`.
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
    // Symlink issues should be fixed via `yarn --pnp`
    modules: [path.resolve(basePath, "src"), "node_modules"],
    symlinks: false,
  },
  stats: "normal",
}
