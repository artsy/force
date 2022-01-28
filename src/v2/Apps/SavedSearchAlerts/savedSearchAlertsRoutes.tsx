import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
import { graphql } from "relay-runtime"

const SavedSearchAlertsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "savedSearchAlertsAppBundle" */ "./SavedSearchAlertsApp"
    ),
  {
    resolveComponent: component =>
      component.SavedSearchAlertsAppPaginationContainer,
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
    query: graphql`
      query savedSearchAlertsRoutes_SavedSearchAlertsOverviewRouteQuery {
        me {
          ...SavedSearchAlertsApp_me
        }
      }
    `,
  },
]
