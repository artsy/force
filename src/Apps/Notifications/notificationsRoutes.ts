import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

const NotificationsApp = loadable(
  () =>
    import(/* webpackChunkName: "notificationsBundle" */ "./NotificationsApp"),
  {
    resolveComponent: component => component.NotificationsAppFragmentContainer,
  }
)

export const notificationsRoutes: AppRouteConfig[] = [
  {
    path: "/notifications",
    getComponent: () => NotificationsApp,
    onClientSideRender: () => {
      NotificationsApp.preload()
    },
    query: graphql`
      query notificationsRoutesQuery {
        me {
          ...NotificationsApp_me
        }
      }
    `,
  },
]
