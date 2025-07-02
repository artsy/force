import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2SetFulfillmentOptionMutation as useOrder2SetFulfillmentOptionMutationType } from "__generated__/useOrder2SetFulfillmentOptionMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2SetFulfillmentOptionMutation = () => {
  return useMutation<useOrder2SetFulfillmentOptionMutationType>({
    mutation: graphql`
      mutation useOrder2SetFulfillmentOptionMutation(
        $input: setOrderFulfillmentOptionInput!
      ) {
        setOrderFulfillmentOption(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                ...Order2CheckoutApp_order
                ...Order2CheckoutContext_order
              }
            }
            ... on OrderMutationError {
              mutationError {
                message
                code
              }
            }
          }
        }
      }
    `,
  })
}
