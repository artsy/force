import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { ArtworkActionsSaveButton_artwork$data } from "__generated__/ArtworkActionsSaveButton_artwork.graphql"
import { ProgressiveOnboardingSaveArtwork } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveArtwork"
import { SaveUtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/SaveUtilButton"
import { ArtworkActionsWatchLotButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsWatchLotButton"
import { ArtworkActionsSaveButtonV2FragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsSaveButtonV2"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { useCheckIfArtworkListsEnabled } from "Apps/CollectorProfile/Routes/Saves2/useCheckIfArtworkListsEnabled"

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButton_artwork$data
}
const ArtworkActionsSaveButton: React.FC<ArtworkActionsSaveButtonProps> = ({
  artwork,
}) => {
  const isArtworksListEnabled = useCheckIfArtworkListsEnabled()
  const { handleSave } = useSaveArtwork({
    isSaved: !!artwork.isSaved,
    artwork,
    contextModule: ContextModule.artworkImage,
  })

  const { isAuction, isClosed } = artwork.sale ?? {}
  const isOpenOrUpcomingSale = isAuction && !isClosed
  const isSaved = !!artwork.isSaved

  if (isArtworksListEnabled) {
    return (
      <ManageArtworkForSavesProvider>
        <ArtworkActionsSaveButtonV2FragmentContainer artwork={artwork} />
      </ManageArtworkForSavesProvider>
    )
  }

  // If an Auction, use Bell (for notifications); if a standard artwork use Heart
  if (isOpenOrUpcomingSale) {
    return (
      <ArtworkActionsWatchLotButtonFragmentContainer
        isSaved={isSaved}
        artwork={artwork}
        onClick={handleSave}
      />
    )
  }

  return (
    <ProgressiveOnboardingSaveArtwork>
      <SaveUtilButton isSaved={isSaved} onClick={handleSave} />
    </ProgressiveOnboardingSaveArtwork>
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
