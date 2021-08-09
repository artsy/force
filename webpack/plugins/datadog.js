// @ts-check

import { BuildPlugin } from "@datadog/build-plugin/dist/webpack"
import merge from "webpack-merge"
import { env } from "../utils/env"

export function metrics(config, build) {
  if (!env.enableWebpackDatadog) {
    return config
  }

  if (!env.datadogKey) {
    return merge.smart(config, {
      plugins: [new BuildPlugin()],
    })
  }

  return merge.smart(config, {
    plugins: [
      new BuildPlugin({
        datadog: {
          apiKey: env.datadogKey,
          prefix: "webpack.force",
          tags: [
            `build:${build}`,
            `cpuLimit:${env.webpackCiCpuLimit}`,
            `cpus:${env.machineCpus}`,
            `env:${process.env.NODE_ENV || "development"}`,
            `heapSize:${env.machineHeapSize}`,
            `machine:${env.machineNameHash}`,
          ],
        },
      }),
    ],
  })
}
