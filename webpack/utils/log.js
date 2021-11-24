// @ts-check

import { env } from "./env"

export function log(text) {
  if (!env.loggingEnabled) {
    return
  }
  console.log(text)
}
