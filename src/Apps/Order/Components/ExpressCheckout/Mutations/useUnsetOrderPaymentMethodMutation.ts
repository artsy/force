import { useUnsetOrderPaymentMethodMutation as useUnsetOrderPaymentMethodMutationType } from "__generated__/useUnsetOrderPaymentMethodMutation.graphql"
import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"

export const useUnsetOrderPaymentMethodMutation = () => {
  return useMutation<useUnsetOrderPaymentMethodMutationType>({
    mutation: graphql`
      mutation useUnsetOrderPaymentMethodMutation(
        $input: unsetOrderPaymentMethodInput!
      ) {
        unsetOrderPaymentMethod(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
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
