import { createFragmentContainer, graphql } from "react-relay"
import { Text } from "@artsy/palette"
import { ArtworkSidebar2ArtworkTitle_artwork } from "__generated__/ArtworkSidebar2ArtworkTitle_artwork.graphql"

interface ArtworkSidebar2ArtworkTitleProps {
  artwork: ArtworkSidebar2ArtworkTitle_artwork
}

const ArtworkSidebar2ArtworkTitle: React.FC<ArtworkSidebar2ArtworkTitleProps> = ({
  artwork,
}) => {
  return (
    <Text color="black60" variant="lg-display">
      <i>{artwork.title?.trim()}</i>
      {artwork.date &&
        artwork.date.replace(/\s+/g, "").length > 0 &&
        ", " + artwork.date}
    </Text>
  )
}

export const ArtworkSidebar2ArtworkTitleFragmentContainer = createFragmentContainer(
  ArtworkSidebar2ArtworkTitle,
  {
    artwork: graphql`
      fragment ArtworkSidebar2ArtworkTitle_artwork on Artwork {
        date
        title
      }
    `,
  }
)
