import { Flex, Spacer, Text, Box } from "@artsy/palette"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { RouterLink } from "System/Router/RouterLink"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { ArtworkPublishedNotification_notification$key } from "__generated__/ArtworkPublishedNotification_notification.graphql"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { NotificationArtworkList } from "Components/Notifications/NotificationArtworkList"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"

interface ArtworkPublishedNotificationProps {
  notification: ArtworkPublishedNotification_notification$key
}

export const ArtworkPublishedNotification: FC<ArtworkPublishedNotificationProps> = ({
  notification,
}) => {
  const notificationData = useFragment(
    ArtworkPublishedNotificationFragment,
    notification
  )

  const { artworksConnection, headline, item } = notificationData

  const artist = item?.artists?.[0]

  if (!artist) {
    return <NotificationErrorMessage />
  }

  return (
    <Box>
      <Text variant="lg-display">{headline}</Text>

      <Spacer y={1} />

      <NotificationTypeLabel item={notificationData} />

      <Spacer y={1} />

      <FollowArtistButtonQueryRenderer id={artist.internalID} size="small" />

      <Spacer y={4} />

      <NotificationArtworkList artworksConnection={artworksConnection} />

      <Spacer y={4} />

      <RouterLink to={`/artist/${artist?.slug}/works-for-sale`}>
        <Flex flexDirection="row">
          <Text fontWeight="bold">View all works by {artist.name}</Text>
        </Flex>
      </RouterLink>
    </Box>
  )
}

export const ArtworkPublishedNotificationFragment = graphql`
  fragment ArtworkPublishedNotification_notification on Notification {
    artworksConnection(first: 10) {
      ...NotificationArtworkList_artworksConnection
      totalCount
    }
    headline
    item {
      ... on ArtworkPublishedNotificationItem {
        artists {
          internalID
          isFollowed
          name
          slug
        }
      }
    }
    notificationType
    publishedAt(format: "RELATIVE")
  }
`
