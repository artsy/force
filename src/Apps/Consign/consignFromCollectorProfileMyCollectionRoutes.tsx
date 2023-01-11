import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"
import { getENV } from "Utils/getENV"
import { getRedirect } from "./Routes/SubmissionFlow/Utils/redirects"

const MarketingLandingApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/MarketingLanding/MarketingLandingApp"
    ),
  {
    resolveComponent: component => component.MarketingLandingApp,
  }
)

const FAQApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/MarketingLanding/FAQApp"
    ),
  {
    resolveComponent: component => component.FAQApp,
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

const ThankYouWhenFromMyCollection = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/SubmissionFlow/ThankYou/ThankYouWhenFromMyCollection"
    ),
  {
    resolveComponent: component => component.ThankYouWhenFromMyCollection,
  }
)

const renderSubmissionFlowStep = ({ Component, props, match, resolving }) => {
  if (!(Component && props)) {
    return undefined
  }

  const { submission } = props
  if (resolving) {
    const redirectTo = getRedirect(props.router, match, submission)

    if (redirectTo) {
      throw new RedirectException(redirectTo)
    }
  }

  // submission can be null for the first step of submission
  return <Component submission={submission ? submission : null} {...props} />
}

const prepareSubmissionFlowStepVariables = data => {
  let searchFields = { id: data.id, externalId: null }

  // This code is here to support externalId UUIDs in url
  // (i.e. /submissions/:id/something and :id is an UUID).
  // If :id in url is not a number - the code passes
  // externalId to metaphysics instead of id.
  const sequentialIdRegex = new RegExp(/^\d+$/)
  if (!sequentialIdRegex.test(data.id)) {
    searchFields.externalId = data.id
    searchFields.id = null
  }

  return {
    ...data,
    ...searchFields,
    sessionID: getENV("SESSION_ID"),
  }
}

const preparePrefillSubmissionFromArtworkVariables = data => {
  return {
    id: data.id,
    ...data,
  }
}

export const consignFromCollectorProfileMyCollectionRoutes: AppRouteConfig[] = [
  {
    path: "/sell",
    children: [
      {
        path: "/",
        getComponent: () => MarketingLandingApp,
        onClientSideRender: () => {
          MarketingLandingApp.preload()
        },
      },
      {
        path: "faq",
        layout: "NavOnly",
        getComponent: () => FAQApp,
        onClientSideRender: () => {
          FAQApp.preload()
        },
      },
    ],
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
    path: "/collector-profile/my-collection/submission",
    getComponent: () => SubmissionLayout,
    onServerSideRender: ({ res }) => {
      res.redirect(
        "/collector-profile/my-collection/submission/contact-information"
      )
    },
    children: [
      {
        path: "artwork-details/:artworkId",
        layout: "ContainerOnly",
        getComponent: () => ArtworkDetailsFragmentContainer,
        onClientSideRender: () => {
          ArtworkDetailsFragmentContainer.preload()
        },
        query: graphql`
          query consignFromCollectorProfileMyCollectionRoutes_myCollectionArtworkQuery(
            $artworkId: String!
          ) {
            myCollectionArtwork: artwork(id: $artworkId) {
              ...ArtworkDetails_myCollectionArtwork
            }
          }
        `,
        prepareVariables: preparePrefillSubmissionFromArtworkVariables,
      },
      {
        path: ":id/artwork-details/:artworkId",
        layout: "ContainerOnly",
        getComponent: () => ArtworkDetailsFragmentContainer,
        onClientSideRender: () => {
          ArtworkDetailsFragmentContainer.preload()
        },
        query: graphql`
          query consignFromCollectorProfileMyCollectionRoutes_artworkDetailsWithArtworkIdQuery(
            $id: ID
            $externalId: ID
            $sessionID: String
            $artworkId: String!
          ) {
            submission(
              id: $id
              externalId: $externalId
              sessionID: $sessionID
            ) {
              ...ArtworkDetails_submission
              ...redirects_submission @relay(mask: false)
            }
            myCollectionArtwork: artwork(id: $artworkId) {
              ...ArtworkDetails_myCollectionArtwork
            }
          }
        `,
        prepareVariables: prepareSubmissionFlowStepVariables,
        render: renderSubmissionFlowStep,
      },
      {
        path: ":id/upload-photos/:artworkId",
        layout: "ContainerOnly",
        getComponent: () => UploadPhotosFragmentContainer,
        onClientSideRender: () => {
          UploadPhotosFragmentContainer.preload()
        },
        query: graphql`
          query consignFromCollectorProfileMyCollectionRoutes_uploadArtworkPhotosQuery(
            $id: ID
            $externalId: ID
            $sessionID: String
            $artworkId: String!
          ) {
            submission(
              id: $id
              externalId: $externalId
              sessionID: $sessionID
            ) {
              ...UploadPhotos_submission
              ...redirects_submission @relay(mask: false)
            }
            myCollectionArtwork: artwork(id: $artworkId) {
              ...UploadPhotos_myCollectionArtwork
            }
          }
        `,
        prepareVariables: prepareSubmissionFlowStepVariables,
        render: renderSubmissionFlowStep,
      },
      {
        path: ":id/contact-information/:artworkId?",
        layout: "ContainerOnly",
        getComponent: () => ContactInformation,
        onClientSideRender: () => {
          ContactInformation.preload()
        },
        query: graphql`
          query consignFromCollectorProfileMyCollectionRoutes_contactInformationArtworkOwnerQuery(
            $id: ID
            $externalId: ID
            $sessionID: String
          ) {
            submission(
              id: $id
              externalId: $externalId
              sessionID: $sessionID
            ) {
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
        path: "/contact-information/:artworkId?",
        layout: "ContainerOnly",
        getComponent: () => ContactInformation,
        onClientSideRender: () => {
          ContactInformation.preload()
        },
        query: graphql`
          query consignFromCollectorProfileMyCollectionRoutes_contactInformationMeQuery {
            me {
              ...ContactInformation_me
            }
          }
        `,
        render: renderSubmissionFlowStep,
        prepareVariables: prepareSubmissionFlowStepVariables,
      },
      {
        path: ":id/thank-you/:artworkId?",
        layout: "ContainerOnly",
        getComponent: () => ThankYouWhenFromMyCollection,
        onClientSideRender: () => {
          ThankYouWhenFromMyCollection.preload()
        },
      },
    ],
  },
]
