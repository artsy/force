import { aboutRoutes } from "Apps/About/aboutRoutes"
import { adminRoutes } from "Apps/Admin/adminRoutes"
import { artAppraisalsRoutes } from "Apps/ArtAppraisals/artAppraisalsRoutes"
import { articleRoutes } from "Apps/Article/articleRoutes"
import { articlesRoutes } from "Apps/Articles/articlesRoutes"
import { artistRoutes } from "Apps/Artist/artistRoutes"
import { artistsRoutes } from "Apps/Artists/artistsRoutes"
import { artistSeriesRoutes } from "Apps/ArtistSeries/artistSeriesRoutes"
import { artworkRoutes } from "Apps/Artwork/artworkRoutes"
import { auctionsRoutes } from "Apps/Auctions/auctionsRoutes"
import { authenticationRoutes } from "Apps/Authentication/authenticationRoutes"
import { buyerGuaranteeRoutes } from "Apps/BuyerGuarantee/buyerGuaranteeRoutes"
import { collectRoutes } from "Apps/Collect/collectRoutes"
import { collectorProfileRoutes } from "Apps/CollectorProfile/collectorProfileRoutes"
import { consignFromMyCollectionRoutes } from "Apps/Consign/consignFromMyCollectionRoutes"
import { consignFromCollectorProfileMyCollectionRoutes } from "Apps/Consign/consignFromCollectorProfileMyCollectionRoutes"
import { consignRoutes } from "Apps/Consign/consignRoutes"
import { conversationRoutes } from "Apps/Conversation/conversationRoutes"
import { debugRoutes } from "Apps/Debug/debugRoutes"
import { exampleRoutes } from "Apps/Example/exampleRoutes"
import { fairRoutes } from "Apps/Fair/fairRoutes"
import { fairsRoutes } from "Apps/Fairs/fairsRoutes"
import { featureRoutes } from "Apps/Feature/featureRoutes"
import { geneRoutes } from "Apps/Gene/geneRoutes"
import { homeRoutes } from "Apps/Home/homeRoutes"
import { identityVerificationRoutes } from "Apps/IdentityVerification/identityVerificationRoutes"
import { institutionPartnershipsRoutes } from "Apps/InstitutionPartnerships/institutionPartnershipsRoutes"
import { jobsRoutes } from "Apps/Jobs/jobsRoutes"
import { meetTheSpecialistsRoutes } from "Apps/MeetTheSpecialists/meetTheSpecialistsRoutes"
import { myCollectionRoutes } from "Apps/MyCollection/myCollectionRoutes"
import { myCollectionInsightsRoutes } from "Apps/MyCollectionInsights/myCollectionInsightsRoutes"
import { newForYouRoutes } from "Apps/NewForYou/newForYouRoutes"
import { onboardingRoutes } from "Apps/Onboarding/onboardingRoutes"
import { orderRoutes } from "Apps/Order/orderRoutes"
import { pageRoutes } from "Apps/Page/pageRoutes"
import { partnerRoutes } from "Apps/Partner/partnerRoutes"
import { partnersRoutes } from "Apps/Partners/partnersRoutes"
import { searchRoutes } from "Apps/Search/searchRoutes"
import { settingsRoutes } from "Apps/Settings/settingsRoutes"
import { showRoutes } from "Apps/Show/showRoutes"
import { showsRoutes } from "Apps/Shows/showsRoutes"
import { viewingRoomRoutes } from "Apps/ViewingRoom/viewingRoomRoutes"
import { HttpError } from "found"
import { buildAppRoutes } from "System/Router/buildAppRoutes"
import { AppRouteConfig } from "System/Router/Route"
import { artQuizRoutes } from "./Apps/ArtQuiz/artQuizRoutes"
import { auctionRoutes } from "./Apps/Auction/auctionRoutes"
import { categoriesRoutes } from "./Apps/Categories/categoriesRoutes"
import { contactRoutes } from "./Apps/Contact/contactRoutes"
import { fairOrganizerRoutes } from "./Apps/FairOrginizer/fairOrganizerRoutes"
import { notificationsRoutes } from "./Apps/Notifications/notificationsRoutes"
import { preferencesRoutes } from "./Apps/Preferences/preferencesRoutes"
import { pressRoutes } from "./Apps/Press/pressRoutes"
import { priceDatabaseRoutes } from "./Apps/PriceDatabase/priceDatabaseRoutes"
import { tagRoutes } from "./Apps/Tag/tagRoutes"
import { worksForYouRoutes } from "./Apps/WorksForYou/worksForYouRoutes"

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
    { routes: artQuizRoutes },
    { routes: artworkRoutes },
    { routes: auctionRoutes },
    { routes: auctionsRoutes },
    { routes: authenticationRoutes },
    { routes: buyerGuaranteeRoutes },
    { routes: categoriesRoutes },
    { routes: collectRoutes },
    { routes: collectorProfileRoutes },
    { routes: consignRoutes },
    { routes: consignFromMyCollectionRoutes },
    { routes: consignFromCollectorProfileMyCollectionRoutes },
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
    { routes: myCollectionRoutes },
    { routes: myCollectionInsightsRoutes },
    { routes: newForYouRoutes },
    { routes: notificationsRoutes },
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

    // For debugging baseline app shell stuff
    { routes: debugRoutes },

    {
      routes: [
        {
          path: "/oembed",
          render: () => {
            throw new HttpError(404)
          },
        },
      ],
    },
  ])
}
