// @ts-check

const path = require("path")
const { basePath, webpackEnv } = require("./webpackEnv")
const relay = require("../relay.config")

const babelLoader = {
  exclude: /(node_modules)/,
  include: path.resolve(basePath, "src"),
  test: /(\.(js|ts)x?$)/,
  use: {
    loader: "builtin:swc-loader",
    options: {
      jsc: {
        experimental: {
          plugins: [
            [
              "@swc/plugin-styled-components",
              {
                ssr: true,
                displayName: true,
              },
            ],
            [
              "@swc/plugin-relay",
              {
                rootDir: path.resolve(basePath),
                artifactDirectory: "src/__generated__",
                language: "typescript",
              },
            ],
          ],
        },
        parser: {
          syntax: "typescript",
          tsx: true,
          decorators: true,
          dynamicImport: true,
        },
        transform: {
          react: {
            development: webpackEnv.isDev,
            refresh: webpackEnv.isDev,
            runtime: "automatic",
          },
        },
      },
    },
  },
  type: "javascript/auto",
  // use: [
  //   {
  //     loader: "builtin:swc-loader",
  //     options: {
  //       cacheDirectory:
  //         !process.env.CI && path.join(basePath, ".cache", "babel/force"),
  //       plugins: [
  //         webpackEnv.isDevelopment && require.resolve("react-refresh/babel"),
  //       ].filter(Boolean),
  //       presets: [["@babel/preset-env", { modules: false }]],
  //     },
  //   },
  // ],
}

const ejsLoader = {
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

// Required for webpack 5 to allow interop with non-ESM modules.
// TODO: This may be removed once all dependent references to
// @babel/runtime-corejs3 are removed.
const mjsLoader = {
  resolve: {
    fullySpecified: false,
  },
  test: /\.m?js/,
}

module.exports = {
  babelLoader,
  ejsLoader,
  mjsLoader,
}
