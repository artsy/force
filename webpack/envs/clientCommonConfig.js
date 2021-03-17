// @ts-check

import path from "path"
import webpack from "webpack"
import LoadablePlugin from "@loadable/webpack-plugin"
import { RetryChunkLoadPlugin } from "webpack-retry-chunk-load-plugin"
import { basePath, env } from "../utils/env"

export const clientCommonConfig = {
  externals: {
    // Required because the cacheMiddleware include redis
    redis: "redis",
    // TODO: Needs research to determine if if this is still required
    request: "request",
  },
  mode: env.webpackDebug ? "development" : env.nodeEnv,
  module: {
    rules: [
      {
        test: /\.coffee$/,
        include: path.resolve(basePath, "src"),
        exclude: /(node_modules)/,
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
        test: /\.(jade|pug)$/,
        include: path.resolve(basePath, "src"),
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
        test: /(\.(js|ts)x?$)/,
        include: path.resolve(basePath, "src"),
        exclude: /(node_modules)/,
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
      // Required for webpack 5 to allow interop with with non-ESM modules is handled.
      // TODO: This may be removed once all dependant references to @babel/runtime-corejs3 are removed.
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  optimization: {
    // Extract webpack runtime code into it's own file
    concatenateModules: env.webpackConcatenate,
    runtimeChunk: "single",
    splitChunks: {
      maxInitialRequests: Infinity,
      cacheGroups: {
        artsy: {
          test: /.*node_modules[\\/](@artsy)[\\/]/,
          name: "artsy",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        "arsty-common": {
          test: /.*src[\\/]/,
          name: "artsy-common",
          chunks: "all",
          minSize: 0,
          minChunks: 5,
          reuseExistingChunk: true,
          enforce: true,
        },
        "common-backbone": {
          test: /.*node_modules[\\/](backbone.*)[\\/]/,
          name: "common-backbone",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        "common-jquery": {
          test: /.*node_modules[\\/](jquery.*)[\\/]/,
          name: "common-jquery",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        "common-react": {
          test: /.*node_modules[\\/](react|react-dom)[\\/]/,
          name: "common-react",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        "common-utility": {
          test: /.*node_modules[\\/](lodash.*|moment.*)[\\/]/,
          name: "common-utility",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        commons: {
          test: /.*node_modules[\\/](?!(@artsy[\\/]|react[\\/]|react-dom[\\/]|backbone.*[\\/]|lodash.*[\\/]|moment.*[\\/]|jquery.*[\\/]))/,
          name: "common",
          chunks: "all",
          minSize: 0,
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(basePath, "public/assets"),
    publicPath: "/assets/",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env.nodeEnv),
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
      "window.jQuery": "jquery",
      jade: "jade/runtime.js",
      waypoints: "jquery-waypoints/waypoints.js",
    }),
    new LoadablePlugin(),

    /**
     * If something goes wrong while loading a dynmic split chunk (import())
     * retry the fetch once per second up to `maxRetries`.
     *
     * NOTE: Since this plugin patches the native loading mechanism from webpack
     * we (may) need to revist once we upgrade to Webpack 5.
     */
    new RetryChunkLoadPlugin({
      maxRetries: 5,
      cacheBust: `function() {
        return "cache-bust=" + Date.now();
      }`,
    }),
  ],
  resolve: {
    alias: {
      "jquery.ui.widget": "blueimp-file-upload/js/vendor/jquery.ui.widget.js",

      // The following packages need to be resolved to the host app (force) to get
      // around issues involving `yarn link` and multiple instances. A  similar
      // configuration has been setup for SSR in `src/index`, via `require-control`.
      "styled-components": require.resolve("styled-components"),
      react: require.resolve("react"),
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
    fallback: {
      path: false,
      os: require.resolve("os-browserify/browser"),
      buffer: require.resolve("buffer/"),
    },
  },
  stats: env.webpackStats || "normal",
}
