import { Flex, Pill, Spacer, Text } from "@artsy/palette"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { PriceDropsList } from "Components/Notifications/PriceDropsList"
import { RouterLink } from "System/Components/RouterLink"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"
import type { ArtworkPriceDroppedNotification_notification$key } from "__generated__/ArtworkPriceDroppedNotification_notification.graphql"

interface ArtworkPriceDroppedNotificationProps {
  notification: ArtworkPriceDroppedNotification_notification$key
}

export const ArtworkPriceDroppedNotification: FC<
  React.PropsWithChildren<ArtworkPriceDroppedNotificationProps>
> = ({ notification }) => {
  const notificationData = useFragment(
    ArtworkPriceDroppedNotificationFragment,
    notification,
  )

  const { headline, item } = notificationData

  const alert = item?.alert
  const artist = item?.alert?.artists?.[0]
  const priceDropsConnection = item?.priceDropsConnection

  // TODO: return null if no valid price drops
  // or should it be one level above?

  if (!alert || !artist) {
    return <NotificationErrorMessage />
  }

  return (
    <>
      <Flex width="100%" justifyContent="space-between">
        <Flex flex={1} mr={1}>
          <Text variant="lg-display">{headline}</Text>
        </Flex>
        <RouterLink to={`/favorites/alerts/${alert.internalID}/edit`}>
          <Text variant="xs" mt={0.5}>
            Edit Alert
          </Text>
        </RouterLink>
      </Flex>

      <Spacer y={1} />

      <NotificationTypeLabel notification={notificationData} />

      <Spacer y={1} />

      <Flex flexDirection="row" flexWrap="wrap">
        {alert.labels.map(label => (
          <Pill
            variant="filter"
            mr={1}
            mb={1}
            key={`filter-label-${label?.displayValue}`}
            disabled
            borderColor="mono30"
          >
            {label?.displayValue}
          </Pill>
        ))}
      </Flex>

      <Spacer y={4} />

      <PriceDropsList priceDropsConnection={priceDropsConnection} />

      <Spacer y={4} />

      <RouterLink to={`/artist/${artist?.slug}/works-for-sale`}>
        <Text fontWeight="bold">View all works by {artist.name}</Text>
      </RouterLink>
    </>
  )
}

export const ArtworkPriceDroppedNotificationFragment = graphql`
  fragment ArtworkPriceDroppedNotification_notification on Notification {
    headline
    item {
      ... on ArtworkPriceDroppedNotificationItem {
        alert {
          internalID
          artists {
            name
            slug
          }
          labels {
            displayValue
          }
        }

        priceDropsConnection(first: 100) {
          ...PriceDropsList_priceDropsConnection
        }
      }
    }
    notificationType
    ...NotificationTypeLabel_notification
  }
`
