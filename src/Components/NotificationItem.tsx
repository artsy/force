import { Box, Flex, Image, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { NotificationItem_item } from "__generated__/NotificationItem_item.graphql"
import { DateTime } from "luxon"

interface NotificationItemProps {
  item: NotificationItem_item
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  const artworks = extractNodes(item.artworksConnection)

  return (
    <Box p={2}>
      <Flex flexDirection="row">
        <Text variant="sm">
          <strong>{item.title}</strong> {item.message}
        </Text>
      </Flex>

      <Text variant="xs" color="black60">
        {getDateLabel(item.createdAt!)}
      </Text>

      <Spacer mb={1} />

      <Flex flexDirection="row">
        <Join separator={<Spacer ml={1} />}>
          {artworks.map(artwork => {
            const image = artwork.image?.thumb

            return (
              <Image
                key={artwork.internalID}
                src={image?.src}
                srcSet={image?.srcSet}
                width={58}
                height={58}
                lazyLoad
              />
            )
          })}
        </Join>
      </Flex>
    </Box>
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
        artworksConnection(first: 4) {
          totalCount
          edges {
            node {
              internalID
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

const getDateLabel = (date: string) => {
  const past = DateTime.fromISO(date)
  const now = DateTime.utc()
  const diff = now.diff(past, "days")
  const days = Math.floor(diff.days)

  if (days === 0) {
    return "Today"
  }

  return `${days} days ago`
}
