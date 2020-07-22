// @ts-check

const chalk = require("chalk")
const fs = require("fs")
const path = require("path")
const webpack = require("webpack")
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
const WebpackNotifierPlugin = require("webpack-notifier")
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin")
const { basePath, env } = require("../utils/env")

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
  stats: env.webpackStats || "errors-only",
  module: {
    // Why do we only compile css in development mode?
    rules: [
      {
        test: /\.styl$/,
        include: path.resolve(basePath, "src"),
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
              paths: [
                /* "node_modules/artsy-elan", */
                "node_modules/nib/lib/nib",
              ],
              use: [require("nib")()],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // @ts-ignore
    new SimpleProgressWebpackPlugin({
      format: "compact",
    }),
    new ForkTsCheckerWebpackPlugin({
      formatter: "codeframe",
      formatterOptions: "highlightCode",
      checkSyntacticErrors: true,
      watch: ["./src"],
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      excludeWarnings: true,
      skipFirstNotification: true,
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
      compilationSuccessInfo: {
        messages: [`[Force] Listening on http://localhost:${env.port} \n`],
        notes: [""],
      },
    }),
    new WebpackNotifierPlugin(),
  ],
}
