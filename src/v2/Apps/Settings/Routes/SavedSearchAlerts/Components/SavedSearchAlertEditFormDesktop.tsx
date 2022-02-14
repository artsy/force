import { Box, Clickable, CloseIcon, Flex, Spacer, Text } from "@artsy/palette"
import { EditAlertEntity } from "../types"
import { SavedSearchAlertEditFormQueryRenderer } from "./SavedSearchAlertEditForm"

interface SavedSearchAlertEditFormDesktopProps {
  editAlertEntity: EditAlertEntity
  onCloseClick: () => void
  onDeleteClick: () => void
  onCompleted: () => void
}

export const SavedSearchAlertEditFormDesktop: React.FC<SavedSearchAlertEditFormDesktopProps> = ({
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
