import chalk from "chalk"
import merge from "webpack-merge"

import {
  isDevelopment,
  isProduction,
  isCI,
  ANALYZE_BUNDLE,
  NODE_ENV,
} from "../src/lib/environment"

import {
  baseConfig,
  ciConfig,
  debugConfig,
  developmentConfig,
  productionConfig,
} from "./envs"

const getConfig = () => {
  console.log(chalk.green(`\n[Force] Building ${NODE_ENV} config...\n`))

  switch (true) {
    case ANALYZE_BUNDLE:
      return merge.smart(baseConfig, debugConfig)
    case isCI:
      console.log("[Force] CI=true")
      return merge.smart(baseConfig, ciConfig)
    case isDevelopment:
      return merge.smart(baseConfig, developmentConfig)
    case isProduction:
      return merge.smart(baseConfig, productionConfig)
  }
}

const config = getConfig()

module.exports = config
