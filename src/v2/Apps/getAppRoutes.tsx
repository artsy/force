import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import { artistRoutes } from "v2/Apps/Artist/artistRoutes"
// import { artistSeriesRoutes } from "./ArtistSeries/artistSeriesRoutes"
import { artistsRoutes } from "v2/Apps/Artists/artistsRoutes"
import { artworkRoutes } from "v2/Apps/Artwork/artworkRoutes"
// import { collectRoutes } from "v2/Apps/Collect/collectRoutes"
import { consignRoutes } from "v2/Apps/Consign/consignRoutes"
// import { conversationRoutes } from "v2/Apps/Conversation/conversationRoutes"
import { debugRoutes } from "./Debug/debugRoutes"
import { exampleRoutes } from "./Example/exampleRoutes"
// import { fairRoutes } from "v2/Apps/Fair/fairRoutes"
// import { fairsRoutes } from "v2/Apps/Fairs/fairsRoutes"
// import { featureRoutes } from "v2/Apps/Feature/featureRoutes"
import { identityVerificationRoutes } from "v2/Apps/IdentityVerification/identityVerificationRoutes"
import { orderRoutes } from "v2/Apps/Order/orderRoutes"
import { purchaseRoutes } from "v2/Apps/Purchase/purchaseRoutes"
import { searchRoutes } from "v2/Apps/Search/searchRoutes"
// import { showRoutes } from "v2/Apps/Show/showRoutes"
import { viewingRoomRoutes } from "./ViewingRoom/viewingRoomRoutes"
import { auctionsRoutes } from "./Auctions/auctionsRoutes"

export function getAppRoutes(): RouteConfig[] {
  return buildAppRoutes([
    {
      routes: artistRoutes,
    },
    {
      routes: artistsRoutes,
    },
    // NOTE: Converted to use NOVO template.
    // {
    //   routes: artistSeriesRoutes,
    // },
    {
      routes: artworkRoutes,
    },
    {
      routes: auctionsRoutes,
    },
    // NOTE: Converted to use NOVO template.
    // {
    //   routes: collectRoutes,
    // },
    {
      routes: consignRoutes,
    },
    // NOTE: Converted to use NOVO template.
    // {
    //   routes: conversationRoutes,
    // },
    {
      routes: exampleRoutes,
    },
    // NOTE: Converted to use NOVO template.
    // {
    //   routes: fairRoutes,
    // },
    // {
    //   routes: fairsRoutes,
    // },
    // {
    //   routes: featureRoutes,
    // },
    {
      routes: identityVerificationRoutes,
    },
    {
      routes: orderRoutes,
    },
    {
      routes: purchaseRoutes,
    },
    {
      routes: searchRoutes,
    },
    // NOTE: Converted to use NOVO template.
    // {
    //   routes: showRoutes,
    // },
    {
      routes: viewingRoomRoutes,
    },

    // For debugging baseline app shell stuff
    {
      routes: debugRoutes,
    },
  ])
}
