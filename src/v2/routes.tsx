import { AppRouteConfig } from "v2/System/Router/Route"
import { artistRoutes } from "v2/Apps/Artist/artistRoutes"
import { artistSeriesRoutes } from "v2/Apps/ArtistSeries/artistSeriesRoutes"
import { artistsRoutes } from "v2/Apps/Artists/artistsRoutes"
import { artworkRoutes } from "v2/Apps/Artwork/artworkRoutes"
import { auctionsRoutes } from "v2/Apps/Auctions/auctionsRoutes"
import { authenticationRoutes } from "v2/Apps/Authentication/authenticationRoutes"
import { buildAppRoutes } from "v2/System/Router/buildAppRoutes"
import { buyerGuaranteeRoutes } from "v2/Apps/BuyerGuarantee/buyerGuaranteeRoutes"
import { categoriesRoutes } from "./Apps/Categories/categoriesRoutes"
import { collectRoutes } from "v2/Apps/Collect/collectRoutes"
import { consignRoutes } from "v2/Apps/Consign/consignRoutes"
import { conversationRoutes } from "v2/Apps/Conversation/conversationRoutes"
import { debugRoutes } from "v2/Apps/Debug/debugRoutes"
import { exampleRoutes } from "v2/Apps/Example/exampleRoutes"
import { fairOrganizerRoutes } from "./Apps/FairOrginizer/fairOrganizerRoutes"
import { fairRoutes } from "v2/Apps/Fair/fairRoutes"
import { fairsRoutes } from "v2/Apps/Fairs/fairsRoutes"
import { featureRoutes } from "v2/Apps/Feature/featureRoutes"
import { geneRoutes } from "v2/Apps/Gene/geneRoutes"
import { homeRoutes } from "v2/Apps/Home/homeRoutes"
import { identityVerificationRoutes } from "v2/Apps/IdentityVerification/identityVerificationRoutes"
import { orderRoutes } from "v2/Apps/Order/orderRoutes"
import { partnerRoutes } from "v2/Apps/Partner/partnerRoutes"
import { partnersRoutes } from "v2/Apps/Partners/partnersRoutes"
import { paymentRoutes } from "v2/Apps/Payment/paymentRoutes"
import { priceDatabaseRoutes } from "./Apps/PriceDatabase/priceDatabaseRoutes"
import { purchaseRoutes } from "v2/Apps/Purchase/purchaseRoutes"
import { searchRoutes } from "v2/Apps/Search/searchRoutes"
import { settingsRoutes } from "v2/Apps/Settings/settingsRoutes"
import { shippingRoutes } from "v2/Apps/Shipping/shippingRoutes"
import { showRoutes } from "v2/Apps/Show/showRoutes"
import { showsRoutes } from "v2/Apps/Shows/showsRoutes"
import { tagRoutes } from "./Apps/Tag/tagRoutes"
import { unsubscribeRoutes } from "./Apps/Unsubscribe/unsubscribeRoutes"
import { viewingRoomRoutes } from "v2/Apps/ViewingRoom/viewingRoomRoutes"
import { auction2Routes } from "./Apps/Auction2/auction2Routes"

export function getAppRoutes(): AppRouteConfig[] {
  return buildAppRoutes([
    { routes: artistRoutes },
    { routes: artistSeriesRoutes },
    { routes: artistsRoutes },
    { routes: artworkRoutes },
    { routes: auctionsRoutes },
    { routes: auction2Routes },
    { routes: authenticationRoutes },
    { routes: buyerGuaranteeRoutes },
    { routes: categoriesRoutes },
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
    { routes: partnersRoutes },
    { routes: paymentRoutes },
    { routes: priceDatabaseRoutes },
    { routes: purchaseRoutes },
    { routes: searchRoutes },
    { routes: settingsRoutes },
    { routes: shippingRoutes },
    { routes: showRoutes },
    { routes: showsRoutes },
    { routes: tagRoutes },
    { routes: unsubscribeRoutes },
    { routes: viewingRoomRoutes },

    // For debugging baseline app shell stuff
    { routes: debugRoutes },
  ])
}
