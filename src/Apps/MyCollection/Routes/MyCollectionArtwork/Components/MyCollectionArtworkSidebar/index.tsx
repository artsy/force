import { Box, Join, Separator } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkSidebar_artwork } from "__generated__/MyCollectionArtworkSidebar_artwork.graphql"
import { MyCollectionArtworkSidebarMetadataFragmentContainer } from "./MyCollectionArtworkSidebarMetadata"
import { MyCollectionArtworkSidebarTitleInfoFragmentContainer } from "./MyCollectionArtworkSidebarTitleInfo"


const MyCollectionArtworkSidebarContainer = Box

interface MyCollectionArtworkSidebarProps {
  artwork: MyCollectionArtworkSidebar_artwork
}

export const MyCollectionArtworkSidebar: React.FC<MyCollectionArtworkSidebarProps> = ({
  artwork,
}) => {
  // TODO: use real value
  const [isArtworkSubmittedToSell, setIsArtworkSubmittedToSell] = useState<
    boolean
  >(false)
  const [showHowItWorksModal, setShowHowItWorksModal] = useState<boolean>(false)

  const isMyCollectionPhase5Enabled = useFeatureFlag(
    "my-collection-web-phase-5"
  )

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
