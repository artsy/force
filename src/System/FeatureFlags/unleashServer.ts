import {
  UNLEASH_API_URL,
  UNLEASH_APP_NAME,
  UNLEASH_ENVIRONMENT,
  UNLEASH_SERVER_KEY,
} from "Server/config"
import { getENV } from "Utils/getENV"
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

export const isFeatureFlagEnabled = (name: string) => {
  if (!unleashServer) {
    console.error(
      "[unleashServer] Unleash server is not initialized. Please call getOrInitUnleashServer() first.",
    )

    return false
  }

  const isEnabled = unleashServer.isEnabled(name, {
    userId: getENV("CURRENT_USER")?.id,
    sessionId: getENV("SESSION_ID"),
  })

  return isEnabled
}

export const getVariant = (name: string) => {
  if (!unleashServer) {
    console.error(
      "[unleashServer] Unleash server is not initialized. Please call getOrInitUnleashServer() first.",
    )

    return null
  }

  const variant = unleashServer.getVariant(name, {
    userId: getENV("CURRENT_USER")?.id,
    sessionId: getENV("SESSION_ID"),
  })

  return variant
}
