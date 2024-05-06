import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"
import { RedirectException } from "found"
import { getENV } from "Utils/getENV"
import { getRedirect } from "Apps/Consign/Routes/SubmissionFlow/Utils/redirects"

const CollectorProfileApp = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./CollectorProfileApp"
    ),
  {
    resolveComponent: component =>
      component.CollectorProfileAppFragmentContainer,
  }
)

const MyCollectionRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/MyCollection/CollectorProfileMyCollectionRoute"
    ),
  {
    resolveComponent: component =>
      component.CollectorProfileMyCollectionRoutePaginationContainer,
  }
)

const InsightsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/Insights/CollectorProfileInsightsRoute"
    ),
  {
    resolveComponent: component =>
      component.CollectorProfileInsightsRouteFragmentContainer,
  }
)

const SavesRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/Saves/CollectorProfileSavesRoute"
    ),
  {
    resolveComponent: component =>
      component.CollectorProfileSavesRouteFragmentContainer,
  }
)

const FollowsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/Follows/CollectorProfileFollowsRoute"
    ),
  {
    resolveComponent: component =>
      component.CollectorProfileFollowsRouteFragmentContainer,
  }
)

const MyCollectionCreateArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "../../Apps/MyCollection/Routes/EditArtwork/MyCollectionCreateArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionCreateArtworkFragmentContainer,
  }
)

const MyCollectionArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "../../Apps/MyCollection/Routes/MyCollectionArtwork/MyCollectionArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionArtworkFragmentContainer,
  }
)

const MyCollectionEditArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "../../Apps/MyCollection/Routes/EditArtwork/MyCollectionEditArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionEditArtworkFragmentContainer,
  }
)

const PriceEstimateContactInformation = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "../../Apps/MyCollection/Routes/PriceEstimate/PriceEstimateContactInformation"
    ),
  {
    resolveComponent: component =>
      component.PriceEstimateContactInformationFragmentContainer,
  }
)

const PriceEstimateConfirmation = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "../../Apps/MyCollection/Routes/PriceEstimate/PriceEstimateConfirmation"
    ),
  {
    resolveComponent: component => component.PriceEstimateConfirmation,
  }
)

const Artists = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/Artists/CollectorProfileArtistsRoute"
    ),
  {
    resolveComponent: component => component.CollectorProfileArtistsRoute,
  }
)

// Redirect home if the user is not logged in
const handleServerSideRender = () => {
  // TODO: Redirect to the logged out experience once released
}

const SubmissionLayout = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "../Consign/Routes/SubmissionFlow/SubmissionLayout"
    ),
  {
    resolveComponent: component => component.SubmissionLayout,
  }
)

const ArtworkDetailsFragmentContainer = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "../Consign/Routes/SubmissionFlow/ArtworkDetails/ArtworkDetails"
    ),
  {
    resolveComponent: component => component.ArtworkDetailsFragmentContainer,
  }
)

const UploadPhotosFragmentContainer = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "../Consign/Routes/SubmissionFlow/UploadPhotos/UploadPhotos"
    ),
  {
    resolveComponent: component => component.UploadPhotosFragmentContainer,
  }
)

const ContactInformation = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "../Consign/Routes/SubmissionFlow/ContactInformation/ContactInformation"
    ),
  {
    resolveComponent: component =>
      component.ContactInformationFragmentContainer,
  }
)

const ThankYouWhenFromMyCollection = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "../Consign/Routes/SubmissionFlow/ThankYou/ThankYouWhenFromMyCollection"
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
export const collectorProfileRoutes: AppRouteConfig[] = [
  {
    path: "/collector-profile",
    getComponent: () => CollectorProfileApp,
    onClientSideRender: () => {
      CollectorProfileApp.preload()
    },
    query: graphql`
      query collectorProfileRoutes_CollectorProfileQuery {
        me {
          ...CollectorProfileApp_me
        }
      }
    `,
    children: [
      {
        path: "artists",
        getComponent: () => Artists,
        onClientSideRender: () => {
          Artists.preload()
        },
      },
      {
        path: "my-collection",
        getComponent: () => MyCollectionRoute,
        onClientSideRender: () => {
          MyCollectionRoute.preload()
        },
        query: graphql`
          query collectorProfileRoutes_MyCollectionRouteQuery {
            me {
              ...MyCollectionRoute_me
            }
          }
        `,
        cacheConfig: { force: true },
      },
      {
        path: "insights",
        getComponent: () => InsightsRoute,
        onClientSideRender: () => {
          InsightsRoute.preload()
        },
        onServerSideRender: handleServerSideRender,
        query: graphql`
          query collectorProfileRoutes_InsightsRouteQuery {
            me {
              ...InsightsRoute_me
            }
          }
        `,
      },
      {
        path: "saves/:id?",
        ignoreScrollBehavior: true,
        getComponent: () => SavesRoute,
        onClientSideRender: () => {
          SavesRoute.preload()
        },
        onServerSideRender: handleServerSideRender,
        query: graphql`
          query collectorProfileRoutes_SavesRouteQuery {
            me {
              ...CollectorProfileSavesRoute_me
            }
          }
        `,
      },
      {
        path: "follows",
        getComponent: () => FollowsRoute,
        onClientSideRender: () => {
          FollowsRoute.preload()
        },
        onServerSideRender: handleServerSideRender,
        query: graphql`
          query collectorProfileRoutes_FollowsRouteQuery {
            me {
              ...CollectorProfileFollowsRoute_me
            }
          }
        `,
      },
    ],
  },
  {
    path: "/collector-profile/my-collection/artworks/new",
    layout: "ContainerOnly",
    getComponent: () => MyCollectionCreateArtwork,
    onClientSideRender: () => {
      MyCollectionCreateArtwork.preload()
    },
    query: graphql`
      query collectorProfileRoutes_MyCollectionArtworkUploadQuery {
        me {
          ...MyCollectionCreateArtwork_me
        }
      }
    `,
  },
  {
    path: "/collector-profile/my-collection/artwork/:artworkID",
    getComponent: () => MyCollectionArtwork,
    onClientSideRender: () => {
      MyCollectionArtwork.preload()
    },
    query: graphql`
      query collectorProfileRoutes_ArtworkQuery($artworkID: String!) {
        artwork(id: $artworkID) @principalField {
          ...MyCollectionArtwork_artwork
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
  {
    path: "/collector-profile/my-collection/artworks/:slug/edit",
    layout: "ContainerOnly",
    getComponent: () => MyCollectionEditArtwork,
    onClientSideRender: () => {
      MyCollectionEditArtwork.preload()
    },
    query: graphql`
      query collectorProfileRoutes_MyCollectionArtworkFormQuery(
        $slug: String!
      ) {
        artwork(id: $slug) {
          ...MyCollectionEditArtwork_artwork
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
  {
    path: "/collector-profile/my-collection/artwork/:artworkID/price-estimate",
    layout: "ContainerOnly",
    getComponent: () => PriceEstimateContactInformation,
    onClientSideRender: () => {
      PriceEstimateContactInformation.preload()
    },
    query: graphql`
      query collectorProfileRoutes_priceEstimateContactInformationQuery(
        $artworkID: String!
      ) {
        artwork(id: $artworkID) @principalField {
          ...PriceEstimateContactInformation_artwork
        }
        me {
          ...PriceEstimateContactInformation_me
        }
      }
    `,
  },
  {
    path:
      "/collector-profile/my-collection/artwork/:artworkID/price-estimate/success",
    layout: "ContainerOnly",
    getComponent: () => PriceEstimateConfirmation,
    onClientSideRender: () => {
      PriceEstimateConfirmation.preload()
    },
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
          query collectorProfileRoutes_myCollectionArtworkQuery(
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
          query collectorProfileRoutes_artworkDetailsWithArtworkIdQuery(
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
          query collectorProfileRoutes_uploadArtworkPhotosQuery(
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
          query collectorProfileRoutes_contactInformationArtworkOwnerQuery(
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
          query collectorProfileRoutes_contactInformationMeQuery {
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
