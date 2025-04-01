import {
  NODE_ENV,
  UNLEASH_API_URL,
  UNLEASH_APP_NAME,
  UNLEASH_SERVER_KEY,
} from "Server/config"
import { Unleash, startUnleash } from "unleash-client"

export function getOrInitUnleashServerClient(): Promise<Unleash> {
  const config = {
    url: UNLEASH_API_URL,
    appName: UNLEASH_APP_NAME,
    refreshInterval: 10000,
    environment: NODE_ENV,
    customHeaders: {
      Authorization: UNLEASH_SERVER_KEY,
    },
  }

  return startUnleash(config)
}
