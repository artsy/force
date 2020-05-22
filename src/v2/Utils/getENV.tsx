import { data as sd, GlobalData } from "sharify"

export function getENV(ENV_VAR: keyof GlobalData) {
  let envVar
  if (typeof window === "undefined") {
    envVar = process.env[ENV_VAR]
  } else {
    envVar = sd[ENV_VAR]
  }

  return envVar
}
