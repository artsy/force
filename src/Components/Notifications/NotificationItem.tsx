import { Flex, Image, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { NotificationItem_item } from "__generated__/NotificationItem_item.graphql"
import { RouterLink } from "System/Router/RouterLink"
import { getDateLabel } from "./util"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

interface NotificationItemProps {
  item: NotificationItem_item
}

const UNREAD_INDICATOR_SIZE = 8

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  const artworks = extractNodes(item.artworksConnection)
  const remainingArtworksCount = (item.artworksConnection?.totalCount ?? 0) - 4

  const getNotificationType = () => {
    if (item.notificationType === "ARTWORK_ALERT") {
      return "Alert"
    }

    return null
  }
  const notificationTypeLabel = getNotificationType()

  return (
    <RouterLink
      display="flex"
      alignItems="center"
      to={item.targetHref}
      p={2}
      mx={-2}
      textDecoration="none"
    >
      <Flex flex={1} flexDirection="column">
        <Text variant="xs" color="black60">
          {notificationTypeLabel && (
            <NotificationTypeLabel
              aria-label={`Notification type: ${notificationTypeLabel}`}
            >
              {notificationTypeLabel} •{" "}
            </NotificationTypeLabel>
          )}
          {getDateLabel(item.createdAt!)}
        </Text>

        <Text variant="sm-display" fontWeight="bold">
          {item.title}
        </Text>

        <Text variant="sm-display">{item.message}</Text>

        <Spacer mb={1} />

        <Flex flexDirection="row" alignItems="center">
          <Join separator={<Spacer ml={1} />}>
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

          {remainingArtworksCount > 0 && (
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
    </RouterLink>
  )
}

export const NotificationItemFragmentContainer = createFragmentContainer(
  NotificationItem,
  {
    item: graphql`
      fragment NotificationItem_item on Notification {
        title
        message
        createdAt
        targetHref
        isUnread
        notificationType
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
      }
    `,
  }
)

const NotificationTypeLabel = styled.span`
  color: ${themeGet("colors.blue100")};
`
