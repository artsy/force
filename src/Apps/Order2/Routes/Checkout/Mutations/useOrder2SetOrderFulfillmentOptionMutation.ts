import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2SetOrderFulfillmentOptionMutation as useOrder2SetOrderFulfillmentOptionMutationType } from "__generated__/useOrder2SetOrderFulfillmentOptionMutation.graphql"

import { graphql } from "react-relay"

export const useOrder2SetOrderFulfillmentOptionMutation = () => {
  return useMutation<useOrder2SetOrderFulfillmentOptionMutationType>({
    mutation: graphql`
      mutation useOrder2SetOrderFulfillmentOptionMutation(
        $input: setOrderFulfillmentOptionInput!
      ) {
        setOrderFulfillmentOption(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                ...Order2CheckoutContext_order
                ...Order2CheckoutApp_order
              }
            }
            ... on OrderMutationError {
              mutationError {
                message
              }
            }
          }
        }
      }
    `,
  })
}
