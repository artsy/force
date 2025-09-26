import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2AddInitialOfferMutation as useOrder2AddInitialOfferMutationType } from "__generated__/useOrder2AddInitialOfferMutation.graphql"

export const useOrder2AddInitialOfferMutation = () => {
  return useMutation<useOrder2AddInitialOfferMutationType>({
    mutation: graphql`
      mutation useOrder2AddInitialOfferMutation(
        $input: CommerceAddInitialOfferToOrderInput!
      ) {
        commerceAddInitialOfferToOrder(input: $input) {
          orderOrError {
            ... on CommerceOrderWithMutationSuccess {
              __typename
              order {
                internalID
                mode
                totalListPriceCents
                ... on CommerceOfferOrder {
                  myLastOffer {
                    internalID
                    amountCents
                    note
                  }
                }
              }
            }
            ... on CommerceOrderWithMutationFailure {
              error {
                type
                code
                data
              }
            }
          }
        }
      }
    `,
  })
}
