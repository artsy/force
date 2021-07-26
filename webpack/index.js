// @ts-check

import chalk from "chalk"
import merge from "webpack-merge"
import fs from "fs"
import path from "path"
import { bundleAnalyzer } from "./plugins/bundleAnalyzer"
import { metrics } from "./plugins/datadog"
import { env, basePath } from "./utils/env"
import { legacyCommonConfig } from "./envs/legacyCommonConfig"
import { legacyDevelopmentConfig } from "./envs/legacyDevelopmentConfig"
import { legacyProductionConfig } from "./envs/legacyProductionConfig"
import { clientDevelopmentConfig } from "./envs/clientDevelopmentConfig"
import { clientProductionConfig } from "./envs/clientProductionConfig"
import { serverConfig } from "./envs/serverConfig"

function getServerConfig() {
  console.log(chalk.green(`\n[Force] NODE_ENV=${env.nodeEnv} \n`))

  switch (true) {
    case env.isDevelopment || env.isProduction:
      console.log("[Force Server] Building server-side code...")
      return serverConfig
  }

  throw new Error(`[Force Server] Unsupported environment ${env.nodeEnv}`)
}

function getLegacyConfig() {
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

function getClientConfig() {
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
  if (env.isDevelopment) {
    return {}
  }

  // Verify that only a single build is selected.
  if (!env.buildLegacyClient && !env.buildServer && !env.buildClient) {
    console.log("Must build either the CLIENT or SERVER.")
    process.exit(1)
  } else if (
    (env.buildLegacyClient && env.buildServer) ||
    (env.buildClient && env.buildServer)
  ) {
    console.log("Must only build CLIENT or SERVER.")
    process.exit(1)
  }

  // Select the correct base config.
  let config
  let name = ""
  if (env.buildLegacyClient) {
    config = getLegacyConfig()
    name = "legacy-assets"
  } else if (env.buildServer) {
    config = getServerConfig()
    name = "server"
  } else if (env.buildClient) {
    config = getClientConfig()
    name = "assets"
  } else {
    console.log(chalk.red("No build selected."))
    process.exit(1)
  }

  // Optionally analyze the bundle
  config = bundleAnalyzer(config)

  // Add datadog metrics
  config = metrics(config, name)

  // Support configuration dumps for a basic insights into the webpack configuration.
  if (env.enableWebpackDumpConfig) {
    fs.writeFileSync(
      // @ts-expect-error STRICT_NULL_CHECK
      process.env.WEBPACK_DUMP_CONFIG,
      JSON.stringify(config, null, 2)
    )
  }

  return config
}

// Currently used only in dev.ts
export function createConfig(config, _options) {
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

// Currently only used for prod
const webpackConfig = generateEnvBasedConfig()
export default webpackConfig
