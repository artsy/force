/* eslint-disable sort-keys-fix/sort-keys-fix */
import loadable from "@loadable/component"
import { graphql } from "react-relay"

const MarketingLandingApp = loadable(() =>
  import("./Routes/MarketingLanding/MarketingLandingApp")
)
const OfferDetailApp = loadable(() => import("./Routes/Offer/OfferDetailApp"))

export const consignRoutes = [
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
