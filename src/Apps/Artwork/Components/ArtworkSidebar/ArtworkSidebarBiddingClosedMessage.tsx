import { createFragmentContainer, graphql } from "react-relay"
import { Spacer, Text } from "@artsy/palette"

import { ArtworkSidebarBiddingClosedMessage_artwork$data } from "__generated__/ArtworkSidebarBiddingClosedMessage_artwork.graphql"
import { ProgressiveOnboardingAlertCreateSimple } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreateSimple"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"

interface BiddingClosedMessageProps {
  artwork: ArtworkSidebarBiddingClosedMessage_artwork$data
}

const BiddingClosedMessage: React.FC<BiddingClosedMessageProps> = ({
  artwork,
}) => {
  return (
    <>
      <Text variant="lg-display" color="black100">
        Bidding closed
      </Text>

      {artwork.isEligibleToCreateAlert && (
        <>
          <Text variant="sm" color="black60" pt={0.5}>
            Get notifications for similar works
          </Text>
          <Spacer y={2} />

          <ProgressiveOnboardingAlertCreateSimple>
            <CreateAlertButton width="100%" size="large" />
          </ProgressiveOnboardingAlertCreateSimple>
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
        isEligibleToCreateAlert
        artists {
          internalID
        }
        attributionClass {
          internalID
        }
        mediumType {
          filterGene {
            slug
          }
        }
      }
    `,
  }
)
