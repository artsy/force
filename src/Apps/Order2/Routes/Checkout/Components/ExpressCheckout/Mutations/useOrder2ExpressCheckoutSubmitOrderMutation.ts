import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2ExpressCheckoutSubmitOrderMutation as useOrder2ExpressCheckoutSubmitOrderMutationType } from "__generated__/useOrder2ExpressCheckoutSubmitOrderMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2ExpressCheckoutSubmitOrderMutation = () => {
  return useMutation<useOrder2ExpressCheckoutSubmitOrderMutationType>({
    mutation: graphql`
      mutation useOrder2ExpressCheckoutSubmitOrderMutation(
        $input: submitOrderInput!
      ) {
        submitOrder(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                internalID
              }
            }
            ... on OrderMutationError {
              mutationError {
                message
                code
              }
            }
            ... on OrderMutationActionRequired {
              actionData {
                clientSecret
              }
            }
          }
        }
      }
    `,
  })
}
