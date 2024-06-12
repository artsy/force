import { AuthContextModule } from "@artsy/cohesion"
import { useManageArtworkForSavesContext } from "Components/Artwork/ManageArtworkForSaves"
import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"
import { ResultAction } from "Components/Artwork/SaveButton/useSaveArtworkToLists"
import { useArtworkLists } from "Components/Artwork/useArtworkLists"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import createLogger from "Utils/logger"
import { SaveArtworkToListsButton_artwork$data } from "__generated__/SaveArtworkToListsButton_artwork.graphql"

const logger = createLogger("SaveArtworkToListsButton")

interface SaveArtworkToListsButtonProps {
  artwork: SaveArtworkToListsButton_artwork$data
  contextModule: AuthContextModule
}

const SaveArtworkToListsButton: FC<SaveArtworkToListsButtonProps> = ({
  artwork,
  contextModule,
}) => {
  const tracking = useTracking()
  const { savedListId, isSavedToList } = useManageArtworkForSavesContext()

  const isSavedToDefaultList = !!artwork.isSaved

  const { isSaved, saveArtworkToLists } = useArtworkLists({
    contextModule,
    artwork: {
      internalID: artwork.internalID,
      id: artwork.id,
      slug: artwork.slug,
      title: artwork.title ?? "",
      year: artwork.date,
      artistNames: artwork.artistNames,
      imageURL: artwork.preview?.url ?? null,
      isSavedToDefaultList,
      isSavedToCustomLists: artwork.isSavedToList,
    },
  })

  const handleSave = async () => {
    try {
      const action = await saveArtworkToLists()

      if (
        action === ResultAction.SavedToDefaultList ||
        action === ResultAction.RemovedFromDefaultList
      ) {
        const label = labelByResultAction[action]

        tracking.trackEvent({
          action: label,
          entity_slug: artwork.slug,
          entity_id: artwork.internalID,
        })
      }
    } catch (error) {
      logger.error(error)
    }
  }

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
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
        isSaved
        slug
        title
        date
        artistNames
        preview: image {
          url(version: "square")
        }
        isSavedToList
      }
    `,
  }
)

const labelByResultAction = {
  [ResultAction.SavedToDefaultList]: "Saved Artwork",
  [ResultAction.RemovedFromDefaultList]: "Removed Artwork",
}
