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

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButton_artwork$data
}
const ArtworkActionsSaveButton: React.FC<ArtworkActionsSaveButtonProps> = ({
  artwork,
}) => {
  const { handleSave } = useSaveArtwork({
    isSaved: !!artwork.is_saved,
    artwork,
    contextModule: ContextModule.artworkImage,
  })

  const isOpenSale = artwork.sale?.isAuction && !artwork.sale?.isClosed

  const isSaved = !!artwork.is_saved

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
        }
        is_saved: isSaved
        ...ArtworkAuctionRegistrationPanel_artwork
      }
    `,
  }
)
