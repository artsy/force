// @ts-check

import path from "path"
import { WebpackManifestPlugin } from "webpack-manifest-plugin"
import webpack from "webpack"
import { getCSSManifest } from "../utils/getCSSManifest"
import TerserPlugin from "terser-webpack-plugin"
import { basePath, env } from "../utils/env"
import { getEntrypoints } from "../utils/getEntrypoints"

export const clientProductionConfig = {
  devtool: env.webpackDevtool || "source-map",
  entry: getEntrypoints(),
  optimization: {
    minimize: !env.webpackDebug,
    minimizer: [
      new TerserPlugin({
        parallel: env.onCi ? env.webpackCiCpuLimit : true, // Only use 4 cpus (default) in CircleCI, by default it will try using 36 and OOM
      }),
    ],
  },
  output: {
    filename: "[name].22820.[contenthash].js",
    // NOTE: On the client, we're setting `publicPath` during runtime in order to
    // ensure that dynamically loaded split chunks are being pulled from CDN.
    // @see: https://github.com/artsy/force/blob/master/src/desktop/lib/global_client_setup.tsx#L7
  },
  plugins: [
    new webpack.ids.HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      fileName: path.resolve(basePath, "manifest.json"),
      basePath: "/assets/",
      seed: env.isProduction ? getCSSManifest() : {},
    }),
  ],
}
