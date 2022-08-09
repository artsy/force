import { aboutRoutes } from "Apps/About/aboutRoutes"
import { adminRoutes } from "Apps/Admin/adminRoutes"
import { AppRouteConfig } from "System/Router/Route"
import { artAppraisalsRoutes } from "Apps/ArtAppraisals/artAppraisalsRoutes"
import { articleRoutes } from "Apps/Article/articleRoutes"
import { articlesRoutes } from "Apps/Articles/articlesRoutes"
import { artistRoutes } from "Apps/Artist/artistRoutes"
import { artistSeriesRoutes } from "Apps/ArtistSeries/artistSeriesRoutes"
import { artistsRoutes } from "Apps/Artists/artistsRoutes"
import { artworkRoutes } from "Apps/Artwork/artworkRoutes"
import { auctionRoutes } from "./Apps/Auction/auctionRoutes"
import { auctionsRoutes } from "Apps/Auctions/auctionsRoutes"
import { authenticationRoutes } from "Apps/Authentication/authenticationRoutes"
import { buildAppRoutes } from "System/Router/buildAppRoutes"
import { buyerGuaranteeRoutes } from "Apps/BuyerGuarantee/buyerGuaranteeRoutes"
import { categoriesRoutes } from "./Apps/Categories/categoriesRoutes"
import { collectRoutes } from "Apps/Collect/collectRoutes"
import { consignRoutes } from "Apps/Consign/consignRoutes"
import { contactRoutes } from "./Apps/Contact/contactRoutes"
import { conversationRoutes } from "Apps/Conversation/conversationRoutes"
import { debugRoutes } from "Apps/Debug/debugRoutes"
import { exampleRoutes } from "Apps/Example/exampleRoutes"
import { fairOrganizerRoutes } from "./Apps/FairOrginizer/fairOrganizerRoutes"
import { fairRoutes } from "Apps/Fair/fairRoutes"
import { fairsRoutes } from "Apps/Fairs/fairsRoutes"
import { featureRoutes } from "Apps/Feature/featureRoutes"
import { geneRoutes } from "Apps/Gene/geneRoutes"
import { homeRoutes } from "Apps/Home/homeRoutes"
import { identityVerificationRoutes } from "Apps/IdentityVerification/identityVerificationRoutes"
import { institutionPartnershipsRoutes } from "Apps/InstitutionPartnerships/institutionPartnershipsRoutes"
import { jobsRoutes } from "Apps/Jobs/jobsRoutes"
import { meetTheSpecialistsRoutes } from "Apps/MeetTheSpecialists/meetTheSpecialistsRoutes"
import { onboardingRoutes } from "Apps/Onboarding/onboardingRoutes"
import { orderRoutes } from "Apps/Order/orderRoutes"
import { pageRoutes } from "Apps/Page/pageRoutes"
import { partnerRoutes } from "Apps/Partner/partnerRoutes"
import { partnersRoutes } from "Apps/Partners/partnersRoutes"
import { preferencesRoutes } from "./Apps/Preferences/preferencesRoutes"
import { pressRoutes } from "./Apps/Press/pressRoutes"
import { priceDatabaseRoutes } from "./Apps/PriceDatabase/priceDatabaseRoutes"
import { searchRoutes } from "Apps/Search/searchRoutes"
import { settingsRoutes } from "Apps/Settings/settingsRoutes"
import { showRoutes } from "Apps/Show/showRoutes"
import { showsRoutes } from "Apps/Shows/showsRoutes"
import { tagRoutes } from "./Apps/Tag/tagRoutes"
import { viewingRoomRoutes } from "Apps/ViewingRoom/viewingRoomRoutes"
import { worksForYouRoutes } from "./Apps/WorksForYou/worksForYouRoutes"
import { newForYouRoutes } from "Apps/NewForYou/newForYouRoutes"
import { myCollectionArtworkRoutes } from "Apps/MyCollectionArtwork/myCollectionArtworkRoutes"

export const getAppRoutes = (): AppRouteConfig[] => {
  return buildAppRoutes([
    { routes: aboutRoutes },
    { routes: adminRoutes },
    { routes: artAppraisalsRoutes },
    { routes: articleRoutes },
    { routes: articlesRoutes },
    { routes: artistRoutes },
    { routes: artistSeriesRoutes },
    { routes: artistsRoutes },
    { routes: artworkRoutes },
    { routes: auctionRoutes },
    { routes: auctionsRoutes },
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
    { routes: identityVerificationRoutes },
    { routes: institutionPartnershipsRoutes },
    { routes: jobsRoutes },
    { routes: meetTheSpecialistsRoutes },
    { routes: newForYouRoutes },
    { routes: onboardingRoutes },
    { routes: orderRoutes },
    { routes: pageRoutes },
    { routes: partnerRoutes },
    { routes: partnersRoutes },
    { routes: preferencesRoutes },
    { routes: pressRoutes },
    { routes: priceDatabaseRoutes },
    { routes: searchRoutes },
    { routes: settingsRoutes },
    { routes: showRoutes },
    { routes: showsRoutes },
    { routes: tagRoutes },
    { routes: viewingRoomRoutes },
    { routes: worksForYouRoutes },
    { routes: myCollectionArtworkRoutes },

    // For debugging baseline app shell stuff
    { routes: debugRoutes },
  ])
}
