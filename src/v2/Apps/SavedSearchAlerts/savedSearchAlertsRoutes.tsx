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
const ListRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "savedSearchAlertsAppBundle" */ "./SavedSearchAlertsList"
    ),
  {
    resolveComponent: component =>
      component.SavedSearchAlertsListPaginationContainer,
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
        getComponent: () => ListRoute,
        onClientSideRender: () => {
          ListRoute.preload()
        },
        query: graphql`
          query savedSearchAlertsRoutes_SavedSearchAlertsListRouteQuery {
            me {
              ...SavedSearchAlertsList_me
            }
          }
        `,
      },
    ],
  },
]
