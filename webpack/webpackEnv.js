// @ts-check

import chalk from "chalk"
import { loadEnvs } from "@artsy/multienv"

loadEnvs(".env.shared", ".env")

export const webpackEnv = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
}

export const basePath = process.cwd()

// prettier-ignore
if (process.env.CI || process.env.WEBPACK_LOG_CONFIG) {
  console.log("\n[Webpack Environment]")
  console.log("  basePath".padEnd(35), chalk.yellow(basePath))
  console.log("  CI".padEnd(35), chalk.yellow(process.env.CI))
  console.log("  NODE_ENV == 'isDevelopment'".padEnd(35), chalk.yellow(webpackEnv.isDevelopment))
  console.log("  NODE_ENV == 'isProduction'".padEnd(35), chalk.yellow(webpackEnv.isProduction))
  console.log("  NODE_ENV".padEnd(35), chalk.yellow(process.env.NODE_ENV))
  console.log("  WEBPACK_BUNDLE_REPORT".padEnd(35), chalk.yellow(process.env.WEBPACK_BUNDLE_REPORT))
  console.log("  WEBPACK_DEVTOOL".padEnd(35), chalk.yellow(process.env.WEBPACK_DEVTOOL))
  console.log("  WEBPACK_FAST_PROD_BUILD".padEnd(35), chalk.yellow(process.env.WEBPACK_FAST_PROD_BUILD))
  console.log("  WEBPACK_LOG_CONFIG".padEnd(35), chalk.yellow(process.env.WEBPACK_LOG_CONFIG))
  console.log("  WEBPACK_STATS".padEnd(35), chalk.yellow(process.env.WEBPACK_STATS))
  console.log("")
}
