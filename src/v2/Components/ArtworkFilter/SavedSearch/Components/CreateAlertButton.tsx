import React, { useState } from "react"
import { BellIcon, Button, ButtonProps } from "@artsy/palette"
import { SavedSearchAttributes } from "../types"
import { useSystemContext, useTracking } from "v2/System"
import {
  ActionType,
  ContextModule,
  Intent,
  PageOwnerType,
} from "@artsy/cohesion"
import { SavedSearchAlertModal } from "v2/Components/SavedSearchAlert/SavedSearchAlertModal"
import { SavedSearchAlertMutationResult } from "v2/Components/SavedSearchAlert/SavedSearchAlertModel"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { ModalType } from "v2/Components/Authentication/Types"

interface CreateAlertButtonProps extends ButtonProps {
  savedSearchAttributes: SavedSearchAttributes
}

export const CreateAlertButton: React.FC<CreateAlertButtonProps> = ({
  savedSearchAttributes,
  ...props
}) => {
  const tracking = useTracking()
  const { isLoggedIn, mediator } = useSystemContext()
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

  const handleClick = () => {
    if (isLoggedIn) {
      handleOpenForm()
    } else {
      openAuthModal(mediator!, {
        mode: ModalType.login,
        contextModule: ContextModule.worksForSaleRail,
        intent: Intent.login,
      })
    }
  }

  const handleComplete = (result: SavedSearchAlertMutationResult) => {
    setVisibleForm(false)
    const trackInfo = {
      action_type: ActionType.toggledSavedSearch,
      context_page_owner_type: savedSearchAttributes.type as PageOwnerType,
      context_page_owner_id: savedSearchAttributes.id,
      context_page_owner_slug: savedSearchAttributes.slug,
      saved_search_id: result.id,
    }
    tracking.trackEvent(trackInfo)
  }

  return (
    <>
      <Button
        onClick={handleClick}
        variant="secondaryOutline"
        size="small"
        {...props}
      >
        <BellIcon mr={0.5} color="currentColor" />
        Create an Alert
      </Button>
      <SavedSearchAlertModal
        visible={visibleForm}
        initialValues={{ name: "", email: true, push: false }}
        savedSearchAttributes={savedSearchAttributes}
        onClose={() => setVisibleForm(false)}
        onComplete={handleComplete}
      />
    </>
  )
}
