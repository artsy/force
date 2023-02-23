import { useManageArtworkForCollectionsContext } from "Components/Artwork/ManageArtworkForCollections"
import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SaveArtworkToCollectionsButton_artwork$data } from "__generated__/SaveArtworkToCollectionsButton_artwork.graphql"

interface SaveArtworkToCollectionsButtonProps {
  artwork: SaveArtworkToCollectionsButton_artwork$data
}

const SaveArtworkToCollectionsButton: FC<SaveArtworkToCollectionsButtonProps> = ({
  artwork,
}) => {
  const {
    setArtworkId,
    savedListId,
    isSavedToList,
  } = useManageArtworkForCollectionsContext()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setArtworkId(artwork.internalID)
  }

  return (
    <SaveButtonBase
      isSaved={savedListId ? isSavedToList : !!artwork.isSaved}
      onClick={handleClick}
    />
  )
}

export const SaveArtworkToCollectionsButtonFragmentContainer = createFragmentContainer(
  SaveArtworkToCollectionsButton,
  {
    artwork: graphql`
      fragment SaveArtworkToCollectionsButton_artwork on Artwork {
        internalID
        isSaved
      }
    `,
  }
)
