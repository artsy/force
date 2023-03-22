import { BellFillIcon, BellIcon, Popover, THEME } from "@artsy/palette"
import { ArtworkAuctionRegistrationPanelFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkAuctionRegistrationPanel"
import { UtilButton } from "./UtilButton"
import { FC, useCallback, useEffect, useState } from "react"
import { useSystemContext } from "System/SystemContext"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkActionsWatchLotButton_artwork$data } from "__generated__/ArtworkActionsWatchLotButton_artwork.graphql"

interface ArtworkActionsWatchLotButtonProps {
  artwork: ArtworkActionsWatchLotButton_artwork$data
  onClick: () => void
}

const ArtworkActionsWatchLotButton: FC<ArtworkActionsWatchLotButtonProps> = ({
  artwork,
  onClick,
}) => {
  const { isLoggedIn } = useSystemContext()
  const [popoverVisible, setPopoverVisible] = useState(false)

  const { isLiveOpen, isRegistrationClosed, registrationStatus, liveStartAt } =
    artwork.sale ?? {}

  const isSaved = !!artwork.isSaved
  const registrationAttempted = !!registrationStatus
  const mobileMaxWidth = `calc(100% - (${THEME.space[2]} * 2))`

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

  const handleButtonClick = () => {
    onClick()

    if (!ignoreAuctionRegistrationPopover) {
      setPopoverVisible(true)
    }
  }

  const { value, clearValue } = useAuthIntent()

  useEffect(() => {
    // If we are coming in after authentication triggered by a save
    // *maybe* open the auction registration popover
    if (!value || value.action !== "save") return

    maybeOpenAuctionRegistrationPopover()

    clearValue()
  }, [value, maybeOpenAuctionRegistrationPopover, clearValue])

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
            iconTitle="Watch lot icon"
            label="Watch lot"
            onClick={handleButtonClick}
          />
        )
      }}
    </Popover>
  )
}

const FilledIcon = () => <BellFillIcon fill="blue100" />

export const ArtworkActionsWatchLotButtonFragmentContainer = createFragmentContainer(
  ArtworkActionsWatchLotButton,
  {
    artwork: graphql`
      fragment ArtworkActionsWatchLotButton_artwork on Artwork {
        sale {
          isLiveOpen
          isRegistrationClosed
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
