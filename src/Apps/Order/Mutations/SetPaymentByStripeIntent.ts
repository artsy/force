import { commitMutation, Environment, graphql } from "relay-runtime"
import {
  SetPaymentByStripeIntentMutation,
  CommerceSetPaymentByStripeIntentInput,
  SetPaymentByStripeIntentMutationResponse,
} from "__generated__/SetPaymentByStripeIntentMutation.graphql"

export const SetPaymentByStripeIntent = (
  relayEnvironment: Environment,
  input: CommerceSetPaymentByStripeIntentInput
) => {
  return new Promise<SetPaymentByStripeIntentMutationResponse>(
    (resolve, reject) => {
      commitMutation<SetPaymentByStripeIntentMutation>(relayEnvironment, {
        mutation: graphql`
          mutation SetPaymentByStripeIntentMutation(
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
        variables: {
          input,
        },
        onError: reject,
        onCompleted: async (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }
          resolve(res)
        },
      })
    }
  )
}
