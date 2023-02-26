import { ContextModule } from "@artsy/cohesion"
import {
  BellFillIcon,
  BellIcon,
  HeartFillIcon,
  HeartIcon,
  Popover,
  THEME,
} from "@artsy/palette"
import { useEffect, useCallback, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { ArtworkActionsSaveButton_artwork$data } from "__generated__/ArtworkActionsSaveButton_artwork.graphql"
import { UtilButton } from "./UtilButton"
import { ArtworkAuctionRegistrationPanelFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkAuctionRegistrationPanel"
import { useSystemContext } from "System/useSystemContext"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButton_artwork$data
}
const ArtworkActionsSaveButton: React.FC<ArtworkActionsSaveButtonProps> = ({
  artwork,
}) => {
  const { isLoggedIn } = useSystemContext()
  const { handleSave } = useSaveArtwork({
    isSaved: !!artwork.isSaved,
    artwork,
    contextModule: ContextModule.artworkImage,
  })
  const [popoverVisible, setPopoverVisible] = useState(false)

  const {
    isAuction,
    isClosed,
    isLiveOpen,
    isRegistrationClosed,
    registrationStatus,
    liveStartAt,
  } = artwork.sale ?? {}

  const isOpenSale = isAuction && !isClosed
  const isSaved = !!artwork.isSaved
  const registrationAttempted = !!registrationStatus

  const ignoreAuctionRegistrationPopover =
    !isLoggedIn ||
    !liveStartAt ||
    isSaved ||
    isRegistrationClosed ||
    isLiveOpen ||
    registrationAttempted

  const maybeOpenAuctionRegistrationPopover = useCallback(() => {
    if (ignoreAuctionRegistrationPopover) return

    setPopoverVisible(true)
  }, [ignoreAuctionRegistrationPopover])

  const handleClose = useCallback(() => {
    setPopoverVisible(false)
  }, [])

  const { value, clearValue } = useAuthIntent()

  useEffect(() => {
    // If we are coming in after authentication triggered by a save
    // *maybe* open the auction registration popover
    if (!value || value.action !== "save") return

    maybeOpenAuctionRegistrationPopover()

    clearValue()
  }, [value, maybeOpenAuctionRegistrationPopover, clearValue])

  // If an Auction, use Bell (for notifications); if a standard artwork use Heart
  if (isOpenSale) {
    const FilledIcon = () => <BellFillIcon fill="blue100" />
    const mobileMaxWidth = `calc(100% - (${THEME.space[2]} * 2))`

    return (
      <Popover
        visible={popoverVisible}
        onClose={handleClose}
        placement="top"
        popover={
          <ArtworkAuctionRegistrationPanelFragmentContainer artwork={artwork} />
        }
        maxWidth={[mobileMaxWidth, 410]}
      >
        {({ anchorRef }) => {
          return (
            <UtilButton
              ref={anchorRef}
              name="bell"
              Icon={isSaved ? FilledIcon : BellIcon}
              label="Watch lot"
              onClick={() => {
                handleSave()

                if (!ignoreAuctionRegistrationPopover) {
                  setPopoverVisible(true)
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
        isSaved
        ...ArtworkAuctionRegistrationPanel_artwork
      }
    `,
  }
)
