import { ContextModule } from "@artsy/cohesion"

export const tabTypeToContextModuleMap = {
  current: ContextModule.currentAuctions,
  myBids: ContextModule.yourActiveBids,
  past: ContextModule.pastAuctions,
  upcoming: ContextModule.upcomingAuctions,
  worksByArtistsYouFollow: ContextModule.worksByArtistsYouFollowRail,
  trendingLots: ContextModule.trendingLots,
  standoutLots: ContextModule.standoutLots,
}
