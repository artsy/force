import {
  ActionType,
  ClickedAddFilters,
  ClickedArtworkGroup,
  ClickedCreateAlert,
  ContextModule,
  DeletedSavedSearch,
  OwnerType,
  ScreenOwnerType,
  ToggledSavedSearch,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"

import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

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

    clickedAddFilters: () => {
      const payload: ClickedAddFilters = {
        action: ActionType.clickedAddFilters,
        context_module: ContextModule.alertFilters,
      }

      trackEvent(payload)
    },

    clickedArtworkGroup: (internalId: string, slug: string) => {
      const payload: ClickedArtworkGroup = {
        action: ActionType.clickedArtworkGroup,
        context_module: ContextModule.alertConfirmation,
        context_page_owner_type: contextPageOwnerType,
        destination_page_owner_id: internalId,
        destination_page_owner_slug: slug,
        destination_page_owner_type: OwnerType.artwork,
        type: "thumbnail",
      }

      trackEvent(payload)
    },
  }
}
