import { AuthContextModule } from "@artsy/cohesion"
import { useToasts } from "@artsy/palette"
import { useManageArtworkForSavesContext } from "Components/Artwork/ManageArtworkForSaves"
import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { SaveArtworkToListsButton_artwork$data } from "__generated__/SaveArtworkToListsButton_artwork.graphql"

interface SaveArtworkToListsButtonProps {
  artwork: SaveArtworkToListsButton_artwork$data
  contextModule: AuthContextModule
}

const SaveArtworkToListsButton: FC<SaveArtworkToListsButtonProps> = ({
  artwork,
  contextModule,
}) => {
  const tracking = useTracking()
  const { t } = useTranslation()
  const { sendToast } = useToasts()
  const {
    savedListId,
    isSavedToList,
    dispatch,
  } = useManageArtworkForSavesContext()

  const customListsCount = artwork.customCollections?.totalCount ?? 0
  const hasCustomLists = customListsCount > 0
  const isSaved = !!artwork.is_saved || hasCustomLists

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

  const { handleSave } = useSaveArtwork({
    isSaved,
    artwork,
    contextModule,
    onSave: ({ action, artwork }) => {
      tracking.trackEvent({
        action,
        entity_slug: artwork.slug,
        entity_id: artwork.internalID,
      })

      showToastByAction(action)
    },
  })

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (savedListId || hasCustomLists) {
      openManageArtworkForSavesModal()
      return
    }

    handleSave()
  }

  return (
    <SaveButtonBase
      isSaved={savedListId ? isSavedToList : isSaved}
      onClick={handleClick}
    />
  )
}

export const SaveArtworkToListsButtonFragmentContainer = createFragmentContainer(
  SaveArtworkToListsButton,
  {
    artwork: graphql`
      fragment SaveArtworkToListsButton_artwork on Artwork {
        id
        internalID
        is_saved: isSaved
        slug
        title
        date
        preview: image {
          url(version: "square")
        }

        customCollections: collectionsConnection(
          first: 0
          default: false
          saves: true
        ) {
          totalCount
        }
      }
    `,
  }
)
