import React from "react"
import { Modal, Text } from "@artsy/palette"
import { SavedSearchAlertForm } from "./SavedSearchAlertForm"
import { SavedSearchAlertMutationResult } from "./SavedSearchAlertModel"
import { SavedSearchAttributes } from "../ArtworkFilter/SavedSearch/types"

interface CreateSavedSearchAlertProps {
  savedSearchAttributes: SavedSearchAttributes
  onClose: () => void
  onComplete: (response: SavedSearchAlertMutationResult) => void
  visible?: boolean
}

export const CreateSavedSearchAlert: React.FC<CreateSavedSearchAlertProps> = ({
  savedSearchAttributes,
  onClose,
  onComplete,
  visible,
}) => {
  const handleComplete = async (result: SavedSearchAlertMutationResult) => {
    onComplete(result)
  }

  return (
    <Modal show={visible} onClose={onClose}>
      <Text variant="lg" my={2}>
        Create an Alert
      </Text>
      <SavedSearchAlertForm
        savedSearchAttributes={savedSearchAttributes}
        initialValues={{ name: "", email: true }}
        onComplete={handleComplete}
      />
    </Modal>
  )
}
