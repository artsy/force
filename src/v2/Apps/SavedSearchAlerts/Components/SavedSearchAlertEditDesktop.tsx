import { Box, Text, Flex, CloseIcon, Clickable } from "@artsy/palette"
import { EditFormProps } from "../types"
import { SavedSearchAlertEditFormQueryRenderer } from "./SavedSearchAlertEditForm"

export const SavedSearchAlertEditDesktop: React.FC<EditFormProps> = ({
  editAlertEntity,
  onCloseClick,
  onDeleteClick,
  onCompleted,
}) => {
  return (
    <Flex height="100%">
      <Box width="1px" height="100%" backgroundColor="black15" />
      <Box p={4} flex={1}>
        <Flex justifyContent="space-between" mb={6}>
          <Text variant="lg" flex={1} mr={1}>
            Edit {editAlertEntity.name}
          </Text>
          <Clickable onClick={onCloseClick} mt={0.5}>
            <CloseIcon />
          </Clickable>
        </Flex>

        <SavedSearchAlertEditFormQueryRenderer
          editAlertEntity={editAlertEntity}
          onDeleteClick={onDeleteClick}
          onCompleted={onCompleted}
        />
      </Box>
    </Flex>
  )
}
