import { Box, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

interface NotificationItemProps {
  item: any
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  return (
    <Box>
      <Flex flexDirection="row">
        <Text variant="sm" fontWeight="bold">
          Lee Ufan{" "}
        </Text>
        <Text variant="sm">8 new works added</Text>
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
      fragment NotificationItem_item on FollowedArtistsArtworksGroup {
        href
        image {
          thumb: cropped(height: 58, width: 58) {
            url
          }
        }
      }
    `,
  }
)
