import { Box, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationItem_item } from "__generated__/NotificationItem_item.graphql"

interface NotificationItemProps {
  item: NotificationItem_item
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  return (
    <Box p={2}>
      <Flex flexDirection="row">
        <Text variant="sm">
          <strong>{item.title}</strong> {item.message}
        </Text>
      </Flex>
      <Text variant="xs" color="black60">
        1 day ago
      </Text>
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
              title
            }
          }
        }
      }
    `,
  }
)
