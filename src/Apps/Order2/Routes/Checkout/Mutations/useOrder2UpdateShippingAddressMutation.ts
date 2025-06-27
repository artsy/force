import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2UpdateShippingAddressMutation as useOrder2UpdateShippingAddressType } from "__generated__/useOrder2UpdateShippingAddressMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2UpdateShippingAddressMutation = () => {
  return useMutation<useOrder2UpdateShippingAddressType>({
    mutation: graphql`
      mutation useOrder2UpdateShippingAddressMutation(
        $input: updateOrderShippingAddressInput!
      ) {
        updateOrderShippingAddress(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                internalID
                ...ExpressCheckoutUI_order
                ...Order2ExpressCheckoutUI_order

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
                code
              }
            }
          }
        }
      }
    `,
  })
}
