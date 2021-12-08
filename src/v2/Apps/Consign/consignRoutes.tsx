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

const ArtworkDetailsFragmentContainer = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/ArtworkDetails/ArtworkDetails"
    ),
  {
    resolveComponent: component => component.ArtworkDetailsFragmentContainer,
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
    resolveComponent: component => component.UploadPhotosFragmentContainer,
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

const submissionQuery = graphql`
  query consignRoutes_submissionQuery($id: ID!) {
    submission(id: $id) {
      ...ArtworkDetails_submission
      ...UploadPhotos_submission
      ...ContactInformation_submission
    }
    me {
      ...ContactInformation_me
    }
  }
`

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
        getComponent: () => ArtworkDetailsFragmentContainer,
        onClientSideRender: () => {
          ArtworkDetailsFragmentContainer.preload()
        },
        query: submissionQuery,
      },
      {
        path: ":id/upload-photos",
        hideNav: true,
        hideFooter: true,
        getComponent: () => UploadPhotos,
        onClientSideRender: () => {
          UploadPhotos.preload()
        },
        query: submissionQuery,
      },
      {
        path: ":id/contact-information",
        hideNav: true,
        hideFooter: true,
        getComponent: () => ContactInformation,
        onClientSideRender: () => {
          ContactInformation.preload()
        },
        query: submissionQuery,
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
