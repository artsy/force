import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const AlertsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "alertsBundle" */ "./Routes/Alerts/AlertsRoute"
    ),
  {
    resolveComponent: component => component.AlertsRouteFragmentContainer,
  }
)

export const alertsRoutes: AppRouteConfig[] = [
  {
    path: "/user/alerts",
    getComponent: () => AlertsApp,
    onClientSideRender: () => {
      AlertsApp.preload()
    },
    query: graphql`
      query alertsRoutes_AlertsQuery {
        me {
          ...AlertsRoute_me
        }
      }
    `,
  },
]
