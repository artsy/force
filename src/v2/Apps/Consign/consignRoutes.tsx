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
    resolveComponent: component =>
      component.ContactInformationFragmentContainer,
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
    path: "/consign",
    getComponent: () => MarketingLandingApp,
    onClientSideRender: () => {
      MarketingLandingApp.preload()
    },
  },
  {
    path: "/consign/submission",
    getComponent: () => SubmissionLayout,
    children: [
      new Redirect({
        from: "/",
        to: "/consign/submission/artwork-details",
      }) as any,
      {
        path: "artwork-details",
        hideNav: true,
        hideFooter: true,
        getComponent: () => ArtworkDetails,
        onClientSideRender: () => {
          ArtworkDetails.preload()
        },
      },
      {
        path: ":id/artwork-details",
        hideNav: true,
        hideFooter: true,
        getComponent: () => ArtworkDetails,
        onClientSideRender: () => {
          ArtworkDetails.preload()
        },
      },
      {
        path: ":id/upload-photos",
        hideNav: true,
        hideFooter: true,
        getComponent: () => UploadPhotos,
        onClientSideRender: () => {
          UploadPhotos.preload()
        },
      },
      {
        path: ":id/contact-information",
        hideNav: true,
        hideFooter: true,
        getComponent: () => ContactInformation,
        onClientSideRender: () => {
          ContactInformation.preload()
        },
        query: graphql`
          query consignRoutes_ContactInformationQuery {
            me {
              ...ContactInformation_me
            }
          }
        `,
      },
      {
        path: ":id/thank-you",
        hideNav: true,
        hideFooter: true,
        getComponent: () => ThankYou,
        onClientSideRender: () => {
          ThankYou.preload()
        },
      },
    ],
  },
  {
    path: "/consign/offer/:offerID",
    theme: "v2",
    getComponent: () => OfferDetailApp,
    onClientSideRender: () => {
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
