import { Flex, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { PartnerShowOpenedNotification_notification$key } from "__generated__/PartnerShowOpenedNotification_notification.graphql"
import { extractNodes } from "Utils/extractNodes"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { RouterLink } from "System/Components/RouterLink"
import { NotificationPartnerShow } from "Components/Notifications/NotificationPartnerShow"
import { ContextModule } from "@artsy/cohesion"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { NotificationWrapper } from "Components/Notifications/Notification"

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
  const profile = partner?.profile

  if (!profile || !shows.length) {
    return <NotificationErrorMessage />
  }

  return (
    <NotificationWrapper>
      <Text variant="lg-display">{headline}</Text>

      <Spacer y={1} />

      <NotificationTypeLabel notification={notificationData} />

      <Spacer y={1} />

      <Flex flexDirection="row" gap={1} alignItems="center">
        <FollowProfileButtonQueryRenderer
          id={profile.internalID}
          contextModule={ContextModule.activity}
          size="small"
        />

        <RouterLink
          to={partner.href}
          textDecoration="none"
          data-testid="partner-link"
        >
          <Text variant="xs">{partner.name}</Text>
        </RouterLink>
      </Flex>

      <Spacer y={4} />

      <Flex flexDirection="column" alignItems="center">
        {shows.map(show => (
          <NotificationPartnerShow show={show} key={show.internalID} />
        ))}
      </Flex>
    </NotificationWrapper>
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
          profile {
            internalID
          }
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
