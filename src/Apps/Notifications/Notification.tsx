import {
  Flex,
  Join,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { NotificationQuery } from "__generated__/NotificationQuery.graphql"
import { Notification_me$data } from "__generated__/Notification_me.graphql"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { extractNodes } from "Utils/extractNodes"
import { useNotificationsContext } from "Components/Notifications/useNotificationsContext"
import { Media } from "Utils/Responsive"

interface NotificationProps {
  me: Notification_me$data
}

const Notification: React.FC<NotificationProps> = ({ me }) => {
  const { notification } = me

  if (!notification) {
    return null
  }

  const currentArtworks = extractNodes(notification.artworks)

  return (
    <Flex flexDirection="column" m={4}>
      <Text variant="xs" color="black60">
        <NotificationTypeLabel
          notificationType={notification.notificationType}
        />
        {notification.publishedAt}
      </Text>

      <Text variant="xl" mb={2}>
        {notification.title}
      </Text>

      <Spacer y={4} />

      <Flex flexDirection="column" alignItems="center">
        <Join separator={<Spacer y={4} />}>
          {currentArtworks.map(artwork => (
            <>
              <Media greaterThan="xs">
                <ShelfArtworkFragmentContainer
                  key={artwork.internalID}
                  artwork={artwork}
                  area={600 * 600}
                  maxImageHeight={400}
                />
              </Media>
              <Media at="xs">
                <ShelfArtworkFragmentContainer
                  key={artwork.internalID}
                  artwork={artwork}
                />
              </Media>
            </>
          ))}
        </Join>
      </Flex>
    </Flex>
  )
}
export const NotificationFragmentContainer = createFragmentContainer(
  Notification,
  {
    me: graphql`
      fragment Notification_me on Me
        @argumentDefinitions(notificationId: { type: "String!" }) {
        notification(id: $notificationId) {
          internalID
          notificationType
          publishedAt(format: "RELATIVE")
          title
          artworks: artworksConnection(first: 10) {
            totalCount
            edges {
              node {
                ...ShelfArtwork_artwork
                internalID
              }
            }
          }
        }
      }
    `,
  }
)

const QUERY = graphql`
  query NotificationQuery($id: String!) {
    me {
      ...Notification_me @arguments(notificationId: $id)
    }
  }
`

export const NotificationQueryRenderer: React.FC = () => {
  const { state } = useNotificationsContext()

  if (!state.currentNotificationId) {
    return null
  }

  return (
    <SystemQueryRenderer<NotificationQuery>
      query={QUERY}
      variables={{
        id: state.currentNotificationId,
      }}
      placeholder={<Placeholder />}
      cacheConfig={{ force: true }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (props?.me) {
          return <NotificationFragmentContainer me={props.me} />
        }

        return <Placeholder />
      }}
    />
  )
}

export const Placeholder: React.FC = () => (
  <Flex flexDirection="column" m={4}>
    <Skeleton>
      <SkeletonText variant="xs">Alert - Today</SkeletonText>

      <SkeletonText variant="xl">Name of the Artist</SkeletonText>

      <Spacer y={4} />

      <Flex flexDirection="column" alignItems="center">
        <SkeletonBox width={600} height={600} mb={4} />
        <SkeletonBox width={600} height={600} mb={4} />
        <SkeletonBox width={600} height={600} mb={4} />
      </Flex>
    </Skeleton>
  </Flex>
)
