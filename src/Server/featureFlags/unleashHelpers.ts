import {
  UNLEASH_API_URL,
  UNLEASH_APP_NAME,
  UNLEASH_ENVIRONMENT,
  UNLEASH_SERVER_KEY,
} from "Server/config"
import type { Unleash } from "unleash-client"

export function getOrInitUnleashServerClient(): Promise<Unleash> {
  const { startUnleash } = require("unleash-client")

  const config = {
    url: UNLEASH_API_URL,
    appName: UNLEASH_APP_NAME,
    refreshInterval: 30000, // // How often (in ms) the client should poll for updates
    environment: UNLEASH_ENVIRONMENT,
    customHeaders: {
      Authorization: UNLEASH_SERVER_KEY,
    },
  }

  return startUnleash(config)
}
