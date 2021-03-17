// @ts-check

import chalk from "chalk"
import fs from "fs"
import path from "path"
import webpack from "webpack"
import ForkTsCheckerNotifierWebpackPlugin from "fork-ts-checker-notifier-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import WebpackNotifierPlugin from "webpack-notifier"
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin"
import { basePath, env } from "../utils/env"
import { getEntrypoints } from "../utils/getEntrypoints"

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
    new CaseSensitivePathsPlugin(),
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
    new ForkTsCheckerNotifierWebpackPlugin({
      excludeWarnings: true,
      skipFirstNotification: true,
    }),
    new WebpackNotifierPlugin(),
  ],
}
