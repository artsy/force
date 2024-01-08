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

const NotificationApp = loadable(
  () =>
    import(/* webpackChunkName: "notificationsBundle" */ "./NotificationApp"),
  {
    resolveComponent: component => component.NotificationAppFragmentContainer,
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
  {
    path: "/notification/:id",
    getComponent: () => NotificationApp,
    onClientSideRender: () => {
      NotificationApp.preload()
    },
    query: graphql`
      query notificationsRoutesNotificationQuery($id: String!) {
        me {
          ...Notification_me @arguments(notificationId: $id)
        }
      }
    `,
  },
]
