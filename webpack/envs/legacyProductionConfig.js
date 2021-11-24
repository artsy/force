// @ts-check

import path from "path"
import WebpackManifestPlugin from "webpack-manifest-plugin"
import { HashedModuleIdsPlugin } from "webpack"
import { getCSSManifest } from "../utils/getCSSManifest"
import { basePath, env } from "../utils/env"
import { getEntrypoints } from "../utils/getEntrypoints"
import { minimizer } from "./sharedConfig"

export const legacyProductionConfig = () => ({
  entry: getEntrypoints(),
  optimization: {
    minimize: !env.webpackDebug && !env.fastProductionBuild,
    minimizer,
  },
  output: {
    filename: "[name].[contenthash].js",
    // NOTE: On the client, we're setting `publicPath` during runtime in order to
    // ensure that dynamically loaded split chunks are being pulled from CDN.
    // @see: https://github.com/artsy/force/blob/master/src/desktop/lib/deprecated_global_client_setup.tsx#L7
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      fileName: path.resolve(basePath, "manifest.json"),
      basePath: "/assets/",
      seed: env.isProduction ? getCSSManifest() : {},
    }),
  ],
})
