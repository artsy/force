import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { ArtworkActionsSaveButton_artwork$data } from "__generated__/ArtworkActionsSaveButton_artwork.graphql"
import { ProgressiveOnboardingSaveArtworkQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveArtwork"
import { SaveUtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/SaveUtilButton"
import { ArtworkActionsSaveToListsButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsSaveToListsButton"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { useFeatureFlag } from "System/useFeatureFlag"
import { ArtworkActionsWatchLotButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsWatchLotButton"

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButton_artwork$data
}
const ArtworkActionsSaveButton: React.FC<ArtworkActionsSaveButtonProps> = ({
  artwork,
}) => {
  const isArtworksListEnabled = useFeatureFlag("force-enable-artworks-list")
  const { handleSave } = useSaveArtwork({
    isSaved: !!artwork.isSaved,
    artwork,
    contextModule: ContextModule.artworkImage,
  })

  const { isAuction, isClosed } = artwork.sale ?? {}
  const isOpenSale = isAuction && !isClosed
  const isSaved = !!artwork.isSaved

  // If an Auction, use Bell (for notifications); if a standard artwork use Heart
  if (isOpenSale) {
    return (
      <ArtworkActionsWatchLotButtonFragmentContainer
        artwork={artwork}
        onClick={handleSave}
      />
    )
  }

  if (isArtworksListEnabled) {
    return (
      <ManageArtworkForSavesProvider>
        <ProgressiveOnboardingSaveArtworkQueryRenderer>
          <ArtworkActionsSaveToListsButtonFragmentContainer artwork={artwork} />
        </ProgressiveOnboardingSaveArtworkQueryRenderer>
      </ManageArtworkForSavesProvider>
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
        ...ArtworkActionsSaveToListsButton_artwork
      }
    `,
  }
)
