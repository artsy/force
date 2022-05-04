import loadable from "@loadable/component"
import { Redirect, RedirectException } from "found"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"
import { getENV } from "v2/Utils/getENV"
import { getRedirect } from "./Routes/SubmissionFlow/Utils/redirects"

const NewMarketingLandingApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/NewMarketingLanding/MarketingLandingApp"
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

const UploadPhotosFragmentContainer = loadable(
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

const renderSubmissionFlowStep = ({ Component, props, match, resolving }) => {
  if (!(Component && props)) {
    return undefined
  }

  if (resolving) {
    const { submission } = props as any
    const redirectTo = getRedirect(props.router, match, submission)

    if (redirectTo) {
      throw new RedirectException(redirectTo)
    }
  }

  return <Component {...props} />
}

const prepareSubmissionFlowStepVariables = data => {
  return {
    ...data,
    sessionID: getENV("SESSION_ID"),
  }
}

export const consignRoutes: AppRouteConfig[] = [
  {
    path: "/sell",
    getComponent: () => NewMarketingLandingApp,
    onClientSideRender: () => {
      NewMarketingLandingApp.preload()
    },
  },
  {
    path: "/consign",
    children: [
      {
        path: ":splat*",
        render: ({ match }) => {
          throw new RedirectException(
            `${match.location.pathname.replace("/consign", "/sell")}${
              match.location.search
            }`,
            301
          )
        },
      },
      {
        path: "/",
        render: ({ match }) => {
          throw new RedirectException("/sell", 301)
        },
      },
    ],
  },
  {
    path: "/sell/submission",
    getComponent: () => SubmissionLayout,
    children: [
      new Redirect({
        from: "/",
        to: "/sell/submission/artwork-details",
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
        query: graphql`
          query consignRoutes_artworkDetailsQuery(
            $id: ID!
            $sessionID: String
          ) {
            submission(id: $id, sessionID: $sessionID) {
              ...ArtworkDetails_submission
              ...redirects_submission @relay(mask: false)
            }
          }
        `,
        prepareVariables: prepareSubmissionFlowStepVariables,
        render: renderSubmissionFlowStep,
      },
      {
        path: ":id/upload-photos",
        hideNav: true,
        hideFooter: true,
        getComponent: () => UploadPhotosFragmentContainer,
        onClientSideRender: () => {
          UploadPhotosFragmentContainer.preload()
        },
        query: graphql`
          query consignRoutes_uploadPhotosQuery($id: ID!, $sessionID: String) {
            submission(id: $id, sessionID: $sessionID) {
              ...UploadPhotos_submission
              ...redirects_submission @relay(mask: false)
            }
          }
        `,
        prepareVariables: prepareSubmissionFlowStepVariables,
        render: renderSubmissionFlowStep,
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
          query consignRoutes_contactInformationQuery(
            $id: ID!
            $sessionID: String
          ) {
            submission(id: $id, sessionID: $sessionID) {
              ...ContactInformation_submission
              ...redirects_submission @relay(mask: false)
            }
            me {
              ...ContactInformation_me
            }
          }
        `,
        render: renderSubmissionFlowStep,
        prepareVariables: prepareSubmissionFlowStepVariables,
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
    path: "/sell/offer/:offerID",
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
