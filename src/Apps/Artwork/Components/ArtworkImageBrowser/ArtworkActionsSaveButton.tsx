import { ContextModule } from "@artsy/cohesion"
import {
  BellFillIcon,
  BellIcon,
  HeartFillIcon,
  HeartIcon,
  Popover as _Popover,
  Text,
} from "@artsy/palette"
import { useEffect, useCallback, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { ArtworkActionsSaveButton_artwork$data } from "__generated__/ArtworkActionsSaveButton_artwork.graphql"
import { UtilButton } from "./UtilButton"
import { ArtworkAuctionRegistrationPanelFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkAuctionRegistrationPanel"
import { useSystemContext } from "System"
import { useTranslation } from "react-i18next"
import { mediator } from "Server/mediator"
import styled from "styled-components"

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButton_artwork$data
}
const ArtworkActionsSaveButton: React.FC<ArtworkActionsSaveButtonProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()
  const { isLoggedIn } = useSystemContext()
  const { handleSave } = useSaveArtwork({
    isSaved: !!artwork.is_saved,
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
    registrationEndsAt,
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

  const openAuctionRegistrationPopover = useCallback(() => {
    if (!ignoreAuctionRegistrationPopover) {
      setPopoverVisible(true)
    }
  }, [ignoreAuctionRegistrationPopover])

  const onPopoverClosed = useCallback(() => {
    setPopoverVisible(false)
  }, [])

  useEffect(() => {
    mediator.on("artwork:save", openAuctionRegistrationPopover)

    return () => {
      mediator.off("artwork:save")
    }
  }, [openAuctionRegistrationPopover])

  // If an Auction, use Bell (for notifications); if a standard artwork use Heart
  if (isOpenSale) {
    const FilledIcon = () => <BellFillIcon fill="blue100" />

    return (
      <Popover
        visible={popoverVisible}
        onClose={onPopoverClosed}
        title={
          <Text variant="sm-display">
            {t(
              registrationEndsAt
                ? `artworkPage.actions.save.registerToBidWithDeadline`
                : `artworkPage.actions.save.registerToBidWithoutDeadline`
            )}
          </Text>
        }
        placement="bottom"
        popover={
          <ArtworkAuctionRegistrationPanelFragmentContainer artwork={artwork} />
        }
        maxWidth={[335, 410]}
        width="100%"
        mx={2}
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
          registrationEndsAt
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

const Popover = styled(_Popover)`
  z-index: 2;
`
