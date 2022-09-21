import {
  useBidderPositionQuery,
  useBidderPositionQuery$variables,
} from "__generated__/useBidderPositionQuery.graphql"
import { graphql } from "react-relay"
import { Environment, fetchQuery as fetchRelayQuery } from "relay-runtime"
import { useSystemContext } from "System"

export const useBidderPosition = () => {
  const { relayEnvironment } = useSystemContext()

  const fetchBidderPosition = ({
    variables,
  }: {
    variables: useBidderPositionQuery$variables
  }) => {
    return fetchRelayQuery<useBidderPositionQuery>(
      relayEnvironment as Environment,
      graphql`
        query useBidderPositionQuery($bidderPositionID: String!) {
          me {
            ...AuctionActiveBids_me

            bidderPosition(id: $bidderPositionID) {
              status
              messageHeader
              position {
                internalID
                suggestedNextBid {
                  cents
                  display
                }
                saleArtwork {
                  artwork {
                    ...Details_artwork
                  }
                }
              }
            }
          }
        }
      `,
      variables,
      {
        force: true,
      }
    )
  }

  return { fetchBidderPosition }
}
