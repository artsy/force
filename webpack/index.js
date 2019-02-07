import chalk from "chalk"
import merge from "webpack-merge"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

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
  developmentConfig,
  productionConfig,
} from "./envs"

const getConfig = () => {
  console.log(chalk.green(`\n[Force] Building ${NODE_ENV} config\n`))

  switch (true) {
    case isCI:
      return merge.smart(baseConfig, ciConfig)
    case isDevelopment:
      return merge.smart(baseConfig, developmentConfig)
    case isProduction:
      return merge.smart(baseConfig, productionConfig)
  }
}

const config = getConfig()

if (ANALYZE_BUNDLE) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
