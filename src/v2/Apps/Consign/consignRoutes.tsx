import loadable from "@loadable/component"
import { Redirect } from "found"
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

const SubmissionLayout = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/SubmissionLayout"
    ),
  {
    resolveComponent: component => component.SubmissionLayout,
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
    getComponent: () => SubmissionLayout,
    children: [
      new Redirect({
        from: "/",
        to: "/consign/submission2/artwork-details",
      }) as any,
      {
        theme: "v3",
        path: "artwork-details",
        hideFooter: true,
        getComponent: () => ArtworkDetails,
        prepare: () => {
          ArtworkDetails.preload()
        },
      },
      {
        theme: "v3",
        path: "upload-photos",
        hideFooter: true,
        getComponent: () => UploadPhotos,
        prepare: () => {
          UploadPhotos.preload()
        },
      },
      {
        theme: "v3",
        path: "contact-information",
        hideFooter: true,
        getComponent: () => ContactInformation,
        prepare: () => {
          ContactInformation.preload()
        },
      },
      {
        theme: "v3",
        path: ":id/thank-you",
        hideFooter: true,
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
