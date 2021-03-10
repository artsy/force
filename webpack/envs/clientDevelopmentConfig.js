// @ts-check

const chalk = require("chalk")
const fs = require("fs")
const path = require("path")
const webpack = require("webpack")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const WebpackNotifierPlugin = require("webpack-notifier")
const { basePath, env } = require("../utils/env")
const { getEntrypoints } = require("../utils/getEntrypoints")

const cacheDirectory = path.resolve(basePath, ".cache")

if (!env.onCi && !fs.existsSync(cacheDirectory)) {
  console.log(
    chalk.yellow(
      "\n[!] No existing `.cache` directory detected, initial " +
        "launch will take a while.\n"
    )
  )
}

export const clientDevelopmentConfig = {
  devtool: env.webpackDevtool || "eval",
  entry: getEntrypoints(),
  module: {
    // Why do we only compile css in development mode?
    rules: [
      {
        include: path.resolve(basePath, "src/desktop/assets"),
        test: /\.ts$/,
        use: [
          {
            loader: path.resolve(basePath, "webpack/utils/autohot.js"),
          },
        ],
      },
      {
        include: path.resolve(basePath, "src/mobile/assets"),
        test: /\.ts$/,
        use: [
          {
            loader: path.resolve(basePath, "webpack/utils/autohot.js"),
          },
        ],
      },
      {
        include: path.resolve(basePath, "src"),
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader",
            options: {
              singleton: true,
            },
          },
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              import: ["~nib/lib/nib/index.styl"],
              paths: ["node_modules/nib/lib/nib"],
              use: [require("nib")()],
            },
          },
        ],
      },
    ],
  },
  name: "force",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          syntactic: true,
          semantic: true,
          declaration: false,
          global: false,
        },
      },
      formatter: { type: "codeframe", options: { highlightCode: true } },
    }),
    new WebpackNotifierPlugin(),
  ],
}
