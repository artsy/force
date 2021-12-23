// @ts-check

import { createHash } from "crypto"
import chalk from "chalk"
import path from "path"
import yn from "yn"
import os from "os"
import v8 from "v8"
import { loadEnvs } from "@artsy/multienv"
loadEnvs(".env.shared", ".env")

const hostnameHash = createHash("sha256")
hostnameHash.update(os.hostname())

const env = {
  buildLegacyClient: yn(process.env.BUILD_LEGACY_CLIENT, { default: false }),
  buildClient: yn(process.env.BUILD_CLIENT, { default: false }),
  buildServer: yn(process.env.BUILD_SERVER, { default: false }),
  datadogKey: process.env.WEBPACK_DATADOG_KEY,
  enableWebpackAnalyze: yn(process.env.WEBPACK_ANALYZE, { default: false }),
  enableWebpackDatadog: yn(process.env.WEBPACK_DATADOG, { default: false }),
  enableWebpackDumpConfig: process.env.WEBPACK_DUMP_CONFIG,
  enableWebpackSizePlugin: yn(process.env.WEBPACK_SIZE_PLUGIN, {
    default: false,
  }),
  fastProductionBuild: yn(process.env.WEBPACK_FAST_PRODUCTION_BUILD, {
    default: false,
  }),
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isStaging: process.env.NODE_ENV === "staging",
  logConfig: yn(process.env.WEBPACK_LOG_CONFIG, { default: false }),
  loggingEnabled: yn(process.env.WEBPACK_LOG, { default: true }),
  machineCpus: os.cpus().length,
  machineHeapSize: v8.getHeapStatistics().total_heap_size,
  machineName: os.hostname(),
  machineNameHash: hostnameHash.digest("hex"),
  nodeEnv: process.env.NODE_ENV,
  onCi: yn(process.env.CI, { default: false }),
  port: process.env.PORT || "5000",
  webpackBundleSplit: yn(process.env.WEBPACK_BUNDLE_SPLIT, { default: true }),
  webpackCiCpuLimit:
    Number.parseInt(process.env.WEBPACK_CI_CPU_LIMIT || "") || 4,
  webpackConcatenate: yn(process.env.WEBPACK_CONCATENATE, { default: true }),
  webpackDebug: yn(process.env.WEBPACK_DEBUG),
  webpackDevtool: process.env.WEBPACK_DEVTOOL,
  webpackStats: process.env.WEBPACK_STATS,
}

const basePath = path.join(__dirname, "..", "..")

// prettier-ignore
if (env.onCi || env.logConfig) {
  console.log("\n[Webpack Environment]")
  console.log("  basePath".padEnd(35), chalk.yellow(basePath))
  console.log("  machineCpus".padEnd(35), chalk.yellow(env.machineCpus))
  console.log("  machineHeapSize".padEnd(35), chalk.yellow(env.machineHeapSize))
  console.log("  machineName".padEnd(35), chalk.yellow(env.machineName))
  console.log("  machineNameHash".padEnd(35), chalk.yellow(env.machineNameHash))
  console.log("  BUILD_LEGACY_CLIENT".padEnd(35), chalk.yellow(env.buildLegacyClient))
  console.log("  BUILD_SERVER".padEnd(35), chalk.yellow(env.buildServer))
  console.log("  BUILD_CLIENT".padEnd(35), chalk.yellow(env.buildClient))
  console.log("  CI".padEnd(35), chalk.yellow(env.onCi))
  console.log("  NODE_ENV == 'isDevelopment'".padEnd(35), chalk.yellow(env.isDevelopment))
  console.log("  NODE_ENV == 'isProduction'".padEnd(35), chalk.yellow(env.isProduction))
  console.log("  NODE_ENV == 'isStaging'".padEnd(35), chalk.yellow(env.isStaging))
  console.log("  NODE_ENV".padEnd(35), chalk.yellow(env.nodeEnv))
  console.log("  PORT".padEnd(35), chalk.yellow(env.port))
  console.log("  WEBPACK_ANALYZE".padEnd(35), chalk.yellow(env.enableWebpackAnalyze))
  console.log("  WEBPACK_BUNDLE_SPLIT".padEnd(35), chalk.yellow(env.webpackBundleSplit))
  console.log("  WEBPACK_CI_CPU_LIMIT".padEnd(35), chalk.yellow(env.webpackCiCpuLimit))
  console.log("  WEBPACK_CONCATENATE".padEnd(35), chalk.yellow(env.webpackConcatenate))
  console.log("  WEBPACK_DATADOG_KEY".padEnd(35), chalk.yellow(env.datadogKey))
  console.log("  WEBPACK_DATADOG".padEnd(35), chalk.yellow(env.enableWebpackDatadog))
  console.log("  WEBPACK_DEBUG".padEnd(35), chalk.yellow(env.webpackDebug))
  console.log("  WEBPACK_DEVTOOL".padEnd(35), chalk.yellow(env.webpackDevtool))
  console.log("  WEBPACK_DUMP_CONFIG".padEnd(35), chalk.yellow(env.enableWebpackDumpConfig))
  console.log("  WEBPACK_FAST_PRODUCTION_BUILD".padEnd(35), chalk.yellow(env.fastProductionBuild))
  console.log("  WEBPACK_LOG_CONFIG".padEnd(35), chalk.yellow(env.logConfig))
  console.log("  WEBPACK_LOG".padEnd(35), chalk.yellow(env.loggingEnabled))
  console.log("  WEBPACK_SIZE_PLUGIN".padEnd(35), chalk.yellow(env.enableWebpackSizePlugin))
  console.log("  WEBPACK_STATS".padEnd(35), chalk.yellow(env.webpackStats))
  console.log("")
}

export { basePath, env }
