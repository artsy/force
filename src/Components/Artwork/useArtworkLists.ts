import { useToasts } from "@artsy/palette"
import {
  SaveArtworkToListsOptions,
  ResultAction,
  useSaveArtworkToLists,
} from "Components/Artwork/SaveButton/useSaveArtworkToLists"
import { useEffect } from "react"

import { useAuthIntent } from "Utils/Hooks/useAuthIntent"

export const useArtworkLists = (options: SaveArtworkToListsOptions) => {
  const { artwork } = options
  const { sendToast } = useToasts()

  const { value, clearValue } = useAuthIntent()
  const {
    saveArtworkToLists: saveToLists,
    openSelectListsForArtworkModal,
  } = useSaveArtworkToLists(options)

  useEffect(() => {
    if (
      !value ||
      value.action !== "saveArtworkToLists" ||
      value?.objectId !== artwork.internalID
    ) {
      return
    }

    // if unsaving
    //   fetch custom lists
    //   if saved to custom lists
    //     open lists modal
    //   else
    //     unsave
    // else
    if (artwork.isSavedToCustomLists) {
      // Display select lists for artwork modal if artwork is saved to the custom lists
      openSelectListsForArtworkModal()
    } else if (artwork.isSavedToDefaultList) {
      // Display toast if artwork is already saved to the default list
      showToastByAction(ResultAction.SavedToDefaultList, artwork.isInAuction)
    } else {
      // Save artwork to the default list
      saveArtworkToLists()
    }

    clearValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }

    return action
  }

  return { isSaved, saveArtworkToLists }
}
