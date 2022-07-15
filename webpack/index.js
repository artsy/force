// @ts-check

import chalk from "chalk"
import fs from "fs"
import { bundleAnalyzer } from "./plugins/bundleAnalyzer"
import { bundleSize } from "./plugins/bundleSize"
import { metrics } from "./plugins/datadog"
import { env } from "./utils/env"
import { log } from "./utils/log"
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

// TODO: This should eventually replace `getProductionConfig` below
// Currently used only in dev.ts
export function getDevelopmentWebpackConfig(configName) {
  switch (configName) {
    case "client.dev":
      return clientDevelopmentConfig()
    case "client.prod":
      return clientProductionConfig()
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

  // Select the correct base config.
  let config
  let name = ""
  if (env.buildServer) {
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
  // Optionally track the bundle size
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
