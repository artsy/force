// @ts-check

import { readFileSync, accessSync, constants } from "fs"
import { parse } from "dotenv"

const shared = checkFileExistsSync(".env.shared")
  ? parse(readFileSync(".env.shared"))
  : {}
const env = checkFileExistsSync(".env") ? parse(readFileSync(".env")) : {}

// merge env files and update process.env if mergedEnv is not empty
let mergedEnv = { ...shared, ...env }
if (Object.keys(mergedEnv).length !== 0) {
  for (const k in mergedEnv) {
    process.env[k] = mergedEnv[k]
  }
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
