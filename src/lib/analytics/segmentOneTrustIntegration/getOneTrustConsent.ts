import { delay } from "./delay"
import { oneTrustReady } from "./oneTrustReady"

export async function getOneTrustConsent() {
  console.log("getOneTrustConsent called")

  let attempts = 0
  const maxAttempts = 100

  // if OneTrust is not ready, wait 1 second at most.
  while (!oneTrustReady() && attempts <= maxAttempts) {
    await delay(10)
    attempts++
  }

  if (oneTrustReady()) {
    // OneTrust stores consent in window.OnetrustActiveGroups.
    return window.OnetrustActiveGroups
  } else {
    return ""
  }
}
