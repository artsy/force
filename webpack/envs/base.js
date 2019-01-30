// @ts-check

import path from "path"
import webpack from "webpack"
import { getEntrypoints } from "../utils/getEntrypoints"
import { NODE_ENV, basePath, isCI } from "../utils/environment"

export const baseConfig = {
  mode: NODE_ENV,
  devtool: "cheap-module-source-map",
  stats: "errors-only",
  entry: {
    webpack: [
      "webpack-hot-middleware/client?reload=true",
      "./src/desktop/apps/webpack/client.js",
    ],
    ...getEntrypoints(),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(basePath, "public/assets"),
    publicPath: "/assets",
    sourceMapFilename: "[file].map?[contenthash]",
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        include: /src/,
        use: ["cache-loader", "coffee-loader"],
      },
      {
        test: /\.(jade|pug)$/,
        include: /src/,
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
        include: /src/,
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
      react: require.resolve("react"),
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
  externals: {
    request: "request",
  },
}
