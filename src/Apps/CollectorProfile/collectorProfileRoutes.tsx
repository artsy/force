import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

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
      component.CollectorProfileMyCollectionRouteFragmentContainer,
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

const SavesAndFollowsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/SavesAndFollows/CollectorProfileSavesAndFollowsRoute"
    ),
  {
    resolveComponent: component =>
      component.CollectorProfileSavesAndFollowsRouteFragmentContainer,
  }
)

// Redirect home if the user is not logged in
const handleServerSideRender = () => {
  // TODO: Redirect to the logged out experience once released
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
        path: "collection",
        getComponent: () => MyCollectionRoute,
        onClientSideRender: () => {
          MyCollectionRoute.preload()
        },
      },
      {
        path: "insights",
        getComponent: () => InsightsRoute,
        onClientSideRender: () => {
          InsightsRoute.preload()
        },
      },
      {
        path: "saves",
        getComponent: () => SavesAndFollowsRoute,
        onClientSideRender: () => {
          SavesAndFollowsRoute.preload()
        },
        onServerSideRender: handleServerSideRender,
        query: graphql`
          query collectorProfileRoutes_SavesAndFollowsRouteQuery {
            me {
              ...CollectorProfileSavesAndFollowsRoute_me
            }
          }
        `,
      },
    ],
  },
]
