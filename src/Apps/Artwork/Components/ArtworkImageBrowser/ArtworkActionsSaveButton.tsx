import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkActionsSaveButton_artwork$data } from "__generated__/ArtworkActionsSaveButton_artwork.graphql"
import { ArtworkActionsSaveButtonV2FragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsSaveButtonV2"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButton_artwork$data
}
const ArtworkActionsSaveButton: React.FC<ArtworkActionsSaveButtonProps> = ({
  artwork,
}) => {
  return (
    <ManageArtworkForSavesProvider>
      <ArtworkActionsSaveButtonV2FragmentContainer artwork={artwork} />
    </ManageArtworkForSavesProvider>
  )
}

export const ArtworkActionsSaveButtonFragmentContainer = createFragmentContainer(
  ArtworkActionsSaveButton,
  {
    artwork: graphql`
      fragment ArtworkActionsSaveButton_artwork on Artwork {
        id
        internalID
        slug
        isSaved
        sale {
          isAuction
          isClosed
        }
        ...ArtworkActionsSaveButtonV2_artwork
      }
    `,
  }
)
