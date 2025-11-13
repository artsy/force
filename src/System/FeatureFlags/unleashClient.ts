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
      unleashClient.on("error", reject)
    } else {
      console.error("[unleashClient] Failed to initialize Unleash client")
      resolve()
    }
  })

  return unleashClient
}
