import { getENV } from "Utils/getENV"
import { UnleashClient } from "unleash-proxy-client"

let unleashClient: UnleashClient | null = null

export async function getOrInitUnleashClient(): Promise<UnleashClient> {
  if (unleashClient) {
    return unleashClient
  }

  const config = {
    refreshInterval: 30, // How often (in seconds) the client should poll for updates
    url: `${getENV("UNLEASH_API_URL")}/frontend`,
    clientKey: getENV("UNLEASH_FRONTEND_KEY"),
    appName: getENV("UNLEASH_APP_NAME"),
    environment: getENV("UNLEASH_ENVIRONMENT"),
    context: {
      userId: getENV("CURRENT_USER")?.id,
      sessionId: getENV("SESSION_ID"),
    },
  }

  unleashClient = new UnleashClient(config)
  unleashClient.start()

  await new Promise<void>((resolve, reject) => {
    if (unleashClient) {
      unleashClient.on("ready", resolve)
      unleashClient.on("error", error => {
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
      console.error("[unleashClient] Failed to initialize Unleash client")
      resolve()
    }
  })

  return unleashClient
}
