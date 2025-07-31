import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2ExpressCheckoutUnsetOrderPaymentMethodMutation as useOrder2ExpressCheckoutUnsetOrderPaymentMethodMutationType } from "__generated__/useOrder2ExpressCheckoutUnsetOrderPaymentMethodMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2ExpressCheckoutUnsetOrderPaymentMethodMutation = () => {
  return useMutation<useOrder2ExpressCheckoutUnsetOrderPaymentMethodMutationType>(
    {
      mutation: graphql`
        mutation useOrder2ExpressCheckoutUnsetOrderPaymentMethodMutation(
          $input: unsetOrderPaymentMethodInput!
        ) {
          unsetOrderPaymentMethod(input: $input) {
            orderOrError {
              __typename
              ... on OrderMutationSuccess {
                order {
                  ...Order2ExpressCheckoutUI_order
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
    },
  )
}
