import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2ExpressCheckoutUnsetOrderFulfillmentOptionMutation as useOrder2ExpressCheckoutUnsetOrderFulfillmentOptionMutationType } from "__generated__/useOrder2ExpressCheckoutUnsetOrderFulfillmentOptionMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2ExpressCheckoutUnsetOrderFulfillmentOptionMutation =
  () => {
    return useMutation<useOrder2ExpressCheckoutUnsetOrderFulfillmentOptionMutationType>(
      {
        mutation: graphql`
          mutation useOrder2ExpressCheckoutUnsetOrderFulfillmentOptionMutation(
            $input: unsetOrderFulfillmentOptionInput!
          ) {
            unsetOrderFulfillmentOption(input: $input) {
              orderOrError {
                __typename
                ... on OrderMutationSuccess {
                  order {
                    ...Order2ExpressCheckoutUI_order
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
      }
    )
  }
