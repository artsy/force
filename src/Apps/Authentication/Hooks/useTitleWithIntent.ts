import { Intent } from "@artsy/cohesion"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useRouter } from "System/Hooks/useRouter"

export const useTitleWithIntent = () => {
  const {
    state: { mode },
  } = useAuthDialogContext()

  const {
    match: {
      location: { query },
    },
  } = useRouter()

  const intent = query.intent

  const action = mode === "SignUp" ? "Sign up" : "Log in"

  switch (intent) {
    case Intent.saveArtwork:
      return `${action} to save artworks`
    case Intent.followPartner:
      return `${action} to follow galleries, institutions, and fairs`
    case Intent.followArtist:
      return `${action} to follow artists`
    case Intent.createAlert:
      return `${action} to create alerts`
    case Intent.bid:
    case Intent.registerToBid:
      return `${action} to bid on artworks`
    case Intent.buyNow:
    case Intent.inquire:
    case Intent.makeOffer:
      return `${action} to buy artworks`
    case Intent.consign:
      return `${action} to consign artworks`
    case Intent.seeEstimateAuctionRecords:
    case Intent.seePriceAuctionRecords:
    case Intent.seeRealizedPriceAuctionRecords:
    case Intent.viewAuctionResults:
      return `${action} to view auction results`
    default:
      return null
  }
}
