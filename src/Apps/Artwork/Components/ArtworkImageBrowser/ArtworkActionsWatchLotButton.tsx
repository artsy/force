import { Popover, THEME } from "@artsy/palette"
import { ArtworkAuctionRegistrationPanelFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkAuctionRegistrationPanel"
import { UtilButton } from "./UtilButton"
import { FC, useCallback, useEffect, useState } from "react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkActionsWatchLotButton_artwork$data } from "__generated__/ArtworkActionsWatchLotButton_artwork.graphql"
import { useTranslation } from "react-i18next"
import BellFilledIcon from "@artsy/icons/BellFilledIcon"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"

interface ArtworkActionsWatchLotButtonProps {
  isSaved: boolean
  artwork: ArtworkActionsWatchLotButton_artwork$data
  canShowRegistrationPopover?: boolean
  onClick: () => void
}

const ArtworkActionsWatchLotButton: FC<ArtworkActionsWatchLotButtonProps> = ({
  isSaved,
  artwork,
  canShowRegistrationPopover = true,
  onClick,
}) => {
  const { isLoggedIn } = useSystemContext()
  const [popoverVisible, setPopoverVisible] = useState(false)
  const { t } = useTranslation()

  const { isLiveOpen, isRegistrationClosed, registrationStatus, liveStartAt } =
    artwork.sale ?? {}

  const registrationAttempted = !!registrationStatus
  const mobileMaxWidth = `calc(100% - (${THEME.space[2]} * 2))`

  const ignoreAuctionRegistrationPopover =
    !isLoggedIn ||
    !liveStartAt ||
    isSaved ||
    isRegistrationClosed ||
    isLiveOpen ||
    registrationAttempted ||
    !canShowRegistrationPopover

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
    if (value?.action === "save" || value?.action === "saveArtworkToLists") {
      maybeOpenAuctionRegistrationPopover()
      clearValue()
    }
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
            Icon={isSaved ? FilledIcon : BellStrokeIcon}
            label={
              isSaved
                ? t(`artworkPage.actions.watchingLot`)
                : t(`artworkPage.actions.watchLot`)
            }
            onClick={handleButtonClick}
          />
        )
      }}
    </Popover>
  )
}

const FilledIcon = () => <BellFilledIcon fill="blue100" />

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
        ...ArtworkAuctionRegistrationPanel_artwork
      }
    `,
  }
)
