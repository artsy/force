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
const crypto = require("crypto")

const splits = {
  current: {
    cacheGroups: {
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
  prodGranular: {
    cacheGroups: {
      commons: {
        chunks: "all",
        minChunks: 8,
        name: "commons",
        priority: 20,
      },
      default: false,
      framework: {
        chunks: "all",
        name: "framework",
        priority: 40,
        test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
      },
      lib: {
        minChunks: 1,
        name(module) {
          const rawRequest =
            module.rawRequest &&
            module.rawRequest.replace(/^@(\w+)[/\\]/, "$1-")
          if (rawRequest) return rawRequest

          const identifier = module.identifier()
          const trimmedIdentifier = /(?:^|[/\\])node_modules[/\\](.*)/.exec(
            identifier
          )
          const processedIdentifier =
            trimmedIdentifier &&
            trimmedIdentifier[1].replace(/^@(\w+)[/\\]/, "$1-")

          return processedIdentifier || identifier
        },
        priority: 30,
        reuseExistingChunk: true,
        test(module) {
          return (
            module.size() > 160000 &&
            /node_modules[/\\]/.test(module.identifier())
          )
        },
      },
      shared: {
        minChunks: 2,
        name(module, chunks) {
          return crypto
            .createHash("sha1")
            .update(
              chunks.reduce((acc, chunk) => {
                return acc + chunk.name
              }, "")
            )
            .digest("base64")
            .replace(/\//g, "")
        },
        priority: 10,
        reuseExistingChunk: true,
      },
      vendors: false,
    },
    chunks: "all",
    maxInitialRequests: 20,
  },
}

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
    splitChunks: splits.prodGranular,
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
