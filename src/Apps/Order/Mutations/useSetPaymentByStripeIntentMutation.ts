import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useSetPaymentByStripeIntentMutation } from "__generated__/useSetPaymentByStripeIntentMutation.graphql"

export const useSetPaymentByStripeIntent = () => {
  return useMutation<useSetPaymentByStripeIntentMutation>({
    mutation: graphql`
      mutation useSetPaymentByStripeIntentMutation(
        $input: CommerceSetPaymentByStripeIntentInput!
      ) {
        commerceSetPaymentByStripeIntent(input: $input) {
          orderOrError {
            ... on CommerceOrderWithMutationSuccess {
              order {
                id
                ...Payment_validation
              }
            }
            ... on CommerceOrderWithMutationFailure {
              error {
                type
                code
                data
              }
            }
          }
        }
      }
    `,
  })
}
