import { data as sd } from "sharify"

export const setup = async () => {
  if (
    typeof window === "undefined" ||
    !sd.BRAZE_API_KEY ||
    !sd.BRAZE_API_URL ||
    process.env.NODE_ENV !== "production"
  ) {
    return
  }

  // Load this async to not bloat our bundles or startup times
  const { default: braze } = await import(
    /* webpackChunkName: "brazeSDK" */
    "@braze/web-sdk"
  )
  braze.initialize(process.env.BRAZE_API_KEY, {
    baseUrl: process.env.BRAZE_API_URL,
    enableLogging: Boolean(process.env.BRAZE_LOGGING),
  })
  braze.display.automaticallyShowNewInAppMessages()
}
