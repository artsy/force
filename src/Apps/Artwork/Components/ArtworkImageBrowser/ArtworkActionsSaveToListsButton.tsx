import { ContextModule } from "@artsy/cohesion"
import { HeartFillIcon, HeartIcon, useToasts } from "@artsy/palette"
import { UtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/UtilButton"
import { useManageArtworkForSavesContext } from "Components/Artwork/ManageArtworkForSaves"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { ArtworkActionsSaveToListsButton_artwork$data } from "__generated__/ArtworkActionsSaveToListsButton_artwork.graphql"

interface ArtworkActionsSaveToListsButtonProps {
  artwork: ArtworkActionsSaveToListsButton_artwork$data
}

export const ArtworkActionsSaveToListsButton: FC<ArtworkActionsSaveToListsButtonProps> = ({
  artwork,
}) => {
  let isSaved = !!artwork.isSaved
  const isArtworksListEnabled = useFeatureFlag("force-enable-artworks-list")
  const { dispatch } = useManageArtworkForSavesContext()
  const { sendToast } = useToasts()
  const { t } = useTranslation()
  const customListsCount = artwork.customCollections?.totalCount ?? 0
  const hasCustomLists = customListsCount > 0

  if (isArtworksListEnabled) {
    isSaved = !!artwork.isSaved || hasCustomLists
  }

  const { handleSave } = useSaveArtwork({
    isSaved: !!artwork.isSaved,
    artwork,
    contextModule: ContextModule.artworkImage,
    onSave: ({ action }) => {
      if (isArtworksListEnabled) {
        showToastByAction(action)
      }
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

  const onSaveClicked = () => {
    if (isArtworksListEnabled && hasCustomLists) {
      openManageArtworkForSavesModal()
      return
    }

    handleSave()
  }

  return (
    <UtilButton
      name="heart"
      Icon={isSaved ? FilledIcon : HeartIcon}
      label={isSaved ? "Saved" : "Save"}
      longestLabel="Saved"
      onClick={onSaveClicked}
    />
  )
}

export const ArtworkActionsSaveToListsButtonFragmentContainer = createFragmentContainer(
  ArtworkActionsSaveToListsButton,
  {
    artwork: graphql`
      fragment ArtworkActionsSaveToListsButton_artwork on Artwork {
        id
        internalID
        isSaved
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

const FilledIcon = () => <HeartFillIcon fill="blue100" />
