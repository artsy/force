import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const MarketingLandingApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/MarketingLanding/MarketingLandingApp"
    ),
  {
    resolveComponent: component => component.MarketingLandingApp,
  }
)
const OfferDetailApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/Offer/OfferDetailApp"
    ),
  {
    resolveComponent: component => component.OfferDetailAppFragmentContainer,
  }
)

const ArtworkDetails = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/ArtworkDetails/ArtworkDetails"
    ),
  {
    resolveComponent: component => component.ArtworkDetails,
  }
)

const UploadPhotos = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/UploadPhotos/UploadPhotos"
    ),
  {
    resolveComponent: component => component.UploadPhotos,
  }
)

const ContactInformation = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/ContactInformation/ContactInformation"
    ),
  {
    resolveComponent: component => component.ContactInformation,
  }
)

const ThankYou = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/ThankYou/ThankYou"
    ),
  {
    resolveComponent: component => component.ThankYou,
  }
)

export const consignRoutes: AppRouteConfig[] = [
  {
    theme: "v3",
    path: "/consign",
    getComponent: () => MarketingLandingApp,
    prepare: () => {
      MarketingLandingApp.preload()
    },
  },
  {
    theme: "v3",
    path: "/consign/submission2",
    children: [
      {
        theme: "v3",
        path: "artwork-details",
        getComponent: () => ArtworkDetails,
        prepare: () => {
          ArtworkDetails.preload()
        },
      },
      {
        theme: "v3",
        path: ":id/upload-photos",
        getComponent: () => UploadPhotos,
        prepare: () => {
          UploadPhotos.preload()
        },
      },
      {
        theme: "v3",
        path: ":id/contact-information",
        getComponent: () => ContactInformation,
        prepare: () => {
          ContactInformation.preload()
        },
      },
      {
        theme: "v3",
        path: ":id/thank-you",
        getComponent: () => ThankYou,
        prepare: () => {
          ThankYou.preload()
        },
      },
    ],
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
