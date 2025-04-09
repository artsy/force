import { useMutation } from "Utils/Hooks/useMutation"
import type { useUnsetOrderFulfillmentOptionMutation as useUnsetOrderFulfillmentOptionMutationType } from "__generated__/useUnsetOrderFulfillmentOptionMutation.graphql"
import { graphql } from "react-relay"

export const useUnsetOrderFulfillmentOptionMutation = () => {
  return useMutation<useUnsetOrderFulfillmentOptionMutationType>({
    mutation: graphql`
      mutation useUnsetOrderFulfillmentOptionMutation(
        $input: unsetOrderFulfillmentOptionInput!
      ) {
        unsetOrderFulfillmentOption(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                internalID
                fulfillmentOptions {
                  amount {
                    minor
                  }
                  selected
                  type
                }
                buyerTotal {
                  minor
                  currencyCode
                }
                itemsTotal {
                  minor
                }
                shippingTotal {
                  minor
                }
                taxTotal {
                  minor
                }
                availableShippingCountries
                ...ExpressCheckoutUI_order
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
