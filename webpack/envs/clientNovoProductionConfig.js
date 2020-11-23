// @ts-check

const { basePath, env } = require("../utils/env")
const { getCSSManifest } = require("../utils/getCSSManifest")
const { HashedModuleIdsPlugin } = require("webpack")
const { RetryChunkLoadPlugin } = require("webpack-retry-chunk-load-plugin")
const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const webpack = require("webpack")
const WebpackManifestPlugin = require("webpack-manifest-plugin")
const LoadablePlugin = require("@loadable/webpack-plugin")

export const clientNovoProductionConfig = {
  devtool: "source-map",
  entry: {
    "artsy-novo": [path.resolve(process.cwd(), "src/novo/src/client.tsx")],
  },
  externals: {
    // Don't bundle modules and consider them external
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
      // ESM support. See: https://github.com/apollographql/react-apollo/issues/1737#issuecomment-371178602
      {
        test: /\.mjs$/,
        type: "javascript/auto",
        use: [],
      },
    ],
  },
  optimization: {
    minimize: !env.webpackDebug,

    minimizer: [
      new TerserPlugin({
        cache: false,
        parallel: env.onCi ? env.webpackCiCpuLimit : true, // Only use 4 cpus (default) in CircleCI, by default it will try using 36 and OOM
        sourceMap: true, // Must be set to true if using source-maps in production
      }),
    ],
    // Extract webpack runtime code into it's own file
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        "arsty-common": {
          name: "artsy-common",
          chunks: "all",
          test: /.*src[\\/]/,
          minChunks: 5,
          enforce: true,
          minSize: 0,
          reuseExistingChunk: true,
        },
        artsy: {
          name: "artsy",
          chunks: "all",
          test: /.*node_modules[\\/](@artsy)[\\/]/,
          minChunks: 1,
          enforce: true,
          minSize: 0,
          reuseExistingChunk: true,
        },
        "common-backbone": {
          chunks: "all",
          name: "common-backbone",
          minChunks: 1,
          test: /.*node_modules[\\/](backbone.*)[\\/]/,
          enforce: true,
          minSize: 0,
          reuseExistingChunk: true,
        },
        "common-jquery": {
          chunks: "all",
          name: "common-jquery",
          minChunks: 1,
          test: /.*node_modules[\\/](jquery.*)[\\/]/,
          enforce: true,
          minSize: 0,
          reuseExistingChunk: true,
        },
        "common-react": {
          chunks: "all",
          name: "common-react",
          minChunks: 1,
          test: /.*node_modules[\\/](react|react-dom)[\\/]/,
          enforce: true,
          minSize: 0,
          reuseExistingChunk: true,
        },
        "common-utility": {
          chunks: "all",
          name: "common-utility",
          minChunks: 1,
          test: /.*node_modules[\\/](lodash.*|moment.*)[\\/]/,
          enforce: true,
          minSize: 0,
          reuseExistingChunk: true,
        },
        commons: {
          chunks: "all",
          name: "common",
          minChunks: 2,
          test: /.*node_modules[\\/](?!(@artsy[\\/]|react[\\/]|react-dom[\\/]|backbone.*[\\/]|lodash.*[\\/]|moment.*[\\/]|jquery.*[\\/]))/,
          enforce: true,
          minSize: 0,
          reuseExistingChunk: true,
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
        NODE_ENV: '"production"',
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
    new WebpackManifestPlugin({
      basePath: "/assets-novo/",
      fileName: path.resolve(basePath, "manifest-novo.json"),
      seed: env.isProduction ? getCSSManifest() : {},
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
