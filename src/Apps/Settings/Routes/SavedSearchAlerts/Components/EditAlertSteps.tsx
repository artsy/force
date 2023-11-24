import { EditAlertFormBase } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import { Clickable, Text, Flex, Spacer, Box } from "@artsy/palette"
import CloseIcon from "@artsy/icons/CloseIcon"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { NewSavedSearchAlertEditFormQueryRenderer } from "Apps/Settings/Routes/SavedSearchAlerts/Components/NewSavedSearchAlertEditForm"
import { Filters } from "Components/Alert/Components/Steps/Filters"

export const EditAlertSteps: React.FC<EditAlertFormBase> = ({
  editAlertEntity,
  onDeleteClick,
  onCompleted,
  onCloseClick,
}) => {
  const { goToEditDetails, current } = useAlertContext()

  console.log("[LOGD] current = ", current)
  switch (current) {
    case "EDIT_ALERT_DETAILS":
      return (
        <>
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
            <NewSavedSearchAlertEditFormQueryRenderer
              editAlertEntity={editAlertEntity}
              onDeleteClick={onDeleteClick}
              onCompleted={onCompleted}
            />
          </Box>
        </>
      )
    case "EDIT_ALERT_FILTERS":
      return (
        <>
          <Box flex={1} p={2}>
            <Filters />
          </Box>
        </>
      )
  }
}
