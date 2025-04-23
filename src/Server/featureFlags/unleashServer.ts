import {
  UNLEASH_API_URL,
  UNLEASH_APP_NAME,
  UNLEASH_ENVIRONMENT,
  UNLEASH_SERVER_KEY,
} from "Server/config"
import { Unleash } from "unleash-client"

let unleashServer: Unleash | null = null

export function getOrInitUnleashServer(): Unleash {
  if (unleashServer) {
    return unleashServer
  }

  const config = {
    refreshInterval: 30000, // How often (in ms) the client should poll for updates
    url: UNLEASH_API_URL,
    appName: UNLEASH_APP_NAME,
    environment: UNLEASH_ENVIRONMENT,
    customHeaders: {
      Authorization: UNLEASH_SERVER_KEY,
    },
  }

  unleashServer = new Unleash(config)

  return unleashServer
}
