import {
  useBidderPositionQuery,
  useBidderPositionQuery$variables,
} from "__generated__/useBidderPositionQuery.graphql"
import { graphql } from "react-relay"
import { Environment, fetchQuery } from "relay-runtime"
import { useSystemContext } from "System/useSystemContext"

export const useBidderPosition = () => {
  const { relayEnvironment } = useSystemContext()

  const fetchBidderPosition = ({
    variables,
  }: {
    variables: useBidderPositionQuery$variables
  }) => {
    return fetchQuery<useBidderPositionQuery>(
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
        fetchPolicy: "network-only",
      }
    ).toPromise()
  }

  return { fetchBidderPosition }
}
