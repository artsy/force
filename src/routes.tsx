import { aboutRoutes } from "Apps/About/aboutRoutes"
import { adminRoutes } from "Apps/Admin/adminRoutes"
import { alertRoutes } from "Apps/Alert/alertRoutes"
import { artAppraisalsRoutes } from "Apps/ArtAppraisals/artAppraisalsRoutes"
import { articleRoutes } from "Apps/Article/articleRoutes"
import { articlesRoutes } from "Apps/Articles/articlesRoutes"
import { artistRoutes } from "Apps/Artist/artistRoutes"
import { artistSeriesRoutes } from "Apps/ArtistSeries/artistSeriesRoutes"
import { artistsRoutes } from "Apps/Artists/artistsRoutes"
import { artAdvisorRoutes } from "Apps/ArtAdvisor/ArtAdvisorRoutes"
import { artworkRoutes } from "Apps/Artwork/artworkRoutes"
import { endingSoonAuctionsRoutes } from "Apps/Auctions/EndingSoonAuctions/endingSoonAuctionsRoutes"
import { auctionsRoutes } from "Apps/Auctions/auctionsRoutes"
import { authenticationRoutes } from "Apps/Authentication/authenticationRoutes"
import { buyerGuaranteeRoutes } from "Apps/BuyerGuarantee/buyerGuaranteeRoutes"
import { collectRoutes } from "Apps/Collect/collectRoutes"
import { collectorProfileRoutes } from "Apps/CollectorProfile/collectorProfileRoutes"
import { conversationsRoutes } from "Apps/Conversations/conversationsRoutes"
import { debugRoutes } from "Apps/Debug/debugRoutes"
import { exampleRoutes } from "Apps/Example/exampleRoutes"
import { fairRoutes } from "Apps/Fair/fairRoutes"
import { fairsRoutes } from "Apps/Fairs/fairsRoutes"
import { favoritesRoutes } from "Apps/Favorites/favoritesRoutes"
import { featureRoutes } from "Apps/Feature/featureRoutes"
import { geneRoutes } from "Apps/Gene/geneRoutes"
import { homeRoutes } from "Apps/Home/homeRoutes"
import { identityVerificationRoutes } from "Apps/IdentityVerification/identityVerificationRoutes"
import { institutionPartnershipsRoutes } from "Apps/InstitutionPartnerships/institutionPartnershipsRoutes"
import { jobsRoutes } from "Apps/Jobs/jobsRoutes"
import { marketingRoutes } from "Apps/Marketing/marketingRoutes"
import { myCollectionRoutes } from "Apps/MyCollection/myCollectionRoutes"
import { myCollectionInsightsCollectorProfileRoutes } from "Apps/MyCollectionInsights/myCollectionInsightsCollectorProfileRoutes"
import { myCollectionInsightsRoutes } from "Apps/MyCollectionInsights/myCollectionInsightsRoutes"
import { newForYouRoutes } from "Apps/NewForYou/newForYouRoutes"
import { newWorksFromGalleriesYouFollowRoutes } from "Apps/NewWorksFromGalleriesYouFollow/newWorksFromGalleriesYouFollowRoutes"
import { onboardingRoutes } from "Apps/Onboarding/onboardingRoutes"
import { orderRoutes } from "Apps/Order/orderRoutes"
import { pageRoutes } from "Apps/Page/pageRoutes"
import { partnerRoutes } from "Apps/Partner/partnerRoutes"
import { partnerOfferRoutes } from "Apps/PartnerOffer/partnerOfferRoutes"
import { partnersRoutes } from "Apps/Partners/partnersRoutes"
import { saleAgreementsRoutes } from "Apps/SaleAgreements/saleAgreementsRoutes"
import { searchRoutes } from "Apps/Search/searchRoutes"
import { sellRoutes } from "Apps/Sell/sellRoutes"
import { settingsRoutes } from "Apps/Settings/settingsRoutes"
import { showRoutes } from "Apps/Show/showRoutes"
import { showsRoutes } from "Apps/Shows/showsRoutes"
import { viewingRoomRoutes } from "Apps/ViewingRoom/viewingRoomRoutes"
import { RouteProps } from "System/Router/Route"
import { buildAppRoutes } from "System/Router/Utils/buildAppRoutes"
import { HttpError } from "found"
import { artQuizRoutes } from "./Apps/ArtQuiz/artQuizRoutes"
import { auctionRoutes } from "./Apps/Auction/auctionRoutes"
import { categoriesRoutes } from "./Apps/Categories/categoriesRoutes"
import { contactRoutes } from "./Apps/Contact/contactRoutes"
import { fairOrganizerRoutes } from "./Apps/FairOrginizer/fairOrganizerRoutes"
import { notificationsRoutes } from "./Apps/Notifications/notificationsRoutes"
import { preferencesRoutes } from "./Apps/Preferences/preferencesRoutes"
import { pressRoutes } from "./Apps/Press/pressRoutes"
import { priceDatabaseRoutes } from "./Apps/PriceDatabase/priceDatabaseRoutes"
import { saleRoutes } from "./Apps/Sale/saleRoutes"
import { tagRoutes } from "./Apps/Tag/tagRoutes"
import { worksForYouRoutes } from "./Apps/WorksForYou/worksForYouRoutes"

const ROUTES = buildAppRoutes([
  aboutRoutes,
  adminRoutes,
  artAdvisorRoutes,
  artAppraisalsRoutes,
  articleRoutes,
  articlesRoutes,
  artistRoutes,
  artistSeriesRoutes,
  artistsRoutes,
  artQuizRoutes,
  alertRoutes,
  artworkRoutes,
  auctionRoutes,
  auctionsRoutes,
  authenticationRoutes,
  buyerGuaranteeRoutes,
  categoriesRoutes,
  collectRoutes,
  collectorProfileRoutes,
  contactRoutes,
  conversationsRoutes,
  exampleRoutes,
  endingSoonAuctionsRoutes,
  fairOrganizerRoutes,
  fairRoutes,
  fairsRoutes,
  favoritesRoutes,
  featureRoutes,
  geneRoutes,
  homeRoutes,
  identityVerificationRoutes,
  institutionPartnershipsRoutes,
  jobsRoutes,
  marketingRoutes,
  myCollectionRoutes,
  myCollectionInsightsRoutes,
  myCollectionInsightsCollectorProfileRoutes,
  newForYouRoutes,
  newWorksFromGalleriesYouFollowRoutes,
  notificationsRoutes,
  onboardingRoutes,
  orderRoutes,
  pageRoutes,
  partnerRoutes,
  partnerOfferRoutes,
  partnersRoutes,
  preferencesRoutes,
  pressRoutes,
  priceDatabaseRoutes,
  saleRoutes,
  saleAgreementsRoutes,
  searchRoutes,
  sellRoutes,
  settingsRoutes,
  showRoutes,
  showsRoutes,
  tagRoutes,
  viewingRoomRoutes,
  worksForYouRoutes,

  // For debugging baseline app shell stuff
  debugRoutes,

  [
    {
      path: "/oembed",
      render: () => {
        throw new HttpError(404)
      },
    },
  ],
])

export const getAppRoutes = (): RouteProps[] => {
  return ROUTES
}
