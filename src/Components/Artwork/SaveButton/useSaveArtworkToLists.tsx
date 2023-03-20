import { AuthContextModule } from "@artsy/cohesion"
import { useToasts } from "@artsy/palette"
import { useManageArtworkForSavesContext } from "Components/Artwork/ManageArtworkForSaves"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { useTranslation } from "react-i18next"
import { useTracking } from "react-tracking"

interface ArtworkEntity {
  slug: string
  id: string
  internalID: string
  title: string | null
  date: string | null
  preview: {
    url: string | null
  } | null
}

interface Options<T> {
  customListsCount: number
  isSaved: boolean
  contextModule: AuthContextModule
  artwork: T
}

export const useSaveArtworkToLists = <T extends ArtworkEntity>(
  options: Options<T>
) => {
  const { artwork } = options
  const { savedListId, dispatch } = useManageArtworkForSavesContext()
  const { sendToast } = useToasts()
  const { t } = useTranslation()
  const tracking = useTracking()

  const { handleSave } = useSaveArtwork({
    isSaved: options.isSaved,
    artwork,
    contextModule: options.contextModule,
    onSave: ({ action, artwork }) => {
      tracking.trackEvent({
        action,
        entity_slug: artwork.slug,
        entity_id: artwork.internalID,
      })

      showToastByAction(action)
    },
  })

  const hasCustomLists = options.customListsCount > 0
  const isSaved = options.isSaved || hasCustomLists

  const openManageArtworkForSavesModal = () => {
    dispatch({
      type: "SET_ARTWORK",
      payload: {
        id: artwork.id,
        internalID: artwork.internalID,
        title: `${artwork.title}, ${artwork.date}`,
        imageURL: artwork.preview?.url ?? null,
      },
    })
  }

  const showToastByAction = (action: string) => {
    if (action === "Saved Artwork") {
      sendToast({
        variant: "success",
        message: t(
          "collectorSaves.saveArtworkToListsButton.artworkSavedToast.message"
        ),
        action: {
          label: t(
            "collectorSaves.saveArtworkToListsButton.artworkSavedToast.button"
          ),
          onClick: openManageArtworkForSavesModal,
        },
      })

      return
    }

    sendToast({
      variant: "message",
      message: t(
        "collectorSaves.saveArtworkToListsButton.artworkRemovedToast.message"
      ),
    })
  }

  const onSave = () => {
    if (savedListId || hasCustomLists) {
      openManageArtworkForSavesModal()
      return
    }

    handleSave()
  }

  return { isSaved, onSave }
}
