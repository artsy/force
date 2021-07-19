// @ts-check

import { readFileSync, accessSync, constants } from "fs"
import { parse } from "dotenv"

// parse .shared.env if it exists
const sharedConfig = checkFileExistsSync(".env.shared")
  ? parse(readFileSync(".env.shared"))
  : {}
// parse .env
const commonConfig = parse(readFileSync(".env"))
// combine env files and update process.env
const envConfig = { ...sharedConfig, ...commonConfig }
for (const k in envConfig) {
  process.env[k] = envConfig[k]
}

function checkFileExistsSync(filepath) {
  let flag = true
  try {
    accessSync(filepath, constants.F_OK)
  } catch (e) {
    flag = false
  }
  return flag
}
