import { ContextModule } from "@artsy/cohesion"
import {
  BellFillIcon,
  BellIcon,
  HeartFillIcon,
  HeartIcon,
  Popover,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { ArtworkActionsSaveButton_artwork$data } from "__generated__/ArtworkActionsSaveButton_artwork.graphql"
import { UtilButton } from "./UtilButton"
import { ArtworkAuctionRegistrationPanelFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkAuctionRegistrationPanel"
import { useSystemContext } from "System"

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButton_artwork$data
}
const ArtworkActionsSaveButton: React.FC<ArtworkActionsSaveButtonProps> = ({
  artwork,
}) => {
  const { isLoggedIn } = useSystemContext()
  const { handleSave } = useSaveArtwork({
    isSaved: !!artwork.is_saved,
    artwork,
    contextModule: ContextModule.artworkImage,
  })

  const {
    isAuction,
    isClosed,
    isLiveOpen,
    isRegistrationClosed,
    registrationStatus,
    liveStartAt,
  } = artwork.sale ?? {}
  const isOpenSale = isAuction && !isClosed
  const isSaved = !!artwork.is_saved
  const registrationAttempted = !!registrationStatus
  const ignoreAuctionRegistrationPopover =
    !isLoggedIn ||
    !liveStartAt ||
    isSaved ||
    isRegistrationClosed ||
    isLiveOpen ||
    registrationAttempted

  // If an Auction, use Bell (for notifications); if a standard artwork use Heart
  if (isOpenSale) {
    const FilledIcon = () => <BellFillIcon fill="blue100" />

    return (
      <Popover
        title={
          <Text variant="sm-display">
            Register ahead of time to bid in this auction and get notifications
            for this lot.
          </Text>
        }
        placement="top"
        popover={
          <ArtworkAuctionRegistrationPanelFragmentContainer artwork={artwork} />
        }
        maxWidth={[335, 410]}
        width="100%"
      >
        {({ anchorRef, onVisible }) => {
          return (
            <UtilButton
              ref={anchorRef}
              name="bell"
              Icon={isSaved ? FilledIcon : BellIcon}
              label="Watch lot"
              onClick={() => {
                handleSave()

                if (!ignoreAuctionRegistrationPopover) {
                  onVisible()
                }
              }}
            />
          )
        }}
      </Popover>
    )
  } else {
    const FilledIcon = () => <HeartFillIcon fill="blue100" />

    return (
      <UtilButton
        name="heart"
        Icon={isSaved ? FilledIcon : HeartIcon}
        label={isSaved ? "Saved" : "Save"}
        longestLabel="Saved"
        onClick={handleSave}
      />
    )
  }
}

export const ArtworkActionsSaveButtonFragmentContainer = createFragmentContainer(
  ArtworkActionsSaveButton,
  {
    artwork: graphql`
      fragment ArtworkActionsSaveButton_artwork on Artwork {
        internalID
        id
        slug
        title
        sale {
          isAuction
          isClosed
          isLiveOpen
          isRegistrationClosed
          requireIdentityVerification
          liveStartAt
          registrationStatus {
            qualifiedForBidding
          }
        }
        is_saved: isSaved
        ...ArtworkAuctionRegistrationPanel_artwork
      }
    `,
  }
)
