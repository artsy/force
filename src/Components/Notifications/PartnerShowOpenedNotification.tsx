import { Flex, Spacer, Text, Box } from "@artsy/palette"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { PartnerShowOpenedNotification_notification$key } from "__generated__/PartnerShowOpenedNotification_notification.graphql"
import { extractNodes } from "Utils/extractNodes"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"

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
  const image = shows[0]?.coverImage?.cropped

  if (!partner || !shows) {
    return <NotificationErrorMessage />
  }

  return (
    <Box>
      <Flex width="100%" justifyContent="space-between">
        <Flex flex={1}>
          <Text variant="lg-display">{headline}</Text>
        </Flex>
      </Flex>

      <Spacer y={1} />

      <NotificationTypeLabel item={notificationData} />

      <Spacer y={1} />
    </Box>
  )
}

export const PartnerShowOpenedNotificationFragment = graphql`
  fragment PartnerShowOpenedNotification_notification on Notification {
    headline
    item {
      ... on ShowOpenedNotificationItem {
        partner {
          name
        }
        showsConnection {
          edges {
            node {
              coverImage {
                # 3:2 aspect ratio
                cropped(width: 910, height: 607) {
                  src
                  srcSet
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
    notificationType
    publishedAt(format: "RELATIVE")
  }
`
