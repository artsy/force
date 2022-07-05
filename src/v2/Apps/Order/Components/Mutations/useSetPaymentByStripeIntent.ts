import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useSetPaymentByStripeIntentMutation } from "v2/__generated__/useSetPaymentByStripeIntentMutation.graphql"

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
