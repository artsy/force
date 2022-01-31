import { Box, Clickable, CloseIcon, Flex, Spacer, Text } from "@artsy/palette"
import { EditAlertEntity } from "../types"
import { SavedSearchAlertEditFormQueryRenderer } from "./SavedSearchAlertEditForm"
import { Media } from "v2/Utils/Responsive"

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
    <Flex height="100%">
      <Media greaterThanOrEqual="md">
        <Box width="1px" height="100%" backgroundColor="black15" />
      </Media>

      <Box flex={1} p={[2, 4]}>
        <Flex justifyContent="space-between">
          <Text variant="lg" flex={1} mr={1}>
            Edit {editAlertEntity.name}
          </Text>
          <Clickable onClick={onCloseClick} mt={0.5}>
            <CloseIcon />
          </Clickable>
        </Flex>

        <Spacer mt={[4, 6]} />

        <SavedSearchAlertEditFormQueryRenderer
          editAlertEntity={editAlertEntity}
          onDeleteClick={onDeleteClick}
          onCompleted={onCompleted}
        />
      </Box>
    </Flex>
  )
}
