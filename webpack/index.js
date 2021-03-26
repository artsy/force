// @ts-check

import chalk from "chalk"
import merge from "webpack-merge"
import fs from "fs"
import path from "path"
import { bundleAnalyzer } from "./plugins/bundleAnalyzer"
import { env, basePath } from "./utils/env"
import { legacyCommonConfig } from "./envs/legacyCommonConfig"
import { legacyDevelopmentConfig } from "./envs/legacyDevelopmentConfig"
import { legacyProductionConfig } from "./envs/legacyProductionConfig"
import { clientDevelopmentConfig } from "./envs/clientDevelopmentConfig"
import { clientProductionConfig } from "./envs/clientProductionConfig"
import { serverConfig } from "./envs/serverConfig"

const getServerConfig = () => {
  console.log(chalk.green(`\n[Force] NODE_ENV=${env.nodeEnv} \n`))

  switch (true) {
    case env.isDevelopment || env.isProduction:
      console.log("[Force Server] Building server-side code...")
      return serverConfig
  }

  throw new Error(`[Force Server] Unsupported environment ${env.nodeEnv}`)
}

const getLegacyConfig = () => {
  console.log(chalk.green(`\n[Force] NODE_ENV=${env.nodeEnv} \n`))

  switch (true) {
    case env.isDevelopment:
      const cacheDirectory = path.resolve(basePath, ".cache")

      if (!env.onCi && !fs.existsSync(cacheDirectory)) {
        console.log(
          chalk.yellow(
            "\n[!] No existing `.cache` directory detected, initial " +
              "launch will take a while.\n"
          )
        )
      }

      return merge.smart(legacyCommonConfig, legacyDevelopmentConfig)

    case env.isProduction:
      console.log(
        "[Force Client] Building legacy client-side production code..."
      )
      return merge.smart(legacyCommonConfig, legacyProductionConfig)
  }

  throw new Error(`[Force Client] Unsupported environment ${env.nodeEnv}`)
}

const getClientConfig = () => {
  switch (true) {
    case env.isDevelopment:
      console.log("[Force] Building client-side development code...")
      return clientDevelopmentConfig

    case env.isProduction:
      console.log("[Force] Building client-side production code...")
      return clientProductionConfig
  }

  throw new Error(`[Force] Unsupported environment ${env.nodeEnv}`)
}

function generateEnvBasedConfig() {
  if (process.env.AUTO_CONFIGURE) {
    return {}
  }

  // Verify that only a single build is selected.
  if (
    !env.buildLegacyClient &&
    !env.buildServer &&
    !env.buildClient &&
    !env.buildNovoServer
  ) {
    console.log("Must build either the CLIENT or SERVER.")
    process.exit(1)
  } else if (
    (env.buildLegacyClient && env.buildServer) ||
    (env.buildClient && env.buildNovoServer)
  ) {
    console.log("Must only build CLIENT or SERVER.")
    process.exit(1)
  }

  // Select the correct base config.
  let config
  if (env.buildLegacyClient) {
    config = getLegacyConfig()
  } else if (env.buildServer) {
    config = getServerConfig()
  } else if (env.buildClient) {
    config = getClientConfig()
  } else {
    console.log(chalk.red("No build selected."))
    process.exit(1)
  }

  // Optionally analyze the bundle
  config = bundleAnalyzer(config)

  // Support configuration dumps for a basic insights into the webpack configuration.
  if (env.enableWebpackDumpConfig) {
    fs.writeFileSync(
      process.env.WEBPACK_DUMP_CONFIG,
      JSON.stringify(config, null, 2)
    )
  }

  return config
}

module.exports = generateEnvBasedConfig()

if (process.env.AUTO_CONFIGURE) {
  module.exports.createConfig = function (config, options) {
    if (config === "client.dev") {
      return clientDevelopmentConfig
    } else if (config === "client.prod") {
      return clientProductionConfig
    } else if (config === "legacy.dev") {
      return merge.smart(legacyCommonConfig, legacyDevelopmentConfig)
    } else if (config === "legacy.prod") {
      return merge.smart(legacyCommonConfig, legacyProductionConfig)
    } else if (config === "server.dev") {
      return serverConfig
    } else if (config === "server.prod") {
      return serverConfig
    }
  }
}
