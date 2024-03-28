import { Flex, Spacer, Text, Box } from "@artsy/palette"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { PartnerShowOpenedNotification_notification$key } from "__generated__/PartnerShowOpenedNotification_notification.graphql"
import { extractNodes } from "Utils/extractNodes"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { RouterLink } from "System/Router/RouterLink"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"

interface PartnerShowOpenedNotificationProps {
  notification: PartnerShowOpenedNotification_notification$key
}

export const PartnerShowOpenedNotification: FC<PartnerShowOpenedNotificationProps> = ({
  notification,
}) => {
  const notificationData = useFragment(
    PartnerShowOpenedNotificationFragment,
    notification
  )

  const { headline, item } = notificationData

  const partner = item?.partner
  const shows = extractNodes(item?.showsConnection)
  const show = shows[0]
  const artworksConnection = show?.artworksConnection

  if (!partner || !show) {
    return <NotificationErrorMessage />
  }

  return (
    <Box>
      <Text variant="lg-display">{headline}</Text>
      <Text variant="xs">
        Presented by <RouterLink to={partner.href}>{partner.name}</RouterLink>
      </Text>
      <Text variant="xs">Show • {"March 1 – April 1, 2024"}</Text>

      <Spacer y={1} />

      <NotificationTypeLabel item={notificationData} />

      <Spacer y={4} />

      {!!artworksConnection && (
        <ArtworkGrid artworks={artworksConnection} columnCount={2} />
      )}

      <Spacer y={4} />

      <RouterLink to={show.href}>
        <Text fontWeight="bold">Visit Show</Text>
      </RouterLink>
    </Box>
  )
}

export const PartnerShowOpenedNotificationFragment = graphql`
  fragment PartnerShowOpenedNotification_notification on Notification {
    headline
    item {
      ... on ShowOpenedNotificationItem {
        partner {
          href
          name
        }
        showsConnection {
          edges {
            node {
              artworksConnection(first: 2) {
                ...ArtworkGrid_artworks
                totalCount
              }
              href
              internalID
            }
          }
        }
      }
    }
    notificationType
    publishedAt(format: "RELATIVE")
  }
`
