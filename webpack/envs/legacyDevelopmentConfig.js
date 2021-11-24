// @ts-check

import path from "path"
import webpack from "webpack"
import ForkTsCheckerNotifierWebpackPlugin from "fork-ts-checker-notifier-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin"
import WebpackNotifierPlugin from "webpack-notifier"
import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin"
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { basePath, env } from "../utils/env"
import { getEntrypoints } from "../utils/getEntrypoints"

export const legacyDevelopmentConfig = () => ({
  entry: getEntrypoints(),
  module: {
    // CSS is compiled in dev for in-memory refreshing; in prod its compiled
    // by separate stylus binary
    rules: [
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
    new SimpleProgressWebpackPlugin({
      format: "compact",
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      formatter: "codeframe",
      formatterOptions: "highlightCode",
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
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
  ],
  stats: env.webpackStats || "errors-only",
})
