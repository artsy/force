import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2UnsetOrderFulfillmentOptionMutation as useOrder2UnsetOrderFulfillmentOptionMutationType } from "__generated__/useOrder2UnsetOrderFulfillmentOptionMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2UnsetOrderFulfillmentOptionMutation = () => {
  return useMutation<useOrder2UnsetOrderFulfillmentOptionMutationType>({
    mutation: graphql`
      mutation useOrder2UnsetOrderFulfillmentOptionMutation(
        $input: unsetOrderFulfillmentOptionInput!
      ) {
        unsetOrderFulfillmentOption(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                internalID
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
