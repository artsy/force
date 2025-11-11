import { useMutation } from "Utils/Hooks/useMutation"
import type { useOrder2SetOrderPaymentByStripeSetupIntentMutation as useOrder2SetOrderPaymentByStripeSetupIntentMutationType } from "__generated__/useOrder2SetOrderPaymentByStripeSetupIntentMutation.graphql"
import { graphql } from "react-relay"

export const useOrder2SetOrderPaymentByStripeSetupIntentMutation = () => {
  return useMutation<useOrder2SetOrderPaymentByStripeSetupIntentMutationType>({
    mutation: graphql`
      mutation useOrder2SetOrderPaymentByStripeSetupIntentMutation(
        $input: setOrderPaymentByStripeSetupIntentInput!
      ) {
        setOrderPaymentByStripeSetupIntent(input: $input) {
          orderOrError {
            __typename
            ... on OrderMutationSuccess {
              order {
                id
              }
            }
            ... on OrderMutationError {
              mutationError {
                code
                message
              }
            }
          }
        }
      }
    `,
  })
}
