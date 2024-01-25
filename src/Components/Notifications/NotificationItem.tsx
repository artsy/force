import { Flex, Image, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { NotificationItem_item$data } from "__generated__/NotificationItem_item.graphql"
import { RouterLink } from "System/Router/RouterLink"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { ActionType } from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/useSystemContext"
import createLogger from "Utils/logger"
import { markNotificationAsRead } from "Components/Notifications/Mutations/markNotificationAsRead"
import { isArtworksBasedNotification } from "./util"
import { NotificationTypeLabel } from "./NotificationTypeLabel"
import { FC } from "react"
import {
  ExpiresInTimer,
  shouldDisplayExpiresInTimer,
} from "Components/Notifications/ExpiresInTimer"
import { useFeatureFlag } from "System/useFeatureFlag"
import { SUPPORTED_NOTIFICATION_TYPES } from "Components/Notifications/Notification"
import { useNotificationsContext } from "Components/Notifications/useNotificationsContext"

const logger = createLogger("NotificationItem")

interface NotificationItemProps {
  item: NotificationItem_item$data
}

const UNREAD_INDICATOR_SIZE = 8

const NotificationItem: FC<NotificationItemProps> = ({ item }) => {
  const enableNewActivityPanel = useFeatureFlag("onyx_new_notification_page")
  const { trackEvent } = useTracking()
  const { relayEnvironment } = useSystemContext()
  const {
    state: { currentNotificationId },
  } = useNotificationsContext()
  const artworks = extractNodes(item.artworksConnection)
  const remainingArtworksCount = item.objectsCount - 4
  const shouldDisplayCounts =
    isArtworksBasedNotification(item.notificationType) &&
    remainingArtworksCount > 0

  const markAsRead = async () => {
    if (!relayEnvironment) {
      return
    }

    try {
      const response = await markNotificationAsRead(
        relayEnvironment,
        item.id,
        item.internalID
      )
      const responseOrError = response.markNotificationAsRead?.responseOrError
      const errorMessage = responseOrError?.mutationError?.message

      if (errorMessage) {
        throw new Error(errorMessage)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  const handlePress = () => {
    markAsRead()

    trackEvent({
      action: ActionType.clickedActivityPanelNotificationItem,
      notification_type: item.notificationType,
    })
  }

  const itemUrl = enableNewActivityPanel
    ? getNotificationUrl(item)
    : item.targetHref

  const subTitle = getNotificationSubTitle(item)

  return (
    <NotificationItemLink
      to={itemUrl}
      onClick={handlePress}
      backgroundColor={
        currentNotificationId === item.internalID ? "black5" : "white100"
      }
    >
      {enableNewActivityPanel ? (
        <Flex flex={1} flexDirection="column">
          {!!artworks.length && (
            <Flex flexDirection="row" alignItems="center" mb={1}>
              <Flex flex={1}>
                <Join separator={<Spacer x={1} />}>
                  {artworks.map(artwork => {
                    const image = artwork.image?.thumb

                    return (
                      <Image
                        key={artwork.internalID}
                        src={image?.src}
                        srcSet={image?.srcSet}
                        alt={`Artwork image of ${artwork.title}`}
                        width={58}
                        height={58}
                        lazyLoad
                      />
                    )
                  })}
                </Join>
              </Flex>

              {shouldDisplayCounts && (
                <Text
                  variant="xs"
                  color="black60"
                  aria-label="Remaining artworks count"
                  ml={1}
                >
                  + {remainingArtworksCount}
                </Text>
              )}
            </Flex>
          )}

          {shouldDisplayExpiresInTimer(item) && <ExpiresInTimer item={item} />}

          <Text fontWeight="bold" variant="sm">
            {item.headline}
          </Text>
          {!!subTitle && <Text variant="xs">{subTitle}</Text>}

          <NotificationTypeLabel item={item} />
        </Flex>
      ) : (
        <Flex flex={1} flexDirection="column">
          <NotificationTypeLabel item={item} />

          <Text variant="sm-display" fontWeight="bold">
            {item.title}
          </Text>

          <Flex flexDirection="row" gap={0.5}>
            {item.notificationType !== "PARTNER_OFFER_CREATED" && (
              <Text variant="sm-display">{item.message}</Text>
            )}
            {shouldDisplayExpiresInTimer(item) && (
              <ExpiresInTimer item={item} />
            )}
          </Flex>

          <Spacer y={1} />

          <Flex flexDirection="row" alignItems="center">
            <Join separator={<Spacer x={1} />}>
              {artworks.map(artwork => {
                const image = artwork.image?.thumb

                return (
                  <Image
                    key={artwork.internalID}
                    src={image?.src}
                    srcSet={image?.srcSet}
                    alt={`Artwork image of ${artwork.title}`}
                    width={58}
                    height={58}
                    lazyLoad
                  />
                )
              })}
            </Join>

            {shouldDisplayCounts && (
              <Text
                variant="xs"
                color="black60"
                aria-label="Remaining artworks count"
                ml={1}
              >
                + {remainingArtworksCount}
              </Text>
            )}
          </Flex>
        </Flex>
      )}

      {item.isUnread && (
        <Flex
          width={UNREAD_INDICATOR_SIZE}
          height={UNREAD_INDICATOR_SIZE}
          borderRadius={UNREAD_INDICATOR_SIZE / 2}
          ml={1}
          bg="blue100"
          aria-label="Unread notification indicator"
        />
      )}
    </NotificationItemLink>
  )
}

export const NotificationItemFragmentContainer = createFragmentContainer(
  NotificationItem,
  {
    item: graphql`
      fragment NotificationItem_item on Notification {
        id
        internalID
        headline
        message
        publishedAt(format: "RELATIVE")
        targetHref
        isUnread
        notificationType
        objectsCount
        item {
          ... on PartnerOfferCreatedNotificationItem {
            available
            expiresAt
          }
        }
        artworksConnection(first: 4) {
          totalCount
          edges {
            node {
              internalID
              title
              image {
                thumb: cropped(width: 58, height: 58) {
                  src
                  srcSet
                }
              }
            }
          }
        }
        title
      }
    `,
  }
)

const NotificationItemLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: ${themeGet("colors.black5")};
  }
`

NotificationItemLink.defaultProps = {
  p: 2,
}

/**
 * Until we support all notification types in the new activity panel,
 * we only link to the notification detail page for the supported types.
 */
const getNotificationUrl = (notification: NotificationItem_item$data) => {
  if (SUPPORTED_NOTIFICATION_TYPES.includes(notification.notificationType)) {
    return `/notification/${notification.internalID}`
  }

  return notification.targetHref
}

const getNotificationSubTitle = (item: NotificationItem_item$data) => {
  switch (item.notificationType) {
    case "ARTICLE_FEATURED_ARTIST":
      return "An artist you follow is featured"
    default:
      return null
  }
}
