import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"
import { graphql } from "react-relay"

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
    onServerSideRender: ({ req, res }) => {
      if (!req.user) {
        res.redirect("/")
      }
    },
    query: graphql`
      query notificationsRoutes_NotificationsQuery {
        notifications: notificationsConnection(first: 10) {
          ...NotificationsApp_notifications
        }
      }
    `,
  },
]
