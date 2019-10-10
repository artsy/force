// @ts-check

const path = require("path")
const webpack = require("webpack")
const { getEntrypoints } = require("../utils/getEntrypoints")
const { NODE_ENV, basePath, isCI } = require("../../src/lib/environment")

exports.baseConfig = {
  mode: NODE_ENV,
  devtool: "cheap-module-source-map",
  stats: "errors-only",
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
        use: ["cache-loader", "coffee-loader"],
      },
      {
        test: /\.pug$/,
        include: path.resolve(basePath, "src"),
        use: [
          {
            loader: "pug-loader",
            options: {
              doctype: "html",
              root: __dirname,
              inlineRuntimeFunctions: false,
            },
          },
        ],
      },
      {
        test: /(\.(js|ts)x?$)/,
        include: path.resolve(basePath, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: !isCI && path.join(basePath, ".cache", "babel"),
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
  node: {
    fs: "empty",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Remove moment.js localization files
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      pug: "pug-runtime/index.js",
      waypoints: "jquery-waypoints/waypoints.js",
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
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json", ".coffee"],
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
    request: "request",
  },
}
