import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MyCollectionArtworkSidebarMetadataFragmentContainer } from "./MyCollectionArtworkSidebarMetadata"
import { MyCollectionArtworkSidebar_artwork } from "__generated__/MyCollectionArtworkSidebar_artwork.graphql"

const MyCollectionArtworkSidebarContainer = Box

interface MyCollectionArtworkSidebarProps {
  artwork: MyCollectionArtworkSidebar_artwork
}

export const MyCollectionArtworkSidebar: React.FC<MyCollectionArtworkSidebarProps> = ({
  artwork,
}) => {
  return (
    <MyCollectionArtworkSidebarContainer>
      <MyCollectionArtworkSidebarMetadataFragmentContainer artwork={artwork} />
    </MyCollectionArtworkSidebarContainer>
  )
}

export const MyCollectionArtworkSidebarFragmentContainer = createFragmentContainer(
  MyCollectionArtworkSidebar,
  {
    artwork: graphql`
      fragment MyCollectionArtworkSidebar_artwork on Artwork {
        ...MyCollectionArtworkSidebarMetadata_artwork
      }
    `,
  }
)
