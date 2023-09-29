import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkActionsSaveButtonOld_artwork$data } from "__generated__/ArtworkActionsSaveButtonOld_artwork.graphql"
import { ArtworkActionsSaveButtonV2FragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsSaveButtonV2"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButtonOld_artwork$data
}
const ArtworkActionsSaveButtonOld: React.FC<ArtworkActionsSaveButtonProps> = ({
  artwork,
}) => {
  return (
    <ManageArtworkForSavesProvider>
      <ArtworkActionsSaveButtonV2FragmentContainer artwork={artwork} />
    </ManageArtworkForSavesProvider>
  )
}

export const ArtworkActionsSaveButtonOldFragmentContainer = createFragmentContainer(
  ArtworkActionsSaveButtonOld,
  {
    artwork: graphql`
      fragment ArtworkActionsSaveButtonOld_artwork on Artwork {
        ...ArtworkActionsSaveButtonV2_artwork
      }
    `,
  }
)
