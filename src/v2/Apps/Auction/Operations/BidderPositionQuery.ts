import {
  BidderPositionQuery,
  BidderPositionQuery$variables,
} from "v2/__generated__/BidderPositionQuery.graphql"
import { graphql } from "react-relay"
import { Environment, fetchQuery } from "relay-runtime"

export const bidderPositionQuery = (
  environment: Environment,
  variables: BidderPositionQuery$variables
) => {
  return fetchQuery<BidderPositionQuery>(
    environment,
    graphql`
      query BidderPositionQuery($bidderPositionID: String!) {
        me {
          bidderPosition(id: $bidderPositionID) {
            status
            messageHeader
            position {
              internalID
              suggestedNextBid {
                cents
                display
              }
            }
          }
        }
      }
    `,
    variables,
    {
      networkCacheConfig: {
        force: true,
      },
    }
  ).toPromise()
}
