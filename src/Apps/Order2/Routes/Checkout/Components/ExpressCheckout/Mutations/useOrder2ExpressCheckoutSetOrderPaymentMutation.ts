import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2ExpressCheckoutSetOrderPaymentMutation as useOrder2ExpressCheckoutSetOrderPaymentMutationType } from "__generated__/useOrder2ExpressCheckoutSetOrderPaymentMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2ExpressCheckoutSetOrderPaymentMutation = () => {
  return useMutation<useOrder2ExpressCheckoutSetOrderPaymentMutationType>({
    mutation: graphql`
      mutation useOrder2ExpressCheckoutSetOrderPaymentMutation(
        $input: setOrderPaymentInput!
      ) {
        setOrderPayment(input: $input) {
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
