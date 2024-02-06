import { useToasts } from "@artsy/palette"
import {
  SaveArtworkToListsOptions,
  ResultAction,
  useSaveArtworkToLists,
} from "Components/Artwork/SaveButton/useSaveArtworkToLists"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"

export const useArtworkLists = (options: SaveArtworkToListsOptions) => {
  const { artwork } = options
  const { sendToast } = useToasts()
  const { t } = useTranslation()
  const { value, clearValue } = useAuthIntent()
  const {
    isSaved,
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

    if (artwork.isSavedToCustomLists) {
      // Display select lists for artwork modal if artwork is saved to the custom lists
      openSelectListsForArtworkModal()
    } else if (artwork.isSavedToDefaultList) {
      // Display toast if artwork is already saved to the default list
      showToastByAction(ResultAction.SavedToDefaultList)
    } else {
      // Save artwork to the default list
      saveArtworkToLists()
    }

    clearValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, clearValue])

  const showToastByAction = (action: ResultAction) => {
    if (action === ResultAction.SavedToDefaultList) {
      sendToast({
        variant: "success",
        message: t(
          `collectorSaves.saveArtworkToLists.toast.artworkSaved.message`
        ),
        description: t(
          `collectorSaves.saveArtworkToLists.toast.artworkSaved.description`
        ),
        action: {
          label: t(
            "collectorSaves.saveArtworkToLists.toast.artworkSaved.button"
          ),
          onClick: openSelectListsForArtworkModal,
        },
      })

      return
    }

    sendToast({
      variant: "message",
      message: t(
        "collectorSaves.saveArtworkToLists.toast.artworkRemoved.message"
      ),
    })
  }

  const saveArtworkToLists = async () => {
    const action = await saveToLists()

    if (
      action === ResultAction.SavedToDefaultList ||
      action === ResultAction.RemovedFromDefaultList
    ) {
      showToastByAction(action)
    }

    return action
  }

  return { isSaved, saveArtworkToLists }
}
