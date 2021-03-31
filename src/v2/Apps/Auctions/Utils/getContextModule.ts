import { ContextModule } from "@artsy/cohesion"
import { TabType } from "../Components/AuctionArtworksRail/AuctionArtworksRail"

/**
 * Returns the context module for tracking purposes
 */
export function getContextModule(tabType: TabType) {
  const contextModule = (() => {
    switch (tabType) {
      case "current":
        return ContextModule.currentAuctions
      case "myBids":
        return ContextModule.yourActiveBids
      case "past":
        return ContextModule.pastAuctions
      case "upcoming":
        return ContextModule.upcomingAuctions
      case "worksByArtistsYouFollow":
        return ContextModule.worksByArtistsYouFollowRail
    }
  })()

  return contextModule
}
