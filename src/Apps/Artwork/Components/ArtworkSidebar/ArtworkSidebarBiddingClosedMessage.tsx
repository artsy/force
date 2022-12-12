import { createFragmentContainer, graphql } from "react-relay"
import { Spacer, Text } from "@artsy/palette"
import { ArtworkSidebarCreateAlertButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCreateAlertButton"
import { useTranslation } from "react-i18next"
import { ArtworkSidebarBiddingClosedMessage_artwork$data } from "__generated__/ArtworkSidebarBiddingClosedMessage_artwork.graphql"

interface BiddingClosedMessageProps {
  artwork: ArtworkSidebarBiddingClosedMessage_artwork$data
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
          <Spacer y={2} />
          <ArtworkSidebarCreateAlertButtonFragmentContainer artwork={artwork} />
        </>
      )}
    </>
  )
}

export const ArtworkSidebarBiddingClosedMessageFragmentContainer = createFragmentContainer(
  BiddingClosedMessage,
  {
    artwork: graphql`
      fragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {
        artists {
          internalID
        }
        ...ArtworkSidebarCreateAlertButton_artwork
      }
    `,
  }
)
