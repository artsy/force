import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { EditAlertFormBase } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import { SavedSearchAlertEditFormQueryRenderer } from "./SavedSearchAlertEditForm"
import CloseIcon from "@artsy/icons/CloseIcon"
import { useFeatureFlag } from "System/useFeatureFlag"
import { NewSavedSearchAlertEditFormQueryRenderer } from "Apps/Settings/Routes/SavedSearchAlerts/Components/NewSavedSearchAlertEditForm"

export const SavedSearchAlertEditFormDesktop: React.FC<EditAlertFormBase> = ({
  editAlertEntity,
  onCloseClick,
  onDeleteClick,
  onCompleted,
}) => {
  const newAlertModalEnabled = useFeatureFlag("onyx_artwork_alert_modal_v2")

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

      {newAlertModalEnabled ? (
        <NewSavedSearchAlertEditFormQueryRenderer
          editAlertEntity={editAlertEntity}
          onDeleteClick={onDeleteClick}
          onCompleted={onCompleted}
        />
      ) : (
        <SavedSearchAlertEditFormQueryRenderer
          editAlertEntity={editAlertEntity}
          onDeleteClick={onDeleteClick}
          onCompleted={onCompleted}
        />
      )}
    </Box>
  )
}
