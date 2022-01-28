import { Box, Flex, Clickable, ArrowLeftIcon, Text } from "@artsy/palette"
import { SavedSearchAlertEditFormQueryRenderer } from "./SavedSearchAlertEditForm"
import { EditFormProps } from "../types"

export const SavedSearchAlertEditMobile: React.FC<EditFormProps> = ({
  editAlertEntity,
  onCloseClick,
  onDeleteClick,
  onCompleted,
}) => {
  return (
    <Box flex={1} p={2}>
      <Flex alignItems="center" mb={4}>
        <Clickable onClick={onCloseClick} mr={2}>
          <ArrowLeftIcon display="flex" aria-label="Back" title="Back" />
        </Clickable>
        <Text variant="lg">Edit {editAlertEntity.name}</Text>
      </Flex>

      <SavedSearchAlertEditFormQueryRenderer
        editAlertEntity={editAlertEntity}
        onDeleteClick={onDeleteClick}
        onCompleted={onCompleted}
      />
    </Box>
  )
}
