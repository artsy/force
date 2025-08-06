import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2ExpressCheckoutSetFulfillmentOptionMutation as useOrder2ExpressCheckoutSetFulfillmentOptionMutationType } from "__generated__/useOrder2ExpressCheckoutSetFulfillmentOptionMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2ExpressCheckoutSetFulfillmentOptionMutation = () => {
  return useMutation<useOrder2ExpressCheckoutSetFulfillmentOptionMutationType>({
    mutation: graphql`
      mutation useOrder2ExpressCheckoutSetFulfillmentOptionMutation(
        $input: setOrderFulfillmentOptionInput!
      ) {
        setOrderFulfillmentOption(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                ...Order2ExpressCheckoutUI_order
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
