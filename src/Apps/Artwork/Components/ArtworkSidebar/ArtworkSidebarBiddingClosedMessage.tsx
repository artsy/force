import { createFragmentContainer, graphql } from "react-relay"
import { Spacer, Text } from "@artsy/palette"
import { ArtworkCreateAlertButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkCreateAlertButton"
import { useTranslation } from "react-i18next"
import { ArtworkSidebarBiddingClosedMessage_artwork$data } from "__generated__/ArtworkSidebarBiddingClosedMessage_artwork.graphql"
import { ContextModule } from "@artsy/cohesion"

interface BiddingClosedMessageProps {
  artwork: ArtworkSidebarBiddingClosedMessage_artwork$data
}

const BiddingClosedMessage: React.FC<BiddingClosedMessageProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Text variant="lg-display" color="black100">
        {t(`artworkPage.sidebar.auction.biddingClosed`)}
      </Text>

      {artwork.isEligibleToCreateAlert && (
        <>
          <Text variant="sm" color="black60" pt={0.5}>
            {t(`artworkPage.sidebar.createAlert.description`)}
          </Text>
          <Spacer y={2} />
          <ArtworkCreateAlertButtonFragmentContainer
            artwork={artwork}
            analyticsContextModule={ContextModule.artworkSidebar}
          />
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
        ...ArtworkCreateAlertButton_artwork
        isEligibleToCreateAlert
      }
    `,
  }
)
