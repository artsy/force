import {
  ActionType,
  ClickedCreateAlert,
  DeletedSavedSearch,
  ScreenOwnerType,
  ToggledSavedSearch,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"

import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"

export const useAlertTracking = () => {
  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  if (!contextPageOwnerId || !contextPageOwnerSlug || !contextPageOwnerType) {
    console.warn("Missing analytics context")
  }

  return {
    createdAlert: (searchCriteriaID: string) => {
      const payload: ToggledSavedSearch = {
        action: ActionType.toggledSavedSearch,
        search_criteria_id: searchCriteriaID,
        context_screen_owner_id: contextPageOwnerId,
        context_screen_owner_slug: contextPageOwnerSlug,
        context_screen_owner_type: contextPageOwnerType as ScreenOwnerType,
      }

      trackEvent(payload)
    },

    deletedAlert: () => {
      const payload: DeletedSavedSearch = {
        action: ActionType.deletedSavedSearch,
        context_screen_owner_id: contextPageOwnerId,
        context_screen_owner_type: contextPageOwnerType as ScreenOwnerType,
      }

      trackEvent(payload)
    },

    clickedCreateAlert: () => {
      const payload: ClickedCreateAlert = {
        action: ActionType.clickedCreateAlert,
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        context_page_owner_type: contextPageOwnerType,
      }

      trackEvent(payload)
    },
  }
}
