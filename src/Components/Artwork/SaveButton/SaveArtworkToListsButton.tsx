import { AuthContextModule } from "@artsy/cohesion"
import { useToasts } from "@artsy/palette"
import { useManageArtworkForSavesContext } from "Components/Artwork/ManageArtworkForSaves"
import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { FC } from "react"
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
  const { sendToast } = useToasts()
  const { state, savedListId, dispatch } = useManageArtworkForSavesContext()

  const isSaved = !!artwork.is_saved

  const openManageArtworkForSavesModal = () => {
    dispatch({
      type: "SET_ARTWORK",
      payload: {
        id: artwork.internalID,
        title: `${artwork.title}, ${artwork.date}`,
        imageURL: artwork.preview?.url ?? null,
      },
    })
  }

  const showToastByAction = (action: string) => {
    if (action === "Saved Artwork") {
      sendToast({
        variant: "success",
        message: "Artwork saved",
        action: {
          label: "Add to a List",
          onClick: openManageArtworkForSavesModal,
        },
      })

      return
    }

    sendToast({
      variant: "message",
      message: "Removed from All Saves",
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

    if (savedListId) {
      openManageArtworkForSavesModal()
      return
    }

    handleSave()
  }

  return (
    <SaveButtonBase
      isSaved={savedListId ? state.isSavedToList : isSaved}
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
      }
    `,
  }
)
