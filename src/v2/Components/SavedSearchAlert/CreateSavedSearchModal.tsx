import React from "react"
import { Modal, Text } from "@artsy/palette"
import { SavedSearchAlertForm } from "./SavedSearchAlertForm"
import { Aggregations } from "../ArtworkFilter/ArtworkFilterContext"
import { SavedSearchAlertMutationResult } from "./SavedSearchAlertModel"

interface CreateSavedSearchModalProps {
  artistId: string
  artistName: string
  onClose: () => void
  onComplete: (response: SavedSearchAlertMutationResult) => void
  filters: any // TODO: set filters type
  aggregations: Aggregations
  visible?: boolean
}

export const CreateSavedSearchModal: React.FC<CreateSavedSearchModalProps> = ({
  artistId,
  artistName,
  filters,
  aggregations,
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
        filters={filters}
        aggregations={aggregations}
        initialValues={{ name: "", email: true }}
        onComplete={handleComplete}
      />
    </Modal>
  )
}
