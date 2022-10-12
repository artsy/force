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
import { UtilButton } from "./UtilButton"
import { ArtworkAuctionRegistrationPanelFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkAuctionRegistrationPanel"
import { useSystemContext } from "System"
import { DateTime, Duration } from "luxon"

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

  const isOpenSale = artwork.sale?.isAuction && !artwork.sale?.isClosed
  const isSaved = !!artwork.is_saved
  const { registrationEndsAt, isRegistrationClosed } = artwork.sale ?? {}

  const checkIsAuctionRegistrationEnded = () => {
    if (!registrationEndsAt) {
      return false
    }

    const endDate = DateTime.fromISO(registrationEndsAt)
    const difference = endDate.diffNow().toString()
    const timeBeforeEnd = Duration.fromISO(difference)
    const hasEnded = Math.floor(timeBeforeEnd.seconds) <= 0

    return hasEnded
  }

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

                if (!isLoggedIn || isSaved || isRegistrationClosed) {
                  return
                }

                // We check whether the registration was closed
                // while the user was on the page
                if (!checkIsAuctionRegistrationEnded()) {
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
          isRegistrationClosed
          registrationEndsAt
        }
        is_saved: isSaved
        ...ArtworkAuctionRegistrationPanel_artwork
      }
    `,
  }
)
