import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkActionsSaveButtonOld_artwork$data } from "__generated__/ArtworkActionsSaveButtonOld_artwork.graphql"
import { ArtworkActionsSaveButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsSaveButton"

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButtonOld_artwork$data
}
const ArtworkActionsSaveButtonOld: React.FC<ArtworkActionsSaveButtonProps> = ({
  artwork,
}) => {
  return <ArtworkActionsSaveButtonFragmentContainer artwork={artwork} />
}

export const ArtworkActionsSaveButtonOldFragmentContainer = createFragmentContainer(
  ArtworkActionsSaveButtonOld,
  {
    artwork: graphql`
      fragment ArtworkActionsSaveButtonOld_artwork on Artwork {
        ...ArtworkActionsSaveButton_artwork
      }
    `,
  }
)
