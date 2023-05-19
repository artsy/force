import {
  ActionType,
  AddCollectedArtwork,
  ContextModule,
  DeleteCollectedArtwork,
  EditCollectedArtwork,
  MyColectionAddNewArtistName,
  MyCollectionAddArtworkDetails,
  MyCollectionSelectArtistFromSearch,
  MyCollectionSelectArtworkFromGrid,
  OwnerType,
  SaveCollectedArtwork,
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

    saveCollectedArtwork: (artistId: string, isP1Artist: boolean) => {
      const payload: SaveCollectedArtwork = {
        action: ActionType.saveCollectedArtwork,
        context_module: ContextModule.myCollectionHome,
        context_owner_type: OwnerType.myCollection,
        artist_id: artistId,
        is_p1_artist: isP1Artist,
        platform: "web",
      }

      trackEvent(payload)
    },

    trackSkipArtistSelection: () => {
      const payload: MyColectionAddNewArtistName = {
        action: ActionType.addNewArtistName,
        context_module: ContextModule.myCollection,
        context_owner_type: OwnerType.myCollectionUploadingFlow,
        platform: "web",
      }

      trackEvent(payload)
    },

    trackSelectArtist: () => {
      const payload: MyCollectionSelectArtistFromSearch = {
        action: ActionType.selectArtistFromSearch,
        context_mudule: ContextModule.myCollection,
        context_owner_type: OwnerType.myCollectionUploadingFlow,
        platform: "web",
      }

      trackEvent(payload)
    },

    trackSkipArtworkSelection: () => {
      const payload: MyCollectionAddArtworkDetails = {
        action: ActionType.addArtworkDetails,
        context_module: ContextModule.myCollection,
        context_owner_type: OwnerType.myCollectionUploadingFlow,
        platform: "web",
      }

      trackEvent(payload)
    },

    trackSelectArtwork: () => {
      const payload: MyCollectionSelectArtworkFromGrid = {
        action: ActionType.selectArtworkFromGrid,
        context_module: ContextModule.myCollection,
        context_owner_type: OwnerType.myCollectionUploadingFlow,
        platform: "web",
      }

      trackEvent(payload)
    },
  }
}
