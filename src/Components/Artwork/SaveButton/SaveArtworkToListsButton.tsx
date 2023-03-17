import { AuthContextModule } from "@artsy/cohesion"
import { useToasts } from "@artsy/palette"
import { useManageArtworkForSavesContext } from "Components/Artwork/ManageArtworkForSaves"
import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"
import { useSaveArtworkToLists } from "Components/Artwork/SaveButton/useSaveArtworkToLists"
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
  const { savedListId, isSavedToList } = useManageArtworkForSavesContext()

  const customListsCount = artwork.customCollections?.totalCount ?? 0
  const hasCustomLists = customListsCount > 0

  const {
    isSaved,
    saveArtworkToLists,
    openSelectListsForArtworkModal,
  } = useSaveArtworkToLists({
    contextModule,
    artwork: {
      internalID: artwork.internalID,
      id: artwork.id,
      slug: artwork.slug,
      title: `${artwork.title}, ${artwork.date}`,
      imageURL: artwork.preview?.url ?? null,
      isSavedToDefaultList: !!artwork.is_saved,
      isSavedToCustomLists: hasCustomLists,
    },
  })

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
          onClick: openSelectListsForArtworkModal,
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

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    try {
      const response = await saveArtworkToLists()

      // "Select lists for artwork" modal has been opened
      if (!response) {
        return
      }

      const action = !!response.saveArtwork?.artwork?.is_saved
        ? "Saved Artwork"
        : "Removed Artwork"

      showToastByAction(action)

      tracking.trackEvent({
        action,
        entity_slug: artwork.slug,
        entity_id: artwork.internalID,
      })
    } catch (error) {
      // TOOD: Log error
      console.log("[debug] error", error)
    }
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
