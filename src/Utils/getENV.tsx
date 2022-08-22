import { getAsyncLocalStorage } from "Server/asyncLocalWrapper"
// eslint-disable-next-line no-restricted-imports
import { GlobalData, data as sd } from "sharify"

export function getENV(ENV_VAR: keyof GlobalData) {
  let envVar
  if (typeof window === "undefined") {
    const asyncLocalStorage = getAsyncLocalStorage()
    envVar = asyncLocalStorage.getStore()?.get(ENV_VAR) || process.env[ENV_VAR]
  } else {
    envVar = sd[ENV_VAR]
  }

  return envVar
}
