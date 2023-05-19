import React, { useEffect, useState } from "react"
import { useToasts } from "@artsy/palette"
import { useSystemContext } from "System/useSystemContext"
import { useTracking } from "react-tracking"
import { ActionType } from "@artsy/cohesion"
import { SavedSearchAlertModalContainer } from "Components/SavedSearchAlert/SavedSearchAlertModal"
import {
  SavedSearchAlertMutationResult,
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { Metric } from "Utils/metrics"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { DEFAULT_FREQUENCY } from "Components/SavedSearchAlert/constants"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"
import { useAuthDialog } from "Components/AuthDialog"
import { ShowAuthDialogOptions } from "Components/AuthDialog/AuthDialogContext"

interface RenderButtonProps {
  onClick: () => void
}

export interface SavedSearchCreateAlertButtonContainerProps {
  entity: SavedSearchEntity
  criteria: SearchCriteriaAttributes
  metric?: Metric
  aggregations?: Aggregations
  authDialogOptions: Omit<ShowAuthDialogOptions, "mode">
}

interface Props extends SavedSearchCreateAlertButtonContainerProps {
  renderButton: (props: RenderButtonProps) => JSX.Element
}

export const SavedSearchCreateAlertButtonContainer: React.FC<Props> = ({
  entity,
  criteria,
  metric,
  aggregations,
  authDialogOptions,
  renderButton,
}) => {
  const tracking = useTracking()
  const { isLoggedIn } = useSystemContext()
  const [visibleForm, setVisibleForm] = useState(false)
  const { sendToast } = useToasts()

  const openModal = () => {
    setVisibleForm(true)
  }

  const { value, clearValue } = useAuthIntent()

  useEffect(() => {
    if (!value || value.action !== "createAlert") return

    openModal()

    clearValue()
  }, [clearValue, value])

  const handleOpenForm = () => {
    openModal()
  }

  const { showAuthDialog } = useAuthDialog()

  const handleClick = () => {
    tracking.trackEvent({
      action: ActionType.clickedCreateAlert,
      context_page_owner_type: entity.owner.type,
      context_page_owner_id: entity.owner.id,
      context_page_owner_slug: entity.owner.slug,
    })

    if (isLoggedIn) {
      handleOpenForm()
      return
    }

    showAuthDialog({ mode: "SignUp", ...authDialogOptions })
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
        initialValues={{
          name: "",
          email: true,
          push: false,
          frequency: DEFAULT_FREQUENCY,
        }}
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
