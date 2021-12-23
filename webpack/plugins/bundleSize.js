// @ts-check

import SizePlugin from "size-plugin"
import merge from "webpack-merge"
import { env } from "../utils/env"

export function bundleSize(config) {
  if (!env.enableWebpackSizePlugin) {
    return config
  }

  return merge.smart(config, {
    stats: "normal",
    plugins: [new SizePlugin({})],
  })
}
