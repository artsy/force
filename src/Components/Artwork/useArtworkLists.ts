import { useToasts } from "@artsy/palette"
import {
  ResultAction,
  type SaveArtworkToListsOptions,
  useSaveArtworkToLists,
} from "Components/Artwork/SaveButton/useSaveArtworkToLists"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"
import type { useArtworkListsArtworkSaveStatesQuery } from "__generated__/useArtworkListsArtworkSaveStatesQuery.graphql"
import { useEffect } from "react"
import { fetchQuery, graphql } from "react-relay"
import { useTracking } from "react-tracking"

export const useArtworkLists = (options: SaveArtworkToListsOptions) => {
  const { artwork } = options
  const tracking = useTracking()
  const { sendToast } = useToasts()
  const { relayEnvironment } = useSystemContext()

  const { value, clearValue } = useAuthIntent()
  const { saveArtworkToLists: saveToLists, openSelectListsForArtworkModal } =
    useSaveArtworkToLists(options)

  useEffect(() => {
    if (
      !value ||
      value.action !== "saveArtworkToLists" ||
      value?.objectId !== artwork.internalID
    ) {
      return
    }

    const fetchSavedStatusAndPerformAction = async () => {
      const data = await fetchQuery<useArtworkListsArtworkSaveStatesQuery>(
        relayEnvironment,
        graphql`
          query useArtworkListsArtworkSaveStatesQuery($artworkID: String!) {
            artwork(id: $artworkID) {
              isSavedToList(default: false)
              isSaved
            }
          }
        `,
        { artworkID: artwork.internalID },
      ).toPromise()

      // The user clicked the save button while logged out.
      // We need to comprehensively check the artwork's save state.

      if (data?.artwork?.isSavedToList) {
        // Display select lists for artwork modal if artwork is saved to the custom lists
        openSelectListsForArtworkModal()
      } else if (data?.artwork?.isSaved) {
        // Display toast if artwork is already saved to the default list
        showToastByAction(ResultAction.SavedToDefaultList, artwork.isInAuction)
      } else {
        // Save artwork to the default list
        saveArtworkToLists()
      }
    }

    clearValue()
    fetchSavedStatusAndPerformAction()
  }, [value, clearValue])

  const showToastByAction = (action: ResultAction, isInAuction: boolean) => {
    if (action === ResultAction.SavedToDefaultList) {
      sendToast({
        variant: "success",
        message: "Artwork saved",
        description: isInAuction
          ? ""
          : "Saving an artwork signals interest to galleries.",
        action: {
          label: "Add to a List",
          onClick: openSelectListsForArtworkModal,
        },
      })

      return
    }

    sendToast({
      variant: "message",
      message: "Removed from Saved Artworks",
    })
  }

  const saveArtworkToLists = async () => {
    const action = await saveToLists()

    if (
      action === ResultAction.SavedToDefaultList ||
      action === ResultAction.RemovedFromDefaultList
    ) {
      showToastByAction(action, artwork.isInAuction)

      tracking.trackEvent({
        action:
          action === ResultAction.SavedToDefaultList
            ? "Saved Artwork"
            : "Removed Artwork",
        // @ts-ignore TODO: Cohesion schema
        entity_slug: artwork.slug,
        entity_id: artwork.internalID,
      })
    }

    return action
  }

  return { saveArtworkToLists }
}
