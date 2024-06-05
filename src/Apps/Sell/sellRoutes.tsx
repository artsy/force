import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"
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

export const sellRoutes: AppRouteConfig[] = [
  {
    path: "/sell2",
    children: [
      {
        path: "intro",
        layout: "ContainerOnly",
        Component : IntroRoute,
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
        path: "submissions/new/collection",
        layout: "ContainerOnly",
        Component: NewFromMyCollectionRoute,
        onClientSideRender: () => {
          NewFromMyCollectionRoute.preload()
        },
      },
      {
        path: "submissions/:id/thank-you",
        layout: "ContainerOnly",
        Component: ThankYouRoute,
        onClientSideRender: () => {
          ThankYouRoute.preload()
        },
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
      {
        path: "submissions/:id",
        Component: SubmissionRoute,
        onClientSideRender: () => {
          SubmissionRoute.preload()
        },
        query: graphql`
          query sellRoutes_SubmissionRouteQuery($id: ID!) {
            submission(id: $id) @principalField {
              ...SubmissionRoute_submission
            }
          }
        `,
        prepareVariables: ({ id }) => {
          return { id }
        },
        children: [
          {
            path: "title",
            layout: "ContainerOnly",
            Component: TitleRoute,
            onClientSideRender: () => {
              TitleRoute.preload()
            },
            query: graphql`
              query sellRoutes_TitleRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...TitleRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
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
              query sellRoutes_PhotosRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...PhotosRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
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
              query sellRoutes_DetailsRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...DetailsRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
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
              query sellRoutes_PurchaseHistoryRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...PurchaseHistoryRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
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
              query sellRoutes_DimensionsRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...DimensionsRoute_submission
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
