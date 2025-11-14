import { Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"
import { ProgressiveOnboardingAlertCreateSimple } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreateSimple"
import type { ArtworkSidebarBiddingClosedMessage_artwork$data } from "__generated__/ArtworkSidebarBiddingClosedMessage_artwork.graphql"

interface BiddingClosedMessageProps {
  artwork: ArtworkSidebarBiddingClosedMessage_artwork$data
}

const BiddingClosedMessage: React.FC<
  React.PropsWithChildren<BiddingClosedMessageProps>
> = ({ artwork }) => {
  return (
    <>
      <Text variant="lg-display" color="mono100">
        Bidding closed
      </Text>

      {artwork.isEligibleToCreateAlert && (
        <>
          <Text variant="sm" color="mono60" pt={0.5}>
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

export const ArtworkSidebarBiddingClosedMessageFragmentContainer =
  createFragmentContainer(BiddingClosedMessage, {
    artwork: graphql`
      fragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {
        isEligibleToCreateAlert
        artists(shallow: true) {
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
  })
