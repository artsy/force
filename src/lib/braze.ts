import { getENV } from "v2/Utils/getENV"

export const setupBraze = async () => {
  const isClient = typeof window === "undefined"
  const BRAZE_API_KEY = getENV("BRAZE_API_KEY")
  const BRAZE_API_URL = getENV("BRAZE_API_URL")
  const BRAZE_LOGGING = Boolean(getENV("BRAZE_LOGGING"))

  const shouldInit = Boolean(isClient && BRAZE_API_KEY && BRAZE_API_URL)
  if (!shouldInit) {
    return
  }

  // Load this async to not bloat our bundles or startup times
  const { default: braze } = await import(
    /* webpackChunkName: "brazeSDK" */
    "@braze/web-sdk"
  )
  braze.initialize(BRAZE_API_KEY, {
    baseUrl: BRAZE_API_URL,
    enableLogging: BRAZE_LOGGING,
  })
  braze.display.automaticallyShowNewInAppMessages()
}
