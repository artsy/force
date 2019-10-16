// @ts-check

const { CI, NODE_ENV } = process.env
const ANALYZE_BUNDLE = process.env.ANALYZE_BUNDLE === "true"
const BUILD_SERVER = process.env.BUILD_SERVER === "true"
const DEBUG = process.env.DEBUG !== undefined
const isDevelopment = NODE_ENV === "development"
const isStaging = NODE_ENV === "staging"
const isProduction = NODE_ENV === "production"
const isDeploy = isStaging || isProduction
const isCI = CI === "true"
const basePath = process.cwd()

module.exports = {
  ANALYZE_BUNDLE,
  BUILD_SERVER,
  DEBUG,
  NODE_ENV,
  isDevelopment,
  isStaging,
  isProduction,
  isDeploy,
  isCI,
  basePath,
}
