import { Box, Join, Separator } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MyCollectionArtworkSidebarMetadataFragmentContainer } from "./MyCollectionArtworkSidebarMetadata"
import { MyCollectionArtworkSidebar_artwork } from "__generated__/MyCollectionArtworkSidebar_artwork.graphql"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkSWASectionDesktopLayout } from "../MyCollectionArtworkSWASection"
import { MyCollectionArtworkSWASectionSubmitted } from "../MyCollectionArtworkSWASectionSubmitted"
import { useState } from "react"
import { MyCollectionArtworkSWAHowItWorksModal } from "../MyCollectionArtworkSWAHowItWorksModal"

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
      {showHowItWorksModal && (
        <MyCollectionArtworkSWAHowItWorksModal
          onClose={() => setShowHowItWorksModal(false)}
        />
      )}
      <Join separator={<Separator mt={4} mb={2} />}>
        <MyCollectionArtworkSidebarMetadataFragmentContainer
          artwork={artwork}
        />
        {isMyCollectionPhase5Enabled && (
          <Media greaterThanOrEqual="sm">
            {!!isArtworkSubmittedToSell ? (
              <>
                <MyCollectionArtworkSWASectionSubmitted />
                <Separator my={2} />
              </>
            ) : (
              <MyCollectionArtworkSWASectionDesktopLayout
                onSubmit={() => {
                  setIsArtworkSubmittedToSell(!isArtworkSubmittedToSell)
                }}
                learnMore={() => setShowHowItWorksModal(true)}
              />
            )}
          </Media>
        )}
      </Join>
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
