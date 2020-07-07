// @ts-check

const path = require("path")
const webpack = require("webpack")
const LoadablePlugin = require("@loadable/webpack-plugin")
const { RetryChunkLoadPlugin } = require("webpack-retry-chunk-load-plugin")
const { getEntrypoints } = require("../utils/getEntrypoints")
const { basePath, env } = require("../utils/env")

export const clientCommonConfig = {
  mode: env.nodeEnv,
  devtool: "source-map",
  stats: "normal", // or, `errors-only`
  entry: getEntrypoints(),
  output: {
    filename: "[name].js",
    path: path.resolve(basePath, "public/assets"),
    publicPath: "/assets/",
  },
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
      // ESM support. See: https://github.com/apollographql/react-apollo/issues/1737#issuecomment-371178602
      {
        type: "javascript/auto",
        test: /\.mjs$/,
        use: [],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env.nodeEnv),
      },
    }),
    // Remove moment.js localization files
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Remove server-only modules from client bundles
    ...[
      // Remove server side of relay network layer.
      new webpack.IgnorePlugin(
        /^react-relay-network-modern-ssr\/node8\/server/
      ),
      // No matter what, we don't want the graphql-js package in client
      // bundles. This /may/ lead to a broken build when e.g. a reaction
      // module that's used on the client side imports something from
      // graphql-js, but that's better than silently including this.
      new webpack.IgnorePlugin(/^graphql(\/.*)?$/),
    ],
    new webpack.NamedModulesPlugin(),
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
  },
  optimization: {
    // Extract webpack runtime code into it's own file
    runtimeChunk: {
      name: "runtime-manifest",
    },
    splitChunks: {
      cacheGroups: {
        // Separate vendor libraries from `node_modules` into a `commons.js`
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "common",
          minChunks: 10,
          chunks: "initial",
        },
      },
    },
  },
  externals: {
    // Don't bundle modules and consider them external
    redis: "redis",
    request: "request",
  },
}
