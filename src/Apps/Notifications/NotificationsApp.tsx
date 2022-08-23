import { Join, Separator, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationsApp_me } from "__generated__/NotificationsApp_me.graphql"
import { extractNodes } from "Utils/extractNodes"
import { NotificationItemFragmentContainer } from "Components/NotificationItem"

interface NotificationsAppProps {
  me: NotificationsApp_me
}

export const NotificationsApp: React.FC<NotificationsAppProps> = ({ me }) => {
  const notifications = extractNodes(me.followsAndSaves?.notifications)

  return (
    <>
      <Spacer mt={1} />

      <Join separator={<Separator mx={2} />}>
        {notifications.map(notification => (
          <NotificationItemFragmentContainer
            key={notification.id}
            item={notification}
          />
        ))}
      </Join>
    </>
  )
}

export const NotificationsAppFragmentContainer = createFragmentContainer(
  NotificationsApp,
  {
    me: graphql`
      fragment NotificationsApp_me on Me {
        followsAndSaves {
          notifications: bundledArtworksByArtistConnection(
            sort: PUBLISHED_AT_DESC
            first: 10
          ) {
            edges {
              node {
                id
                ...NotificationItem_item
              }
            }
          }
        }
      }
    `,
  }
)
