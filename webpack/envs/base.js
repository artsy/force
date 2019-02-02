// @ts-check

import path from "path"
import webpack from "webpack"
import { buildEntrypoints } from "../utils/buildEntrypoints"
import { NODE_ENV, basePath, isCI } from "../utils/environment"

export const baseConfig = {
  mode: NODE_ENV,
  devtool: "cheap-module-source-map",
  stats: "errors-only",
  entry: buildEntrypoints(),
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
      jade: "jade/runtime.js",
      waypoints: "jquery-waypoints/waypoints.js",
    }),
  ],
  resolve: {
    alias: {
      "jquery.ui.widget": "blueimp-file-upload/js/vendor/jquery.ui.widget.js",
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
    // Add Webpack runtime code to the `common` chunk
    runtimeChunk: {
      name: "common",
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
