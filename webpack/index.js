const chalk = require("chalk")
const merge = require("webpack-merge")

const {
  isDevelopment,
  isProduction,
  isCI,
  ANALYZE_BUNDLE,
  BUILD_SERVER,
  NODE_ENV,
} = require("../src/lib/environment")

const {
  baseConfig,
  ciConfig,
  debugConfig,
  developmentConfig,
  productionConfig,
  serverConfig,
} = require("./envs")

const getConfig = () => {
  console.log(chalk.green(`\n[Force] NODE_ENV=${NODE_ENV} \n`))

  switch (true) {
    case ANALYZE_BUNDLE:
      return merge.smart(baseConfig, debugConfig)

    case BUILD_SERVER:
      console.log("[Force] Building server-side code...")
      return serverConfig

    case isCI:
      console.log("[Force] CI=true")
      return merge.smart(baseConfig, productionConfig, ciConfig)

    case isDevelopment:
      return merge.smart(baseConfig, developmentConfig)

    case isProduction:
      console.log("[Force] Building client-side production code...")
      return merge.smart(baseConfig, productionConfig)
  }
}

const config = getConfig()

module.exports = config
