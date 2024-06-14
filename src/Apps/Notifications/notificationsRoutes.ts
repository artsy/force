import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

const NotificationsApp = loadable(
  () =>
    import(/* webpackChunkName: "notificationsBundle" */ "./NotificationsApp"),
  {
    resolveComponent: component => component.NotificationsAppFragmentContainer,
  }
)

export const notificationsRoutes: RouteProps[] = [
  {
    path: "/notifications",
    layout: "FullBleed",
    getComponent: () => NotificationsApp,
    onClientSideRender: () => {
      NotificationsApp.preload()
    },
    query: graphql`
      query notificationsRoutesNotificationsQuery {
        me {
          ...NotificationsApp_me
        }
      }
    `,
  },
  {
    path: "/notification/:notificationId",
    layout: "FullBleed",
    getComponent: () => NotificationsApp,
    onClientSideRender: () => {
      NotificationsApp.preload()
    },
    query: graphql`
      query notificationsRoutesNotificationQuery {
        me {
          ...NotificationsApp_me
        }
      }
    `,
  },
]
