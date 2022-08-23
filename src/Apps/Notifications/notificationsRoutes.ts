import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const NotificationsApp = loadable(
  () =>
    import(/* webpackChunkName: "notificationsBundle" */ "./NotificationsApp"),
  {
    resolveComponent: component => component.NotificationsApp,
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
  },
]
