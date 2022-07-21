import { Text, Flex, ModalDialog, Button } from "@artsy/palette"
import { useState } from "react"
import createLogger from "Utils/logger"
import { useDeleteSavedSearchAlert } from "../useDeleteSavedSearchAlert"
import { Media } from "Utils/Responsive"

const logger = createLogger(
  "Apps/SavedSearchAlerts/Components/SavedSearchAlertDeleteModal"
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
        variables: {
          input: {
            searchCriteriaID: id,
          },
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
        <>
          <Media greaterThanOrEqual="md">
            <Flex>
              <Button
                flex={1}
                variant="secondaryBlack"
                size="large"
                onClick={onCloseClick}
                mr={1}
              >
                Keep Alert
              </Button>
              <Button
                flex={1}
                loading={isDeleting}
                size="large"
                onClick={deleteAlertById}
              >
                Delete
              </Button>
            </Flex>
          </Media>
          <Media lessThan="md">
            <Button
              loading={isDeleting}
              size="large"
              onClick={deleteAlertById}
              width="100%"
              mb={1}
            >
              Delete
            </Button>
            <Button
              variant="secondaryBlack"
              size="large"
              width="100%"
              onClick={onCloseClick}
            >
              Cancel
            </Button>
          </Media>
        </>
      }
    >
      <Text variant="sm">
        You will no longer receive notifications for artworks matching the
        criteria in this alert.
      </Text>
    </ModalDialog>
  )
}
