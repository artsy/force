import { ContextModule } from "@artsy/cohesion"
import {
  BellFillIcon,
  BellIcon,
  HeartFillIcon,
  HeartIcon,
  Popover,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { ArtworkActionsSaveButton_artwork$data } from "__generated__/ArtworkActionsSaveButton_artwork.graphql"
import { ArtworkActionsSaveButton_me$data } from "__generated__/ArtworkActionsSaveButton_me.graphql"
import { UtilButton } from "./UtilButton"
import { ArtworkAuctionRegistrationPanelFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkAuctionRegistrationPanel"
import { useSystemContext } from "System"

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButton_artwork$data
  me: ArtworkActionsSaveButton_me$data
}
const ArtworkActionsSaveButton: React.FC<ArtworkActionsSaveButtonProps> = ({
  artwork,
  me,
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
    registrationEndsAt,
    isRegistrationClosed,
    registrationStatus,
    requireIdentityVerification,
  } = artwork.sale ?? {}
  const isOpenSale = isAuction && !isClosed
  const isSaved = !!artwork.is_saved
  const qualifiedForBidding = registrationStatus?.qualifiedForBidding ?? false
  const userHasPendingVerification =
    requireIdentityVerification && me.pendingIdentityVerification?.internalID

  // If an Auction, use Bell (for notifications); if a standard artwork use Heart
  if (isOpenSale) {
    const FilledIcon = () => <BellFillIcon fill="blue100" />

    return (
      <Popover
        title="Title"
        placement="top"
        popover={
          <ArtworkAuctionRegistrationPanelFragmentContainer artwork={artwork} />
        }
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

                if (
                  !isLoggedIn ||
                  isSaved ||
                  isRegistrationClosed ||
                  qualifiedForBidding ||
                  userHasPendingVerification
                ) {
                  return
                }

                onVisible()
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
          requireIdentityVerification
          isRegistrationClosed
          registrationEndsAt
          registrationStatus {
            qualifiedForBidding
          }
        }
        is_saved: isSaved
        ...ArtworkAuctionRegistrationPanel_artwork
      }
    `,
    me: graphql`
      fragment ArtworkActionsSaveButton_me on Me {
        pendingIdentityVerification {
          internalID
        }
      }
    `,
  }
)
