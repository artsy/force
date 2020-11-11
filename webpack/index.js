// @ts-check

const chalk = require("chalk")
const merge = require("webpack-merge")
const fs = require("fs")
const { bundleAnalyzer, duplicatesReport, measureSpeed } = require("./plugins")
const { env } = require("./utils/env")

const {
  clientCommonConfig,
  clientDevelopmentConfig,
  clientProductionConfig,
  serverConfig,
} = require("./envs")

const getServerConfig = () => {
  console.log(chalk.green(`\n[Force] NODE_ENV=${env.nodeEnv} \n`))

  switch (true) {
    case env.isDevelopment || env.isProduction:
      console.log("[Force] Building server-side code...")
      return serverConfig
  }
}

const getClientConfig = () => {
  console.log(chalk.green(`\n[Force] NODE_ENV=${env.nodeEnv} \n`))

  switch (true) {
    case env.isDevelopment:
      return merge.smart(clientCommonConfig, clientDevelopmentConfig)

    case env.isProduction:
      console.log("[Force] Building client-side production code...")
      return merge.smart(clientCommonConfig, clientProductionConfig)
  }
}

// Verify that only a single build is selected.
if (!env.buildClient && !env.buildServer) {
  console.log("Must build either the CLIENT or SERVER.")
  process.exit(1)
} else if (env.buildClient && env.buildServer) {
  console.log("Must only build CLIENT or SERVER.")
  process.exit(1)
}

// Select the correct base config.
let config
if (env.buildClient) {
  config = getClientConfig()
} else if (env.buildServer) {
  config = getServerConfig()
} else {
  console.log(chalk.red("No build selected."))
  process.exit(1)
}

// Optionally analyze the bundle
config = bundleAnalyzer(config)

// Optionally check for duplicates
config = duplicatesReport(config)

// Optionally configuration wrapper
config = measureSpeed(config)

// Support configuration dumps for a basic insights into the webpack configuration.
if (env.enableWebpackDumpConfig) {
  fs.writeFileSync(
    process.env.WEBPACK_DUMP_CONFIG,
    JSON.stringify(config, null, 2)
  )
}

module.exports = config
