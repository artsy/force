import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2ExpressCheckoutUpdateOrderShippingAddressMutation as useOrder2ExpressCheckoutUpdateOrderShippingAddressType } from "__generated__/useOrder2ExpressCheckoutUpdateOrderShippingAddressMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2ExpressCheckoutUpdateOrderShippingAddressMutation =
  () => {
    return useMutation<useOrder2ExpressCheckoutUpdateOrderShippingAddressType>({
      mutation: graphql`
        mutation useOrder2ExpressCheckoutUpdateOrderShippingAddressMutation(
          $input: updateOrderShippingAddressInput!
        ) {
          updateOrderShippingAddress(input: $input) {
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
