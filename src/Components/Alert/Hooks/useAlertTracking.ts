import {
  ActionType,
  ClickedAddFilters,
  ClickedArtworkGroup,
  ClickedCreateAlert,
  ContextModule,
  DeletedSavedSearch,
  EditedAlert,
  OwnerType,
  ScreenOwnerType,
  SelectedSuggestedFilter,
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

    editedAlert: (searchCriteriaID: string) => {
      const payload: EditedAlert = {
        action: ActionType.editedAlert,
        saved_search_id: searchCriteriaID,
        context_screen_owner_type: contextPageOwnerType as ScreenOwnerType,
      }

      trackEvent(payload)
    },

    deletedAlert: (searchCriteriaID: string) => {
      const payload: DeletedSavedSearch = {
        action: ActionType.deletedSavedSearch,
        context_screen_owner_id: contextPageOwnerId,
        context_screen_owner_type: contextPageOwnerType as ScreenOwnerType,
        saved_search_id: searchCriteriaID,
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

    clickedAddFilters: (isEditMode?: boolean) => {
      const payload: ClickedAddFilters = {
        action: ActionType.clickedAddFilters,
        context_module: isEditMode
          ? ContextModule.editAlert
          : ContextModule.alertFilters,
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

    clickedSuggestedFilterOption: (criterion: string, isEditMode?: boolean) => {
      const payload: SelectedSuggestedFilter = {
        action: ActionType.selectedSuggestedFilter,
        context_module: isEditMode
          ? ContextModule.editAlert
          : ContextModule.createAlert,
        subject: criterion,
      }

      trackEvent(payload)
    },
  }
}
