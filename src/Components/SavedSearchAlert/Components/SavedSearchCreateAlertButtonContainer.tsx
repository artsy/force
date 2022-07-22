import React, { useEffect, useState } from "react"
import { useToasts } from "@artsy/palette"
import { useSystemContext, useTracking } from "System"
import { ActionType } from "@artsy/cohesion"
import { AuthModalOptions, openAuthToSatisfyIntent } from "Utils/openAuthModal"
import { mediator } from "lib/mediator"
import { SavedSearchAlertModalContainer } from "../SavedSearchAlertModal"
import {
  SavedSearchAlertMutationResult,
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "../types"
import { Metric } from "Utils/metrics"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"

interface RenderButtonProps {
  onClick: () => void
}

export interface SavedSearchCreateAlertButtonContainerProps {
  entity: SavedSearchEntity
  criteria: SearchCriteriaAttributes
  metric?: Metric
  aggregations?: Aggregations
  getAuthModalOptions: () => AuthModalOptions
}

interface Props extends SavedSearchCreateAlertButtonContainerProps {
  renderButton: (props: RenderButtonProps) => JSX.Element
}

export const SavedSearchCreateAlertButtonContainer: React.FC<Props> = ({
  entity,
  criteria,
  metric,
  aggregations,
  getAuthModalOptions,
  renderButton,
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
      context_page_owner_type: entity.owner.type,
      context_page_owner_id: entity.owner.id,
      context_page_owner_slug: entity.owner.slug,
    })

    if (isLoggedIn) {
      handleOpenForm()
    } else {
      const options = getAuthModalOptions()
      openAuthToSatisfyIntent(mediator, options)
    }
  }

  const handleComplete = (result: SavedSearchAlertMutationResult) => {
    setVisibleForm(false)
    const trackInfo = {
      action_type: ActionType.toggledSavedSearch,
      context_page_owner_type: entity.owner.type,
      context_page_owner_id: entity.owner.id,
      context_page_owner_slug: entity.owner.slug,
      saved_search_id: result.id,
    }
    tracking.trackEvent(trackInfo)

    sendToast({
      message: "Your Alert has been saved.",
    })
  }

  return (
    <>
      {renderButton({ onClick: handleClick })}
      <SavedSearchAlertModalContainer
        visible={visibleForm}
        initialValues={{ name: "", email: true, push: false }}
        entity={entity}
        criteria={criteria}
        metric={metric}
        aggregations={aggregations}
        onClose={() => setVisibleForm(false)}
        onComplete={handleComplete}
      />
    </>
  )
}
