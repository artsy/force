import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
import { graphql } from "relay-runtime"

const SavedSearchAlertsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "savedSearchAlertsAppBundle" */ "./SavedSearchAlertsApp"
    ),
  {
    resolveComponent: component => component.SavedSearchAlertsApp,
  }
)
const OverviewRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "savedSearchAlertsAppBundle" */ "./SavedSearchAlertsOverviewRoute"
    ),
  {
    resolveComponent: component =>
      component.SavedSearchAlertsOverviewRouteFragmentContainer,
  }
)

export const savedSearchAlertsRoutes: AppRouteConfig[] = [
  {
    path: "/alerts",
    theme: "v3",
    getComponent: () => SavedSearchAlertsApp,
    onClientSideRender: () => {
      SavedSearchAlertsApp.preload()
    },
    children: [
      {
        path: "/",
        getComponent: () => OverviewRoute,
        onClientSideRender: () => {
          OverviewRoute.preload()
        },
        query: graphql`
          query savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQuery {
            me {
              ...SavedSearchAlertsOverviewRoute_me
            }
          }
        `,
      },
    ],
  },
]
