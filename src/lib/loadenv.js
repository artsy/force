// @ts-check

const { readFileSync, accessSync, constants } = require("fs")
const { parse } = require("dotenv")

function loadEnv(env) {
  return checkFileExistsSync(env) ? parse(readFileSync(env)) : {}
}

function applyToEnv(config) {
  if (Object.keys(config).length !== 0) {
    for (const k in config) {
      if (!process.env[k]) {
        process.env[k] = config[k]
      }
    }
  }
}

function checkFileExistsSync(filepath) {
  try {
    accessSync(filepath, constants.F_OK)
  } catch (e) {
    return false
  }
  return true
}

// Load the default envs and apply to process.env
applyToEnv({
  ...loadEnv(".env.shared"),
  ...loadEnv(".env"),
})
