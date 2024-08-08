import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"
import { getENV } from "Utils/getENV"
import { graphql } from "react-relay"

const IntroRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/IntroRoute"),
  {
    resolveComponent: component => component.IntroRoute,
  }
)

const SubmissionRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/SubmissionRoute"),
  {
    resolveComponent: component => component.SubmissionRoute,
  }
)

const NewRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/NewRoute"),
  {
    resolveComponent: component => component.NewRoute,
  }
)

const ArtistRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/ArtistRoute"),
  {
    resolveComponent: component => component.ArtistRouteFragmentContainer,
  }
)

const TitleRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/TitleRoute"),
  {
    resolveComponent: component => component.TitleRoute,
  }
)

const PhotosRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/PhotosRoute"),
  {
    resolveComponent: component => component.PhotosRoute,
  }
)

const DetailsRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/DetailsRoute"),
  {
    resolveComponent: component => component.DetailsRoute,
  }
)

const DimensionsRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/DimensionsRoute"),
  {
    resolveComponent: component => component.DimensionsRoute,
  }
)

const PhoneNumberRoute = loadable(
  () =>
    import(/* webpackChunkName: "sellBundle" */ "./Routes/PhoneNumberRoute"),
  {
    resolveComponent: component => component.PhoneNumberRoute,
  }
)

const PurchaseHistoryRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/PurchaseHistoryRoute"
    ),
  {
    resolveComponent: component => component.PurchaseHistoryRoute,
  }
)

const NewFromMyCollectionRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/NewFromMyCollectionRoute"
    ),
  {
    resolveComponent: component => component.NewFromMyCollectionRoute,
  }
)

const ThankYouRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/ThankYouRoute"),
  {
    resolveComponent: component => component.ThankYouRoute,
  }
)

const ArtistNotEligibleRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/ArtistNotEligibleRoute"
    ),
  {
    resolveComponent: component => component.ArtistNotEligibleRoute,
  }
)

const AdditionalDocumentsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/AdditionalRoutes/AdditionalDocumentsRoute"
    ),
  {
    resolveComponent: component => component.AdditionalDocumentsRoute,
  }
)

const ConditionRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/AdditionalRoutes/ConditionRoute"
    ),
  {
    resolveComponent: component => component.ConditionRoute,
  }
)

const ShippingLocationRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/AdditionalRoutes/ShippingLocationRoute"
    ),
  {
    resolveComponent: component => component.ShippingLocationRoute,
  }
)

const FrameRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/AdditionalRoutes/FrameRoute"
    ),
  {
    resolveComponent: component => component.FrameRoute,
  }
)

export const sellRoutes: RouteProps[] = [
  {
    path: "/sell",
    children: [
      {
        path: "intro",
        layout: "ContainerOnly",
        Component: IntroRoute,
        onClientSideRender: () => {
          IntroRoute.preload()
        },
      },
      {
        path: "submissions/new",
        layout: "ContainerOnly",
        Component: NewRoute,
        onClientSideRender: () => {
          NewRoute.preload()
        },
      },
      {
        path: "artist-not-eligible/:artistID",
        layout: "ContainerOnly",
        Component: ArtistNotEligibleRoute,
        onClientSideRender: () => {
          ArtistNotEligibleRoute.preload()
        },
        query: graphql`
          query sellRoutes_ArtistNotEligibleRouteQuery($id: String!) {
            artist(id: $id) @principalField {
              ...ArtistNotEligibleRoute_artist
            }
          }
        `,
        prepareVariables: ({ artistID }) => {
          return { id: artistID }
        },
      },
      {
        path: "submissions/new/collection",
        layout: "ContainerOnly",
        Component: NewFromMyCollectionRoute,
        onClientSideRender: () => {
          NewFromMyCollectionRoute.preload()
        },
        onServerSideRender: checkIfLoggedIn,
      },

      {
        path: "submissions/:id",
        Component: SubmissionRoute,
        onClientSideRender: () => {
          SubmissionRoute.preload()
        },
        query: graphql`
          query sellRoutes_SubmissionRouteQuery($id: ID!, $sessionID: String!) {
            submission(id: $id, sessionID: $sessionID) @principalField {
              ...SubmissionRoute_submission
            }
          }
        `,
        prepareVariables: ({ id }) => {
          return { id, sessionID: getENV("SESSION_ID") }
        },
        children: [
          {
            path: "artist",
            layout: "ContainerOnly",
            Component: ArtistRoute,
            onClientSideRender: () => {
              ArtistRoute.preload()
            },
            query: graphql`
              query sellRoutes_ArtistRouteQuery($id: ID!, $sessionID: String!) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...ArtistRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "title",
            layout: "ContainerOnly",
            Component: TitleRoute,
            onClientSideRender: () => {
              TitleRoute.preload()
            },
            query: graphql`
              query sellRoutes_TitleRouteQuery($id: ID!, $sessionID: String!) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...TitleRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "photos",
            layout: "ContainerOnly",
            Component: PhotosRoute,
            onClientSideRender: () => {
              PhotosRoute.preload()
            },
            query: graphql`
              query sellRoutes_PhotosRouteQuery($id: ID!, $sessionID: String!) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...PhotosRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "details",
            layout: "ContainerOnly",
            Component: DetailsRoute,
            onClientSideRender: () => {
              DetailsRoute.preload()
            },
            query: graphql`
              query sellRoutes_DetailsRouteQuery(
                $id: ID!
                $sessionID: String!
              ) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...DetailsRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "purchase-history",
            layout: "ContainerOnly",
            Component: PurchaseHistoryRoute,
            onClientSideRender: () => {
              PurchaseHistoryRoute.preload()
            },
            query: graphql`
              query sellRoutes_PurchaseHistoryRouteQuery(
                $id: ID!
                $sessionID: String!
              ) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...PurchaseHistoryRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "dimensions",
            layout: "ContainerOnly",
            Component: DimensionsRoute,
            onClientSideRender: () => {
              DimensionsRoute.preload()
            },
            query: graphql`
              query sellRoutes_DimensionsRouteQuery(
                $id: ID!
                $sessionID: String!
              ) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...DimensionsRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "phone-number",
            layout: "ContainerOnly",
            Component: PhoneNumberRoute,
            onClientSideRender: () => {
              PhoneNumberRoute.preload()
            },
            query: graphql`
              query sellRoutes_PhoneNumberRouteQuery(
                $id: ID!
                $sessionID: String!
              ) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...PhoneNumberRoute_submission
                }
                me {
                  ...PhoneNumberRoute_me
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "thank-you",
            layout: "ContainerOnly",
            Component: ThankYouRoute,
            onClientSideRender: () => {
              ThankYouRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_ThankYouRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...ThankYouRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },

          // Additional Routes

          {
            path: "shipping-location",
            layout: "ContainerOnly",
            Component: ShippingLocationRoute,
            onClientSideRender: () => {
              ShippingLocationRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_ShippingLocationRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...ShippingLocationRoute_submission
                }
                me {
                  ...ShippingLocationRoute_me
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },
          {
            path: "frame",
            layout: "ContainerOnly",
            Component: FrameRoute,
            onClientSideRender: () => {
              FrameRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_FrameRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...FrameRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },
          {
            path: "additional-documents",
            layout: "ContainerOnly",
            Component: AdditionalDocumentsRoute,
            onClientSideRender: () => {
              AdditionalDocumentsRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_AdditionalDocumentsRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...AdditionalDocumentsRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },
          {
            path: "condition",
            layout: "ContainerOnly",
            Component: ConditionRoute,
            onClientSideRender: () => {
              ConditionRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_ConditionRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...ConditionRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },
          {
            path: "thank-you-post-approval",
            layout: "ContainerOnly",
            Component: ThankYouRoute,
            onClientSideRender: () => {
              ThankYouRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_ThankYouPostApprovalRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...ThankYouRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },
        ],
      },
    ],
  },
]

function checkIfLoggedIn({ req, res }) {
  if (!req.user) {
    res.redirect(`/login?redirectTo=${req.originalUrl}`)
  }
}
