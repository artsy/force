// @ts-check

const chalk = require("chalk")
const { loadEnvs } = require("@artsy/multienv")

loadEnvs(".env.shared", ".env")

const webpackEnv = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  experimentalSWCCompiler:
    process.env.EXPERIMENTAL_SWC_COMPILER_ENABLED === "true",
}

const basePath = process.cwd()

module.exports = {
  webpackEnv,
  basePath,
}

// prettier-ignore
if (process.env.CI || process.env.WEBPACK_LOG_CONFIG) {
  console.log("\n[Webpack Environment]")
  console.log("  basePath".padEnd(40), chalk.yellow(basePath))
  console.log("  CI".padEnd(40), chalk.yellow(process.env.CI))
  console.log("  EXPERIMENTAL_SWC_COMPILER_ENABLED".padEnd(40), chalk.yellow(webpackEnv.experimentalSWCCompiler))
  console.log("  NODE_ENV".padEnd(40), chalk.yellow(process.env.NODE_ENV))
  console.log("  WEBPACK_BUNDLE_REPORT".padEnd(40), chalk.yellow(process.env.WEBPACK_BUNDLE_REPORT))
  console.log("  WEBPACK_DEVTOOL".padEnd(40), chalk.yellow(process.env.WEBPACK_DEVTOOL))
  console.log("  WEBPACK_FAST_PROD_BUILD".padEnd(40), chalk.yellow(process.env.WEBPACK_FAST_PROD_BUILD))
  console.log("  WEBPACK_LOG_CONFIG".padEnd(40), chalk.yellow(process.env.WEBPACK_LOG_CONFIG))
  console.log("  WEBPACK_STATS".padEnd(40), chalk.yellow(process.env.WEBPACK_STATS))
  console.log("")
}
