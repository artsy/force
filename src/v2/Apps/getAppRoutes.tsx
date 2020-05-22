import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import { routes as artistRoutes } from "v2/Apps/Artist/routes"
import { routes as artworkRoutes } from "v2/Apps/Artwork/routes"
import { collectRoutes } from "v2/Apps/Collect/collectRoutes"
import { conversationRoutes } from "v2/Apps/Conversation/routes"
import { routes as identityVerificationRoutes } from "v2/Apps/IdentityVerification/routes"
import { routes as orderRoutes } from "v2/Apps/Order/routes"
import { routes as searchRoutes } from "v2/Apps/Search/routes"
import { routes as viewingRoomRoutes } from "./ViewingRoom/routes"

export function getAppRoutes(): RouteConfig[] {
  return buildAppRoutes([
    {
      routes: artistRoutes,
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
      routes: identityVerificationRoutes,
    },
    {
      routes: orderRoutes,
    },
    {
      routes: searchRoutes,
    },
    {
      routes: viewingRoomRoutes,
    },
  ])
}
