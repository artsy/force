import React from "react"
import { Modal, Text } from "@artsy/palette"
import { SavedSearchAlertForm } from "./SavedSearchAlertForm"
import { SavedSearchAlertMutationResult } from "./SavedSearchAlertModel"

interface CreateSavedSearchAlertProps {
  artistId: string
  artistName: string
  onClose: () => void
  onComplete: (response: SavedSearchAlertMutationResult) => void
  visible?: boolean
}

export const CreateSavedSearchAlert: React.FC<CreateSavedSearchAlertProps> = ({
  artistId,
  artistName,
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
        artistId={artistId}
        artistName={artistName}
        initialValues={{ name: "", email: true }}
        onComplete={handleComplete}
      />
    </Modal>
  )
}
