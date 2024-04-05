import { Flex, Spacer, Text, Box, Button } from "@artsy/palette"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { PartnerShowOpenedNotification_notification$key } from "__generated__/PartnerShowOpenedNotification_notification.graphql"
import { extractNodes } from "Utils/extractNodes"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { RouterLink } from "System/Router/RouterLink"
import { NotificationPartnerShow } from "Components/Notifications/NotificationPartnerShow"

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

  if (!partner || !shows.length) {
    return <NotificationErrorMessage />
  }

  return (
    <Box>
      <Text variant="lg-display">{headline}</Text>

      <Spacer y={1} />

      <NotificationTypeLabel notification={notificationData} />

      <Spacer y={0.5} />

      <Text variant="xs">
        Presented by{" "}
        <RouterLink to={partner.href} data-testid="partner-link">
          {partner.name}
        </RouterLink>
      </Text>

      <Spacer y={4} />

      <Flex flexDirection="column" alignItems="center">
        {shows.map(show => (
          <NotificationPartnerShow show={show} key={show.internalID} />
        ))}
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
              internalID
              ...NotificationPartnerShow_show
            }
          }
        }
      }
    }
    ...NotificationTypeLabel_notification
  }
`
