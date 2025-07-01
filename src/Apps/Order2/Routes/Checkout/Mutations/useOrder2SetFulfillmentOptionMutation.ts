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
                internalID
                fulfillmentOptions {
                  amount {
                    minor
                  }
                  selected
                  type
                }
                ## Required to recalculate checkout steps
                selectedFulfillmentOption {
                  type
                }
                mode
                fulfillmentDetails {
                  __typename
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
                ...Order2ExpressCheckoutUI_order
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
