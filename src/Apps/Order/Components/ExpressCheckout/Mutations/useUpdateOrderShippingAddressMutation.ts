import { useMutation } from "Utils/Hooks/useMutation"
import type { useUpdateOrderShippingAddressMutation as useUpdateOrderShippingAddressType } from "__generated__/useUpdateOrderShippingAddressMutation.graphql"
import { graphql } from "react-relay"

export const useUpdateOrderShippingAddressMutation = () => {
  return useMutation<useUpdateOrderShippingAddressType>({
    mutation: graphql`
      mutation useUpdateOrderShippingAddressMutation(
        $input: updateOrderShippingAddressInput!
      ) {
        updateOrderShippingAddress(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                ...ExpressCheckoutUI_order
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
