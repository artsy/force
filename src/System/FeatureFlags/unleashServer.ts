import {
  UNLEASH_API_URL,
  UNLEASH_APP_NAME,
  UNLEASH_ENVIRONMENT,
  UNLEASH_SERVER_KEY,
} from "Server/config"
import { getENV } from "Utils/getENV"
import { Unleash } from "unleash-client"

let unleashServer: Unleash | null = null

export async function getOrInitUnleashServer(): Promise<Unleash> {
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

  await new Promise<void>(resolve => {
    if (unleashServer) {
      unleashServer.on("ready", resolve)
      unleashServer.on("error", error => {
        console.warn(
          "Failed to initialize Unleash, continuing without feature flags:",
          error,
        )
        resolve() // Continue without feature flags instead of rejecting
      })

      // Add timeout to prevent hanging if Unleash never responds
      setTimeout(() => {
        console.warn(
          "Unleash initialization timeout, continuing without feature flags",
        )
        resolve()
      }, 5000)
    } else {
      console.error("[unleashServer] Failed to initialize Unleash server")
      resolve()
    }
  })

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
