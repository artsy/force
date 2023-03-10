import { AuthContextModule } from "@artsy/cohesion"
import { useManageArtworkForSavesContext } from "Components/Artwork/ManageArtworkForSaves"
import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"
import { useSaveArtworkToLists } from "Components/Artwork/SaveButton/useSaveArtworkToLists"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SaveArtworkToListsButton_artwork$data } from "__generated__/SaveArtworkToListsButton_artwork.graphql"

interface SaveArtworkToListsButtonProps {
  artwork: SaveArtworkToListsButton_artwork$data
  contextModule: AuthContextModule
}

const SaveArtworkToListsButton: FC<SaveArtworkToListsButtonProps> = ({
  artwork,
  contextModule,
}) => {
  const { isSavedToList, savedListId } = useManageArtworkForSavesContext()
  const { isSaved, onSave } = useSaveArtworkToLists({
    artwork,
    contextModule,
    customListsCount: artwork.customCollections?.totalCount ?? 0,
    isSaved: !!artwork.is_saved,
  })

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    onSave()
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
