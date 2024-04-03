import { Flex, Spacer, Text, Box, Button } from "@artsy/palette"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { PartnerShowOpenedNotification_notification$key } from "__generated__/PartnerShowOpenedNotification_notification.graphql"
import { extractNodes } from "Utils/extractNodes"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { RouterLink } from "System/Router/RouterLink"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"

const MAX_ARTWORK_GRID_WIDTH = 600

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

      <NotificationTypeLabel notification={notificationData} />

      <Spacer y={4} />

      <Flex maxWidth={MAX_ARTWORK_GRID_WIDTH} flexDirection="column" m="auto">
        {!!artworksConnection && (
          <ArtworkGrid artworks={artworksConnection} columnCount={2} />
        )}

        <Spacer y={4} />

        <Flex>
          <Button
            // @ts-ignore
            as="a"
            href={show.href}
          >
            Visit Show
          </Button>
        </Flex>
      </Flex>
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
    ...NotificationTypeLabel_notification
  }
`
