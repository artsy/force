// @ts-check

import chalk from "chalk"
import fs from "fs"
import path from "path"
import webpack from "webpack"
import ForkTsCheckerNotifierWebpackPlugin from "fork-ts-checker-notifier-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin"
import WebpackNotifierPlugin from "webpack-notifier"
import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin"

import {
  PORT,
  NODE_ENV,
  WEBPACK_DEVTOOL,
  basePath,
  isCI,
} from "../utils/environment"

const cacheDirectory = path.resolve(basePath, ".cache")

if (!isCI && !fs.existsSync(cacheDirectory)) {
  console.log(
    chalk.yellow(
      "\n[!] No existing `.cache` directory detected, initial " +
        "launch will take a while.\n"
    )
  )
}

export const developmentConfig = {
  mode: NODE_ENV,
  devtool: WEBPACK_DEVTOOL,
  module: {
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
        messages: [`[Force] Listening on http://localhost:${PORT} \n`],
        notes: [""],
      },
    }),
    new WebpackNotifierPlugin(),
  ],
}
