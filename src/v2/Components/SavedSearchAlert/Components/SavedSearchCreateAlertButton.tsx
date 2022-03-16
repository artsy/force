import React, { useEffect, useState } from "react"
import { BellIcon, Button, ButtonProps, useToasts } from "@artsy/palette"
import { useSystemContext, useTracking } from "v2/System"
import { ActionType } from "@artsy/cohesion"
import {
  AuthModalOptions,
  openAuthToSatisfyIntent,
} from "v2/Utils/openAuthModal"
import { mediator } from "lib/mediator"
import { SavedSearchAlertModalContainer } from "../SavedSearchAlertModal"
import {
  SavedSearchAlertMutationResult,
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "../types"
import { Metric } from "v2/Components/ArtworkFilter/Utils/metrics"
import { Aggregations } from "v2/Components/ArtworkFilter/ArtworkFilterContext"

export interface SavedSearchCreateAlertButtonProps extends ButtonProps {
  entity: SavedSearchEntity
  criteria: SearchCriteriaAttributes
  metric?: Metric
  aggregations?: Aggregations
  getAuthModalOptions: () => AuthModalOptions
}

export const SavedSearchCreateAlertButton: React.FC<SavedSearchCreateAlertButtonProps> = ({
  entity,
  criteria,
  metric,
  aggregations,
  getAuthModalOptions,
  ...props
}) => {
  const tracking = useTracking()
  const { isLoggedIn } = useSystemContext()
  const [visibleForm, setVisibleForm] = useState(false)
  const { sendToast } = useToasts()
  const entityArtist = entity.artists[0]

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
      context_page_owner_type: entity.analytics.ownerType,
      context_page_owner_id: entityArtist.id,
      context_page_owner_slug: entityArtist.slug,
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
      context_page_owner_type: entity.analytics.ownerType,
      context_page_owner_id: entityArtist.id,
      context_page_owner_slug: entityArtist.slug,
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
        criteria={criteria}
        metric={metric}
        aggregations={aggregations}
        onClose={() => setVisibleForm(false)}
        onComplete={handleComplete}
      />
    </>
  )
}
