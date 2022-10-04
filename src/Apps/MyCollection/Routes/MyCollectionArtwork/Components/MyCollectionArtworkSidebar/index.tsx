import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkSidebar_artwork$data } from "__generated__/MyCollectionArtworkSidebar_artwork.graphql"
import { MyCollectionArtworkSidebarMetadataFragmentContainer } from "./MyCollectionArtworkSidebarMetadata"
import { MyCollectionArtworkSidebarTitleInfoFragmentContainer } from "./MyCollectionArtworkSidebarTitleInfo"

const MyCollectionArtworkSidebarContainer = Box

interface MyCollectionArtworkSidebarProps {
  artwork: MyCollectionArtworkSidebar_artwork$data
}

export const MyCollectionArtworkSidebar: React.FC<MyCollectionArtworkSidebarProps> = ({
  artwork,
}) => {
  return (
    <MyCollectionArtworkSidebarContainer>
      <Media greaterThanOrEqual="sm">
        <MyCollectionArtworkSidebarTitleInfoFragmentContainer
          artwork={artwork}
        />
      </Media>

      <MyCollectionArtworkSidebarMetadataFragmentContainer artwork={artwork} />
    </MyCollectionArtworkSidebarContainer>
  )
}

export const MyCollectionArtworkSidebarFragmentContainer = createFragmentContainer(
  MyCollectionArtworkSidebar,
  {
    artwork: graphql`
      fragment MyCollectionArtworkSidebar_artwork on Artwork {
        ...MyCollectionArtworkSidebarTitleInfo_artwork
        ...MyCollectionArtworkSidebarMetadata_artwork
      }
    `,
  }
)
