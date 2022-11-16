import {
  DeleteCollectedArtwork,
  ActionType,
  ContextModule,
  OwnerType,
  SaveCollectedArtwork,
  EditCollectedArtwork,
  AddCollectedArtwork,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"

export const useMyCollectionTracking = () => {
  const { trackEvent } = useTracking()

  return {
    addCollectedArtwork: (
      context_owner_type:
        | OwnerType.myCollection
        | OwnerType.myCollectionInsights = OwnerType.myCollection
    ) => {
      const payload: AddCollectedArtwork = {
        action: ActionType.addCollectedArtwork,
        context_module: ContextModule.myCollectionHome,
        context_owner_type,
        platform: "web",
      }

      trackEvent(payload)
    },

    deleteCollectedArtwork: (internalID: string, slug: string) => {
      const payload: DeleteCollectedArtwork = {
        action: ActionType.deleteCollectedArtwork,
        context_module: ContextModule.myCollectionArtwork,
        context_owner_type: OwnerType.myCollectionArtwork,
        context_owner_id: internalID,
        context_owner_slug: slug,
        platform: "web",
      }

      trackEvent(payload)
    },

    editCollectedArtwork: (internalID: string, slug: string) => {
      const payload: EditCollectedArtwork = {
        action: ActionType.editCollectedArtwork,
        context_module: ContextModule.myCollectionArtwork,
        context_owner_id: internalID,
        context_owner_slug: slug,
        context_owner_type: OwnerType.myCollectionArtwork,
        platform: "web",
      }

      trackEvent(payload)
    },

    saveCollectedArtwork: () => {
      const payload: SaveCollectedArtwork = {
        action: ActionType.saveCollectedArtwork,
        context_module: ContextModule.myCollectionHome,
        context_owner_type: OwnerType.myCollection,
        platform: "web",
      }

      trackEvent(payload)
    },
  }
}
