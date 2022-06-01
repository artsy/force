// @ts-check

import path from "path"
import { basePath, env } from "../utils/env"

export const babelLoader = {
  exclude: /(node_modules)/,
  include: path.resolve(basePath, "src"),
  test: /(\.(js|ts)x?$)/,
  use: [
    {
      loader: "babel-loader",
      options: {
        cacheDirectory:
          !env.onCi && path.join(basePath, ".cache", "babel/force"),
        plugins: [
          "lodash",
          env.isDevelopment && require.resolve("react-refresh/babel"),
        ].filter(Boolean),
        presets: [["@babel/preset-env", { modules: false }]],
      },
    },
  ],
}

export const coffeeLoader = {
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
}

export const ejsLoader = {
  test: /\.ejs$/,
  use: {
    // https://github.com/bazilio91/ejs-compiled-loader/issues/46
    loader: "ejs-compiled-loader",
    options: {
      htmlmin: true,
      htmlminOptions: {
        removeComments: true,
      },
    },
  },
}

export const jadeLoader = {
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
}

// Required for webpack 5 to allow interop with with non-ESM modules is handled.
// TODO: This may be removed once all dependant references to
// @babel/runtime-corejs3 are removed.
export const mjsLoader = {
  resolve: {
    fullySpecified: false,
  },
  test: /\.m?js/,
}
