import { Box, Text, Flex, Clickable, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SavedSearchAlertListItem_item } from "v2/__generated__/SavedSearchAlertListItem_item.graphql"
import { EditAlertEntity } from "../types"

export type SavedSearchAlertListItemVariant = "active" | "inactive"

interface SavedSearchAlertListItemProps {
  item: SavedSearchAlertListItem_item
  variant?: SavedSearchAlertListItemVariant
  onEditAlertClick: (entity: EditAlertEntity) => void
}

export const SavedSearchAlertListItem: React.FC<SavedSearchAlertListItemProps> = ({
  item,
  variant,
  onEditAlertClick,
}) => {
  return (
    <Box
      key={item.internalID}
      p={4}
      opacity={variant === "inactive" ? 0.24 : 1}
      bg={variant === "active" ? "black5" : "transparent"}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          variant="lg"
          color={variant === "active" ? "blue100" : "black100"}
        >
          {item.userAlertSettings.name}
        </Text>
        <Flex flexDirection="row" alignItems="center">
          <Clickable
            textDecoration="underline"
            onClick={() => {
              onEditAlertClick({
                id: item.internalID,
                name: item.userAlertSettings.name!,
                artistId: item.artistID!,
              })
            }}
          >
            <Text variant="sm">Edit</Text>
          </Clickable>
          <Spacer ml={2} />
          <Clickable textDecoration="underline">
            <Text variant="sm">View All</Text>
          </Clickable>
        </Flex>
      </Flex>
    </Box>
  )
}

export const SavedSearchAlertListItemFragmentContainer = createFragmentContainer(
  SavedSearchAlertListItem,
  {
    item: graphql`
      fragment SavedSearchAlertListItem_item on SearchCriteria {
        internalID
        artistID
        userAlertSettings {
          name
        }
      }
    `,
  }
)
