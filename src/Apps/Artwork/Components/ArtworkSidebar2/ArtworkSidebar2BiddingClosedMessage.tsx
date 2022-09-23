import { createFragmentContainer, graphql } from "react-relay"
import { Spacer, Text } from "@artsy/palette"
import { ArtworkSidebarCreateAlertButtonFragmentContainer } from "../ArtworkSidebar/ArtworkSidebarCreateAlertButton"
import { useTranslation } from "react-i18next"
import { ArtworkSidebar2BiddingClosedMessage_artwork } from "__generated__/ArtworkSidebar2BiddingClosedMessage_artwork.graphql"

interface BiddingClosedMessageProps {
  artwork: ArtworkSidebar2BiddingClosedMessage_artwork
}

const BiddingClosedMessage: React.FC<BiddingClosedMessageProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()
  const hasArtists = (artwork.artists?.length ?? 0) > 0

  return (
    <>
      <Text variant="lg-display" color="black100">
        {t(`artworkPage.sidebar.auction.biddingClosed`)}
      </Text>

      {hasArtists && (
        <>
          <Text variant="sm" color="black60" pt={0.5}>
            {t(`artworkPage.sidebar.createAlert.description`)}
          </Text>
          <Spacer mt={2} />
          <ArtworkSidebarCreateAlertButtonFragmentContainer artwork={artwork} />
        </>
      )}
    </>
  )
}

export const ArtworkSidebar2BiddingClosedMessageFragmentContainer = createFragmentContainer(
  BiddingClosedMessage,
  {
    artwork: graphql`
      fragment ArtworkSidebar2BiddingClosedMessage_artwork on Artwork {
        artists {
          internalID
        }
        ...ArtworkSidebarCreateAlertButton_artwork
      }
    `,
  }
)
