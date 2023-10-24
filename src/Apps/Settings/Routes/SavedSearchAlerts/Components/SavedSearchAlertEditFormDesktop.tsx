import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { EditAlertFormBase } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import { SavedSearchAlertEditFormQueryRenderer } from "./SavedSearchAlertEditForm"
import CloseIcon from "@artsy/icons/CloseIcon"

export const SavedSearchAlertEditFormDesktop: React.FC<EditAlertFormBase> = ({
  editAlertEntity,
  onCloseClick,
  onDeleteClick,
  onCompleted,
}) => {
  return (
    <Box flex={1} p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant={["md", "lg"]} flex={1} mr={1}>
          Edit Alert
        </Text>
        <Clickable onClick={onCloseClick}>
          <CloseIcon display="flex" />
        </Clickable>
      </Flex>

      <Spacer y={6} />

      <SavedSearchAlertEditFormQueryRenderer
        editAlertEntity={editAlertEntity}
        onDeleteClick={onDeleteClick}
        onCompleted={onCompleted}
      />
    </Box>
  )
}
