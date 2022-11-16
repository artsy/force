import { Intent } from "@artsy/cohesion"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"

export const COMMERCIAL_AUTH_INTENTS = [
  Intent.bid,
  Intent.buyNow,
  Intent.createAlert,
  Intent.inquire,
  Intent.makeOffer,
  Intent.registerToBid,
]

export const useElligibleForOnboarding = () => {
  const {
    state: { mode, options },
  } = useAuthDialogContext()

  const isElligibleForOnboarding =
    // Only trigger onboarding for sign ups...
    mode === "SignUp" &&
    // ...without a commercial intent
    !(options.intent && COMMERCIAL_AUTH_INTENTS.includes(options.intent))

  return { isElligibleForOnboarding }
}
