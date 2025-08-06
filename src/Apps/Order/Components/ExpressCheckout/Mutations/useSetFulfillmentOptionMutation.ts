import { useMutation } from "Utils/Hooks/useMutation"
import type { useSetFulfillmentOptionMutation as useSetFulfillmentOptionMutationType } from "__generated__/useSetFulfillmentOptionMutation.graphql"
import { graphql } from "react-relay"

export const useSetFulfillmentOptionMutation = () => {
  return useMutation<useSetFulfillmentOptionMutationType>({
    mutation: graphql`
      mutation useSetFulfillmentOptionMutation(
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
