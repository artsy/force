// @ts-check

const nodeExternals = require("webpack-node-externals")
const path = require("path")
const rspack = require("@rspack/core")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const { basePath, webpackEnv } = require("../webpackEnv")
const {
  devtool,
  minimizer,
  mode,
  productionDevtool,
} = require("../sharedConfig")

console.log("[Force Server] Building server-side code...\n")

const serverConfig = () => {
  return {
    devtool: webpackEnv.isDevelopment ? devtool : productionDevtool,
    entry: path.join(basePath, "src/index.js"),
    externals: [nodeExternals()],
    mode,
    module: {
      rules: [
        {
          include: path.resolve(basePath, "src"),
          test: /(\.(js|ts)x?$)/,
          use: {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                  decorators: true,
                  dynamicImport: true,
                },
              },
            },
          },
        },
      ],
    },
    node: {
      __dirname: true,
    },
    optimization: {
      minimize: webpackEnv.isProduction && !process.env.WEBPACK_FAST_PROD_BUILD,
      minimizer,
    },
    output: {
      chunkFilename: "[name].bundle.js",
      filename: "server.dist.js",
      path: path.resolve(basePath),
    },
    plugins: [
      new rspack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),

      webpackEnv.isDevelopment && new rspack.ProgressPlugin(),

      process.env.WEBPACK_BUNDLE_REPORT &&
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          defaultSizes: "gzip",
        }),
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      modules: [path.resolve(basePath, "src"), "node_modules"],
    },
    target: "node",
  }
}

module.exports = serverConfig()
