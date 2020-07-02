import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import { routes as artistRoutes } from "v2/Apps/Artist/routes"
import { routes as artistSeriesRoutes } from "./ArtistSeries/routes"
import { routes as artworkRoutes } from "v2/Apps/Artwork/routes"
import { collectRoutes } from "v2/Apps/Collect/collectRoutes"
import { conversationRoutes } from "v2/Apps/Conversation/routes"
import { routes as featureRoutes } from "v2/Apps/Feature/routes"
import { routes as identityVerificationRoutes } from "v2/Apps/IdentityVerification/routes"
import { routes as orderRoutes } from "v2/Apps/Order/routes"
import { routes as purchasesRoutes } from "v2/Apps/Purchase/routes"
import { routes as searchRoutes } from "v2/Apps/Search/routes"
import { routes as viewingRoomRoutes } from "./ViewingRoom/routes"
import { debugRoutes } from "./Debug/debugRoutes"

export function getAppRoutes(): RouteConfig[] {
  return buildAppRoutes([
    {
      routes: artistRoutes,
    },
    {
      routes: artistSeriesRoutes,
    },
    {
      routes: artworkRoutes,
    },
    {
      routes: collectRoutes,
    },
    {
      routes: conversationRoutes,
    },
    {
      routes: featureRoutes,
    },
    {
      routes: identityVerificationRoutes,
    },
    {
      routes: orderRoutes,
    },
    {
      routes: purchasesRoutes,
    },
    {
      routes: searchRoutes,
    },
    {
      routes: viewingRoomRoutes,
    },

    // For debugging baseline app shell stuff
    {
      routes: debugRoutes,
    },
  ])
}
