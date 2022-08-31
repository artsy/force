import { createFragmentContainer, graphql } from "react-relay"
import { Text } from "@artsy/palette"
import { ArtworkSidebar2ArtworkTitle_artwork } from "__generated__/ArtworkSidebar2ArtworkTitle_artwork.graphql"

interface ArtworkSidebar2ArtworkTitleProps {
  artwork: ArtworkSidebar2ArtworkTitle_artwork
}

const ArtworkSidebar2ArtworkTitle: React.FC<ArtworkSidebar2ArtworkTitleProps> = ({
  artwork,
}) => {
  const getArtworkDate = () => {
    const formattedDate = artwork.date?.replace(/\s+/g, "") ?? ""

    if (formattedDate.length > 0) {
      return `, ${artwork.date}`
    }

    return
  }

  return (
    <Text color="black60" variant="lg-display">
      <i>{artwork.title?.trim()}</i>
      {getArtworkDate()}
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
