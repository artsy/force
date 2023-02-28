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
  const { setArtwork } = useManageArtworkForCollectionsContext()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    setArtwork({
      id: artwork.internalID,
      title: `${artwork.title}, ${artwork.date}`,
      image: null,
    })
  }

  return <SaveButtonBase isSaved={true} onClick={handleClick} />
}

export const SaveArtworkToCollectionsButtonFragmentContainer = createFragmentContainer(
  SaveArtworkToCollectionsButton,
  {
    artwork: graphql`
      fragment SaveArtworkToCollectionsButton_artwork on Artwork {
        internalID
        title
        date
      }
    `,
  }
)
