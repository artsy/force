import { FullBleed } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { Notifications } from "Components/Notifications/Notifications"
import {
  getRecentNotification,
  useUnseenNotificationsIndicator,
} from "Components/Notifications/util"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { NotificationsApp_me$data } from "__generated__/NotificationsApp_me.graphql"
import { NotificationsApp_viewer$data } from "__generated__/NotificationsApp_viewer.graphql"

interface NotificationsAppProps {
  me: NotificationsApp_me$data
  viewer: NotificationsApp_viewer$data
}

const NotificationsApp: React.FC<NotificationsAppProps> = props => {
  const { me, viewer } = props
  const notificationNodes = extractNodes(viewer.notificationsConnection)
  const recentNotification = getRecentNotification(notificationNodes)

  const { setLastSeenNotificationDateTime } = useUnseenNotificationsIndicator(
    recentNotification?.publishedAt
  )

  return (
    <>
      <MetaTags title="Notifications | Artsy" pathname="/notifications" />

      <FullBleed>
        <Notifications
          mode="page"
          unreadCounts={me.unreadNotificationsCount ?? 0}
          setLastSeenNotificationDateTime={setLastSeenNotificationDateTime}
        />
      </FullBleed>
    </>
  )
}

export const NotificationsAppFragmentContainer = createFragmentContainer(
  NotificationsApp,
  {
    me: graphql`
      fragment NotificationsApp_me on Me {
        unreadNotificationsCount
      }
    `,
    viewer: graphql`
      fragment NotificationsApp_viewer on Viewer {
        notificationsConnection(first: 3) {
          edges {
            node {
              publishedAt
              artworks: artworksConnection {
                totalCount
              }
            }
          }
        }
      }
    `,
  }
)
