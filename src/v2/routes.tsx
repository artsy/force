import { AppRouteConfig } from "v2/System/Router/Route"
import { artistRoutes } from "v2/Apps/Artist/artistRoutes"
import { artistSeriesRoutes } from "v2/Apps/ArtistSeries/artistSeriesRoutes"
import { artistsRoutes } from "v2/Apps/Artists/artistsRoutes"
import { artworkRoutes } from "v2/Apps/Artwork/artworkRoutes"
import { auctionsRoutes } from "v2/Apps/Auctions/auctionsRoutes"
import { buildAppRoutes } from "v2/System/Router/buildAppRoutes"
import { buyerGuaranteeRoutes } from "v2/Apps/BuyerGuarantee/buyerGuaranteeRoutes"
import { collectRoutes } from "v2/Apps/Collect/collectRoutes"
import { consignRoutes } from "v2/Apps/Consign/consignRoutes"
import { conversationRoutes } from "v2/Apps/Conversation/conversationRoutes"
import { debugRoutes } from "v2/Apps/Debug/debugRoutes"
import { exampleRoutes } from "v2/Apps/Example/exampleRoutes"
import { fairRoutes } from "v2/Apps/Fair/fairRoutes"
import { fairsRoutes } from "v2/Apps/Fairs/fairsRoutes"
import { featureRoutes } from "v2/Apps/Feature/featureRoutes"
import { geneRoutes } from "v2/Apps/Gene/geneRoutes"
import { homeRoutes } from "v2/Apps/Home/homeRoutes"
import { identityVerificationRoutes } from "v2/Apps/IdentityVerification/identityVerificationRoutes"
import { orderRoutes } from "v2/Apps/Order/orderRoutes"
import { partnerRoutes } from "v2/Apps/Partner/partnerRoutes"
import { paymentRoutes } from "v2/Apps/Payment/paymentRoutes"
import { shippingRoutes } from "v2/Apps/Shipping/shippingRoutes"
import { purchaseRoutes } from "v2/Apps/Purchase/purchaseRoutes"
import { searchRoutes } from "v2/Apps/Search/searchRoutes"
import { showRoutes } from "v2/Apps/Show/showRoutes"
import { showsRoutes } from "v2/Apps/Shows/showsRoutes"
import { tagRoutes } from "./Apps/Tag/tagRoutes"
import { unsubscribeRoutes } from "./Apps/Unsubscribe/unsubscribeRoutes"
import { viewingRoomRoutes } from "v2/Apps/ViewingRoom/viewingRoomRoutes"
import { fairOrganizerRoutes } from "./Apps/FairOrginizer/fairOrganizerRoutes"
import { priceDatabaseRoutes } from "./Apps/PriceDatabase/priceDatabaseRoutes"

export function getAppRoutes(): AppRouteConfig[] {
  return buildAppRoutes([
    { routes: artistRoutes },
    { routes: artistSeriesRoutes },
    { routes: artistsRoutes },
    { routes: artworkRoutes },
    { routes: auctionsRoutes },
    { routes: buyerGuaranteeRoutes },
    { routes: collectRoutes },
    { routes: consignRoutes },
    { routes: conversationRoutes },
    { routes: exampleRoutes },
    { routes: fairOrganizerRoutes },
    { routes: fairRoutes },
    { routes: fairsRoutes },
    { routes: featureRoutes },
    { routes: geneRoutes },
    { routes: homeRoutes },
    { routes: identityVerificationRoutes },
    { routes: orderRoutes },
    { routes: partnerRoutes },
    { routes: paymentRoutes },
    { routes: priceDatabaseRoutes },
    { routes: shippingRoutes },
    { routes: purchaseRoutes },
    { routes: searchRoutes },
    { routes: showRoutes },
    { routes: showsRoutes },
    { routes: tagRoutes },
    { routes: unsubscribeRoutes },
    { routes: viewingRoomRoutes },

    // For debugging baseline app shell stuff
    { routes: debugRoutes },
  ])
}

export function getRouteList(): string[] {
  let flatRoutes: string[] = []
  const appRoutes = getAppRoutes()[0]
  if (appRoutes) {
    appRoutes.children?.forEach(route => {
      const childRoutes =
        route.children
          ?.map(child => child.path)
          .filter(route => route !== "/" && route !== "*")
          .map(childPath => route.path + "/" + childPath) || []
      flatRoutes = flatRoutes.concat(childRoutes).concat(route.path || [])
    })
  } else {
    flatRoutes = []
  }

  return flatRoutes
}
