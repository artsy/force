import { Box, Clickable, CloseIcon, Flex, Spacer, Text } from "@artsy/palette"
import { EditAlertFormBase } from "../types"
import { SavedSearchAlertEditFormQueryRenderer } from "./SavedSearchAlertEditForm"

export const SavedSearchAlertEditFormDesktop: React.FC<EditAlertFormBase> = ({
  editAlertEntity,
  onCloseClick,
  onDeleteClick,
  onCompleted,
}) => {
  return (
    <Box flex={1} p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="lg" flex={1} mr={1}>
          Edit {editAlertEntity.name}
        </Text>
        <Clickable onClick={onCloseClick}>
          <CloseIcon display="flex" />
        </Clickable>
      </Flex>

      <Spacer mt={6} />

      <SavedSearchAlertEditFormQueryRenderer
        editAlertEntity={editAlertEntity}
        onDeleteClick={onDeleteClick}
        onCompleted={onCompleted}
      />
    </Box>
  )
}
