import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { ArtworkActionsSaveButton_artwork$data } from "__generated__/ArtworkActionsSaveButton_artwork.graphql"
import { ProgressiveOnboardingSaveArtworkQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveArtwork"
import { SaveUtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/SaveUtilButton"
import { useFeatureFlag } from "System/useFeatureFlag"
import { ArtworkActionsWatchLotButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsWatchLotButton"
import { ArtworkActionsSaveButtonV2FragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsSaveButtonV2"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButton_artwork$data
}
const ArtworkActionsSaveButton: React.FC<ArtworkActionsSaveButtonProps> = ({
  artwork,
}) => {
  const isArtworksListEnabled = true
  const { handleSave } = useSaveArtwork({
    isSaved: !!artwork.isSaved,
    artwork,
    contextModule: ContextModule.artworkImage,
  })

  const { isAuction, isClosed } = artwork.sale ?? {}
  const isOpenSale = isAuction && !isClosed
  const isSaved = !!artwork.isSaved

  if (isArtworksListEnabled) {
    return (
      <ManageArtworkForSavesProvider>
        <ArtworkActionsSaveButtonV2FragmentContainer artwork={artwork} />
      </ManageArtworkForSavesProvider>
    )
  }

  // If an Auction, use Bell (for notifications); if a standard artwork use Heart
  if (isOpenSale) {
    return (
      <ArtworkActionsWatchLotButtonFragmentContainer
        isSaved={isSaved}
        artwork={artwork}
        onClick={handleSave}
      />
    )
  }

  return (
    <ProgressiveOnboardingSaveArtworkQueryRenderer>
      <SaveUtilButton isSaved={isSaved} onClick={handleSave} />
    </ProgressiveOnboardingSaveArtworkQueryRenderer>
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
        ...ArtworkActionsWatchLotButton_artwork
        ...ArtworkAuctionRegistrationPanel_artwork
        ...ArtworkActionsSaveButtonV2_artwork
      }
    `,
  }
)
