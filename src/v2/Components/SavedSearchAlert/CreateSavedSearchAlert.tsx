import React from "react"
import { Modal, Text } from "@artsy/palette"
import { SavedSearchAlertForm } from "./SavedSearchAlertForm"
import { SavedSearchAlertMutationResult } from "./SavedSearchAlertModel"
import { SavedSearchAttributes } from "../ArtworkFilter/SavedSearch/types"
import { useTracking } from "v2/System"
import { ActionType, PageOwnerType } from "@artsy/cohesion"

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
  const tracking = useTracking()

  const trackAlertSave = (savedSearchId: string) => {
    const trackInfo = {
      action_type: ActionType.toggledSavedSearch,
      context_page_owner_type: savedSearchAttributes.type as PageOwnerType,
      context_page_owner_id: savedSearchAttributes.id,
      context_page_owner_slug: savedSearchAttributes.slug,
      saved_search_id: savedSearchId,
    }

    tracking.trackEvent(trackInfo)
  }

  const handleComplete = async (result: SavedSearchAlertMutationResult) => {
    onComplete(result)
    trackAlertSave(result.id)
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
