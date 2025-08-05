import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2ExpressCheckoutUpdateOrderMutation as useOrder2ExpressCheckoutUpdateOrderMutationType } from "__generated__/useOrder2ExpressCheckoutUpdateOrderMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2ExpressCheckoutUpdateOrderMutation = () => {
  return useMutation<useOrder2ExpressCheckoutUpdateOrderMutationType>({
    mutation: graphql`
      mutation useOrder2ExpressCheckoutUpdateOrderMutation(
        $input: updateOrderInput!
      ) {
        updateOrder(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                ...Order2ExpressCheckoutUI_order
                internalID
                fulfillmentOptions {
                  type
                  amount {
                    minor
                    currencyCode
                  }
                  selected
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
                stripeConfirmationToken
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
