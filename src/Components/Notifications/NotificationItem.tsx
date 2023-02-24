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
import {
  isArtworksBasedNotification,
  shouldDisplayNotificationTypeLabel,
} from "./util"
import { NotificationTypeLabel } from "./NotificationTypeLabel"

const logger = createLogger("NotificationItem")

interface NotificationItemProps {
  item: NotificationItem_item$data
}

const UNREAD_INDICATOR_SIZE = 8

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  const { trackEvent } = useTracking()
  const { relayEnvironment } = useSystemContext()
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

  return (
    <NotificationItemLink to={item.targetHref} onClick={handlePress}>
      <Flex flex={1} flexDirection="column">
        <Text variant="xs" color="black60">
          {shouldDisplayNotificationTypeLabel(item.notificationType) && (
            <NotificationTypeLabel notificationType={item.notificationType} />
          )}
          {item.publishedAt}
        </Text>

        <Text variant="sm-display" fontWeight="bold">
          {item.title}
        </Text>

        <Text variant="sm-display">{item.message}</Text>

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
        title
        message
        publishedAt(format: "RELATIVE")
        targetHref
        isUnread
        notificationType
        objectsCount
        artworksConnection(first: 4) {
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
