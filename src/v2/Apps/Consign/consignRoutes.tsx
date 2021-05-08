import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/Artsy/Router/Route"

const MarketingLandingApp = loadable(
  () => import("./Routes/MarketingLanding/MarketingLandingApp"),
  {
    resolveComponent: component => component.MarketingLandingApp,
  }
)
const OfferDetailApp = loadable(() => import("./Routes/Offer/OfferDetailApp"), {
  resolveComponent: component => component.OfferDetailAppFragmentContainer,
})

export const consignRoutes: AppRouteConfig[] = [
  {
    path: "/consign",
    getComponent: () => MarketingLandingApp,
    prepare: () => {
      MarketingLandingApp.preload()
    },
  },
  {
    path: "/consign/offer/:offerID",
    getComponent: () => OfferDetailApp,
    prepare: () => {
      OfferDetailApp.preload()
    },
    query: graphql`
      query consignRoutes_OfferDetailQuery($offerID: ID!) {
        offer(id: $offerID) {
          ...OfferDetailApp_offer
        }
      }
    `,
  },
]
