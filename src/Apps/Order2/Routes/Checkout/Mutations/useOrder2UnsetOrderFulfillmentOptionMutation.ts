import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2UnsetOrderFulfillmentOptionMutation as useOrder2UnsetOrderFulfillmentOptionMutationType } from "__generated__/useOrder2UnsetOrderFulfillmentOptionMutation.graphql"
import { graphql } from "react-relay"

/**
 * Hook to unset the order fulfillment option.
 * This hook does not include the typical spreads for Order2CheckoutApp and Order2CheckoutContext.
 * because we do not want the missing values to flash in the UI:
 * ```graphql
 *   # Not included in this mutation
 *                 ...Order2CheckoutApp_order
 *                 ...Order2CheckoutContext_order
 * ```
 */

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
