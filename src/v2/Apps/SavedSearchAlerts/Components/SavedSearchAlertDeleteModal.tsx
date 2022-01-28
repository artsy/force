import { Text, Flex, ModalDialog, Button } from "@artsy/palette"
import { useState } from "react"
import createLogger from "v2/Utils/logger"
import { useDeleteSavedSearchAlert } from "../useDeleteSavedSearchAlert"

const logger = createLogger(
  "v2/Apps/SavedSearchAlerts/Routes/Overview/Components/SavedSearchAlertDeleteModal"
)

interface SavedSearchAlertDeleteModalProps {
  id: string
  onCloseClick: () => void
  onDeleted: () => void
}

export const SavedSearchAlertDeleteModal: React.FC<SavedSearchAlertDeleteModalProps> = ({
  id,
  onCloseClick,
  onDeleted,
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { submitMutation: submitDeleteAlert } = useDeleteSavedSearchAlert()

  const deleteAlertById = async () => {
    try {
      setIsDeleting(true)
      await submitDeleteAlert({
        input: {
          searchCriteriaID: id,
        },
      })
    } catch (error) {
      logger.error(error)
    } finally {
      setIsDeleting(false)
      onDeleted()
    }
  }

  return (
    <ModalDialog
      title="Delete Alert"
      onClose={onCloseClick}
      footer={
        <Flex justifyContent="flex-end">
          <Button
            variant="noOutline"
            size="small"
            onClick={onCloseClick}
            mr={1}
          >
            Cancel
          </Button>
          <Button loading={isDeleting} size="small" onClick={deleteAlertById}>
            Delete
          </Button>
        </Flex>
      }
    >
      <Text variant="sm">
        Once you delete this alert, you will have to recreate it to continue
        receiving alerts on your favorite artworks.
      </Text>
    </ModalDialog>
  )
}
