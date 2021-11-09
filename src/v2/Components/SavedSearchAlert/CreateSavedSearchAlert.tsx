import React from "react"
import { Modal, Text } from "@artsy/palette"
import { SavedSearchAlertForm } from "./SavedSearchAlertForm"
import {
  Aggregations,
  ArtworkFilters,
} from "../ArtworkFilter/ArtworkFilterContext"
import { SavedSearchAlertMutationResult } from "./SavedSearchAlertModel"

interface CreateSavedSearchAlertProps {
  artistId: string
  artistName: string
  onClose: () => void
  onComplete: (response: SavedSearchAlertMutationResult) => void
  filters: ArtworkFilters
  aggregations: Aggregations
  visible?: boolean
}

export const CreateSavedSearchAlert: React.FC<CreateSavedSearchAlertProps> = ({
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
