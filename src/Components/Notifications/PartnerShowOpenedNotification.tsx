import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { NotificationPartnerShow } from "Components/Notifications/NotificationPartnerShow"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { ContextModule } from "@artsy/cohesion"
import { Flex, Spacer, Text } from "@artsy/palette"
import type { PartnerShowOpenedNotification_notification$key } from "__generated__/PartnerShowOpenedNotification_notification.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface PartnerShowOpenedNotificationProps {
  notification: PartnerShowOpenedNotification_notification$key
}

export const PartnerShowOpenedNotification: FC<
  React.PropsWithChildren<PartnerShowOpenedNotificationProps>
> = ({ notification }) => {
  const notificationData = useFragment(
    PartnerShowOpenedNotificationFragment,
    notification,
  )

  const { headline, item } = notificationData

  const partner = item?.partner
  const shows = extractNodes(item?.showsConnection)
  const profile = partner?.profile

  if (!profile || !shows.length) {
    return <NotificationErrorMessage />
  }

  return (
    <>
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
    </>
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
