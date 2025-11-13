import { useSystemContext } from "System/Hooks/useSystemContext"
import type {
  useBidderPositionQuery,
  useBidderPositionQuery$variables,
} from "__generated__/useBidderPositionQuery.graphql"
import { fetchQuery, graphql } from "react-relay"

export const useBidderPosition = () => {
  const { relayEnvironment } = useSystemContext()

  const fetchBidderPosition = ({
    variables,
  }: {
    variables: useBidderPositionQuery$variables
  }) => {
    return fetchQuery<useBidderPositionQuery>(
      relayEnvironment,
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
