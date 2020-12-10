import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import { routes as artistRoutes } from "v2/Apps/Artist/routes"
import { routes as artistSeriesRoutes } from "./ArtistSeries/routes"
import { routes as artistsRoutes } from "v2/Apps/Artists/artistsRoutes"
import { routes as artworkRoutes } from "v2/Apps/Artwork/routes"
import { routes as collectRoutes } from "v2/Apps/Collect/collectRoutes"
import { routes as consignRoutes } from "v2/Apps/Consign/consignRoutes"
import { routes as conversationRoutes } from "v2/Apps/Conversation/routes"
import { routes as debugRoutes } from "./Debug/debugRoutes"
import { routes as fairRoutes } from "v2/Apps/Fair/routes"
import { routes as featureRoutes } from "v2/Apps/Feature/routes"
import { routes as identityVerificationRoutes } from "v2/Apps/IdentityVerification/routes"
import { routes as orderRoutes } from "v2/Apps/Order/routes"
import { routes as purchasesRoutes } from "v2/Apps/Purchase/routes"
import { routes as searchRoutes } from "v2/Apps/Search/routes"
import { routes as showRoutes } from "v2/Apps/Show/routes"
import { routes as viewingRoomRoutes } from "./ViewingRoom/routes"

export function getAppRoutes(): RouteConfig[] {
  return buildAppRoutes([
    {
      routes: artistRoutes,
    },
    {
      routes: artistsRoutes,
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
      routes: consignRoutes,
    },
    {
      routes: conversationRoutes,
    },
    {
      routes: fairRoutes,
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
      routes: showRoutes,
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
