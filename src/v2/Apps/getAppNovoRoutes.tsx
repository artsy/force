import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import { artistRoutes } from "v2/Apps/Artist/artistRoutes"
import { artistSeriesRoutes } from "./ArtistSeries/artistSeriesRoutes"
import { artistsRoutes } from "v2/Apps/Artists/artistsRoutes"
import { artworkRoutes } from "v2/Apps/Artwork/artworkRoutes"
import { collectRoutes } from "v2/Apps/Collect/collectRoutes"
import { consignRoutes } from "v2/Apps/Consign/consignRoutes"
import { conversationRoutes } from "v2/Apps/Conversation/conversationRoutes"
import { debugRoutes } from "./Debug/debugRoutes"
import { fairRoutes } from "v2/Apps/Fair/fairRoutes"
import { fairsRoutes } from "v2/Apps/Fairs/fairsRoutes"
import { featureRoutes } from "v2/Apps/Feature/featureRoutes"
import { identityVerificationRoutes } from "v2/Apps/IdentityVerification/identityVerificationRoutes"
import { orderRoutes } from "v2/Apps/Order/orderRoutes"
import { purchaseRoutes } from "v2/Apps/Purchase/purchaseRoutes"
import { searchRoutes } from "v2/Apps/Search/searchRoutes"
import { showRoutes } from "v2/Apps/Show/showRoutes"
import { viewingRoomRoutes } from "./ViewingRoom/viewingRoomRoutes"
import { paymentRoutes } from "v2/Apps/Payment/paymentRoutes"

export function getAppNovoRoutes(): RouteConfig[] {
  return buildAppRoutes(
    [
      {
        converted: true,
        routes: artistRoutes,
      },
      {
        converted: true,
        routes: artistsRoutes,
      },
      {
        converted: true,
        routes: artistSeriesRoutes,
      },
      {
        routes: artworkRoutes,
      },
      {
        converted: true,
        routes: collectRoutes,
      },
      {
        routes: consignRoutes,
      },
      {
        converted: true,
        routes: conversationRoutes,
      },
      {
        converted: true,
        routes: fairRoutes,
      },
      {
        converted: true,
        routes: fairsRoutes,
      },
      {
        converted: true,
        routes: featureRoutes,
      },
      {
        routes: identityVerificationRoutes,
      },
      {
        routes: orderRoutes,
      },
      {
        converted: true,
        routes: purchaseRoutes,
      },
      {
        routes: searchRoutes,
      },
      {
        converted: true,
        routes: showRoutes,
      },
      {
        converted: true,
        routes: viewingRoomRoutes,
      },
      {
        converted: true,
        routes: paymentRoutes,
      },

      // For debugging baseline app shell stuff
      {
        routes: debugRoutes,
      },
    ].map((routeConfig: { routes: RouteConfig[]; converted?: boolean }) => {
      return {
        ...routeConfig,
        routes: routeConfig.routes.map(route => {
          if (routeConfig.converted) {
            return { ...route }
          }
          return {
            ...route,
            path: `/novo${route.path}`,
          }
        }),
      }
    })
  )
}
