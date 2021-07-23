// @ts-check

import { BuildPlugin } from "@datadog/build-plugin/dist/webpack"
import merge from "webpack-merge"
import { env } from "../utils/env"

export function metrics(config, build) {
  if (!env.enableWebpackDatadog || !env.datadogKey) {
    return config
  }

  return merge.smart(config, {
    plugins: [
      new BuildPlugin(
        env.datadogKey
          ? {
              datadog: {
                apiKey: env.datadogKey,
                prefix: "webpack.force",
                tags: [
                  `build:${build}`,
                  `env:${process.env.NODE_ENV || "development"}`,
                ],
              },
            }
          : {}
      ),
    ],
  })
}
