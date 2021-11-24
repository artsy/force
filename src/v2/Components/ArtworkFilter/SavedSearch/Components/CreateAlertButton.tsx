import React, { useState } from "react"
import { BellIcon, Button } from "@artsy/palette"
import { CreateSavedSearchAlert } from "v2/Components/SavedSearchAlert/CreateSavedSearchAlert"
import { SavedSearchAttributes } from "../types"
import { useTracking } from "v2/System"
import { ActionType, PageOwnerType } from "@artsy/cohesion"

interface CreateAlertButtonProps {
  savedSearchAttributes: SavedSearchAttributes
}

export const CreateAlertButton: React.FC<CreateAlertButtonProps> = ({
  savedSearchAttributes,
}) => {
  const tracking = useTracking()
  const [visibleForm, setVisibleForm] = useState(false)

  const handleOpenForm = () => {
    setVisibleForm(true)

    tracking.trackEvent({
      action: ActionType.clickedCreateAlert,
      context_page_owner_type: savedSearchAttributes.type as PageOwnerType,
      context_page_owner_id: savedSearchAttributes.id,
      context_page_owner_slug: savedSearchAttributes.slug,
    })
  }
  const handleCloseForm = () => setVisibleForm(false)

  return (
    <>
      <Button onClick={handleOpenForm} variant="secondaryOutline" size="small">
        <BellIcon mr={0.5} color="currentColor" />
        Create an Alert
      </Button>
      <CreateSavedSearchAlert
        savedSearchAttributes={savedSearchAttributes}
        onClose={handleCloseForm}
        onComplete={handleCloseForm}
        visible={visibleForm}
      />
    </>
  )
}
