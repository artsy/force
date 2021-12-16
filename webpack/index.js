// @ts-check

import chalk from "chalk"
import merge from "webpack-merge"
import fs from "fs"
import path from "path"
import { bundleAnalyzer } from "./plugins/bundleAnalyzer"
import { bundleSize } from "./plugins/bundleSize"
import { metrics } from "./plugins/datadog"
import { env, basePath } from "./utils/env"
import { log } from "./utils/log"
import { legacySharedConfig } from "./envs/legacySharedConfig"
import { legacyDevelopmentConfig } from "./envs/legacyDevelopmentConfig"
import { legacyProductionConfig } from "./envs/legacyProductionConfig"
import { clientDevelopmentConfig } from "./envs/clientDevelopmentConfig"
import { clientProductionConfig } from "./envs/clientProductionConfig"
import { serverConfig } from "./envs/serverConfig"

const logEnv = () => log(chalk.green(`\n[Force] NODE_ENV=${env.nodeEnv} \n`))

function getClientConfig() {
  if (env.isDevelopment) {
    log("[Force] Building client-side development code...")
    return clientDevelopmentConfig()
  }
  if (env.isProduction) {
    log("[Force] Building client-side production code...")
    return clientProductionConfig()
  }

  throw new Error(`[Force] Unsupported environment ${env.nodeEnv}`)
}

function getServerConfig() {
  logEnv()

  if (env.isDevelopment || env.isProduction) {
    log("[Force Server] Building server-side code...")
    return serverConfig()
  }

  throw new Error(`[Force Server] Unsupported environment ${env.nodeEnv}`)
}

function getLegacyConfig() {
  logEnv()

  if (env.isDevelopment) {
    const cacheDirectory = path.resolve(basePath, ".cache")

    if (!env.onCi && !fs.existsSync(cacheDirectory)) {
      log(
        chalk.yellow(
          "\n[!] No existing `.cache` directory detected, initial " +
            "launch will take a while.\n"
        )
      )
    }

    return merge.smart(legacySharedConfig(), legacyDevelopmentConfig())
  }

  if (env.isProduction) {
    log("[Force Client] Building legacy client-side production code...")
    return merge.smart(legacySharedConfig(), legacyProductionConfig())
  }

  throw new Error(`[Force Client] Unsupported environment ${env.nodeEnv}`)
}

// TODO: This should eventually replace `getProductionConfig` below
// Currently used only in dev.ts
export function getDevelopmentWebpackConfig(configName) {
  switch (configName) {
    case "client.dev":
      return clientDevelopmentConfig()
    case "client.prod":
      return clientProductionConfig()
    case "legacy.dev":
      return merge.smart(legacySharedConfig(), legacyDevelopmentConfig())
    case "legacy.prod":
      return merge.smart(legacySharedConfig(), legacyProductionConfig())
    case "server.dev":
      return serverConfig()
    case "server.prod":
      return serverConfig()
  }
}

function getProductionWebpackConfig() {
  if (env.isDevelopment) {
    return {}
  }

  // Verify that only a single build is selected.
  if (!env.buildLegacyClient && !env.buildServer && !env.buildClient) {
    log("Must build either the CLIENT or SERVER.")
    process.exit(1)
  } else if (
    (env.buildLegacyClient && env.buildServer) ||
    (env.buildClient && env.buildServer)
  ) {
    log("Must only build CLIENT or SERVER.")
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
    log(chalk.red("No build selected."))
    process.exit(1)
  }

  // Optionally analyze the bundle
  config = bundleAnalyzer(config)
  // Optionall track the bundle size
  config = bundleSize(config)
  // Add datadog metrics
  config = metrics(config, name)

  // Support configuration dumps for a basic insights into the webpack configuration.
  if (env.enableWebpackDumpConfig) {
    fs.writeFileSync(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      process.env.WEBPACK_DUMP_CONFIG,
      JSON.stringify(config, null, 2)
    )
  }

  return config
}

// Currently only used for prod
const productionWebpackConfig = getProductionWebpackConfig()
export default productionWebpackConfig
