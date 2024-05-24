import { aboutRoutes } from "Apps/About/aboutRoutes"
import { adminRoutes } from "Apps/Admin/adminRoutes"
import { alertRoutes } from "Apps/Alert/alertRoutes"
import { AppRouteConfig } from "System/Router/Route"
import { artAppraisalsRoutes } from "Apps/ArtAppraisals/artAppraisalsRoutes"
import { articleRoutes } from "Apps/Article/articleRoutes"
import { articlesRoutes } from "Apps/Articles/articlesRoutes"
import { artistRoutes } from "Apps/Artist/artistRoutes"
import { artistSeriesRoutes } from "Apps/ArtistSeries/artistSeriesRoutes"
import { artistsRoutes } from "Apps/Artists/artistsRoutes"
import { artQuizRoutes } from "./Apps/ArtQuiz/artQuizRoutes"
import { artworkRoutes } from "Apps/Artwork/artworkRoutes"
import { auctionRoutes } from "./Apps/Auction/auctionRoutes"
import { auctionsRoutes } from "Apps/Auctions/auctionsRoutes"
import { authenticationRoutes } from "Apps/Authentication/authenticationRoutes"
import { buildAppRoutes } from "System/Router/buildAppRoutes"
import { buyerGuaranteeRoutes } from "Apps/BuyerGuarantee/buyerGuaranteeRoutes"
import { categoriesRoutes } from "./Apps/Categories/categoriesRoutes"
import { collectorProfileRoutes } from "Apps/CollectorProfile/collectorProfileRoutes"
import { collectRoutes } from "Apps/Collect/collectRoutes"
import { consignRoutes } from "Apps/Consign/consignRoutes"
import { contactRoutes } from "./Apps/Contact/contactRoutes"
import { conversationsRoutes } from "Apps/Conversations/conversationsRoutes"
import { debugRoutes } from "Apps/Debug/debugRoutes"
import { endingSoonAuctionsRoutes } from "Apps/Auctions/EndingSoonAuctions/endingSoonAuctionsRoutes"
import { exampleRoutes } from "Apps/Example/exampleRoutes"
import { fairOrganizerRoutes } from "./Apps/FairOrginizer/fairOrganizerRoutes"
import { fairRoutes } from "Apps/Fair/fairRoutes"
import { fairsRoutes } from "Apps/Fairs/fairsRoutes"
import { favoritesRoutes } from "Apps/Favorites/favoritesRoutes"
import { featureRoutes } from "Apps/Feature/featureRoutes"
import { geneRoutes } from "Apps/Gene/geneRoutes"
import { homeRoutes } from "Apps/Home/homeRoutes"
import { HttpError } from "found"
import { identityVerificationRoutes } from "Apps/IdentityVerification/identityVerificationRoutes"
import { institutionPartnershipsRoutes } from "Apps/InstitutionPartnerships/institutionPartnershipsRoutes"
import { jobsRoutes } from "Apps/Jobs/jobsRoutes"
import { marketingRoutes } from "Apps/Marketing/marketingRoutes"
import { myCollectionInsightsCollectorProfileRoutes } from "Apps/MyCollectionInsights/myCollectionInsightsCollectorProfileRoutes"
import { myCollectionInsightsRoutes } from "Apps/MyCollectionInsights/myCollectionInsightsRoutes"
import { myCollectionRoutes } from "Apps/MyCollection/myCollectionRoutes"
import { newForYouRoutes } from "Apps/NewForYou/newForYouRoutes"
import { newWorksFromGalleriesYouFollowRoutes } from "Apps/NewWorksFromGalleriesYouFollow/newWorksFromGalleriesYouFollowRoutes"
import { notificationsRoutes } from "./Apps/Notifications/notificationsRoutes"
import { onboardingRoutes } from "Apps/Onboarding/onboardingRoutes"
import { orderRoutes } from "Apps/Order/orderRoutes"
import { pageRoutes } from "Apps/Page/pageRoutes"
import { partnerOfferRoutes } from "Apps/PartnerOffer/partnerOfferRoutes"
import { partnerRoutes } from "Apps/Partner/partnerRoutes"
import { partnersRoutes } from "Apps/Partners/partnersRoutes"
import { preferencesRoutes } from "./Apps/Preferences/preferencesRoutes"
import { pressRoutes } from "./Apps/Press/pressRoutes"
import { priceDatabaseRoutes } from "./Apps/PriceDatabase/priceDatabaseRoutes"
import { saleAgreementsRoutes } from "Apps/SaleAgreements/saleAgreementsRoutes"
import { saleRoutes } from "./Apps/Sale/saleRoutes"
import { searchRoutes } from "Apps/Search/searchRoutes"
import { sellRoutes } from "Apps/Sell/sellRoutes"
import { settingsRoutes } from "Apps/Settings/settingsRoutes"
import { showRoutes } from "Apps/Show/showRoutes"
import { showsRoutes } from "Apps/Shows/showsRoutes"
import { tagRoutes } from "./Apps/Tag/tagRoutes"
import { viewingRoomRoutes } from "Apps/ViewingRoom/viewingRoomRoutes"
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
    { routes: alertRoutes },
    { routes: artworkRoutes },
    { routes: auctionRoutes },
    { routes: auctionsRoutes },
    { routes: authenticationRoutes },
    { routes: buyerGuaranteeRoutes },
    { routes: categoriesRoutes },
    { routes: collectRoutes },
    { routes: collectorProfileRoutes },
    { routes: consignRoutes },
    { routes: contactRoutes },
    { routes: conversationsRoutes },
    { routes: exampleRoutes },
    { routes: endingSoonAuctionsRoutes },
    { routes: fairOrganizerRoutes },
    { routes: fairRoutes },
    { routes: fairsRoutes },
    { routes: favoritesRoutes },
    { routes: featureRoutes },
    { routes: geneRoutes },
    { routes: homeRoutes },
    { routes: identityVerificationRoutes },
    { routes: institutionPartnershipsRoutes },
    { routes: jobsRoutes },
    { routes: marketingRoutes },
    { routes: myCollectionRoutes },
    { routes: myCollectionInsightsRoutes },
    { routes: myCollectionInsightsCollectorProfileRoutes },
    { routes: newForYouRoutes },
    { routes: newWorksFromGalleriesYouFollowRoutes },
    { routes: notificationsRoutes },
    { routes: onboardingRoutes },
    { routes: orderRoutes },
    { routes: pageRoutes },
    { routes: partnerRoutes },
    { routes: partnerOfferRoutes },
    { routes: partnersRoutes },
    { routes: preferencesRoutes },
    { routes: pressRoutes },
    { routes: priceDatabaseRoutes },
    { routes: saleRoutes },
    { routes: saleAgreementsRoutes },
    { routes: searchRoutes },
    { routes: sellRoutes },
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
