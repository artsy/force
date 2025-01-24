import { Flex, Spacer, Text } from "@artsy/palette"
import { NotificationArtworkList } from "Components/Notifications/NotificationArtworkList"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { RouterLink } from "System/Components/RouterLink"
import type { MarketingCollectionHitNotification_notification$key } from "__generated__/MarketingCollectionHitNotification_notification.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface MarketingCollectionHitNotificationProps {
  notification: MarketingCollectionHitNotification_notification$key
}

export const MarketingCollectionHitNotification: FC<
  React.PropsWithChildren<MarketingCollectionHitNotificationProps>
> = ({ notification }) => {
  const notificationData = useFragment(
    MarketingCollectionHitNotificationFragment,
    notification,
  )

  const { artworksConnection, headline, item } = notificationData

  const marketingCollection = item?.marketingCollection

  if (!marketingCollection) {
    return <NotificationErrorMessage />
  }

  return (
    <>
      <Flex width="100%" justifyContent="space-between">
        <Flex flex={1} mr={1}>
          <Text variant="lg-display">{headline}</Text>
        </Flex>
      </Flex>

      <Spacer y={1} />

      <NotificationTypeLabel notification={notificationData} />

      <Spacer y={4} />

      <NotificationArtworkList artworksConnection={artworksConnection} />

      <Spacer y={4} />

      <RouterLink to={`/collection/${marketingCollection?.slug}`}>
        <Text fontWeight="bold">
          View all works in "{marketingCollection.title}"
        </Text>
      </RouterLink>
    </>
  )
}

export const MarketingCollectionHitNotificationFragment = graphql`
  fragment MarketingCollectionHitNotification_notification on Notification {
    artworksConnection(first: 10) {
      ...NotificationArtworkList_artworksConnection
      totalCount
    }
    headline
    item {
      ... on MarketingCollectionHitNotificationItem {
        marketingCollection {
          title
          slug
        }
      }
    }
    notificationType
    ...NotificationTypeLabel_notification
  }
`
