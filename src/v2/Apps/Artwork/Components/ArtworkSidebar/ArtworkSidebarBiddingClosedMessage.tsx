import { Separator, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { ArtworkSidebarCreateAlertButtonFragmentContainer } from "./ArtworkSidebarCreateAlertButton"
import { ArtworkSidebarBiddingClosedMessage_artwork } from "v2/__generated__/ArtworkSidebarBiddingClosedMessage_artwork.graphql"

interface BiddingClosedMessageProps {
  artwork: ArtworkSidebarBiddingClosedMessage_artwork
}

const BiddingClosedMessage: React.FC<BiddingClosedMessageProps> = ({
  artwork,
}) => {
  const isCreateAlertButtonForArtworkEnabled = useFeatureFlag(
    "artwork-page-create-alert"
  )

  return (
    <>
      <Separator my={2} />

      <Text
        variant={isCreateAlertButtonForArtworkEnabled ? "lg" : "subtitle"}
        color="black100"
      >
        Bidding closed
      </Text>
      {!!isCreateAlertButtonForArtworkEnabled && (
        <>
          <Text variant="sm" color="black60" pt={0.5}>
            Be notified when a similar work is available
          </Text>
          <Spacer my={2} />
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
        ...ArtworkSidebarCreateAlertButton_artwork
      }
    `,
  }
)
