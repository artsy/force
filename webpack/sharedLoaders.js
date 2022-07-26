// @ts-check

import path from "path"
import { basePath, webpackEnv } from "./webpackEnv"
import swcConfig from "../.swcrc.js"

export const swcLoader = {
  include: path.resolve(basePath, "src"),
  test: /(\.(js|ts)x?$)/,
  use: [
    {
      loader: "swc-loader",
      options: swcConfig,
    },
  ],
}

export const babelLoader = {
  exclude: /(node_modules)/,
  include: path.resolve(basePath, "src"),
  test: /(\.(js|ts)x?$)/,
  use: [
    {
      loader: "babel-loader",
      options: {
        cacheDirectory:
          !process.env.CI && path.join(basePath, ".cache", "babel/force"),
        plugins: [
          webpackEnv.isDevelopment && require.resolve("react-refresh/babel"),
        ].filter(Boolean),
        presets: [["@babel/preset-env", { modules: false }]],
      },
    },
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

// Required for webpack 5 to allow interop with with non-ESM modules is handled.
// TODO: This may be removed once all dependant references to
// @babel/runtime-corejs3 are removed.
export const mjsLoader = {
  resolve: {
    fullySpecified: false,
  },
  test: /\.m?js/,
}
