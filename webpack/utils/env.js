// @ts-check

import chalk from "chalk"
import path from "path"
import yn from "yn"
import os from "os"

const env = {
  buildLegacyClient: yn(process.env.BUILD_LEGACY_CLIENT, { default: false }),
  buildClient: yn(process.env.BUILD_CLIENT, { default: false }),
  buildServer: yn(process.env.BUILD_SERVER, { default: false }),
  enableWebpackAnalyze: yn(process.env.WEBPACK_ANALYZE, { default: false }),
  enableWebpackDumpConfig: process.env.WEBPACK_DUMP_CONFIG,
  fastProductionBuild: yn(process.env.WEBPACK_FAST_PRODUCTION_BUILD, {
    default: false,
  }),
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isStaging: process.env.NODE_ENV === "staging",
  logConfig: yn(process.env.WEBPACK_LOG_CONFIG, { default: false }),
  nodeEnv: process.env.NODE_ENV,
  onCi: yn(process.env.CI, { default: false }),
  port: process.env.PORT || "5000",
  webpackCiCpuLimit: Number.parseInt(process.env.WEBPACK_CI_CPU_LIMIT || "") || 4,
  webpackBundleSplit: yn(process.env.WEBPACK_BUNDLE_SPLIT, { default: true }),
  webpackConcatenate: yn(process.env.WEBPACK_CONCATENATE, { default: true }),
  webpackDebug: yn(process.env.WEBPACK_DEBUG),
  webpackDevtool: process.env.WEBPACK_DEVTOOL,
  webpackStats: process.env.WEBPACK_STATS,
}

const basePath = path.join(__dirname, "..", "..")

// prettier-ignore
if (env.onCi || env.logConfig) {
  console.log("\n[Webpack Environment]")
  console.log("  cpus".padEnd(35), chalk.yellow(os.cpus().length))
  console.log("  basePath".padEnd(35), chalk.yellow(basePath))
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
  console.log("  WEBPACK_DEBUG".padEnd(35), chalk.yellow(env.webpackDebug))
  console.log("  WEBPACK_DEVTOOL".padEnd(35), chalk.yellow(env.webpackDevtool))
  console.log("  WEBPACK_DUMP_CONFIG".padEnd(35), chalk.yellow(env.enableWebpackDumpConfig))
  console.log("  WEBPACK_FAST_PRODUCTION_BUILD".padEnd(35), chalk.yellow(env.fastProductionBuild))
  console.log("  WEBPACK_LOG_CONFIG".padEnd(35), chalk.yellow(env.logConfig))
  console.log("  WEBPACK_STATS".padEnd(35), chalk.yellow(env.webpackStats))
  console.log("")
}

export { basePath, env }
