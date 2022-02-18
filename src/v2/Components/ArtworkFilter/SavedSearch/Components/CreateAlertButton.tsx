import React, { useEffect, useState } from "react"
import { BellIcon, Button, ButtonProps, useToasts } from "@artsy/palette"
import { SavedSearchEntity } from "../types"
import { useSystemContext, useTracking } from "v2/System"
import {
  ActionType,
  Intent,
  ContextModule,
  PageOwnerType,
} from "@artsy/cohesion"
import { SavedSearchAlertModalContainer } from "v2/Components/SavedSearchAlert/SavedSearchAlertModal"
import { SavedSearchAlertMutationResult } from "v2/Components/SavedSearchAlert/SavedSearchAlertModel"
import { openAuthToSatisfyIntent } from "v2/Utils/openAuthModal"
import { mediator } from "lib/mediator"

interface CreateAlertButtonProps extends ButtonProps {
  entity: SavedSearchEntity
}

export const CreateAlertButton: React.FC<CreateAlertButtonProps> = ({
  entity,
  ...props
}) => {
  const tracking = useTracking()
  const { isLoggedIn } = useSystemContext()
  const [visibleForm, setVisibleForm] = useState(false)
  const { sendToast } = useToasts()

  const openModal = () => {
    setVisibleForm(true)
  }

  useEffect(() => {
    mediator.on("auth:login:success", openModal)

    return () => {
      mediator.off("auth:login:success")
    }
  }, [])

  const handleOpenForm = () => {
    openModal()
  }

  const handleClick = () => {
    tracking.trackEvent({
      action: ActionType.clickedCreateAlert,
      context_page_owner_type: entity.type as PageOwnerType,
      context_page_owner_id: entity.id,
      context_page_owner_slug: entity.slug,
    })

    if (isLoggedIn) {
      handleOpenForm()
    } else {
      openAuthToSatisfyIntent(mediator, {
        entity: {
          name: entity.name,
          slug: entity.slug,
        },
        contextModule: ContextModule.artworkGrid,
        intent: Intent.createAlert,
        redirectTo: location.href,
      })
    }
  }

  const handleComplete = (result: SavedSearchAlertMutationResult) => {
    setVisibleForm(false)
    const trackInfo = {
      action_type: ActionType.toggledSavedSearch,
      context_page_owner_type: entity.type as PageOwnerType,
      context_page_owner_id: entity.id,
      context_page_owner_slug: entity.slug,
      saved_search_id: result.id,
    }
    tracking.trackEvent(trackInfo)

    sendToast({
      message: "Your Alert has been saved.",
    })
  }

  return (
    <>
      <Button
        onClick={handleClick}
        variant="secondaryOutline"
        size="small"
        {...props}
      >
        <BellIcon mr={0.5} fill="currentColor" />
        Create Alert
      </Button>
      <SavedSearchAlertModalContainer
        visible={visibleForm}
        initialValues={{ name: "", email: true, push: false }}
        entity={entity}
        onClose={() => setVisibleForm(false)}
        onComplete={handleComplete}
      />
    </>
  )
}
