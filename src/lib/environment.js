// @ts-check

import path from "path"

export const {
  CDN_URL,
  CI,
  NODE_ENV = "development",
  PORT,
  S3_BUCKET,
  WEBPACK_DEVTOOL,
} = process.env

export const ANALYZE_BUNDLE = process.env.ANALYZE_BUNDLE === "true"
export const isDevelopment = NODE_ENV === "development"
export const isStaging = NODE_ENV === "staging"
export const isProduction = NODE_ENV === "production"
export const isDeploy = isStaging || isProduction
export const isCI = CI === "true"
export const basePath = path.resolve(__dirname, "../..")
