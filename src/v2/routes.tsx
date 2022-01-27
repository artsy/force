import { aboutRoutes } from "./Apps/_About2/aboutRoutes"
import { AppRouteConfig } from "v2/System/Router/Route"
import { articleRoutes } from "v2/Apps/Article/articleRoutes"
import { articlesRoutes } from "v2/Apps/Articles/articlesRoutes"
import { artistRoutes } from "v2/Apps/Artist/artistRoutes"
import { artistSeriesRoutes } from "v2/Apps/ArtistSeries/artistSeriesRoutes"
import { artistsRoutes } from "v2/Apps/Artists/artistsRoutes"
import { artworkRoutes } from "v2/Apps/Artwork/artworkRoutes"
import { auction2Routes } from "./Apps/Auction2/auction2Routes"
import { auctionPartnershipsRoutes } from "./Apps/_AuctionPartnerships2/auctionPartnershipsRoutes"
import { auctionsRoutes } from "v2/Apps/Auctions/auctionsRoutes"
import { authenticationRoutes } from "v2/Apps/Authentication/authenticationRoutes"
import { buildAppRoutes } from "v2/System/Router/buildAppRoutes"
import { buyerGuaranteeRoutes } from "v2/Apps/BuyerGuarantee/buyerGuaranteeRoutes"
import { categoriesRoutes } from "./Apps/Categories/categoriesRoutes"
import { collectRoutes } from "v2/Apps/Collect/collectRoutes"
import { consignRoutes } from "v2/Apps/Consign/consignRoutes"
import { contactRoutes } from "./Apps/_Contact2/contactRoutes"
import { conversationRoutes } from "v2/Apps/Conversation/conversationRoutes"
import { debugRoutes } from "v2/Apps/Debug/debugRoutes"
import { exampleRoutes } from "v2/Apps/Example/exampleRoutes"
import { fairOrganizerRoutes } from "./Apps/FairOrginizer/fairOrganizerRoutes"
import { fairRoutes } from "v2/Apps/Fair/fairRoutes"
import { fairsRoutes } from "v2/Apps/Fairs/fairsRoutes"
import { featureRoutes } from "v2/Apps/Feature/featureRoutes"
import { geneRoutes } from "v2/Apps/Gene/geneRoutes"
import { homeRoutes } from "v2/Apps/Home/homeRoutes"
import { howAuctionsWorkRoutes } from "./Apps/_HowAuctionsWork2/howAuctionsWorkRoutes"
import { identityVerificationRoutes } from "v2/Apps/IdentityVerification/identityVerificationRoutes"
import { meetTheSpecialistsRoutes } from "v2/Apps/MeetTheSpecialists/meetTheSpecialistsRoutes"
import { orderRoutes } from "v2/Apps/Order/orderRoutes"
import { partnerRoutes } from "v2/Apps/Partner/partnerRoutes"
import { partnersRoutes } from "v2/Apps/Partners/partnersRoutes"
import { paymentRoutes } from "v2/Apps/Payment/paymentRoutes"
import { preferencesRoutes } from "./Apps/_Preferences2/preferencesRoutes"
import { priceDatabaseRoutes } from "./Apps/PriceDatabase/priceDatabaseRoutes"
import { purchaseRoutes } from "v2/Apps/Purchase/purchaseRoutes"
import { searchRoutes } from "v2/Apps/Search/searchRoutes"
import { settingsRoutes } from "v2/Apps/Settings/settingsRoutes"
import { shippingRoutes } from "v2/Apps/Shipping/shippingRoutes"
import { showRoutes } from "v2/Apps/Show/showRoutes"
import { showsRoutes } from "v2/Apps/Shows/showsRoutes"
import { staticPageRoutes } from "v2/Apps/StaticPage/staticPageRoutes"
import { tagRoutes } from "./Apps/Tag/tagRoutes"
import { unsubscribeRoutes } from "./Apps/Unsubscribe/unsubscribeRoutes"
import { viewingRoomRoutes } from "v2/Apps/ViewingRoom/viewingRoomRoutes"
import { worksForYouRoutes } from "./Apps/WorksForYou/worksForYouRoutes"

export function getAppRoutes(): AppRouteConfig[] {
  return buildAppRoutes([
    { routes: aboutRoutes },
    { routes: articleRoutes },
    { routes: articlesRoutes },
    { routes: artistRoutes },
    { routes: artistSeriesRoutes },
    { routes: artistsRoutes },
    { routes: artworkRoutes },
    { routes: auction2Routes },
    { routes: auctionsRoutes },
    { routes: auctionPartnershipsRoutes },
    { routes: authenticationRoutes },
    { routes: buyerGuaranteeRoutes },
    { routes: categoriesRoutes },
    { routes: collectRoutes },
    { routes: consignRoutes },
    { routes: contactRoutes },
    { routes: conversationRoutes },
    { routes: exampleRoutes },
    { routes: fairOrganizerRoutes },
    { routes: fairRoutes },
    { routes: fairsRoutes },
    { routes: featureRoutes },
    { routes: geneRoutes },
    { routes: homeRoutes },
    { routes: howAuctionsWorkRoutes },
    { routes: identityVerificationRoutes },
    { routes: meetTheSpecialistsRoutes },
    { routes: orderRoutes },
    { routes: partnerRoutes },
    { routes: partnersRoutes },
    { routes: paymentRoutes },
    { routes: preferencesRoutes },
    { routes: priceDatabaseRoutes },
    { routes: purchaseRoutes },
    { routes: staticPageRoutes },
    { routes: searchRoutes },
    { routes: settingsRoutes },
    { routes: shippingRoutes },
    { routes: showRoutes },
    { routes: showsRoutes },
    { routes: tagRoutes },
    { routes: unsubscribeRoutes },
    { routes: viewingRoomRoutes },
    { routes: worksForYouRoutes },

    // For debugging baseline app shell stuff
    { routes: debugRoutes },
  ])
}
