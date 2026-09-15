import { type AuthIntent, Intent } from "@artsy/cohesion"

export const COMMERCIAL_AUTH_INTENTS = [
  Intent.bid,
  Intent.buyNow,
  Intent.createAlert,
  Intent.inquire,
  Intent.makeOffer,
  Intent.registerToBid,
]

export const isCommercialAuthIntent = (intent?: AuthIntent) => {
  return !!(intent && COMMERCIAL_AUTH_INTENTS.includes(intent))
}
