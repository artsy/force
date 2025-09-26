import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import type { useOfferIdQuery as useOfferIdQueryType } from "__generated__/useOfferIdQuery.graphql"

export const useOfferIdQuery = (orderId: string) => {
  const data = useLazyLoadQuery<useOfferIdQueryType>(
    graphql`
      query useOfferIdQuery($orderId: ID!) {
        commerceOrder(id: $orderId) {
          ... on CommerceOfferOrder {
            myLastOffer {
              internalID
            }
          }
        }
      }
    `,
    { orderId },
    { fetchPolicy: "store-and-network" },
  )

  return data.commerceOrder?.myLastOffer?.internalID || null
}
