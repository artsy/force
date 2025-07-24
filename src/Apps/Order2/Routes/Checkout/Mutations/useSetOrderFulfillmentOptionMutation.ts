import { useMutation } from "Utils/Hooks/useMutation"
import type { useSetOrderFulfillmentOptionMutation as useSetOrderFulfillmentOptionMutationType } from "__generated__/useSetOrderFulfillmentOptionMutation.graphql"

import { graphql } from "react-relay"

export const useSetOrderFulfillmentOptionMutation = () => {
  return useMutation<useSetOrderFulfillmentOptionMutationType>({
    mutation: graphql`
      mutation useSetOrderFulfillmentOptionMutation(
        $input: setOrderFulfillmentOptionInput!
      ) {
        setOrderFulfillmentOption(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                id
                selectedFulfillmentOption {
                  type
                }
                # TODO: fetch/refresh the full checkout flow order
                internalID

                fulfillmentOptions {
                  type
                }
                ...Order2CollapsibleOrderSummary_order
                ...Order2FulfillmentDetailsStep_order
                ...Order2ReviewStep_order
                ...Order2CheckoutLoadingSkeleton_order
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
