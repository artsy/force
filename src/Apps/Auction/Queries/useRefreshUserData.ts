import { Environment, fetchQuery, graphql } from "relay-runtime"
import { useSystemContext } from "System"

/**
 * After certain operations (like adding a credit card during a bid), we need
 * to refresh the user data so that if a bid is below reserve, we aren't
 * resending a query to add another credit card.
 */
export const useRefreshUserData = () => {
  const { relayEnvironment } = useSystemContext()

  const refreshUserData = () => {
    return fetchQuery(
      relayEnvironment as Environment,
      graphql`
        query useRefreshUserDataQuery {
          me {
            ...AuctionBidRoute_me
          }
        }
      `,
      {}
    ).toPromise()
  }

  return { refreshUserData }
}
