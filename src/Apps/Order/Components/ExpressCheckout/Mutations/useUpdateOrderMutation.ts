import { useMutation } from "Utils/Hooks/useMutation"
import type { useUpdateOrderMutation as useUpdateOrderMutationType } from "__generated__/useUpdateOrderMutation.graphql"
import { graphql } from "react-relay"

export const useUpdateOrderMutation = () => {
  return useMutation<useUpdateOrderMutationType>({
    mutation: graphql`
      mutation useUpdateOrderMutation($input: updateOrderInput!) {
        updateOrder(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                internalID
                ...ExpressCheckoutUI_order
                availableShippingCountries
                fulfillmentOptions {
                  type
                  amount {
                    minor
                    currencyCode
                  }
                  selected
                }
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
