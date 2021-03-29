import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import { artistRoutes } from "v2/Apps/Artist/artistRoutes"
import { artistSeriesRoutes } from "./ArtistSeries/artistSeriesRoutes"
import { artistsRoutes } from "v2/Apps/Artists/artistsRoutes"
import { artworkRoutes } from "v2/Apps/Artwork/artworkRoutes"
import { auctionsRoutes } from "./Auctions/auctionsRoutes"
import { collectRoutes } from "v2/Apps/Collect/collectRoutes"
import { consignRoutes } from "v2/Apps/Consign/consignRoutes"
import { conversationRoutes } from "v2/Apps/Conversation/conversationRoutes"
import { debugRoutes } from "./Debug/debugRoutes"
import { exampleRoutes } from "./Example/exampleRoutes"
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
import { partnerRoutes } from "v2/Apps/Partner/partnerRoutes"

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
      routes: auctionsRoutes,
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
      routes: exampleRoutes,
    },
    {
      routes: fairRoutes,
    },
    {
      routes: fairsRoutes,
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
      routes: paymentRoutes,
    },
    {
      routes: partnerRoutes,
    },
    {
      routes: purchaseRoutes,
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
