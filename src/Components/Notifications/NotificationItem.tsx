import { Flex, Image, Join, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { NotificationItem_item } from "__generated__/NotificationItem_item.graphql"
import { RouterLink } from "System/Router/RouterLink"
import { getDateLabel } from "./util"

interface NotificationItemProps {
  item: NotificationItem_item
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  const artworks = extractNodes(item.artworksConnection)

  return (
    <RouterLink
      display="block"
      to={item.targetHref}
      p={2}
      mx={-2}
      textDecoration="none"
    >
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
                alt={`Artwork image of ${artwork.title}`}
                width={58}
                height={58}
                lazyLoad
              />
            )
          })}
        </Join>
      </Flex>
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
