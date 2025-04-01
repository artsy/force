import {
  UNLEASH_API_URL,
  UNLEASH_APP_NAME,
  UNLEASH_SERVER_KEY,
  UNLEASH_ENVIRONMENT,
} from "Server/config"
import { Unleash, startUnleash } from "unleash-client"

export function getOrInitUnleashServerClient(): Promise<Unleash> {
  const config = {
    url: UNLEASH_API_URL,
    appName: UNLEASH_APP_NAME,
    refreshInterval: 10000,
    environment: UNLEASH_ENVIRONMENT,
    customHeaders: {
      Authorization: UNLEASH_SERVER_KEY,
    },
  }

  return startUnleash(config)
}
