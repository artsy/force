import { Text } from "@artsy/palette"
import type { ArtworkSidebarArtworkTitle_artwork$data } from "__generated__/ArtworkSidebarArtworkTitle_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkSidebarArtworkTitleProps {
  artwork: ArtworkSidebarArtworkTitle_artwork$data
}

const ArtworkSidebarArtworkTitle: React.FC<
  React.PropsWithChildren<ArtworkSidebarArtworkTitleProps>
> = ({ artwork }) => {
  const getArtworkDate = () => {
    const formattedDate = artwork.date?.replace(/\s+/g, "") ?? ""

    if (formattedDate.length > 0) {
      return `, ${artwork.date}`
    }

    return
  }

  return (
    <Text as="h1" color="black60" variant="lg-display">
      <i>{artwork.title?.trim()}</i>
      {getArtworkDate()}
    </Text>
  )
}

export const ArtworkSidebarArtworkTitleFragmentContainer =
  createFragmentContainer(ArtworkSidebarArtworkTitle, {
    artwork: graphql`
      fragment ArtworkSidebarArtworkTitle_artwork on Artwork {
        date
        title
      }
    `,
  })
