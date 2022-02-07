import { Box, Clickable, CloseIcon, Flex, Spacer, Text } from "@artsy/palette"
import { EditAlertEntity } from "../types"
import { SavedSearchAlertEditFormQueryRenderer } from "./SavedSearchAlertEditForm"

interface SavedSearchAlertEditFormContainerProps {
  editAlertEntity: EditAlertEntity
  onCloseClick: () => void
  onDeleteClick: () => void
  onCompleted: () => void
}

export const SavedSearchAlertEditFormContainer: React.FC<SavedSearchAlertEditFormContainerProps> = ({
  editAlertEntity,
  onCloseClick,
  onDeleteClick,
  onCompleted,
}) => {
  return (
    <Box flex={1} p={[2, 4]}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="lg" flex={1} mr={1}>
          Edit {editAlertEntity.name}
        </Text>
        <Clickable onClick={onCloseClick}>
          <CloseIcon display="flex" />
        </Clickable>
      </Flex>

      <Spacer mt={[4, 6]} />

      <SavedSearchAlertEditFormQueryRenderer
        editAlertEntity={editAlertEntity}
        onDeleteClick={onDeleteClick}
        onCompleted={onCompleted}
      />
    </Box>
  )
}
